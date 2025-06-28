import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 这些值需要你在 sanity.io 创建项目后获取
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // 生产环境使用 CDN
  // 网络配置
  timeout: 10000, // 10秒超时
  maxRetries: 3, // 最多重试3次
  retryDelay: (attemptNumber) => Math.min(1000 * Math.pow(2, attemptNumber - 1), 5000), // 指数退避，最多5秒
  // 控制台环境下使用 token（如果有的话）
  token: process.env.SANITY_API_TOKEN,
  // 开发环境下显示更多调试信息
  perspective: 'published',
})

// 图片 URL 构建器
const builder = imageUrlBuilder(client)
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)

// 简化的错误处理
export async function handleSanityQuery<T>(
  queryFn: () => Promise<T>,
  fallbackValue: T
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    // 404 和 403 错误需要特殊处理，直接抛出
    const statusCode = error && typeof error === 'object' && 'statusCode' in error 
      ? (error as { statusCode: number }).statusCode 
      : undefined;

    if (statusCode === 404 || statusCode === 403) {
      throw error;
    }

    // 其他错误返回降级值，避免页面崩溃
    console.error('Sanity query failed:', error);
    return fallbackValue;
  }
}

// GROQ 查询
export const queries = {
  // 获取所有已发布的文章
  allPosts: `*[_type == "post" && !isDraft] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 根据语言获取文章
  postsByLanguage: `*[_type == "post" && !isDraft && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 根据 slug 获取单篇文章
  postBySlug: `*[_type == "post" && slug.current == $slug && !isDraft][0] {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    content,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 根据 slug 和语言获取文章
  postBySlugAndLanguage: `*[_type == "post" && slug.current == $slug && language == $language && !isDraft][0] {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    content,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 获取所有文章的 slug（用于生成静态路径）
  postSlugs: `*[_type == "post" && !isDraft].slug.current`,
  
  // 分页查询：根据语言获取文章
  postsByLanguagePaginated: `{
    "items": *[_type == "post" && !isDraft && language == $language] | order(publishedAt desc)[$start...$end] {
      _id,
      title,
      slug,
      language,
      description,
      publishedAt,
      tags,
      "readingTime": round(length(pt::text(content)) / 5 / 250)
    },
    "total": count(*[_type == "post" && !isDraft && language == $language])
  }`,
  
  // 获取文章总数
  postCountByLanguage: `count(*[_type == "post" && !isDraft && language == $language])`
}