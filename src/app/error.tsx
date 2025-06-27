'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { detectLocaleFromUrl } from '@/lib/detectLocale';
import { getTranslations, type Locale } from '@/lib/i18n';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<Locale>('zh-CN');
  
  useEffect(() => {
    console.error(error);
    setLocale(detectLocaleFromUrl());
  }, [error]);

  const t = getTranslations(locale);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t.error.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {t.error.message}
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={reset}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t.error.tryAgain}
              </button>
              <Link
                href={`/${locale}`}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {t.error.goHome}
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}