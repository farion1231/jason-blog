/**
 * Toast 通知组件
 * 用于显示临时的通知消息，支持多种类型（success、error、warning、info）
 * 采用小清新风格设计，自动消失，支持手动关闭
 */

'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react'

// Toast 类型定义
export type ToastType = 'success' | 'error' | 'warning' | 'info'

// Toast 组件属性接口
export interface ToastProps {
  id?: string                     // 唯一标识符
  type?: ToastType               // 通知类型
  title?: string                 // 标题
  description?: string           // 描述内容
  duration?: number              // 显示时长（毫秒），0 表示不自动关闭
  onClose?: () => void          // 关闭回调函数
  className?: string            // 自定义样式类名
}

// 图标映射配置
const iconMap = {
  success: <Check className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />
}

// 样式映射配置
const styleMap = {
  success: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800'
}

// 图标颜色映射
const iconColorMap = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400'
}

/**
 * Toast 通知组件
 * 显示临时的通知消息，支持自动消失和手动关闭
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    type = 'info', 
    title, 
    description, 
    duration = 5000, 
    onClose,
    className,
    ...props 
  }, ref) => {
    // 控制 Toast 显示状态
    const [isVisible, setIsVisible] = useState(true)
    // 控制进入/退出动画
    const [isLeaving, setIsLeaving] = useState(false)

    // 处理关闭动作
    const handleClose = () => {
      // 先触发退出动画
      setIsLeaving(true)
      // 动画结束后隐藏组件并调用回调
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 200)
    }

    // 自动关闭逻辑
    useEffect(() => {
      // 如果 duration 为 0，则不自动关闭
      if (duration === 0) return

      // 设置定时器自动关闭
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      // 清理定时器
      return () => clearTimeout(timer)
    }, [duration])

    // 如果不可见，不渲染组件
    if (!isVisible) return null

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          // 基础样式
          'relative flex items-start gap-3 p-4 rounded-xl border shadow-sm',
          // 过渡动画
          'transition-all duration-200 ease-in-out',
          // 进入动画
          !isLeaving && 'animate-in fade-in slide-in-from-top-2',
          // 退出动画
          isLeaving && 'animate-out fade-out slide-out-to-top-2',
          // 类型样式
          styleMap[type],
          className
        )}
        {...props}
      >
        {/* 图标区域 */}
        <div className={cn('flex-shrink-0', iconColorMap[type])}>
          {iconMap[type]}
        </div>

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          {/* 标题 */}
          {title && (
            <h3 className="font-medium text-sm mb-1">
              {title}
            </h3>
          )}
          {/* 描述内容 */}
          {description && (
            <p className="text-sm opacity-90">
              {description}
            </p>
          )}
        </div>

        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'flex-shrink-0 p-1 rounded-lg',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            type === 'success' && 'focus:ring-green-500',
            type === 'error' && 'focus:ring-red-500',
            type === 'warning' && 'focus:ring-yellow-500',
            type === 'info' && 'focus:ring-blue-500'
          )}
          aria-label="关闭通知"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
)

Toast.displayName = 'Toast'

/**
 * ToastContainer 组件
 * 用于包裹多个 Toast，提供定位和层叠样式
 */
export interface ToastContainerProps {
  children?: React.ReactNode     // Toast 子组件
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' // 定位
  className?: string            // 自定义样式类名
}

/**
 * Toast 容器组件
 * 管理多个 Toast 的显示位置和层叠顺序
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = 'top-right',
  className
}) => {
  // 位置样式映射
  const positionMap = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  }

  return (
    <div
      className={cn(
        'fixed z-50',
        'flex flex-col gap-2',
        'max-w-sm w-full',
        positionMap[position],
        className
      )}
    >
      {children}
    </div>
  )
}