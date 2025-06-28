'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTranslations, type Locale } from '@/config/i18n';

export default function NotFound() {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = getTranslations(locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
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
  );
}