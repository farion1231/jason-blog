/**
 * 防抖 Hook
 * 延迟更新值，避免频繁触发，常用于搜索输入、API调用等场景
 * 在指定延迟时间内，如果值再次改变，则重新计时
 */
import { useEffect, useState } from 'react'

/**
 * 防抖Hook主函数
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖处理后的值
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 设置定时器，延迟更新防抖值
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 清理函数：在值再次改变或组件卸载时清除定时器
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // 依赖值或延迟时间改变时重新执行

  return debouncedValue
}