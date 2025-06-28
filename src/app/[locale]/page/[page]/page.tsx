import { notFound } from 'next/navigation';
import { getPostsByLanguagePaginated } from '@/lib/posts';
import { PostMeta } from '@/types/post';
import { formatDistanceToNow } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { getTranslations, type Locale } from '@/config/i18n';
import Pagination from '@/components/common/Pagination';

type DateLocale = typeof zhCN | typeof enUS;

interface PageProps {
  params: Promise<{ locale: Locale; page: string }>;
}

export default async function PaginatedPage({ params }: PageProps) {
  const { locale, page } = await params;
  const pageNumber = parseInt(page, 10);
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }
  
  const { posts, totalPages, currentPage } = await getPostsByLanguagePaginated(
    locale === 'zh-CN' ? 'zh-CN' : 'en',
    pageNumber
  );
  
  if (pageNumber > totalPages && totalPages > 0) {
    notFound();
  }
  
  const dateLocale: DateLocale = locale === 'zh-CN' ? zhCN : enUS;
  const t = getTranslations(locale);

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 animate-fadeIn glass-subtle rounded-3xl p-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">{t.home.title}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {locale === 'zh-CN' ? `第 ${currentPage} 页` : `Page ${currentPage}`}
            </p>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-16 md:py-8 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {t.home.noPosts}
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-3">
                {t.home.noPostsDesc}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6 max-w-4xl mx-auto">
                {posts.map((post: PostMeta) => (
                  <PostCard key={post.slug} post={post} locale={locale} dateLocale={dateLocale} t={t.home} />
                ))}
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}

interface HomeTranslations {
  readingTime: (time: number) => string;
  readMore: string;
}

function PostCard({ 
  post, 
  locale, 
  dateLocale, 
  t 
}: { 
  post: PostMeta; 
  locale: Locale;
  dateLocale: DateLocale; 
  t: HomeTranslations;
}) {
  const relativeTime = formatDistanceToNow(new Date(post.date), { 
    addSuffix: true, 
    locale: dateLocale 
  });

  return (
    <article className="glass rounded-2xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 hover:glass-strong group">
      <div className="space-y-4">
        {/* Title and Meta */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
            <a href={`/${locale}/posts/${post.slug}`}>
              {post.title}
            </a>
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📅 {post.date}</span>
            <span>•</span>
            <span>{relativeTime}</span>
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
              {post.tags.map((tag) => (
                <span key={tag} className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 transition-colors hover:bg-blue-500/20">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <a
            href={`/${locale}/posts/${post.slug}`}
            className="text-blue-500 hover:text-pink-500 font-medium inline-flex items-center gap-2 ml-auto"
          >
            {t.readMore}
            <span>→</span>
          </a>
        </div>
      </div>
    </article>
  );
}