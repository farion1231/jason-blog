'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTranslations, type Locale } from '@/config/i18n';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = getTranslations(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t.error.post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {t.error.post.message}
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t.error.post.retry}
          </button>
          <Link
            href={`/${locale}`}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {t.error.post.allPosts}
          </Link>
        </div>
      </div>
    </div>
  );
}