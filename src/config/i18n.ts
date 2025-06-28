// 国际化配置
export const locales = ['zh-CN', 'en'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'zh-CN';

// 语言映射
export const localeNames = {
  'zh-CN': '中文',
  'en': 'English',
} as const;

// OpenGraph 语言映射
export const openGraphLocales = {
  'zh-CN': 'zh_CN',
  'en': 'en_US',
} as const;