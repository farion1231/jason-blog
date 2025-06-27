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
  return children;
}