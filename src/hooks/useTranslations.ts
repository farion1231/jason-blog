/**
 * 国际化翻译 Hook
 * 提供客户端组件的翻译功能，自动从路由参数中获取语言设置
 * 支持中文和英文的动态切换
 */
'use client';

import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/config/i18n';

/**
 * 客户端翻译 Hook
 * 从当前路由参数中获取语言设置，返回对应的翻译函数
 * @returns 当前语言环境的翻译对象
 */
export function useTranslations() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'zh-CN'; // 默认使用中文
  return getTranslations(locale);
}

/**
 * 服务端翻译辅助函数
 * 为服务端组件提供翻译功能，需要手动传入语言参数
 * @param locale 语言代码
 * @returns 指定语言的翻译对象
 */
export function getServerTranslations(locale: string) {
  return getTranslations(locale as Locale);
}