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
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}