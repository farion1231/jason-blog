import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllTags } from '@/sanity/lib/fetch'
import { TagIcon } from '@heroicons/react/24/outline'
import { TagCloud } from '@/components/ui/TagCloud'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isZh = params.locale === 'zh-CN'
  
  return {
    title: isZh ? '所有标签 - Jason\'s Blog' : 'All Tags - Jason\'s Blog',
    description: isZh ? '浏览所有文章标签' : 'Browse all post tags',
  }
}

export default async function TagsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale

  if (!['zh-CN', 'en'].includes(locale)) {
    notFound()
  }

  const isZh = locale === 'zh-CN'
  
  let tags: string[] = []
  let error = null

  try {
    tags = await getAllTags(locale, {
      next: { revalidate: 3600 }
    })
  } catch (err) {
    console.error('Failed to fetch tags:', err)
    error = err
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">
            {isZh ? '获取标签时出错' : 'Error loading tags'}
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-3">
          <TagIcon className="w-8 h-8" />
          {isZh ? '所有标签' : 'All Tags'}
        </h1>

        {tags.length > 0 ? (
          <>
            <div className="mb-12">
              <TagCloud tags={tags} locale={locale} />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {isZh ? '标签列表' : 'Tag List'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {tags.sort().map((tag) => (
                  <Link
                    key={tag}
                    href={`/${locale}/tags/${encodeURIComponent(tag)}`}
                    className="group flex items-center gap-2 p-3 rounded-lg 
                             bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
                             transition-colors duration-200"
                  >
                    <TagIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 
                                      dark:group-hover:text-blue-400 transition-colors" />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 
                                   dark:group-hover:text-blue-400 transition-colors">
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <TagIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {isZh ? '暂无标签' : 'No tags yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}