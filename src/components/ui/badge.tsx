/**
 * Badge 徽章组件
 * 用于显示标签、状态或分类信息的小型标识
 * 支持多种变体样式，包括默认、次要、轮廓和渐变效果
 * 使用 React.memo 优化性能，避免在大量使用时重复渲染
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 样式变体定义
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-primary/10 text-primary hover:bg-primary/20',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        gradient:
          'bg-gradient-to-r from-blue-500/10 to-pink-500/10 text-primary border border-primary/20 hover:from-blue-500/20 hover:to-pink-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Badge 组件属性接口
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge 徽章组件实现
 * 一个轻量级的纯展示组件，适合使用 React.memo 优化
 * @param className - 自定义样式类名
 * @param variant - 徽章变体类型
 * @param props - 其他 HTML div 属性
 */
const Badge = React.memo(function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
})

// 设置显示名称以便调试
Badge.displayName = 'Badge'

export { Badge, badgeVariants }