import { PostMeta } from '@/types/post';
import { type Locale } from '@/config/i18n';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

interface PostCardProps {
  post: PostMeta;
  locale: Locale;
  dateLocale: object; // 保留参数以保持接口兼容性
  t: {
    readingTime: (time: number) => string;
    readMore: string;
  };
}

export default function PostCard({ post, locale, t }: PostCardProps) {
  return (
    <Card variant="glass" hover className="group overflow-hidden">
      <CardHeader>
        <CardTitle className="group-hover:text-blue-500 transition-colors">
          <Link href={`/${locale}/posts/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
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
      
      {post.description && (
        <CardContent>
          <CardDescription className="text-base leading-relaxed">
            {post.description}
          </CardDescription>
        </CardContent>
      )}
      
      <CardFooter className="flex items-center justify-between">
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