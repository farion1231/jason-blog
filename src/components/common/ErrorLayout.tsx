'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertCircle, Home, FileQuestion, RefreshCw } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { styles } from '@/styles/constants';

interface ErrorLayoutProps {
  type: 'error' | 'not-found' | 'post-error';
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function ErrorLayout({ type, error, reset }: ErrorLayoutProps) {
  const params = useParams();
  const locale = params.locale as string || 'zh-CN';
  const t = useTranslations();
  
  // 根据错误类型获取相应的配置
  const getConfig = () => {
    switch (type) {
      case 'not-found':
        return {
          icon: <FileQuestion className={`${styles.error.icon} text-gray-300`} />,
          title: t.error.notFound.title,
          message: t.error.notFound.message,
          actions: (
            <Link
              href={`/${locale}`}
              className={styles.button.primary}
            >
              <Home className="h-5 w-5" />
              {t.error.notFound.backToHome}
            </Link>
          )
        };
      case 'post-error':
        return {
          icon: <AlertCircle className={`${styles.error.icon} text-red-300`} />,
          title: t.error.post.title,
          message: t.error.post.message,
          actions: (
            <div className="flex flex-col sm:flex-row gap-4">
              {reset && (
                <button
                  onClick={reset}
                  className={styles.button.primary}
                >
                  <RefreshCw className="h-5 w-5" />
                  {t.error.post.retry}
                </button>
              )}
              <Link
                href={`/${locale}`}
                className={styles.button.secondary}
              >
                <Home className="h-5 w-5" />
                {t.error.post.allPosts}
              </Link>
            </div>
          )
        };
      default: // 'error'
        return {
          icon: <AlertCircle className={`${styles.error.icon} text-yellow-400`} />,
          title: t.error.title,
          message: t.error.message,
          actions: (
            <div className="flex flex-col sm:flex-row gap-4">
              {reset && (
                <button
                  onClick={reset}
                  className={styles.button.primary}
                >
                  <RefreshCw className="h-5 w-5" />
                  {t.error.tryAgain}
                </button>
              )}
              <Link
                href={`/${locale}`}
                className={styles.button.secondary}
              >
                <Home className="h-5 w-5" />
                {t.error.goHome}
              </Link>
            </div>
          )
        };
    }
  };
  
  const config = getConfig();
  
  return (
    <div className={styles.error.container}>
      <div className={styles.error.wrapper}>
        {config.icon}
        <h1 className={styles.error.title}>
          {config.title}
        </h1>
        <p className={styles.error.message}>
          {config.message}
        </p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
              Error details
            </summary>
            <pre className="mt-2 text-xs overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
        {config.actions}
      </div>
    </div>
  );
}