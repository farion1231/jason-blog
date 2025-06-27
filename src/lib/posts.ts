import { client, queries } from './sanity';
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
  try {
    const posts: SanityPost[] = await client.fetch(queries.allPosts);
    return posts.map(sanityPostToPostMeta);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostsByLanguage(language: string): Promise<PostMeta[]> {
  try {
    const posts: SanityPost[] = await client.fetch(queries.postsByLanguage, { language });
    return posts.map(sanityPostToPostMeta);
  } catch (error) {
    console.error(`Error fetching posts for language ${language}:`, error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post: SanityPost = await client.fetch(queries.postBySlug, { slug });
    
    if (!post) {
      return null;
    }

    return sanityPostToPost(post);
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs: string[] = await client.fetch(queries.postSlugs);
    return slugs;
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}