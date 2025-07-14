/**
 * 归档页面组件
 * 按年份和月份展示所有文章，提供时间线式的浏览体验
 * 支持中英文切换，展示文章标题、发布时间、阅读时长和标签
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByYear } from '@/sanity/lib/fetch'
import { Calendar, Clock } from 'lucide-react'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isZh = params.locale === 'zh-CN'
  
  return {
    title: isZh ? '文章归档 - Jason\'s Blog' : 'Archive - Jason\'s Blog',
    description: isZh ? '按时间顺序浏览所有文章' : 'Browse all posts by date',
  }
}

interface YearGroup {
  year: string
  months: {
    month: string
    posts: {
      _id: string
      title: string
      slug: { current: string }
      publishedAt: string
      readingTime: number
      tags: string[]
    }[]
  }[]
}

export default async function ArchivePage({ params }: { params: { locale: string } }) {
  const locale = params.locale

  if (!['zh-CN', 'en'].includes(locale)) {
    notFound()
  }

  const isZh = locale === 'zh-CN'
  
  let archiveData: { years: YearGroup[] } | null = null
  let error = null

  try {
    archiveData = await getPostsByYear(locale, {
      next: { revalidate: 3600 }
    })
  } catch (err) {
    console.error('Failed to fetch archive data:', err)
    error = err
  }

  if (error || !archiveData) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">
            {isZh ? '获取归档数据时出错' : 'Error loading archive data'}
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

  const monthNames = isZh 
    ? ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-3">
          <Calendar className="w-8 h-8" />
          {isZh ? '文章归档' : 'Archive'}
        </h1>

        {archiveData.years && archiveData.years.length > 0 ? (
          <div className="space-y-12">
            {archiveData.years.map((yearGroup) => (
              <div key={yearGroup.year}>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 
                             sticky top-20 bg-white dark:bg-gray-900 py-2 z-10">
                  {yearGroup.year} {isZh ? '年' : ''}
                </h2>
                
                <div className="space-y-8">
                  {yearGroup.months.map((monthGroup) => (
                    <div key={`${yearGroup.year}-${monthGroup.month}`}>
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 
                                   flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {monthNames[parseInt(monthGroup.month) - 1]}
                      </h3>
                      
                      <div className="space-y-3 ml-6">
                        {monthGroup.posts.map((post) => (
                          <article 
                            key={post._id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between 
                                     p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
                                     transition-colors duration-200"
                          >
                            <div className="flex-1">
                              <Link 
                                href={`/${locale}/posts/${post.slug.current}`}
                                className="group"
                              >
                                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 
                                             group-hover:text-blue-500 dark:group-hover:text-blue-400 
                                             transition-colors mb-1">
                                  {post.title}
                                </h4>
                              </Link>
                              
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <time className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(post.publishedAt).toLocaleDateString(locale)}
                                </time>
                                
                                {post.readingTime && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {isZh ? `${post.readingTime} 分钟` : `${post.readingTime} min`}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Link
                                    key={tag}
                                    href={`/${locale}/tags/${tag}`}
                                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 
                                             text-gray-600 dark:text-gray-400 rounded-full
                                             hover:bg-blue-100 hover:text-blue-600 
                                             dark:hover:bg-blue-900 dark:hover:text-blue-400
                                             transition-colors"
                                  >
                                    #{tag}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {isZh ? '暂无文章' : 'No posts yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}