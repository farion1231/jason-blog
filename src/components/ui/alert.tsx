/**
 * Alert 警告提示组件
 * 用于显示重要的提示信息，支持多种类型（success、error、warning、info）
 * 采用小清新风格设计，支持标题、描述和自定义操作
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check, AlertCircle, Info, AlertTriangle } from 'lucide-react'

// Alert 类型定义
export type AlertType = 'success' | 'error' | 'warning' | 'info'

// Alert 组件属性接口
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType               // 警告类型
  title?: string                 // 标题
  description?: string           // 描述内容
  icon?: React.ReactNode        // 自定义图标
  action?: React.ReactNode      // 操作按钮或链接
  closable?: boolean            // 是否可关闭
  onClose?: () => void         // 关闭回调
}

// 默认图标映射
const defaultIconMap = {
  success: <Check className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />
}

// 样式映射配置
const styleMap = {
  success: {
    container: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-100',
    description: 'text-green-800 dark:text-green-200'
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-100',
    description: 'text-red-800 dark:text-red-200'
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-100',
    description: 'text-yellow-800 dark:text-yellow-200'
  },
  info: {
    container: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100',
    description: 'text-blue-800 dark:text-blue-200'
  }
}

/**
 * Alert 警告提示组件
 * 显示静态的提示信息，适用于页面内的重要提示
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    type = 'info',
    title,
    description,
    icon,
    action,
    closable = false,
    onClose,
    className,
    children,
    ...props 
  }, ref) => {
    // 获取对应类型的样式
    const styles = styleMap[type]
    
    // 使用自定义图标或默认图标
    const displayIcon = icon || defaultIconMap[type]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          // 基础样式
          'relative flex gap-3 p-4 rounded-xl border',
          // 背景和边框
          styles.container,
          // 过渡效果
          'transition-all duration-200',
          className
        )}
        {...props}
      >
        {/* 图标区域 */}
        {displayIcon && (
          <div className={cn('flex-shrink-0', styles.icon)}>
            {displayIcon}
          </div>
        )}

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          {/* 标题 */}
          {title && (
            <h3 className={cn(
              'font-medium text-sm mb-1',
              styles.title
            )}>
              {title}
            </h3>
          )}
          
          {/* 描述内容 */}
          {description && (
            <div className={cn(
              'text-sm',
              styles.description
            )}>
              {description}
            </div>
          )}
          
          {/* 自定义内容 */}
          {children && (
            <div className={cn(
              'text-sm mt-2',
              styles.description
            )}>
              {children}
            </div>
          )}
          
          {/* 操作区域 */}
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>

        {/* 关闭按钮 */}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4',
              'p-1 rounded-lg',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              type === 'success' && 'focus:ring-green-500',
              type === 'error' && 'focus:ring-red-500',
              type === 'warning' && 'focus:ring-yellow-500',
              type === 'info' && 'focus:ring-blue-500'
            )}
            aria-label="关闭警告"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

/**
 * AlertDialog 组件
 * 带有标题和详细内容的警告对话框样式
 */
export interface AlertDialogProps extends AlertProps {
  footer?: React.ReactNode      // 底部内容
}

/**
 * AlertDialog 警告对话框组件
 * 更复杂的警告提示，支持标题、内容和底部操作区域
 */
export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ 
    type = 'info',
    title,
    description,
    icon,
    footer,
    className,
    children,
    ...props 
  }, ref) => {
    // 获取对应类型的样式
    const styles = styleMap[type]
    
    // 使用自定义图标或默认图标
    const displayIcon = icon || defaultIconMap[type]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          // 基础样式
          'rounded-xl border overflow-hidden',
          // 背景和边框
          styles.container,
          // 阴影效果
          'shadow-sm',
          className
        )}
        {...props}
      >
        {/* 头部区域 */}
        {(title || displayIcon) && (
          <div className="flex items-center gap-3 px-4 py-3 border-b border-inherit">
            {/* 图标 */}
            {displayIcon && (
              <div className={cn('flex-shrink-0', styles.icon)}>
                {displayIcon}
              </div>
            )}
            {/* 标题 */}
            {title && (
              <h3 className={cn(
                'font-medium text-base',
                styles.title
              )}>
                {title}
              </h3>
            )}
          </div>
        )}

        {/* 内容区域 */}
        <div className="px-4 py-3">
          {/* 描述内容 */}
          {description && (
            <div className={cn(
              'text-sm',
              styles.description
            )}>
              {description}
            </div>
          )}
          
          {/* 自定义内容 */}
          {children && (
            <div className={cn(
              'text-sm',
              description && 'mt-2',
              styles.description
            )}>
              {children}
            </div>
          )}
        </div>

        {/* 底部区域 */}
        {footer && (
          <div className="px-4 py-3 border-t border-inherit bg-gray-50/50 dark:bg-gray-900/20">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

AlertDialog.displayName = 'AlertDialog'