'use client';

import ErrorLayout from '@/components/common/ErrorLayout';

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorLayout type="post-error" error={error} reset={reset} />;
}