# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

**开发相关：**
- `pnpm dev` - 启动开发服务器，使用 Turbopack (localhost:3000)
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行 ESLint 检查

**注意：** 项目已从 npm 迁移到 pnpm，请始终使用 pnpm 命令。

## 架构概览

这是一个基于 Next.js 15 的博客系统，使用 App Router，采用小清新风格设计，界面简洁优雅。

**核心架构：**
- **内容系统**: Sanity Headless CMS，提供可视化编辑器和实时预览
- **内容处理**: 使用 Portable Text 格式，支持富文本编辑和结构化内容
- **样式系统**: Tailwind CSS + 小清新主题，采用蓝粉渐变配色和圆角卡片设计
- **字体配置**: UI 使用 Inter 字体，代码使用等宽字体
- **静态生成**: 所有文章通过 Sanity API 在构建时静态生成

**关键文件：**
- `src/sanity/lib/queries.ts`: GROQ 查询定义，包含所有数据获取逻辑
- `src/sanity/lib/client.ts`: Sanity 客户端配置
- `src/sanity/lib/fetch.ts`: 数据获取封装函数
- `src/sanity/post.ts`: Sanity 文章模式定义
- `src/types/post.ts`: Post 和 PostMeta 的 TypeScript 接口定义
- `src/app/[locale]/layout.tsx`: 国际化布局组件
- `src/app/layout.tsx`: 根布局，包含全局样式和字体设置
- `src/config/site.ts`: 站点配置信息

**Sanity 文章模式：**
```typescript
{
  title: string,
  slug: string,
  language: 'zh-CN' | 'en',
  description: string,
  publishedAt: string,
  tags: string[],
  content: PortableTextBlock[],
  readingTime: number
}
```

**主题系统：**
设计采用小清新风格，使用蓝粉渐变、白色背景、圆角卡片和柔和阴影。主色调为蓝色(#3B82F6)和粉色(#EC4899)，营造清新愉悦的阅读体验。

**内容管理：**
使用 Sanity Studio 进行内容管理，支持富文本编辑、图片上传、实时预览、版本控制等专业 CMS 功能。阅读时间通过 GROQ 查询自动计算 (`round(length(pt::text(content)) / 5 / 250)`)。

## 数据查询系统

**GROQ 查询文件：**
- `src/sanity/lib/queries.ts`: 包含所有数据查询逻辑
- 支持分页查询、语言过滤、slug 查找等功能
- 自动计算阅读时间和处理草稿状态

**核心查询：**
- `allPosts`: 获取所有已发布文章
- `postsByLanguage`: 根据语言获取文章列表
- `postBySlugAndLanguage`: 获取特定文章详情
- `postsByLanguagePaginated`: 分页查询文章

## 国际化系统

**配置文件：**
- `src/config/i18n.ts`: 国际化配置
- `src/hooks/useTranslations.ts`: 翻译 Hook
- `src/middleware.ts`: 语言检测和路由中间件

**支持语言：**
- 中文 (zh-CN)
- 英文 (en)

**路由结构：**
- `/[locale]/`: 国际化路由前缀
- 自动语言检测和重定向

## 组件系统

**布局组件：**
- `NavigationHeader`: 导航栏，包含语言切换和主题切换
- `FooterComponent`: 页脚组件

**UI 组件：**
- `LanguageToggle`: 语言切换器
- `ThemeToggle`: 主题切换器
- `LazyImage`: 懒加载图片组件
- `SmartLoading`: 智能加载组件

**文章相关组件：**
- `PostCard`: 文章卡片
- `PortableText`: Portable Text 渲染器
- `PortableTextImage`: 图片处理组件

## 性能优化

**图片优化：**
- 使用 Sanity 的图片 CDN
- 自动响应式处理
- 懒加载支持

**加载优化：**
- 智能加载状态管理
- 分页减少初始数据量
- 静态生成 (ISG) 支持

## 开发工具

**常用命令扩展：**
- `pnpm sanity deploy` - 部署 Sanity Studio
- `pnpm sanity manage` - 打开 Sanity 管理界面
- Studio 访问: `http://localhost:3000/studio`

**环境配置：**
需要在 `.env.local` 中配置：
```
NEXT_PUBLIC_SANITY_PROJECT_ID=项目ID
NEXT_PUBLIC_SANITY_DATASET=数据集名称
SANITY_API_READ_TOKEN=读取令牌（可选）
```