'use client';

import { useParams, usePathname } from 'next/navigation';
import Loading from './Loading';
import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState } from 'react';

interface SmartLoadingProps {
  variant?: 'spinner' | 'skeleton';
  showTextDelay?: number;
}

export default function SmartLoading({ 
  variant = 'spinner',
  showTextDelay = 500 
}: SmartLoadingProps) {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string || 'zh-CN';
  const t = useTranslations();
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, showTextDelay);
    
    return () => clearTimeout(timer);
  }, [showTextDelay]);
  
  // 根据路径判断加载文本
  const getLoadingText = () => {
    const path = pathname.replace(`/${locale}`, '');
    
    if (path.includes('/posts/')) {
      return t.loading.post;
    } else if (path.includes('/about')) {
      return t.loading.about;
    } else if (path.includes('/projects')) {
      return t.loading.projects;
    } else if (path.includes('/archive')) {
      return t.loading.archive || '正在加载归档...';
    } else if (path.includes('/tags')) {
      return t.loading.tags || '正在加载标签...';
    } else if (path === '' || path === '/') {
      return t.loading.posts;
    }
    
    return t.loading.default || '正在加载...';
  };
  
  return (
    <Loading 
      text={showText ? getLoadingText() : undefined} 
      fullHeight 
      variant={variant}
    />
  );
}