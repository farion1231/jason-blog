'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertCircle, Home, FileQuestion, RefreshCw, Bug } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
          icon: FileQuestion,
          iconColor: 'text-gray-400',
          title: t.error.notFound.title,
          message: t.error.notFound.message,
          gradient: 'from-gray-500 to-gray-600'
        };
      case 'post-error':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-400',
          title: t.error.post.title,
          message: t.error.post.message,
          gradient: 'from-red-500 to-pink-500'
        };
      default: // 'error'
        return {
          icon: AlertCircle,
          iconColor: 'text-yellow-400',
          title: t.error.title,
          message: t.error.message,
          gradient: 'from-yellow-500 to-orange-500'
        };
    }
  };
  
  const config = getConfig();
  const Icon = config.icon;
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="max-w-lg w-full p-8 text-center space-y-6 shadow-xl">
        {/* Icon with gradient background */}
        <div className="relative inline-flex">
          <div className={cn(
            "absolute inset-0 blur-xl opacity-25 rounded-full",
            `bg-gradient-to-r ${config.gradient}`
          )} />
          <div className="relative bg-background rounded-full p-6 shadow-inner">
            <Icon className={cn("h-16 w-16", config.iconColor)} />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {config.title}
        </h1>
        
        {/* Message */}
        <p className="text-muted-foreground max-w-md mx-auto">
          {config.message}
        </p>
        
        {/* Error details in development */}
        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left">
            <summary className="cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Bug className="h-4 w-4" />
              Error details
            </summary>
            <Card className="mt-2 p-4 bg-muted/50 text-xs font-mono overflow-auto max-h-40">
              {error.stack}
            </Card>
          </details>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {type === 'not-found' ? (
            <Button asChild>
              <Link href={`/${locale}`}>
                <Home className="h-4 w-4 mr-2" />
                {t.error.notFound.backToHome}
              </Link>
            </Button>
          ) : (
            <>
              {reset && (
                <Button onClick={reset} variant="default">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {type === 'post-error' ? t.error.post.retry : t.error.tryAgain}
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href={`/${locale}`}>
                  <Home className="h-4 w-4 mr-2" />
                  {type === 'post-error' ? t.error.post.allPosts : t.error.goHome}
                </Link>
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}