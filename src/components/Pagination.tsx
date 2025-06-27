'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
}

export default function Pagination({ currentPage, totalPages, locale }: PaginationProps) {
  
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
      return `/${locale}`;
    }
    return `/${locale}/page/${page}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center space-x-2 mt-12 mb-8">
      {/* 上一页 */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">上一页</span>
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed">
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">上一页</span>
        </span>
      )}

      {/* 页码 */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((pageNumber, index) => (
          <span key={index}>
            {pageNumber === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              pageNumber === currentPage ? (
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg">
                  {pageNumber}
                </span>
              ) : (
                <Link
                  href={getPageUrl(pageNumber as number)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
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
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">下一页</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed">
          <span className="hidden sm:inline">下一页</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </span>
      )}
    </nav>
  );
}