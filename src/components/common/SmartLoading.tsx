/**
 * 智能加载组件
 * 根据当前页面路径自动显示相应的加载文本
 * 支持延迟显示文本和多种加载样式变体
 */
'use client';

import { useParams, usePathname } from 'next/navigation';
import Loading from './Loading';
import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState } from 'react';

// 智能加载组件属性接口
interface SmartLoadingProps {
  variant?: 'spinner' | 'skeleton';  // 加载样式变体
  showTextDelay?: number;            // 显示文本的延迟时间(毫秒)
}

/**
 * 智能加载主组件
 * 自动检测当前页面类型并显示对应的加载提示文本
 */
export default function SmartLoading({ 
  variant = 'spinner',
  showTextDelay = 500 
}: SmartLoadingProps) {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string || 'zh-CN';
  const t = useTranslations();
  const [showText, setShowText] = useState(false); // 控制文本显示的延迟状态
  
  // 设置文本显示延迟，避免加载过快时文本闪烁
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, showTextDelay);
    
    return () => clearTimeout(timer);
  }, [showTextDelay]);
  
  // 根据当前页面路径智能判断加载文本内容
  const getLoadingText = () => {
    // 移除语言前缀，获取实际路径
    const path = pathname.replace(`/${locale}`, '');
    
    // 根据路径匹配对应的加载文本
    if (path.includes('/posts/')) {
      return t.loading.post;                              // 文章详情页
    } else if (path.includes('/about')) {
      return t.loading.about;                             // 关于页面
    } else if (path.includes('/projects')) {
      return t.loading.projects;                          // 项目页面
    } else if (path.includes('/archive')) {
      return t.loading.archive || '正在加载归档...';      // 归档页面
    } else if (path.includes('/tags')) {
      return t.loading.tags || '正在加载标签...';         // 标签页面
    } else if (path === '' || path === '/') {
      return t.loading.posts;                             // 首页文章列表
    }
    
    return t.loading.default || '正在加载...';            // 默认加载文本
  };
  
  return (
    <Loading 
      text={showText ? getLoadingText() : undefined}      // 延迟显示文本
      fullHeight 
      variant={variant}
    />
  );
}