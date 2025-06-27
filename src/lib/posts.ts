import { client, queries, handleSanityQuery, NetworkError, NetworkErrorType } from './sanity';
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
    'getAllPosts',
    []
  );
}

export async function getPostsByLanguage(language: string): Promise<PostMeta[]> {
  return handleSanityQuery(
    async () => {
      const posts: SanityPost[] = await client.fetch(queries.postsByLanguage, { language });
      return posts.map(sanityPostToPostMeta);
    },
    `getPostsByLanguage(${language})`,
    []
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await handleSanityQuery(
      async () => {
        const post: SanityPost = await client.fetch(queries.postBySlug, { slug });
        
        if (!post) {
          return null;
        }

        return sanityPostToPost(post);
      },
      `getPostBySlug(${slug})`,
      null
    );
  } catch (error) {
    // 如果是网络错误类型，检查是否为 404
    if (error && typeof error === 'object' && 'type' in error) {
      const networkError = error as NetworkError;
      if (networkError.type === NetworkErrorType.NOT_FOUND) {
        return null; // 404 错误返回 null，触发 not-found 页面
      }
      // 其他网络错误重新抛出
      throw networkError;
    }
    // 未知错误也返回 null
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  return handleSanityQuery(
    async () => {
      const slugs: string[] = await client.fetch(queries.postSlugs);
      return slugs;
    },
    'getAllPostSlugs',
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
    `getPostsByLanguagePaginated(${language}, page=${page})`,
    fallbackResult
  );
}