'use client';

import { usePathname } from "next/navigation";
import { getTranslations, type Locale } from '@/config/i18n';

export function FooterComponent() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] as Locale;
  const locale = ['zh-CN', 'en'].includes(currentLocale) ? currentLocale : 'zh-CN';
  const t = getTranslations(locale);

  return (
    <footer className="glass-subtle border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-6">
            <a 
              href="/rss.xml" 
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
              aria-label={t.footer.rss}
            >
              <svg 
                className="w-4 h-4" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M3.5 3.5C9.4 3.5 14.5 8.6 14.5 14.5h2C16.5 7.6 10.4 1.5 3.5 1.5v2zm0 4C7.2 7.5 10.5 10.8 10.5 14.5h2C12.5 9.8 8.2 5.5 3.5 5.5v2zm1 5a1 1 0 100 2 1 1 0 000-2z"/>
              </svg>
              <span>{t.footer.rss}</span>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}