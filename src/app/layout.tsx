import type { Metadata } from "next";
import "./globals.css";
import "./highlight.css";

import { NavigationHeader } from './components/NavigationHeader';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Jason&apos;s Blog",
  description: "简洁小清新的个人博客",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <NavigationHeader />
            
            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="bg-gray-50 dark:bg-gray-900 mt-20">
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center space-y-4">
                  <p className="text-2xl">✨</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    简洁 • 优雅 • 分享
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    © 2024 Jason&apos;s Blog. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}