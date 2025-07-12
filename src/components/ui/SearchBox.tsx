'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { getSearchSuggestions } from '@/sanity/lib/fetch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchSuggestion {
  title: string
  slug: {
    current: string
  }
}

interface SearchInputProps {
  query: string
  onQueryChange: (value: string) => void
  onFocus: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onSubmit: (e: React.FormEvent) => void
  onClear: () => void
  placeholder: string
  inputRef: React.RefObject<HTMLInputElement>
}

function SearchInput({ 
  query, 
  onQueryChange, 
  onFocus, 
  onKeyDown, 
  onSubmit, 
  onClear, 
  placeholder,
  inputRef 
}: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="pl-10 pr-10 rounded-full"
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </form>
  )
}

interface SearchResultsProps {
  suggestions: SearchSuggestion[]
  selectedIndex: number
  isLoading: boolean
  query: string
  locale: string
  onItemClick: (slug: string) => void
  onViewAll: () => void
}

function SearchResults({ 
  suggestions, 
  selectedIndex, 
  isLoading, 
  query, 
  locale,
  onItemClick,
  onViewAll
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        {locale === 'zh-CN' ? '搜索中...' : 'Searching...'}
      </div>
    )
  }

  if (suggestions.length === 0) {
    return (
      <div className="px-4 py-3">
        <p className="text-sm text-muted-foreground">
          {locale === 'zh-CN' ? '没有找到相关文章' : 'No posts found'}
        </p>
        <Button
          variant="link"
          size="sm"
          onClick={onViewAll}
          className="mt-2 h-auto p-0 text-primary"
        >
          {locale === 'zh-CN' ? `搜索"${query}"` : `Search for "${query}"`}
        </Button>
      </div>
    )
  }

  return (
    <ul className="py-2">
      {suggestions.map((suggestion, index) => (
        <li key={suggestion.slug.current}>
          <button
            onClick={() => onItemClick(suggestion.slug.current)}
            className={cn(
              "w-full text-left px-4 py-2 text-sm transition-colors",
              index === selectedIndex 
                ? "bg-accent text-accent-foreground" 
                : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {suggestion.title}
          </button>
        </li>
      ))}
      <li className="border-t">
        <button
          onClick={onViewAll}
          className={cn(
            "w-full text-left px-4 py-2 text-sm font-medium transition-colors",
            selectedIndex === suggestions.length 
              ? "bg-accent text-accent-foreground" 
              : "text-primary hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {locale === 'zh-CN' 
            ? `查看所有"${query}"的搜索结果` 
            : `View all results for "${query}"`
          }
        </button>
      </li>
    </ul>
  )
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
        navigateToPost(suggestions[selectedIndex].slug.current)
      } else if (query.trim()) {
        navigateToSearch()
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }, [suggestions, selectedIndex, query])

  const navigateToPost = (slug: string) => {
    router.push(`/${locale}/posts/${slug}`)
    setIsOpen(false)
    setQuery('')
  }

  const navigateToSearch = () => {
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigateToSearch()
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <SearchInput
        query={query}
        onQueryChange={handleQueryChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        onClear={clearSearch}
        placeholder={locale === 'zh-CN' ? '搜索文章...' : 'Search posts...'}
        inputRef={inputRef}
      />

      {/* 搜索建议下拉框 */}
      {isOpen && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-background rounded-xl shadow-lg border overflow-hidden">
          <SearchResults
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            isLoading={isLoading}
            query={query}
            locale={locale}
            onItemClick={navigateToPost}
            onViewAll={navigateToSearch}
          />
        </div>
      )}
    </div>
  )
}