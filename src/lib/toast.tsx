/**
 * Toast 全局管理器
 * 提供 Toast 的全局状态管理和 API，支持命令式调用
 * 使用 React Context 和自定义 Hook 实现
 */

'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { Toast, ToastContainer, ToastProps, ToastType } from '@/components/ui/toast'

// Toast 数据接口，扩展 ToastProps 添加唯一 ID
interface ToastData extends ToastProps {
  id: string
}

// Toast Context 接口定义
interface ToastContextType {
  toasts: ToastData[]                                    // 当前所有 Toast 列表
  addToast: (toast: Omit<ToastData, 'id'>) => string   // 添加 Toast，返回 ID
  removeToast: (id: string) => void                     // 移除指定 Toast
  clearToasts: () => void                               // 清空所有 Toast
}

// 创建 Toast Context
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Toast Provider 组件属性
interface ToastProviderProps {
  children: React.ReactNode                              // 子组件
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' // Toast 显示位置
  maxToasts?: number                                     // 最大显示数量，0 表示不限制
}

/**
 * Toast Provider 组件
 * 为应用提供 Toast 功能，管理所有 Toast 的状态
 * 需要包裹在应用的根组件
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  position = 'top-right',
  maxToasts = 5 
}) => {
  // Toast 列表状态
  const [toasts, setToasts] = useState<ToastData[]>([])

  // 生成唯一 ID
  const generateId = () => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // 添加 Toast
  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = generateId()
    const newToast: ToastData = { ...toast, id }

    setToasts((prevToasts) => {
      // 如果设置了最大数量限制
      if (maxToasts > 0 && prevToasts.length >= maxToasts) {
        // 移除最早的 Toast
        return [...prevToasts.slice(1), newToast]
      }
      return [...prevToasts, newToast]
    })

    return id
  }, [maxToasts])

  // 移除 Toast
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  // 清空所有 Toast
  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Context 值
  const contextValue: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearToasts
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast 容器 */}
      <ToastContainer position={position}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => {
              // 调用原始的 onClose
              toast.onClose?.()
              // 从列表中移除
              removeToast(toast.id)
            }}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

/**
 * useToast Hook
 * 获取 Toast 相关的方法，用于在组件中显示 Toast
 * 
 * @example
 * const { toast, toasts, clearToasts } = useToast()
 * 
 * // 显示成功通知
 * toast.success('操作成功！')
 * 
 * // 显示错误通知，自定义持续时间
 * toast.error('操作失败', { 
 *   description: '请稍后重试',
 *   duration: 10000 
 * })
 */
export const useToast = () => {
  const context = useContext(ToastContext)

  // 确保在 Provider 内使用
  if (!context) {
    throw new Error('useToast 必须在 ToastProvider 内使用')
  }

  const { toasts, addToast, removeToast, clearToasts } = context

  // 创建便捷方法
  const toast = {
    /**
     * 显示成功通知
     * @param title 标题
     * @param options 其他选项
     */
    success: (title: string, options?: Omit<ToastData, 'id' | 'type' | 'title'>) => {
      return addToast({ ...options, type: 'success', title })
    },

    /**
     * 显示错误通知
     * @param title 标题
     * @param options 其他选项
     */
    error: (title: string, options?: Omit<ToastData, 'id' | 'type' | 'title'>) => {
      return addToast({ ...options, type: 'error', title })
    },

    /**
     * 显示警告通知
     * @param title 标题
     * @param options 其他选项
     */
    warning: (title: string, options?: Omit<ToastData, 'id' | 'type' | 'title'>) => {
      return addToast({ ...options, type: 'warning', title })
    },

    /**
     * 显示信息通知
     * @param title 标题
     * @param options 其他选项
     */
    info: (title: string, options?: Omit<ToastData, 'id' | 'type' | 'title'>) => {
      return addToast({ ...options, type: 'info', title })
    },

    /**
     * 显示自定义通知
     * @param options 完整的 Toast 选项
     */
    custom: (options: Omit<ToastData, 'id'>) => {
      return addToast(options)
    },

    /**
     * 移除指定 Toast
     * @param id Toast ID
     */
    remove: removeToast
  }

  return {
    toast,
    toasts,
    clearToasts
  }
}

/**
 * 命令式 Toast API
 * 允许在组件外部调用 Toast，需要先设置 toast 实例
 * 
 * @example
 * // 在应用入口设置
 * import { toast } from '@/lib/toast'
 * 
 * function App() {
 *   const { toast: toastInstance } = useToast()
 *   
 *   useEffect(() => {
 *     setToastInstance(toastInstance)
 *   }, [toastInstance])
 * }
 * 
 * // 在任何地方使用
 * import { toast } from '@/lib/toast'
 * toast.success('操作成功！')
 */
let toastInstance: ReturnType<typeof useToast>['toast'] | null = null

export const setToastInstance = (instance: ReturnType<typeof useToast>['toast']) => {
  toastInstance = instance
}

export const toast = {
  success: (...args: Parameters<ReturnType<typeof useToast>['toast']['success']>) => {
    if (!toastInstance) {
      console.warn('Toast 实例未初始化，请先调用 setToastInstance')
      return ''
    }
    return toastInstance.success(...args)
  },
  error: (...args: Parameters<ReturnType<typeof useToast>['toast']['error']>) => {
    if (!toastInstance) {
      console.warn('Toast 实例未初始化，请先调用 setToastInstance')
      return ''
    }
    return toastInstance.error(...args)
  },
  warning: (...args: Parameters<ReturnType<typeof useToast>['toast']['warning']>) => {
    if (!toastInstance) {
      console.warn('Toast 实例未初始化，请先调用 setToastInstance')
      return ''
    }
    return toastInstance.warning(...args)
  },
  info: (...args: Parameters<ReturnType<typeof useToast>['toast']['info']>) => {
    if (!toastInstance) {
      console.warn('Toast 实例未初始化，请先调用 setToastInstance')
      return ''
    }
    return toastInstance.info(...args)
  },
  custom: (...args: Parameters<ReturnType<typeof useToast>['toast']['custom']>) => {
    if (!toastInstance) {
      console.warn('Toast 实例未初始化，请先调用 setToastInstance')
      return ''
    }
    return toastInstance.custom(...args)
  },
  remove: (...args: Parameters<ReturnType<typeof useToast>['toast']['remove']>) => {
    if (!toastInstance) {
      console.warn('Toast 实例未初始化，请先调用 setToastInstance')
      return
    }
    return toastInstance.remove(...args)
  }
}