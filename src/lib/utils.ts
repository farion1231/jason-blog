/**
 * 样式工具函数库
 * 提供样式类名合并和条件样式处理功能
 * 结合 clsx 和 tailwind-merge 实现智能的 CSS 类名合并
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 智能 CSS 类名合并函数
 * 
 * 结合 clsx 和 tailwind-merge 的功能：
 * - clsx: 处理条件样式和多种输入格式
 * - twMerge: 智能合并 Tailwind CSS 类名，避免冲突
 * 
 * @param inputs 可变参数，支持字符串、对象、数组等多种格式的类名
 * @returns 合并和去重后的类名字符串
 * 
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4' (px-4 覆盖 px-2)
 * cn('text-red-500', { 'text-blue-500': isActive }) // 根据条件应用样式
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}