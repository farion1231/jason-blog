/**
 * 搜索结果组件
 * 展示搜索表单和搜索结果，支持关键词高亮显示
 * 包含搜索输入框、结果列表和空状态提示
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { highlightText } from '@/utils/highlightText'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  description: string
  publishedAt: string
  readingTime?: number
  tags?: string[]
  highlights?: {
    content?: string
  }
}

interface SearchResultsProps {
  posts: Post[]
  query: string
  locale: string
  error?: unknown
}

export function SearchResults({ posts, query, locale, error }: SearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400 mb-4">
          {locale === 'zh-CN' 
            ? '搜索时出现错误，请稍后再试。' 
            : 'An error occurred while searching. Please try again later.'
          }
        </p>
        <Link 
          href={`/${locale}/`}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {locale === 'zh-CN' ? '返回首页' : 'Go back home'}
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* 搜索表单 */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'zh-CN' ? '搜索文章...' : 'Search posts...'}
            className="w-full px-12 py-3 text-lg rounded-full border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-500 text-white 
                     rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            {locale === 'zh-CN' ? '搜索' : 'Search'}
          </button>
        </div>
      </form>

      {/* 搜索结果 */}
      {query && (
        <div>
          {posts.length > 0 ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {locale === 'zh-CN' 
                  ? `找到 ${posts.length} 篇相关文章` 
                  : `Found ${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`
                }
              </p>
              <div className="grid gap-6">
                {posts.map((post) => (
                  <div key={post._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <Link href={`/${locale}/posts/${post.slug.current}`}>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 
                                   hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                        {highlightText(post.title, query)}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {highlightText(post.description, query)}
                    </p>
                    {post.highlights?.content && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 italic">
                        ...{post.highlights.content}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <time>{new Date(post.publishedAt).toLocaleDateString(locale)}</time>
                      {post.readingTime && (
                        <span>{locale === 'zh-CN' ? `${post.readingTime} 分钟阅读` : `${post.readingTime} min read`}</span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/${locale}/tags/${tag}`}
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 
                                       dark:hover:text-blue-300 transition-colors"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {locale === 'zh-CN' 
                  ? `没有找到关于"${query}"的文章` 
                  : `No posts found for "${query}"`
                }
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                {locale === 'zh-CN' 
                  ? '试试其他关键词或浏览所有文章' 
                  : 'Try different keywords or browse all posts'
                }
              </p>
              <Link 
                href={`/${locale}/`}
                className="inline-block mt-4 text-blue-500 hover:text-blue-600 
                         dark:text-blue-400 dark:hover:text-blue-300"
              >
                {locale === 'zh-CN' ? '浏览所有文章' : 'Browse all posts'}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* 未输入搜索词 */}
      {!query && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'zh-CN' 
              ? '输入关键词开始搜索' 
              : 'Enter keywords to start searching'
            }
          </p>
        </div>
      )}
    </div>
  )
}