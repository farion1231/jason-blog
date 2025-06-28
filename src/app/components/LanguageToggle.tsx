'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function LanguageToggle() {
  const pathname = usePathname();
  
  // 从路径中提取当前语言
  const currentLocale = pathname.split('/')[1];
  const isEnglish = currentLocale === 'en';
  
  // 构建切换语言的路径
  const segments = pathname.split('/');
  const newLocale = isEnglish ? 'zh-CN' : 'en';
  segments[1] = newLocale;
  const newPath = segments.join('/');

  return (
    <Link
      href={newPath}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:text-blue-500 dark:hover:text-blue-400"
      aria-label={`Switch to ${isEnglish ? 'Chinese' : 'English'}`}
      hrefLang={newLocale}
    >
      <span className="text-lg">🌐</span>
      <span>{isEnglish ? '中文' : 'EN'}</span>
    </Link>
  );
}