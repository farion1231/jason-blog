'use client';

import { useParams, usePathname } from 'next/navigation';
import Loading from './Loading';
import { useTranslations } from '@/hooks/useTranslations';

export default function SmartLoading() {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string || 'zh-CN';
  const t = useTranslations();
  
  // 根据路径判断加载文本
  const getLoadingText = () => {
    const path = pathname.replace(`/${locale}`, '');
    
    if (path.includes('/posts/')) {
      return t.loading.post;
    } else if (path.includes('/about')) {
      return t.loading.about;
    } else if (path.includes('/projects')) {
      return t.loading.projects;
    } else if (path === '' || path === '/') {
      return t.loading.posts;
    }
    
    return t.loading.default || '正在加载...';
  };
  
  return <Loading text={getLoadingText()} fullHeight />;
}