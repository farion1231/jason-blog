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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source)

// GROQ 查询
export const queries = {
  // 获取所有已发布的文章
  allPosts: `*[_type == "post" && !isDraft] | order(publishedAt desc) {
    _id,
    title,
    slug,
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
    description,
    publishedAt,
    tags,
    content,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 获取所有文章的 slug（用于生成静态路径）
  postSlugs: `*[_type == "post" && !isDraft].slug.current`
}