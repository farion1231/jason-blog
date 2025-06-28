'use client';

import { Suspense, lazy } from 'react';
import Loading from './Loading';

// 创建懒加载组件的通用包装器
export function createLazyComponent<P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  loadingText?: string
) {
  const LazyComponent = lazy(importFn);
  
  return function WrappedLazyComponent(props: P) {
    return (
      <Suspense fallback={<Loading size="sm" text={loadingText} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// 预定义的懒加载组件
export const LazyPagination = createLazyComponent(
  () => import('./Pagination'),
  '正在加载分页...'
);

export const LazyPortableText = createLazyComponent(
  () => import('../post/PortableText'),
  '正在加载内容...'
);