/**
 * 语言切换组件
 * 提供多语言切换功能，支持中文和英文界面
 * 使用下拉菜单显示可选语言，自动适配当前路径的语言前缀
 */
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from './dropdown';
import { Button } from './button';
import { useState } from 'react';

// 语言配置接口
interface Language {
  code: string;        // 语言代码 (如: zh-CN, en)
  name: string;        // 英文名称
  nativeName: string;  // 本地语言名称
  flag: string;        // 国旗emoji
}

// 支持的语言列表配置
const languages: Language[] = [
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
];

/**
 * 语言切换主组件
 * 根据当前路径自动识别语言，提供语言切换下拉菜单
 */
export function LanguageToggle() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // 下拉菜单开关状态
  
  // 从URL路径中提取当前语言代码
  const currentLocale = pathname.split('/')[1];
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  
  // 构建切换语言后的新路径
  // 保持除语言代码外的所有路径段不变
  const getLanguagePath = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale; // 替换语言代码部分
    return segments.join('/');
  };

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      {/* 语言切换触发按钮 */}
      <DropdownTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <Globe className="h-4 w-4" />
          {/* 响应式显示：桌面端显示语言名称，移动端显示国旗 */}
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownTrigger>
      
      {/* 语言选择下拉菜单 */}
      <DropdownContent align="end" className="w-40">
        {languages.map((language) => (
          <Link
            key={language.code}
            href={getLanguagePath(language.code)}
            onClick={() => setOpen(false)} // 选择后关闭菜单
          >
            <DropdownItem
              className={language.code === currentLocale ? 'bg-accent' : ''} // 高亮当前选中语言
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