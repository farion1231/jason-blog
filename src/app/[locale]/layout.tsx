/**
 * 国际化布局组件
 * 为每个语言环境提供统一的页面布局，包含导航栏、主体内容和页脚
 * 处理语言路由验证和页面结构组织
 */
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NavigationHeader } from '@/components/layout/NavigationHeader';
import { FooterComponent } from '@/components/layout/FooterComponent';
import { Providers } from '../providers';
import { locales, type Locale } from '@/config/i18n';

/**
 * 生成静态路由参数
 * 为每个支持的语言生成静态路由
 */
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 国际化布局组件属性接口
interface LocaleLayoutProps {
  children: ReactNode;                    // 子页面内容
  params: Promise<{ locale: Locale }>;    // 路由参数，包含语言代码
}

/**
 * 国际化布局主组件
 * 为特定语言环境构建完整的页面结构
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // 验证语言代码是否有效，无效则返回404
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans min-h-screen relative">
        <Providers>
          {/* 动态背景装饰 - 彩色渐变泡泡动画 */}
          <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-50 dark:bg-gray-950">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-6000"></div>
          </div>
          
          {/* 主页面结构 */}
          <div className="min-h-screen flex flex-col relative">
            {/* 顶部导航栏 */}
            <NavigationHeader />
            
            {/* 主要内容区域 */}
            <main className="flex-1">
              {children}
            </main>
            
            {/* 底部页脚 */}
            <FooterComponent />
          </div>
        </Providers>
      </body>
    </html>
  );
}