'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from './switch';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <Sun className={cn(
        "h-4 w-4 transition-all duration-300",
        isDark ? "text-gray-400" : "text-yellow-500"
      )} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="切换主题"
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
      />
      <Moon className={cn(
        "h-4 w-4 transition-all duration-300",
        isDark ? "text-blue-400" : "text-gray-400"
      )} />
    </div>
  );
}