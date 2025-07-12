'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rss, Github, Twitter, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  external?: boolean;
}

export function FooterComponent() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      icon: <Rss className="h-4 w-4" />,
      href: "/rss.xml",
      label: t.footer.rss || 'RSS Feed',
      external: false
    },
    {
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com",
      label: 'GitHub',
      external: true
    },
    {
      icon: <Twitter className="h-4 w-4" />,
      href: "https://twitter.com",
      label: 'Twitter',
      external: true
    },
    {
      icon: <Mail className="h-4 w-4" />,
      href: "mailto:contact@example.com",
      label: 'Email',
      external: true
    }
  ];

  return (
    <footer className="mt-20 border-t border-border/40 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              Jason&apos;s Blog
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.footer.description || '分享技术、设计与生活的个人博客'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              {t.footer.quickLinks || '快速链接'}
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav.home || '首页'}
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav.about || '关于'}
              </Link>
              <Link href="/archive" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav.archive || '归档'}
              </Link>
              <Link href="/tags" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav.tags || '标签'}
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              {t.footer.connect || '联系方式'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  asChild
                >
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <Card className="mt-8 p-4 bg-muted/50 border-border/50">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              © {currentYear} Jason&apos;s Blog. 
              <span>{t.footer.allRightsReserved || 'All rights reserved.'}</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              {t.footer.madeWith || 'Made with'}
              <Heart className="h-3 w-3 text-pink-500 fill-current" />
              {t.footer.using || 'using'}
              <Link 
                href="https://nextjs.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Next.js
              </Link>
              &
              <Link 
                href="https://sanity.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Sanity
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </footer>
  );
}