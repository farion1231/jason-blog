import type { Metadata } from 'next';
import "./globals.css";
import "./highlight.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Jason Blog',
    default: 'Jason Blog',
  },
  description: 'Jason\'s personal blog featuring tech insights and project showcases',
  keywords: ['blog', 'tech', 'web development', 'programming'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}