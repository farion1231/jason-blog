'use client';

import { usePathname } from "next/navigation";
import { detectLocale, getTranslations } from '@/lib/i18n';

export function FooterComponent() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const t = getTranslations(locale);

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-4">
          <p className="text-2xl">✨</p>
          <p className="text-gray-500 dark:text-gray-400">
            {t.footer.slogan}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}