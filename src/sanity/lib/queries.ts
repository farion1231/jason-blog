import { groq } from 'next-sanity'

// 共享的文章字段定义
const postFields = groq`
  _id,
  title,
  slug,
  language,
  description,
  publishedAt,
  tags,
  "readingTime": round(length(pt::text(content)) / 5 / 250)
`

const postFieldsWithContent = groq`
  ${postFields},
  content
`

// GROQ 查询定义
export const queries = {
  // 获取所有已发布的文章
  allPosts: groq`*[_type == "post" && !isDraft && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }`,
  
  // 根据语言获取文章
  postsByLanguage: groq`*[_type == "post" && !isDraft && language == $language && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }`,
  
  // 根据 slug 获取单篇文章
  postBySlug: groq`*[_type == "post" && slug.current == $slug && !isDraft][0] {
    ${postFieldsWithContent}
  }`,
  
  // 根据 slug 和语言获取文章
  postBySlugAndLanguage: groq`*[_type == "post" && slug.current == $slug && language == $language && !isDraft && defined(slug.current)][0] {
    ${postFieldsWithContent}
  }`,
  
  // 获取所有文章的 slug（用于生成静态路径）
  postSlugs: groq`*[_type == "post" && !isDraft && defined(slug.current)].slug.current`,
  
  // 分页查询：根据语言获取文章
  postsByLanguagePaginated: groq`{
    "items": *[_type == "post" && !isDraft && language == $language && defined(slug.current)] | order(publishedAt desc)[$start...$end] {
      ${postFields}
    },
    "total": count(*[_type == "post" && !isDraft && language == $language && defined(slug.current)])
  }`,
  
  // 获取文章总数
  postCountByLanguage: groq`count(*[_type == "post" && !isDraft && language == $language && defined(slug.current)])`
}