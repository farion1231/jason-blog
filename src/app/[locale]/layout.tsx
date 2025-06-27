import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NavigationHeader } from '../components/NavigationHeader';
import { FooterComponent } from '../components/FooterComponent';
import { Providers } from '../providers';

const locales = ['zh-CN', 'en'];

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
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen flex flex-col">
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