'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDebounce } from '@/hooks/useDebounce'
import { getSearchSuggestions } from '@/sanity/lib/fetch'

interface SearchSuggestion {
  title: string
  slug: {
    current: string
  }
}

export function SearchBox() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  // 获取搜索建议
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      setIsLoading(true)
      try {
        const results = await getSearchSuggestions(debouncedQuery, locale, {
          cache: 'no-store'
        })
        setSuggestions(results || [])
      } catch (error) {
        console.error('Failed to fetch suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSuggestions()
  }, [debouncedQuery, locale])

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        router.push(`/${locale}/posts/${suggestions[selectedIndex].slug.current}`)
        setIsOpen(false)
        setQuery('')
      } else if (query.trim()) {
        router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`)
        setIsOpen(false)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }, [suggestions, selectedIndex, query, locale, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
              setSelectedIndex(-1)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={locale === 'zh-CN' ? '搜索文章...' : 'Search posts...'}
            className="w-full px-10 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </form>

      {/* 搜索建议下拉框 */}
      {isOpen && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                      border border-gray-200 dark:border-gray-700 overflow-hidden">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              {locale === 'zh-CN' ? '搜索中...' : 'Searching...'}
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li key={suggestion.slug.current}>
                  <button
                    onClick={() => {
                      router.push(`/${locale}/posts/${suggestion.slug.current}`)
                      setIsOpen(false)
                      setQuery('')
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors
                              ${index === selectedIndex 
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                  >
                    {suggestion.title}
                  </button>
                </li>
              ))}
              <li className="border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSearch}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors
                            ${selectedIndex === suggestions.length 
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                              : 'text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                >
                  {locale === 'zh-CN' 
                    ? `查看所有"${query}"的搜索结果` 
                    : `View all results for "${query}"`
                  }
                </button>
              </li>
            </ul>
          ) : (
            <div className="px-4 py-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {locale === 'zh-CN' ? '没有找到相关文章' : 'No posts found'}
              </p>
              <button
                onClick={handleSearch}
                className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {locale === 'zh-CN' 
                  ? `搜索"${query}"` 
                  : `Search for "${query}"`
                }
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}