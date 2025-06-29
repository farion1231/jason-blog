'use client';

import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/config/i18n';

export function useTranslations() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'zh-CN';
  return getTranslations(locale);
}

// 为服务端组件提供的辅助函数
export function getServerTranslations(locale: string) {
  return getTranslations(locale as Locale);
}