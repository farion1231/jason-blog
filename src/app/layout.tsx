import type { Metadata } from "next";
import "./globals.css";
import "./highlight.css";

import { NavigationHeader } from './components/NavigationHeader';
import { FooterComponent } from './components/FooterComponent';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Jason's Blog",
  description: "A clean and elegant personal blog",
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
            
            <FooterComponent />
          </div>
        </Providers>
      </body>
    </html>
  );
}