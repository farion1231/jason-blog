import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 w-3/4"></div>
      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
      <LoadingSpinner />
    </article>
  );
}