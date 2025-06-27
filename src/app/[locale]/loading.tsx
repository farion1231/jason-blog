import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <LoadingSpinner />
      <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
}