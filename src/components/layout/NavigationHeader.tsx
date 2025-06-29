'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useTranslations } from '@/hooks/useTranslations';

const navLinkClasses = {
  desktop: "text-gray-500 dark:text-gray-400 font-medium transition-colors relative hover:text-blue-500 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full",
  mobile: "text-gray-500 dark:text-gray-400 font-medium transition-colors hover:text-blue-500 px-2 py-1"
};

export function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] as 'zh-CN' | 'en';
  const locale = ['zh-CN', 'en'].includes(currentLocale) ? currentLocale : 'zh-CN';
  const t = useTranslations();
  
  // 获取对应语言的链接
  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href={getLocalizedPath('/')} className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            {t.nav.blog}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={getLocalizedPath('/')} className={navLinkClasses.desktop}>{t.nav.home}</Link>
            <Link href={getLocalizedPath('/projects')} className={navLinkClasses.desktop}>{t.nav.projects}</Link>
            <Link href={getLocalizedPath('/about')} className={navLinkClasses.desktop}>{t.nav.about}</Link>
            <LanguageToggle />
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button 
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-strong border-t py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href={getLocalizedPath('/')} 
                className={navLinkClasses.mobile}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link 
                href={getLocalizedPath('/projects')} 
                className={navLinkClasses.mobile}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.projects}
              </Link>
              <Link 
                href={getLocalizedPath('/about')} 
                className={navLinkClasses.mobile}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}