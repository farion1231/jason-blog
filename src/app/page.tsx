import { getPostsByLanguage } from '@/lib/posts';
import { PostMeta } from '@/types/post';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { getTranslations } from '@/lib/i18n';

type DateLocale = typeof zhCN;

export default async function Home() {
  // 默认显示中文文章
  const posts = await getPostsByLanguage('zh-CN');
  const dateLocale = zhCN;
  const t = getTranslations('zh-CN');

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-8 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">{t.home.title}</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t.home.subtitle(posts.length)}
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
            <div className="space-y-6 max-w-4xl mx-auto">
              {posts.map((post: PostMeta) => (
                <PostCard key={post.slug} post={post} locale={dateLocale} t={t.home} />
              ))}
            </div>
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

function PostCard({ post, locale, t }: { post: PostMeta; locale: DateLocale; t: HomeTranslations }) {
  const relativeTime = formatDistanceToNow(new Date(post.date), { 
    addSuffix: true, 
    locale 
  });

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 group">
      <div className="space-y-4">
        {/* Title and Meta */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
            <a href={`/posts/${post.slug}`}>
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
            href={`/posts/${post.slug}`}
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