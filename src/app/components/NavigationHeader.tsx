'use client';

import { useState } from "react";
import Link from "next/link";

export function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            Jason&apos;s Blog
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-500 font-medium transition-colors relative hover:text-blue-500 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full">首页</Link>
            <Link href="/projects" className="text-gray-500 font-medium transition-colors relative hover:text-blue-500 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full">项目</Link>
            <Link href="/about" className="text-gray-500 font-medium transition-colors relative hover:text-blue-500 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full">关于</Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-blue-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-500 font-medium transition-colors hover:text-blue-500 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/projects" 
                className="text-gray-500 font-medium transition-colors hover:text-blue-500 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                项目
              </Link>
              <Link 
                href="/about" 
                className="text-gray-500 font-medium transition-colors hover:text-blue-500 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                关于
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}