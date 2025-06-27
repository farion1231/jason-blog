import LoadingSpinner from '@/components/LoadingSpinner';

export default function RootLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoadingSpinner />
      <p className="mt-4 text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
}