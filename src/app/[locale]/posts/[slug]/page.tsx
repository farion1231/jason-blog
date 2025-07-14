/**
 * 文章详情页组件
 * 显示单篇文章的完整内容，包括标题、元信息、标签和正文
 * 支持静态生成和SEO优化
 */
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import Link from 'next/link';
import PortableText from '@/components/post/PortableText';
import { getTranslations, type Locale } from '@/config/i18n';
import { generatePageMetadata } from '@/lib/metadata';

// 文章页面组件属性接口
interface PostPageProps {
  params: Promise<{
    slug: string;     // 文章标识符
    locale: Locale;   // 语言环境
  }>;
}

/**
 * 生成静态路由参数
 * 为所有文章和语言组合生成静态路由
 */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  const locales: Locale[] = ['zh-CN', 'en'];
  
  // 为每个语言和每篇文章生成路由参数组合
  return locales.flatMap(locale => 
    slugs.map(slug => ({
      locale,
      slug,
    }))
  );
}

/**
 * 生成文章页面元数据
 * 为SEO优化设置页面标题、描述等信息
 */
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

/**
 * 文章详情页主组件
 * 渲染文章的完整内容和相关信息
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug);

  // 如果文章不存在，返回404页面
  if (!post) {
    notFound();
  }

  // 根据文章语言设置本地化配置
  const t = getTranslations(post.language as Locale);
  const dateLocale = post.language === 'en' ? enUS : zhCN;
  
  // 计算相对时间（例如："3天前"）
  const relativeTime = formatDistanceToNow(new Date(post.date), { 
    addSuffix: true, 
    locale: dateLocale 
  });

  return (
    <>
      {/* 文章头部区域 */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
        <div className="max-w-4xl mx-auto px-6">
          {/* 返回首页链接 */}
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 mb-8 transition-colors"
          >
            <span>{t.post.backToHome}</span>
          </Link>
          
          {/* 文章标题和元信息 */}
          <div className="space-y-4 animate-fadeIn">
            {/* 文章标题 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            
            {/* 文章元信息：发布日期、相对时间、阅读时间 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{t.post.publishedOn} {post.date}</span>
              <span>•</span>
              <span>{relativeTime}</span>
              <span>•</span>
              <span>{t.post.readingTime(post.readingTime)}</span>
            </div>
            
            {/* 文章标签（如果存在） */}
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

      {/* 文章内容区域 */}
      <section className="py-8 md:py-12">
        <article className="max-w-4xl mx-auto px-6">
          {/* 文章内容容器 - 使用 prose 样式美化文本排版 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg prose prose-lg dark:prose-invert max-w-none">
            {/* 渲染 Portable Text 格式的文章内容 */}
            <PortableText value={post.content} />
          </div>
        </article>
      </section>
    </>
  );
}