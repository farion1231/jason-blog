import { getPostsByLanguagePaginated } from '@/lib/posts';
import { PostMeta } from '@/types/post';
import { zhCN, enUS } from 'date-fns/locale';
import { getTranslations, type Locale } from '@/config/i18n';
import { generatePageMetadata } from '@/lib/metadata';
import Pagination from '@/components/common/Pagination';
import PostCard from '@/components/post/PostCard';

type DateLocale = typeof zhCN | typeof enUS;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return generatePageMetadata(
    locale,
    'Jason Blog',
    t.home.metaDescription,
    ''
  );
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const { posts, totalPages, totalPosts } = await getPostsByLanguagePaginated(
    locale === 'zh-CN' ? 'zh-CN' : 'en',
    1
  );
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
              {t.home.subtitle(totalPosts)}
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
            <div>
              <div className="space-y-6 max-w-4xl mx-auto">
                {posts.map((post: PostMeta, index: number) => {
                  const uniqueKey = `${locale}-${post.slug}-${index}`;
                  return (
                    <PostCard 
                      key={uniqueKey} 
                      post={post} 
                      locale={locale} 
                      dateLocale={dateLocale} 
                      t={t.home} 
                    />
                  );
                })}
              </div>
              
              <Pagination
                currentPage={1}
                totalPages={totalPages}
                locale={locale}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}