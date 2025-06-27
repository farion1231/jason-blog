import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 w-48"></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LoadingSpinner />
    </div>
  );
}