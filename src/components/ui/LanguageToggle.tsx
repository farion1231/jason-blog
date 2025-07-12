'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from './dropdown';
import { Button } from './button';
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
];

export function LanguageToggle() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  // 从路径中提取当前语言
  const currentLocale = pathname.split('/')[1];
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  
  // 构建切换语言的路径
  const getLanguagePath = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end" className="w-40">
        {languages.map((language) => (
          <Link
            key={language.code}
            href={getLanguagePath(language.code)}
            onClick={() => setOpen(false)}
          >
            <DropdownItem
              className={language.code === currentLocale ? 'bg-accent' : ''}
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.nativeName}</span>
            </DropdownItem>
          </Link>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}