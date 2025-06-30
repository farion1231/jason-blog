'use client'

import Link from 'next/link'
import { useMemo } from 'react'

interface TagCloudProps {
  tags: string[]
  locale: string
  maxSize?: number
  minSize?: number
}

export function TagCloud({ tags, locale, maxSize = 2, minSize = 0.8 }: TagCloudProps) {
  // 计算每个标签的出现次数
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1
    })
    return counts
  }, [tags])

  // 获取唯一标签列表
  const uniqueTags = Object.keys(tagCounts)
  
  // 计算最大和最小出现次数
  const counts = Object.values(tagCounts)
  const maxCount = Math.max(...counts)
  const minCount = Math.min(...counts)
  
  // 计算字体大小
  const getFontSize = (count: number) => {
    if (maxCount === minCount) return 1 // 如果所有标签出现次数相同
    const ratio = (count - minCount) / (maxCount - minCount)
    return minSize + (maxSize - minSize) * ratio
  }

  // 随机排序标签以创建云效果
  const shuffledTags = useMemo(() => {
    return [...uniqueTags].sort(() => Math.random() - 0.5)
  }, [uniqueTags])

  // 生成随机颜色类
  const colorClasses = [
    'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
    'text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300',
    'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
    'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300',
    'text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300',
  ]

  const getColorClass = (index: number) => {
    return colorClasses[index % colorClasses.length]
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-8 
                    bg-gradient-to-br from-gray-50 to-gray-100 
                    dark:from-gray-800 dark:to-gray-900 
                    rounded-2xl">
      {shuffledTags.map((tag, index) => {
        const count = tagCounts[tag]
        const fontSize = getFontSize(count)
        
        return (
          <Link
            key={tag}
            href={`/${locale}/tags/${encodeURIComponent(tag)}`}
            className={`inline-block transition-all duration-300 hover:scale-110 ${getColorClass(index)}`}
            style={{ 
              fontSize: `${fontSize}rem`,
              opacity: 0.7 + (fontSize - minSize) / (maxSize - minSize) * 0.3
            }}
            title={locale === 'zh-CN' ? `${count} 篇文章` : `${count} ${count === 1 ? 'post' : 'posts'}`}
          >
            #{tag}
          </Link>
        )
      })}
    </div>
  )
}