'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface TagCloudProps {
  tags: string[]
  locale: string
  maxSize?: number
  minSize?: number
  interactive?: boolean
}

export function TagCloud({ 
  tags, 
  locale, 
  maxSize = 2, 
  minSize = 0.8,
  interactive = true 
}: TagCloudProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  // 计算每个标签的出现次数
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1
    })
    return counts
  }, [tags])

  // 获取唯一标签列表并按出现次数排序
  const sortedTags = useMemo(() => {
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
  }, [tagCounts])
  
  // 计算最大和最小出现次数
  const counts = Object.values(tagCounts)
  const maxCount = Math.max(...counts)
  const minCount = Math.min(...counts)
  
  // 计算字体大小
  const getFontSize = (count: number) => {
    if (maxCount === minCount) return 1
    const ratio = (count - minCount) / (maxCount - minCount)
    return minSize + (maxSize - minSize) * ratio
  }

  // Badge 变体映射
  const getVariant = (count: number): 'default' | 'secondary' | 'outline' => {
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio > 0.7) return 'default'
    if (ratio > 0.3) return 'secondary'
    return 'outline'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-center items-center p-8 
                      bg-gradient-to-br from-gray-50 to-gray-100 
                      dark:from-gray-800 dark:to-gray-900 
                      rounded-2xl">
        {sortedTags.map((tag) => {
          const count = tagCounts[tag]
          const fontSize = getFontSize(count)
          const isSelected = selectedTag === tag
          
          return (
            <Link
              key={tag}
              href={`/${locale}/tags/${encodeURIComponent(tag)}`}
              onClick={interactive ? (e) => {
                if (e.metaKey || e.ctrlKey) return
                e.preventDefault()
                setSelectedTag(isSelected ? null : tag)
              } : undefined}
              className="transition-all duration-300 hover:scale-105"
              style={{ fontSize: `${fontSize}rem` }}
            >
              <Badge
                variant={getVariant(count)}
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  "hover:shadow-lg hover:shadow-primary/20",
                  isSelected && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <span className="mr-1">#</span>
                {tag}
                <span className="ml-2 text-xs opacity-70">
                  {count}
                </span>
              </Badge>
            </Link>
          )
        })}
      </div>
      
      {interactive && selectedTag && (
        <div className="text-center text-sm text-muted-foreground animate-in fade-in-50">
          <p>
            {locale === 'zh-CN' 
              ? `点击查看所有带有 "${selectedTag}" 标签的文章`
              : `Click to view all posts tagged with "${selectedTag}"`
            }
          </p>
          <Link 
            href={`/${locale}/tags/${encodeURIComponent(selectedTag)}`}
            className="text-primary hover:underline"
          >
            {locale === 'zh-CN' ? '查看文章 →' : 'View posts →'}
          </Link>
        </div>
      )}
    </div>
  )
}