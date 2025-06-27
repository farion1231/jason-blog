import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 这些值需要你在 sanity.io 创建项目后获取
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // 生产环境使用 CDN
  // 网络配置
  timeout: 10000, // 10秒超时
  maxRetries: 3, // 最多重试3次
  retryDelay: (attemptNumber) => Math.min(1000 * Math.pow(2, attemptNumber - 1), 5000), // 指数退避，最多5秒
  // 控制台环境下使用 token（如果有的话）
  token: process.env.SANITY_API_TOKEN,
  // 开发环境下显示更多调试信息
  perspective: 'published',
})

// 图片 URL 构建器
const builder = imageUrlBuilder(client)
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)

// 网络错误类型定义
export enum NetworkErrorType {
  TIMEOUT = 'TIMEOUT',
  CONNECTION_FAILED = 'CONNECTION_FAILED',
  DNS_FAILED = 'DNS_FAILED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  RATE_LIMITED = 'RATE_LIMITED',
  UNKNOWN = 'UNKNOWN'
}

// 网络错误信息
export interface NetworkError {
  type: NetworkErrorType;
  message: string;
  originalError?: Error;
  statusCode?: number;
  retryAfter?: number;
}

// 网络错误检测和分类
export function classifyNetworkError(error: unknown): NetworkError {
  // 类型守护：确保 error 是对象类型
  const isErrorObject = error && typeof error === 'object';
  const errorMessage = isErrorObject && 'message' in error 
    ? String((error as { message: unknown }).message)
    : error?.toString() || 'Unknown error';
  
  const statusCode = isErrorObject && 'status' in error 
    ? Number((error as { status: unknown }).status)
    : isErrorObject && 'statusCode' in error 
    ? Number((error as { statusCode: unknown }).statusCode)
    : undefined;

  // 超时错误
  if (errorMessage.includes('timeout') || errorMessage.includes('TIMEOUT')) {
    return {
      type: NetworkErrorType.TIMEOUT,
      message: '请求超时，请检查网络连接',
      originalError: error as Error,
      statusCode
    };
  }

  // DNS 解析失败
  if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('getaddrinfo')) {
    return {
      type: NetworkErrorType.DNS_FAILED,
      message: 'DNS 解析失败，请检查网络连接',
      originalError: error as Error,
      statusCode
    };
  }

  // 连接失败
  if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ECONNRESET') || errorMessage.includes('network')) {
    return {
      type: NetworkErrorType.CONNECTION_FAILED,
      message: '网络连接失败，请稍后重试',
      originalError: error as Error,
      statusCode
    };
  }

  // HTTP 状态码错误
  switch (statusCode) {
    case 403:
      return {
        type: NetworkErrorType.FORBIDDEN,
        message: 'API 访问被拒绝，请检查配置',
        originalError: error as Error,
        statusCode
      };
    case 404:
      return {
        type: NetworkErrorType.NOT_FOUND,
        message: '请求的资源不存在',
        originalError: error as Error,
        statusCode
      };
    case 429:
      const retryAfter = isErrorObject && 'headers' in error
        ? (() => {
            const headers = (error as { headers: unknown }).headers;
            if (headers && typeof headers === 'object' && 'retry-after' in headers) {
              const retryAfterValue = (headers as { 'retry-after': unknown })['retry-after'];
              return typeof retryAfterValue === 'string' ? parseInt(retryAfterValue, 10) : 60;
            }
            return 60;
          })()
        : 60;
      
      return {
        type: NetworkErrorType.RATE_LIMITED,
        message: '请求频率过高，请稍后重试',
        originalError: error as Error,
        statusCode,
        retryAfter
      };
    case 500:
    case 502:
    case 503:
    case 504:
      return {
        type: NetworkErrorType.SERVER_ERROR,
        message: '服务器错误，请稍后重试',
        originalError: error as Error,
        statusCode
      };
    default:
      return {
        type: NetworkErrorType.UNKNOWN,
        message: `未知错误: ${errorMessage}`,
        originalError: error as Error,
        statusCode
      };
  }
}

// 增强的错误处理函数
export async function handleSanityQuery<T>(
  queryFn: () => Promise<T>,
  context: string,
  fallbackValue: T
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    const networkError = classifyNetworkError(error);
    
    // 记录详细错误信息
    console.error(`Sanity query failed - ${context}:`, {
      type: networkError.type,
      message: networkError.message,
      statusCode: networkError.statusCode,
      originalError: networkError.originalError
    });

    // 根据错误类型决定是否抛出错误
    if (networkError.type === NetworkErrorType.FORBIDDEN || 
        networkError.type === NetworkErrorType.NOT_FOUND) {
      // 权限或资源问题，抛出错误让上层处理
      throw networkError;
    }

    // 其他错误使用降级处理
    return fallbackValue;
  }
}

// GROQ 查询
export const queries = {
  // 获取所有已发布的文章
  allPosts: `*[_type == "post" && !isDraft] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 根据语言获取文章
  postsByLanguage: `*[_type == "post" && !isDraft && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 根据 slug 获取单篇文章
  postBySlug: `*[_type == "post" && slug.current == $slug && !isDraft][0] {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    content,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 根据 slug 和语言获取文章
  postBySlugAndLanguage: `*[_type == "post" && slug.current == $slug && language == $language && !isDraft][0] {
    _id,
    title,
    slug,
    language,
    description,
    publishedAt,
    tags,
    content,
    "readingTime": round(length(pt::text(content)) / 5 / 250)
  }`,
  
  // 获取所有文章的 slug（用于生成静态路径）
  postSlugs: `*[_type == "post" && !isDraft].slug.current`,
  
  // 分页查询：根据语言获取文章
  postsByLanguagePaginated: `{
    "items": *[_type == "post" && !isDraft && language == $language] | order(publishedAt desc)[$start...$end] {
      _id,
      title,
      slug,
      language,
      description,
      publishedAt,
      tags,
      "readingTime": round(length(pt::text(content)) / 5 / 250)
    },
    "total": count(*[_type == "post" && !isDraft && language == $language])
  }`,
  
  // 获取文章总数
  postCountByLanguage: `count(*[_type == "post" && !isDraft && language == $language])`
}