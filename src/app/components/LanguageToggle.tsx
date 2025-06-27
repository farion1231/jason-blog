'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  // 从路径中提取当前语言
  const currentLocale = pathname.split('/')[1];
  const isEnglish = currentLocale === 'en';
  
  const toggleLanguage = () => {
    const segments = pathname.split('/');
    const newLocale = isEnglish ? 'zh-CN' : 'en';
    
    // 替换语言段
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
      aria-label={`Switch to ${isEnglish ? 'Chinese' : 'English'}`}
    >
      <span className={`text-lg ${isPending ? 'animate-spin' : ''}`}>🌐</span>
      <span>{isEnglish ? '中文' : 'EN'}</span>
    </button>
  );
}