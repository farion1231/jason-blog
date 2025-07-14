/**
 * 主题切换组件
 * 提供深色/浅色主题切换功能，带有太阳和月亮图标的视觉效果
 * 使用 next-themes 管理主题状态，支持系统主题自动检测
 */
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from './switch';
import { cn } from '@/lib/utils';

/**
 * 主题切换主组件
 * 渲染一个带有太阳/月亮图标的切换开关
 */
export function ThemeToggle() {
  // 防止服务端渲染和客户端渲染不一致的问题
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 组件挂载后才渲染，避免SSR水合问题
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在客户端挂载前不渲染任何内容
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      {/* 太阳图标 - 浅色主题时高亮 */}
      <Sun className={cn(
        "h-4 w-4 transition-all duration-300",
        isDark ? "text-gray-400" : "text-yellow-500"
      )} />
      
      {/* 主题切换开关 */}
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="切换主题"
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
      />
      
      {/* 月亮图标 - 深色主题时高亮 */}
      <Moon className={cn(
        "h-4 w-4 transition-all duration-300",
        isDark ? "text-blue-400" : "text-gray-400"
      )} />
    </div>
  );
}