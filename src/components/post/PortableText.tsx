/**
 * Portable Text 渲染组件
 * 用于渲染 Sanity CMS 的结构化内容（Portable Text 格式）
 * 支持自定义组件映射，包括图片等富媒体内容
 */
import React from 'react'
import { PortableText as BasePortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react'
import PortableTextImage from './PortableTextImage'

// 自定义组件映射配置
// 将 Portable Text 中的特定类型映射到自定义 React 组件
const components: PortableTextComponents = {
  types: {
    image: PortableTextImage,  // 图片类型使用自定义图片组件
  },
}

/**
 * Portable Text 主渲染组件
 * 接收 Sanity CMS 的 Portable Text 数据并渲染为 React 元素
 */
export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <BasePortableText value={value} components={components} />
}