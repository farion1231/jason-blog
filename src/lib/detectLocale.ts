import { type Locale } from '@/config/i18n';

export function detectLocaleFromUrl(): Locale {
  if (typeof window === 'undefined') {
    return 'zh-CN'; // 服务端默认返回中文
  }
  
  const pathname = window.location.pathname;
  
  // 检查 URL 路径中的语言前缀
  if (pathname.startsWith('/en')) {
    return 'en';
  } else if (pathname.startsWith('/zh-CN')) {
    return 'zh-CN';
  }
  
  // 检查浏览器语言偏好
  const browserLang = navigator.language;
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  
  // 默认返回中文
  return 'zh-CN';
}

export function detectLocaleFromHeaders(headers?: { [key: string]: string | string[] | undefined }): Locale {
  if (!headers) return 'zh-CN';
  
  const acceptLanguage = headers['accept-language'];
  if (typeof acceptLanguage === 'string') {
    if (acceptLanguage.includes('en')) {
      return 'en';
    }
  }
  
  return 'zh-CN';
}