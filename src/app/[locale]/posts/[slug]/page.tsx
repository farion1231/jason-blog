import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import Link from 'next/link';
import PortableText from '@/components/post/PortableText';
import { getTranslations, type Locale } from '@/config/i18n';
import { generatePageMetadata } from '@/lib/metadata';

interface PostPageProps {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  const locales: Locale[] = ['zh-CN', 'en'];
  
  return locales.flatMap(locale => 
    slugs.map(slug => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return generatePageMetadata(
    locale,
    `${post.title} | Jason's Blog`,
    post.description,
    `/posts/${slug}`
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 根据文章语言决定显示语言
  const t = getTranslations(post.language as Locale);
  const dateLocale = post.language === 'en' ? enUS : zhCN;
  
  const relativeTime = formatDistanceToNow(new Date(post.date), { 
    addSuffix: true, 
    locale: dateLocale 
  });

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 mb-8 transition-colors"
          >
            <span>{t.post.backToHome}</span>
          </Link>
          
          <div className="space-y-4 animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{t.post.publishedOn} {post.date}</span>
              <span>•</span>
              <span>{relativeTime}</span>
              <span>•</span>
              <span>{t.post.readingTime(post.readingTime)}</span>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t.post.tags}:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <article className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.content} />
          </div>
        </article>
      </section>
    </>
  );
}