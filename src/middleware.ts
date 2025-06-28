import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/config/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 跳过特殊路径 - 简化逻辑
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return;
  }

  // 检查是否已有语言前缀
  const hasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 如果没有语言前缀，重定向到默认语言
  if (!hasLocale) {
    const locale = defaultLocale; // 简化：直接使用默认语言，避免复杂检测
    return NextResponse.redirect(new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url));
  }
}

export const config = {
  matcher: '/((?!_next|api|studio|.*\\.).*)',
};