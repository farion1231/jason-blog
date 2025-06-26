import type { Metadata } from "next";
import "./globals.css";
import "./highlight.css";

import { NavigationHeader } from './components/NavigationHeader';

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
        <div className="min-h-screen flex flex-col">
          <NavigationHeader />
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-50 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-center space-y-4">
                <p className="text-2xl">✨</p>
                <p className="text-gray-500">
                  简洁 • 优雅 • 分享
                </p>
                <p className="text-sm text-gray-400">
                  © 2024 Jason&apos;s Blog. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>

      </body>
    </html>
  );
}