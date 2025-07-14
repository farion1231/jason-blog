/**
 * 导航栏组件
 * 负责渲染顶部导航栏，包含品牌logo、导航链接、搜索框、语言切换和主题切换功能
 * 支持桌面端和移动端的响应式布局
 */
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

// 导航链接接口定义
interface NavLink {
  href: string;  // 链接地址
  label: string; // 显示文本
}

// 导航项组件属性接口
interface NavItemProps {
  href: string;                  // 链接地址
  children: React.ReactNode;     // 子元素
  onClick?: () => void;          // 点击事件处理器
  className?: string;            // 自定义样式类
}

/**
 * 桌面端导航项组件
 * 渲染单个导航链接，包含激活状态指示和悬停效果
 */
function NavItem({ href, children, onClick, className }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href; // 判断当前页面是否为该导航项对应的页面
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-gray-500 dark:text-gray-400 font-medium transition-all duration-200 relative",
        "hover:text-blue-500 dark:hover:text-blue-400",
        // 底部下划线效果：使用伪元素创建蓝粉渐变的激活指示线
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

/**
 * 移动端导航项组件
 * 针对移动端优化的导航链接样式，提供更大的触控区域
 */
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

/**
 * Logo组件
 * 渲染品牌logo，带有渐变色文字效果和缩放动画
 */
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

/**
 * 导航栏主组件
 * 整合所有导航功能，包括响应式菜单、语言切换、主题切换等
 */
export function NavigationHeader() {
  // 移动端菜单开关状态
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // 从URL路径中提取当前语言设置
  const currentLocale = pathname.split('/')[1] as 'zh-CN' | 'en';
  const locale = ['zh-CN', 'en'].includes(currentLocale) ? currentLocale : 'zh-CN';
  const t = useTranslations();
  
  // 生成本地化路径的辅助函数
  const getLocalizedPath = (path: string) => `/${locale}${path}`;
  
  // 导航链接配置，根据当前语言设置生成对应的链接和标签
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
          {/* 品牌Logo */}
          <Logo locale={locale} text={t.nav.blog} />
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* 主导航链接 */}
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href}>
                {link.label}
              </NavItem>
            ))}
            {/* 工具栏：搜索、语言切换、主题切换 */}
            <div className="flex items-center gap-3 ml-4">
              <SearchBox />
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          
          {/* 移动端控件 */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {/* 移动端菜单切换按钮 */}
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
        
        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
            <div className="glass-strong rounded-2xl p-4 mt-2">
              {/* 移动端搜索框 */}
              <div className="mb-4">
                <SearchBox />
              </div>
              {/* 移动端导航链接列表 */}
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <MobileNavItem
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)} // 点击后关闭菜单
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