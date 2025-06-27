import { MetadataRoute } from 'next';
import { getPostsByLanguage } from '@/lib/posts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://jason-blog.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all posts for both languages
  const [zhPosts, enPosts] = await Promise.all([
    getPostsByLanguage('zh-CN'),
    getPostsByLanguage('en')
  ]);

  // Static pages for both languages
  const staticPages = ['', '/about', '/projects'];
  const locales = ['zh-CN', 'en'];
  
  const staticUrls = staticPages.flatMap(page => 
    locales.map(locale => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  // Blog posts URLs
  const blogUrls = [
    ...zhPosts.map(post => ({
      url: `${BASE_URL}/zh-CN/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...enPosts.map(post => ({
      url: `${BASE_URL}/en/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  ];

  // Pagination pages
  const zhTotalPages = Math.ceil(zhPosts.length / 10);
  const enTotalPages = Math.ceil(enPosts.length / 10);
  
  const paginationUrls = [
    ...Array.from({ length: zhTotalPages - 1 }, (_, i) => ({
      url: `${BASE_URL}/zh-CN/page/${i + 2}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...Array.from({ length: enTotalPages - 1 }, (_, i) => ({
      url: `${BASE_URL}/en/page/${i + 2}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  ];

  return [...staticUrls, ...blogUrls, ...paginationUrls];
}