import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullHeight?: boolean;
  variant?: 'spinner' | 'skeleton';
}

export default function Loading({ 
  size = 'md', 
  text, 
  fullHeight = false,
  variant = 'spinner'
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const containerHeight = fullHeight ? 'min-h-screen' : 'min-h-[200px]';

  if (variant === 'skeleton') {
    return (
      <div className={cn('flex flex-col gap-4', containerHeight, 'p-6')}>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${containerHeight} gap-4`}>
      <div className="relative">
        <div className={cn(
          'animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700',
          sizeClasses[size]
        )}></div>
        <div className={cn(
          'absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent',
          'border-t-gradient-to-r from-blue-500 to-pink-500',
          sizeClasses[size]
        )}
        style={{
          borderTopColor: 'transparent',
          background: 'linear-gradient(to right, #3B82F6, #EC4899)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'exclude',
          maskComposite: 'exclude',
          padding: '4px',
          borderRadius: '50%'
        }}
        ></div>
      </div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}