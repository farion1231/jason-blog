/**
 * 文章卡片组件
 * 用于在列表页面展示文章摘要信息，包含标题、描述、发布日期、阅读时间、标签等
 * 采用玻璃拟态设计风格，支持悬停交互效果
 * 使用 React.memo 优化性能，避免不必要的重新渲染
 */
import React from 'react';
import { PostMeta } from '@/types/post';
import { type Locale } from '@/config/i18n';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

// 文章卡片组件属性接口
interface PostCardProps {
  post: PostMeta;         // 文章元数据
  locale: Locale;         // 当前语言环境
  dateLocale: object;     // 保留参数以保持接口兼容性
  t: {                    // 国际化翻译函数
    readingTime: (time: number) => string;  // 阅读时间格式化函数
    readMore: string;                       // "阅读更多"文本
  };
}

/**
 * 文章卡片主组件
 * 渲染单篇文章的卡片视图，包含完整的文章信息和交互元素
 */
function PostCard({ post, locale, t }: PostCardProps) {
  return (
    <Card variant="glass" hover className="group overflow-hidden">
      {/* 文章头部：标题和元信息 */}
      <CardHeader>
        <CardTitle className="group-hover:text-blue-500 transition-colors">
          <Link href={`/${locale}/posts/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
        {/* 元信息：发布日期和阅读时间 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {t.readingTime(post.readingTime)}
          </span>
        </div>
      </CardHeader>
      
      {/* 文章描述（如果存在） */}
      {post.description && (
        <CardContent>
          <CardDescription className="text-base leading-relaxed">
            {post.description}
          </CardDescription>
        </CardContent>
      )}
      
      {/* 文章底部：标签和"阅读更多"按钮 */}
      <CardFooter className="flex items-center justify-between">
        {/* 标签列表 */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge
                key={`${post.slug}-tag-${index}`}
                variant="gradient"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* "阅读更多"链接按钮 */}
        <Button
          variant="link"
          size="sm"
          asChild
          className="ml-auto"
        >
          <Link href={`/${locale}/posts/${post.slug}`}>
            {t.readMore}
            <span className="ml-1">→</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * 自定义比较函数
 * 通过比较关键属性来决定是否需要重新渲染
 * 只有当文章的核心信息发生变化时才重新渲染
 */
function arePropsEqual(prevProps: PostCardProps, nextProps: PostCardProps) {
  return (
    // 比较文章的核心属性
    prevProps.post.slug === nextProps.post.slug &&
    prevProps.post.title === nextProps.post.title &&
    prevProps.post.date === nextProps.post.date &&
    prevProps.post.description === nextProps.post.description &&
    prevProps.post.readingTime === nextProps.post.readingTime &&
    prevProps.locale === nextProps.locale &&
    // 深度比较标签数组
    JSON.stringify(prevProps.post.tags) === JSON.stringify(nextProps.post.tags)
  );
}

// 导出使用 React.memo 优化的组件
export default React.memo(PostCard, arePropsEqual);