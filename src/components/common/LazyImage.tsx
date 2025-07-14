/**
 * 懒加载图片组件
 * 提供图片懒加载、加载状态指示和错误处理功能
 * 基于 Next.js Image 组件构建，支持加载动画和错误回退
 * 使用 React.memo 优化性能，避免不必要的重新渲染
 */
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// 懒加载图片组件属性接口
interface LazyImageProps {
  src: string;           // 图片源地址
  alt: string;           // 无障碍替代文本
  width?: number;        // 图片宽度
  height?: number;       // 图片高度
  className?: string;    // 自定义样式类
  priority?: boolean;    // 是否优先加载
}

/**
 * 懒加载图片主组件
 * 集成了加载状态、错误处理和平滑过渡效果
 */
function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false 
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);  // 图片加载状态
  const [hasError, setHasError] = useState(false);   // 图片加载错误状态

  // 图片加载失败时的错误回退UI
  if (hasError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">图片加载失败</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 加载中的占位符和旋转动画 */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* 实际图片元素 */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}    // 加载完成回调
        onError={() => {                      // 加载错误回调
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}

/**
 * 自定义比较函数
 * 只有当图片源或关键属性发生变化时才重新渲染
 */
function arePropsEqual(prevProps: LazyImageProps, nextProps: LazyImageProps) {
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.className === nextProps.className &&
    prevProps.priority === nextProps.priority
  );
}

// 导出使用 React.memo 优化的组件
export default React.memo(LazyImage, arePropsEqual);