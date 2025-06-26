# 极客风格博客

一个使用 Next.js 14 构建的极简风格技术博客，专注于内容和极客体验。

## ✨ 特性

- 🎨 **极客风格设计** - 黑绿配色，终端风格UI
- ⚡ **高性能** - Next.js 14 + Static Generation
- 📝 **Markdown 支持** - 支持 GFM 和代码高亮
- 🎯 **专注内容** - 极简设计，突出文章内容
- 📱 **响应式** - 完美适配各种设备
- 🔍 **SEO 友好** - 优化的元数据和结构化数据

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: Markdown + Gray Matter
- **代码高亮**: Remark + Rehype
- **字体**: JetBrains Mono + Inter

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
├── src/
│   ├── app/                # Next.js App Router 页面
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 首页
│   │   ├── posts/          # 博客相关页面
│   │   └── about/          # 关于页面
│   ├── lib/                # 工具函数
│   │   └── posts.ts        # 博客文章处理
│   └── types/              # TypeScript 类型定义
│       └── post.ts         # 文章类型
├── content/
│   └── posts/              # Markdown 文章
├── public/                 # 静态资源
└── tailwind.config.js      # Tailwind 配置
```

## ✍️ 写作指南

### 创建新文章

1. 在 `content/posts/` 目录下创建 `.md` 文件
2. 添加 frontmatter 元数据：

```markdown
---
title: "文章标题"
date: "2024-01-15"
description: "文章描述"
tags: ["tag1", "tag2"]
---

# 文章内容

这里是文章正文...
```

### 支持的功能

- **代码高亮**: 支持多种编程语言
- **表格**: 使用 GFM 表格语法
- **任务列表**: `- [ ]` 和 `- [x]`
- **自动链接**: URL 自动转换为链接

## 🎨 自定义主题

### 修改配色

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
  --geek-bg: #0a0a0a;        /* 背景色 */
  --geek-text: #e0e0e0;      /* 文字色 */
  --geek-accent: #00ff41;    /* 强调色 */
  --geek-secondary: #888888; /* 次要文字色 */
  --geek-border: #333333;    /* 边框色 */
}
```

## 📊 性能优化

- ✅ 静态生成 (SSG)
- ✅ 代码分割
- ✅ 图片优化
- ✅ 字体优化
- ✅ CSS 压缩

## 🔧 开发脚本

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 构建生产版本
npm start            # 启动生产服务器

# 代码质量
npm run lint         # ESLint 检查
```

---

**享受极客风格的写作体验！** 🚀
