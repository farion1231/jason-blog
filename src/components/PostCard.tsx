import { PostMeta } from '@/types/post';
import { type Locale } from '@/config/i18n';
import Link from 'next/link';

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
    <article className="glass rounded-2xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 hover:glass-strong group">
      <div className="space-y-4">
        {/* Title and Meta */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
            <Link href={`/${locale}/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📅 {post.date}</span>
            <span>•</span>
            <span>{t.readingTime(post.readingTime)}</span>
          </div>
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {post.description}
          </p>
        )}

        {/* Tags and Read More */}
        <div className="flex items-center justify-between pt-2">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={`${post.slug}-tag-${index}`} 
                  className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 transition-colors hover:bg-blue-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <Link
            href={`/${locale}/posts/${post.slug}`}
            className="text-blue-500 hover:text-pink-500 font-medium inline-flex items-center gap-2 ml-auto"
          >
            {t.readMore}
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}