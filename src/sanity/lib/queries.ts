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
  postCountByLanguage: groq`count(*[_type == "post" && !isDraft && language == $language && defined(slug.current)])`,
  
  // 搜索文章
  searchPosts: groq`*[_type == "post" && !isDraft && language == $language && defined(slug.current) && (
    title match $searchQuery + "*" ||
    description match $searchQuery + "*" ||
    pt::text(content) match $searchQuery + "*" ||
    $searchQuery in tags
  )] | order(_score desc, publishedAt desc) {
    ${postFields},
    "highlights": {
      "title": title,
      "description": description,
      "content": pt::text(content)[0..200] + "..."
    }
  }`,
  
  // 获取搜索建议（基于标题）
  searchSuggestions: groq`*[_type == "post" && !isDraft && language == $language && defined(slug.current) && title match $searchQuery + "*"] | order(_score desc) [0...5] {
    title,
    slug
  }`,
  
  // 获取所有标签
  allTags: groq`*[_type == "post" && !isDraft && language == $language && defined(slug.current)].tags[] | order() | array::unique()`,
  
  // 根据标签获取文章
  postsByTag: groq`*[_type == "post" && !isDraft && language == $language && $tag in tags && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }`,
  
  // 按年份归档
  postsByYear: groq`{
    "years": *[_type == "post" && !isDraft && language == $language && defined(slug.current)] | order(publishedAt desc) {
      "year": dateTime(publishedAt) | split("-")[0],
      "month": dateTime(publishedAt) | split("-")[1],
      ${postFields}
    } | group(year) | order(key desc) {
      "year": key,
      "months": items | group(month) | order(key desc) {
        "month": key,
        "posts": items {
          ${postFields}
        }
      }
    }
  }`
}