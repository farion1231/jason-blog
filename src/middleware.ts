import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['zh-CN', 'en'];
const defaultLocale = 'zh-CN';

function getLocale(request: NextRequest): string {
  // 1. 检查 cookie 中的语言偏好
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. 检查 Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const detectedLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        if (lang.startsWith('zh')) return true;
        if (lang.startsWith('en')) return true;
        return false;
      });
    
    if (detectedLocale) {
      return detectedLocale.startsWith('zh') ? 'zh-CN' : 'en';
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 跳过一些特殊路径
  const shouldSkip = 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.') || // 静态文件
    pathname === '/favicon.ico';
    
  if (shouldSkip) return;

  // 检查路径中是否已有语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // 获取用户偏好的语言
    const locale = getLocale(request);
    
    // 重定向到带语言前缀的路径
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    
    // 保持查询参数
    newUrl.search = request.nextUrl.search;
    
    const response = NextResponse.redirect(newUrl);
    
    // 设置 cookie 记住用户选择
    response.cookies.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1年
      sameSite: 'lax',
    });
    
    return response;
  }

  // 从路径中提取当前语言
  const currentLocale = pathname.split('/')[1];
  
  // 更新 cookie
  const response = NextResponse.next();
  response.cookies.set('locale', currentLocale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  
  return response;
}

export const config = {
  matcher: '/((?!_next|api|studio|.*\\.).*)',
};