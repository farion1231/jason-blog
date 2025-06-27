import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Link from 'next/link';
import PortableText from '@/components/PortableText';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Jason's Blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relativeTime = formatDistanceToNow(new Date(post.date), { 
    addSuffix: true, 
    locale: zhCN 
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <article className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <header className="space-y-6 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📅 {post.date}</span>
            <span>•</span>
            <span>{relativeTime}</span>
            <span>•</span>
            <span>⏱️ {post.readingTime} 分钟阅读</span>
          </div>

          {/* Description */}
          {post.description && (
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 transition-colors hover:bg-blue-500/20">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">
          <PortableText value={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-12">
            <Link
              href="/"
              className="text-blue-500 hover:text-pink-500 font-medium inline-flex items-center gap-2"
            >
              ← 返回首页
            </Link>
            
            <Link
              href="/"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 font-medium inline-flex items-center gap-2"
            >
              回到首页 →
            </Link>
          </div>

          {/* Article stats */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">文章统计</h3>
            <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
              <div>
                <p className="text-2xl font-bold text-blue-500">
                  ~{post.readingTime * 250}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">字数</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-500">
                  {post.date}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">发布日期</p>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}