/**
 * 标签详情页面
 * 展示特定标签下的所有文章列表
 * 支持中英文切换，显示文章标题、描述、发布时间和标签
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByTag } from '@/sanity/lib/fetch'
import { Tag } from 'lucide-react'

export function generateMetadata({ 
  params 
}: { 
  params: { locale: string, tag: string } 
}): Metadata {
  const isZh = params.locale === 'zh-CN'
  const decodedTag = decodeURIComponent(params.tag)
  
  return {
    title: isZh 
      ? `标签：${decodedTag} - Jason's Blog` 
      : `Tag: ${decodedTag} - Jason's Blog`,
    description: isZh
      ? `浏览所有标记为"${decodedTag}"的文章`
      : `Browse all posts tagged with "${decodedTag}"`,
  }
}

export default async function TagPage({ 
  params 
}: { 
  params: { locale: string, tag: string } 
}) {
  const locale = params.locale
  const tag = decodeURIComponent(params.tag)

  if (!['zh-CN', 'en'].includes(locale)) {
    notFound()
  }

  const isZh = locale === 'zh-CN'
  
  let posts = []
  let error = null

  try {
    posts = await getPostsByTag(tag, locale, {
      next: { revalidate: 3600 }
    })
  } catch (err) {
    console.error('Failed to fetch posts by tag:', err)
    error = err
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">
            {isZh ? '获取文章时出错' : 'Error loading posts'}
          </p>
          <Link 
            href={`/${locale}/`}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isZh ? '返回首页' : 'Go back home'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
            <Tag className="w-8 h-8" />
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              #{tag}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {posts.length > 0
              ? isZh 
                ? `找到 ${posts.length} 篇相关文章` 
                : `Found ${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`
              : isZh
                ? '暂无相关文章'
                : 'No posts found'
            }
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article 
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md 
                         transition-shadow duration-300 overflow-hidden"
              >
                <Link href={`/${locale}/posts/${post.slug.current}`}>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 
                                 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-500">
                        <time>{new Date(post.publishedAt).toLocaleDateString(locale)}</time>
                        {post.readingTime && (
                          <span>{isZh ? `${post.readingTime} 分钟阅读` : `${post.readingTime} min read`}</span>
                        )}
                      </div>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2">
                          {post.tags.map((postTag: string) => (
                            <span
                              key={postTag}
                              className={`text-xs px-2 py-1 rounded-full ${
                                postTag === tag
                                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                              }`}
                            >
                              #{postTag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Tag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isZh 
                ? `暂无标记为"${tag}"的文章` 
                : `No posts tagged with "${tag}" yet`
              }
            </p>
            <Link 
              href={`/${locale}/`}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {isZh ? '浏览所有文章' : 'Browse all posts'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}