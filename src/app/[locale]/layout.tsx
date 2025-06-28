import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';
import { Providers } from '../providers';
import { locales } from '@/config/i18n';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans min-h-screen relative">
        <Providers>
          {/* 背景装饰 */}
          <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-50 dark:bg-gray-950">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-6000"></div>
          </div>
          
          <div className="min-h-screen flex flex-col relative">
            <NavigationHeader />
            
            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>
            
            <FooterComponent />
          </div>
        </Providers>
      </body>
    </html>
  );
}