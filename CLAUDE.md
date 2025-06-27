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
- `src/lib/posts.ts`: 核心博客功能 - 从 Sanity 获取文章数据，处理格式转换
- `src/lib/sanity.ts`: Sanity 客户端配置和 GROQ 查询
- `src/types/post.ts`: Post 和 PostMeta 的 TypeScript 接口定义
- `src/app/layout.tsx`: 根布局，包含页面头部/底部和字体设置
- `schemas/post.ts`: Sanity 文章模式定义

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
使用 Sanity Studio 进行内容管理，支持富文本编辑、图片上传、实时预览、版本控制等专业 CMS 功能。阅读时间通过 GROQ 查询自动计算。