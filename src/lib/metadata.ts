import type { Metadata } from 'next';
import { locales, type Locale, openGraphLocales } from '@/config/i18n';

interface AlternateUrls {
  [key: string]: string;
}

export function generateHreflangMetadata(
  currentLocale: Locale,
  path: string = ''
): Pick<Metadata, 'alternates'> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  const languages: AlternateUrls = {};
  
  // 为每种语言生成 alternate URLs
  locales.forEach(locale => {
    const url = `${baseUrl}/${locale}${path}`;
    languages[locale] = url;
  });
  
  // 添加 x-default 指向默认语言
  languages['x-default'] = `${baseUrl}/zh-CN${path}`;
  
  return {
    alternates: {
      canonical: `${baseUrl}/${currentLocale}${path}`,
      languages,
    },
  };
}

export function generatePageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path: string = ''
): Metadata {
  const hreflangMetadata = generateHreflangMetadata(locale, path);
  
  return {
    title,
    description,
    ...hreflangMetadata,
    openGraph: {
      title,
      description,
      locale: openGraphLocales[locale],
      alternateLocale: locale === 'zh-CN' ? openGraphLocales['en'] : openGraphLocales['zh-CN'],
    },
  };
}