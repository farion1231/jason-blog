import { Post, PostMeta, SanityPost } from '@/types/post';
import { queries } from '@/sanity/lib/queries';
import { sanityFetch, sanityFetchWithFallback, SanityError } from '@/sanity/lib/fetch';

// 将 Sanity 数据转换为前端使用的格式
function sanityPostToPost(sanityPost: SanityPost): Post {
  return {
    slug: sanityPost.slug.current,
    title: sanityPost.title,
    date: sanityPost.publishedAt,
    language: sanityPost.language,
    description: sanityPost.description || '',
    tags: sanityPost.tags || [],
    content: sanityPost.content || [], // 保持 portable text 格式
    readingTime: sanityPost.readingTime || 1,
  };
}

function sanityPostToPostMeta(sanityPost: SanityPost): PostMeta {
  return {
    slug: sanityPost.slug.current,
    title: sanityPost.title,
    date: sanityPost.publishedAt,
    language: sanityPost.language,
    description: sanityPost.description || '',
    tags: sanityPost.tags || [],
    readingTime: sanityPost.readingTime || 1,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await sanityFetchWithFallback<SanityPost[]>(
    queries.allPosts,
    undefined,
    []
  );
  return posts.map(sanityPostToPostMeta);
}

export async function getPostsByLanguage(language: string): Promise<PostMeta[]> {
  const posts = await sanityFetchWithFallback<SanityPost[]>(
    queries.postsByLanguage,
    { language },
    []
  );
  return posts.map(sanityPostToPostMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await sanityFetch<SanityPost | null>(
      queries.postBySlug,
      { slug }
    );
    return post ? sanityPostToPost(post) : null;
  } catch (error) {
    // 404 错误返回 null 触发 not-found 页面
    if (error instanceof SanityError && error.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  return await sanityFetchWithFallback<string[]>(
    queries.postSlugs,
    undefined,
    []
  );
}

export interface PaginatedPosts {
  posts: PostMeta[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

const POSTS_PER_PAGE = 10;

export async function getPostsByLanguagePaginated(
  language: string,
  page: number = 1
): Promise<PaginatedPosts> {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  
  
  const result = await sanityFetchWithFallback<{
    items: SanityPost[];
    total: number;
  }>(
    queries.postsByLanguagePaginated,
    { language, start, end },
    { items: [], total: 0 }
  );
  
  const totalPages = Math.ceil(result.total / POSTS_PER_PAGE);
  
  return {
    posts: result.items.map(sanityPostToPostMeta),
    totalPages,
    currentPage: page,
    totalPosts: result.total
  };
}