'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { detectLocaleFromUrl } from '@/lib/detectLocale';
import { getTranslations, type Locale } from '@/config/i18n';

export default function RootNotFound() {
  const [locale, setLocale] = useState<Locale>('zh-CN');
  
  useEffect(() => {
    setLocale(detectLocaleFromUrl());
  }, []);

  const t = getTranslations(locale);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
          <div className="text-center space-y-4">
            <div className="text-8xl font-bold text-gray-200 dark:text-gray-700">404</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t.error.notFound.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {t.error.notFound.message}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t.error.notFound.backToHome}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}