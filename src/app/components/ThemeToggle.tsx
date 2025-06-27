'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
// import { Button } from '@heroui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label="切换主题"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 text-gray-500 hover:text-blue-500 transition-all duration-300 bg-transparent border-none outline-none focus:outline-none"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 transition-all duration-300" />
      ) : (
        <SunIcon className="h-5 w-5 transition-all duration-300" />
      )}
    </button>
  );
}