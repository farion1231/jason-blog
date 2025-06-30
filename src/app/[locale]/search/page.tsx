import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { searchPosts } from '@/sanity/lib/fetch'
import { SearchResults } from './SearchResults'

export function generateMetadata({ 
  params, 
  searchParams 
}: { 
  params: { locale: string }
  searchParams: { q?: string }
}): Metadata {
  const query = searchParams.q || ''
  const isZh = params.locale === 'zh-CN'
  
  return {
    title: query 
      ? isZh 
        ? `搜索：${query} - Jason's Blog` 
        : `Search: ${query} - Jason's Blog`
      : isZh
        ? '搜索 - Jason\'s Blog'
        : 'Search - Jason\'s Blog',
    description: isZh
      ? `搜索关于"${query}"的文章`
      : `Search results for "${query}"`,
  }
}

export default async function SearchPage({ 
  params, 
  searchParams 
}: { 
  params: { locale: string }
  searchParams: { q?: string }
}) {
  const locale = params.locale
  const query = searchParams.q || ''

  if (!['zh-CN', 'en'].includes(locale)) {
    notFound()
  }

  let posts = []
  let error = null

  if (query) {
    try {
      posts = await searchPosts(query, locale, {
        next: { revalidate: 60 }
      })
    } catch (err) {
      console.error('Search error:', err)
      error = err
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {locale === 'zh-CN' 
            ? query ? `搜索结果：${query}` : '搜索' 
            : query ? `Search results for: ${query}` : 'Search'
          }
        </h1>
        
        <SearchResults 
          posts={posts} 
          query={query} 
          locale={locale}
          error={error}
        />
      </div>
    </div>
  )
}