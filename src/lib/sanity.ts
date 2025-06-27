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
})

// 图片 URL 构建器
const builder = imageUrlBuilder(client)
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)

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