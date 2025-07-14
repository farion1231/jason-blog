/**
 * 博客首页组件
 * 显示最新文章列表，支持分页功能
 * 根据语言环境显示对应的文章内容和本地化信息
 */
import { getPostsByLanguagePaginated } from '@/lib/posts';
import { PostMeta } from '@/types/post';
import { zhCN, enUS } from 'date-fns/locale';
import { getTranslations, type Locale } from '@/config/i18n';
import { generatePageMetadata } from '@/lib/metadata';
import Pagination from '@/components/common/Pagination';
import PostCard from '@/components/post/PostCard';

// 日期本地化类型定义
type DateLocale = typeof zhCN | typeof enUS;

// 页面组件属性接口
interface PageProps {
  params: Promise<{ locale: Locale }>; // 路由参数，包含语言环境
}

/**
 * 生成页面元数据
 * 用于SEO优化，设置页面标题、描述等信息
 */
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

/**
 * 首页主组件
 * 获取并渲染首页的文章列表，处理空状态和分页
 */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  
  // 获取第一页的文章数据
  const { posts, totalPages, totalPosts } = await getPostsByLanguagePaginated(
    locale === 'zh-CN' ? 'zh-CN' : 'en',
    1
  );
  
  // 配置日期本地化
  const dateLocale: DateLocale = locale === 'zh-CN' ? zhCN : enUS;
  const t = getTranslations(locale);


  return (
    <>
      {/* 页面头部区域 */}
      <section className="py-16 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 animate-fadeIn glass-subtle rounded-3xl p-12">
            {/* 主标题 - 使用渐变色文字效果 */}
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">{t.home.title}</span>
            </h1>
            {/* 副标题 - 显示文章总数 */}
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.home.subtitle(totalPosts)}
            </p>
          </div>
        </div>
      </section>

      {/* 文章列表区域 */}
      <section className="py-16 md:py-8 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            // 无文章时的空状态展示
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
            // 有文章时显示文章列表和分页
            <div>
              {/* 文章卡片列表 */}
              <div className="space-y-6 max-w-4xl mx-auto">
                {posts.map((post: PostMeta, index: number) => {
                  // 生成唯一key，避免重复渲染问题
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
              
              {/* 分页组件 */}
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