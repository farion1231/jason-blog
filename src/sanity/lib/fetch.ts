import { client } from './client'
import { QueryParams } from 'next-sanity'

export class SanityError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'SanityError'
  }
}

export async function sanityFetch<T>(
  query: string,
  params?: QueryParams,
  options?: {
    cache?: RequestCache
    next?: { revalidate?: number | false; tags?: string[] }
  }
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params || {}, {
      cache: options?.cache,
      next: options?.next,
    })
    
    return result
  } catch (error) {
    // 获取错误状态码
    const statusCode = error && typeof error === 'object' && 'statusCode' in error 
      ? (error as { statusCode: number }).statusCode 
      : undefined

    // 404 和 403 错误需要特殊处理
    if (statusCode === 404 || statusCode === 403) {
      throw new SanityError(
        `Sanity query failed with status ${statusCode}`,
        statusCode,
        error
      )
    }

    // 其他错误记录日志并抛出
    console.error('Sanity query failed:', error)
    throw new SanityError(
      'Failed to fetch data from Sanity',
      undefined,
      error
    )
  }
}

// 带降级处理的查询函数
export async function sanityFetchWithFallback<T>(
  query: string,
  params?: QueryParams,
  fallbackValue?: T,
  options?: {
    cache?: RequestCache
    next?: { revalidate?: number | false; tags?: string[] }
  }
): Promise<T> {
  try {
    return await sanityFetch<T>(query, params, options)
  } catch (error) {
    if (error instanceof SanityError && (error.statusCode === 404 || error.statusCode === 403)) {
      throw error
    }
    
    // 如果提供了降级值，返回降级值
    if (fallbackValue !== undefined) {
      console.error('Sanity query failed, returning fallback value:', error)
      return fallbackValue
    }
    
    throw error
  }
}