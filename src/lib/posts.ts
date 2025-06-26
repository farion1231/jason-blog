import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { Post, PostMeta } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): PostMeta[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      // 计算阅读时间 (粗略估算: 250字/分钟)
      const wordCount = matterResult.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 250);

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || '2024-01-01',
        description: matterResult.data.description || '',
        tags: matterResult.data.tags || [],
        readingTime,
      };
    });

  // 按日期排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // 使用 remark 处理 markdown
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();
    
    // 计算阅读时间
    const wordCount = matterResult.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 250);

    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date || '2024-01-01',
      description: matterResult.data.description || '',
      tags: matterResult.data.tags || [],
      content: contentHtml,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}