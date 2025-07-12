'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <nav 
      className="flex justify-center items-center gap-2 mt-12 mb-8" 
      role="navigation" 
      aria-label="Pagination"
    >
      {/* 上一页 */}
      <Button
        variant={currentPage > 1 ? "outline" : "ghost"}
        size="default"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
        className={cn(
          "rounded-full",
          currentPage <= 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        {currentPage > 1 ? (
          <Link href={getPageUrl(currentPage - 1)} aria-label="Previous page">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{isZh ? '上一页' : 'Previous'}</span>
          </Link>
        ) : (
          <>
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{isZh ? '上一页' : 'Previous'}</span>
          </>
        )}
      </Button>

      {/* 页码 */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNumber, index) => (
          <span key={index}>
            {pageNumber === '...' ? (
              <span className="px-3 py-2 text-muted-foreground">...</span>
            ) : (
              pageNumber === currentPage ? (
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full w-10 h-10 shadow-md"
                  aria-current="page"
                >
                  {pageNumber}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10"
                  asChild
                >
                  <Link
                    href={getPageUrl(pageNumber as number)}
                    aria-label={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </Link>
                </Button>
              )
            )}
          </span>
        ))}
      </div>

      {/* 下一页 */}
      <Button
        variant={currentPage < totalPages ? "outline" : "ghost"}
        size="default"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
        className={cn(
          "rounded-full",
          currentPage >= totalPages && "opacity-50 cursor-not-allowed"
        )}
      >
        {currentPage < totalPages ? (
          <Link href={getPageUrl(currentPage + 1)} aria-label="Next page">
            <span className="hidden sm:inline">{isZh ? '下一页' : 'Next'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        ) : (
          <>
            <span className="hidden sm:inline">{isZh ? '下一页' : 'Next'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>
    </nav>
  );
}