'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { SearchBox } from '@/components/ui/SearchBox';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function NavItem({ href, children, onClick, className }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-gray-500 dark:text-gray-400 font-medium transition-all duration-200 relative",
        "hover:text-blue-500 dark:hover:text-blue-400",
        "after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-0.5",
        "after:bg-gradient-to-r after:from-blue-500 after:to-pink-500 after:transition-all",
        isActive ? "text-blue-500 after:w-full" : "after:w-0 hover:after:w-full",
        className
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavItem({ href, children, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-600 dark:text-gray-400 font-medium transition-colors hover:text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {children}
    </Link>
  );
}

function Logo({ locale, text }: { locale: string; text: string }) {
  return (
    <Link 
      href={`/${locale}`} 
      className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
    >
      {text}
    </Link>
  );
}

export function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] as 'zh-CN' | 'en';
  const locale = ['zh-CN', 'en'].includes(currentLocale) ? currentLocale : 'zh-CN';
  const t = useTranslations();
  
  const getLocalizedPath = (path: string) => `/${locale}${path}`;
  
  const navLinks: NavLink[] = [
    { href: getLocalizedPath('/'), label: t.nav.home },
    { href: getLocalizedPath('/archive'), label: t.nav.archive || (locale === 'zh-CN' ? '归档' : 'Archive') },
    { href: getLocalizedPath('/tags'), label: t.nav.tags || (locale === 'zh-CN' ? '标签' : 'Tags') },
    { href: getLocalizedPath('/projects'), label: t.nav.projects },
    { href: getLocalizedPath('/about'), label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/20 dark:border-gray-800/20">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Logo locale={locale} text={t.nav.blog} />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href}>
                {link.label}
              </NavItem>
            ))}
            <div className="flex items-center gap-3 ml-4">
              <SearchBox />
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          
          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="rounded-full"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
            <div className="glass-strong rounded-2xl p-4 mt-2">
              <div className="mb-4">
                <SearchBox />
              </div>
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <MobileNavItem
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </MobileNavItem>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}