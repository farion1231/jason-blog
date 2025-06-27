'use client';

import { useRouter, usePathname } from 'next/navigation';

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  
  // 检测当前语言
  const isEnglish = pathname.startsWith('/en');
  
  const toggleLanguage = () => {
    if (isEnglish) {
      // 从英文切换到中文
      const newPath = pathname.replace(/^\/en/, '') || '/';
      router.push(newPath);
    } else {
      // 从中文切换到英文
      const newPath = `/en${pathname}`;
      router.push(newPath);
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${isEnglish ? 'Chinese' : 'English'}`}
    >
      <span className="text-lg">🌐</span>
      <span>{isEnglish ? '中文' : 'EN'}</span>
    </button>
  );
}