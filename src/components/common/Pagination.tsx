'use client';

import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
  baseUrl?: string;
}

export default function Pagination({ currentPage, totalPages, locale, baseUrl = '' }: PaginationProps) {
  const isZh = locale === 'zh-CN';
  
  // 生成页码数组
  const getPageNumbers = () => {
    const delta = 2; // 当前页两侧显示的页码数
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return `/${locale}${baseUrl}`;
    }
    return `/${locale}${baseUrl}/page/${page}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center space-x-2 mt-12 mb-8" role="navigation" aria-label="Pagination">
      {/* 上一页 */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                   bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                   rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 
                   dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{isZh ? '上一页' : 'Previous'}</span>
        </Link>
      ) : (
        <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 
                       bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                       rounded-full cursor-not-allowed opacity-50">
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{isZh ? '上一页' : 'Previous'}</span>
        </span>
      )}

      {/* 页码 */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((pageNumber, index) => (
          <span key={index}>
            {pageNumber === '...' ? (
              <span className="px-3 py-2 text-gray-500 dark:text-gray-500">...</span>
            ) : (
              pageNumber === currentPage ? (
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white 
                             bg-gradient-to-r from-blue-500 to-pink-500 rounded-full shadow-md
                             transform scale-110 transition-transform">
                  {pageNumber}
                </span>
              ) : (
                <Link
                  href={getPageUrl(pageNumber as number)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                           bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                           rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 
                           dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </Link>
              )
            )}
          </span>
        ))}
      </div>

      {/* 下一页 */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                   bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                   rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 
                   dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">{isZh ? '下一页' : 'Next'}</span>
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 
                       bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                       rounded-full cursor-not-allowed opacity-50">
          <span className="hidden sm:inline">{isZh ? '下一页' : 'Next'}</span>
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </span>
      )}
    </nav>
  );
}