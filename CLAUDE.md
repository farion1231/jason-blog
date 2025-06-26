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
- **内容系统**: `content/posts/` 目录下的 Markdown 文件，使用 gray-matter 解析 frontmatter
- **Markdown 处理**: 使用 remark → remarkGfm → remarkHtml 处理链，rehype-highlight 提供代码语法高亮
- **样式系统**: Tailwind CSS + 小清新主题，采用蓝粉渐变配色和圆角卡片设计
- **字体配置**: UI 使用 Inter 字体，代码使用等宽字体
- **静态生成**: 所有文章在构建时静态生成

**关键文件：**
- `src/lib/posts.ts`: 核心博客功能 - 处理文章解析、元数据提取、阅读时间计算
- `src/types/post.ts`: Post 和 PostMeta 的 TypeScript 接口定义
- `src/app/layout.tsx`: 根布局，包含页面头部/底部和字体设置
- `content/posts/*.md`: 博客文章，包含 frontmatter (title, date, description, tags)

**文章 Frontmatter 格式：**
```yaml
---
title: "文章标题"
date: "2024-01-15"
description: "文章描述"
tags: ["tag1", "tag2"]
---
```

**主题系统：**
设计采用小清新风格，使用蓝粉渐变、白色背景、圆角卡片和柔和阴影。主色调为蓝色(#3B82F6)和粉色(#EC4899)，营造清新愉悦的阅读体验。

**内容处理：**
文章通过 remark/rehype 处理链支持 GFM (GitHub Flavored Markdown)、代码高亮和原始 HTML。阅读时间按约 250 字/分钟自动计算。