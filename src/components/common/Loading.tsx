interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullHeight?: boolean;
}

export default function Loading({ 
  size = 'md', 
  text, 
  fullHeight = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const containerHeight = fullHeight ? 'min-h-screen' : 'min-h-[200px]';

  return (
    <div className={`flex flex-col items-center justify-center ${containerHeight} gap-4`}>
      <div className="relative">
        <div className={`animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 ${sizeClasses[size]}`}></div>
        <div className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 ${sizeClasses[size]}`}></div>
      </div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}