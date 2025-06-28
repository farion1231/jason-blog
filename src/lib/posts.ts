import { client, queries, handleSanityQuery } from './sanity';
import { Post, PostMeta, SanityPost } from '@/types/post';

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
  return handleSanityQuery(
    async () => {
      const posts: SanityPost[] = await client.fetch(queries.allPosts);
      return posts.map(sanityPostToPostMeta);
    },
    []
  );
}

export async function getPostsByLanguage(language: string): Promise<PostMeta[]> {
  return handleSanityQuery(
    async () => {
      const posts: SanityPost[] = await client.fetch(queries.postsByLanguage, { language });
      return posts.map(sanityPostToPostMeta);
    },
    []
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await handleSanityQuery(
      async () => {
        const post: SanityPost = await client.fetch(queries.postBySlug, { slug });
        return post ? sanityPostToPost(post) : null;
      },
      null
    );
  } catch (error) {
    // 404 错误返回 null 触发 not-found 页面
    const statusCode = error && typeof error === 'object' && 'statusCode' in error 
      ? (error as { statusCode: number }).statusCode 
      : undefined;
    
    if (statusCode === 404) {
      return null;
    }
    
    throw error;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  return handleSanityQuery(
    async () => {
      const slugs: string[] = await client.fetch(queries.postSlugs);
      return slugs;
    },
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
  const fallbackResult: PaginatedPosts = {
    posts: [],
    totalPages: 0,
    currentPage: page,
    totalPosts: 0
  };

  return handleSanityQuery(
    async () => {
      const start = (page - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      
      const result: {
        items: SanityPost[];
        total: number;
      } = await client.fetch(queries.postsByLanguagePaginated, {
        language,
        start,
        end
      });
      
      const totalPages = Math.ceil(result.total / POSTS_PER_PAGE);
      
      return {
        posts: result.items.map(sanityPostToPostMeta),
        totalPages,
        currentPage: page,
        totalPosts: result.total
      };
    },
    fallbackResult
  );
}