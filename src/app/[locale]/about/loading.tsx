import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-pulse">
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 w-48 mx-auto"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
      <LoadingSpinner />
    </div>
  );
}