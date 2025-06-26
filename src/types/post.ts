import { type PortableTextBlock } from '@portabletext/react';

// Sanity 原始数据类型
export interface SanityPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  publishedAt: string;
  tags?: string[];
  content: PortableTextBlock[]; // Sanity 的 portable text 格式
  readingTime: number;
}

// 转换后的前端使用类型
export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: PortableTextBlock[]; // Portable Text 格式
  readingTime: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
}