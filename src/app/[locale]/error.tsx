'use client';

import ErrorLayout from '@/components/common/ErrorLayout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorLayout type="error" error={error} reset={reset} />;
}