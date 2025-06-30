# Jason's Blog

一个基于 Next.js 15 和 Sanity CMS 构建的小清新风格个人博客，界面简洁优雅，专注于内容创作和阅读体验。

## ✨ 特性

- 🎨 **小清新设计** - 蓝粉渐变配色，圆角卡片，温馨优雅
- ⚡ **高性能** - Next.js 15 + App Router + Static Generation
- 📝 **Sanity CMS** - 可视化编辑器，实时预览，结构化内容
- 🌍 **国际化支持** - 中英双语，动态语言切换
- 🎯 **专注内容** - Portable Text 富文本，专业排版
- 📱 **响应式设计** - 完美适配各种设备
- 🔍 **SEO 友好** - 优化的元数据和 RSS 订阅
- 🎭 **主题切换** - 明暗主题无缝切换
- 📊 **智能功能** - 阅读时间估算，懒加载优化

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **CMS**: Sanity Headless CMS
- **内容格式**: Portable Text
- **包管理**: pnpm
- **字体**: Inter (UI) + JetBrains Mono (代码)

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

服务器将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
├── src/
│   ├── app/                     # Next.js App Router 页面
│   │   ├── [locale]/           # 国际化路由
│   │   │   ├── layout.tsx      # 语言布局
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── posts/[slug]/   # 文章详情页
│   │   │   ├── about/          # 关于页面
│   │   │   └── projects/       # 项目页面
│   │   ├── studio/             # Sanity Studio
│   │   ├── rss.xml/           # RSS 订阅
│   │   └── layout.tsx          # 根布局
│   ├── components/             # React 组件
│   │   ├── common/            # 通用组件
│   │   ├── layout/            # 布局组件
│   │   ├── post/              # 文章相关组件
│   │   └── ui/                # UI 组件
│   ├── sanity/                # Sanity 配置
│   │   ├── lib/               # Sanity 工具函数
│   │   ├── schemaTypes/       # 内容模式定义
│   │   └── index.ts           # Sanity 客户端
│   ├── lib/                   # 工具函数
│   ├── types/                 # TypeScript 类型
│   ├── config/                # 配置文件
│   └── hooks/                 # 自定义 Hook
├── public/                     # 静态资源
│   └── fonts/                 # 自定义字体
├── sanity.config.ts           # Sanity 配置
└── tailwind.config.js         # Tailwind 配置
```

## ✍️ 内容管理

### Sanity Studio 编辑器

访问 [http://localhost:3000/studio](http://localhost:3000/studio) 使用可视化编辑器创建和管理内容。

### 文章结构

文章支持以下字段：
- **标题** (title): 文章标题
- **Slug**: URL 友好的路径
- **语言** (language): 'zh-CN' 或 'en'
- **描述** (description): 文章摘要
- **发布时间** (publishedAt): 发布日期
- **标签** (tags): 文章分类标签
- **内容** (content): Portable Text 富文本内容
- **阅读时间** (readingTime): 自动计算

### Portable Text 功能

- **富文本编辑**: 所见即所得的编辑体验
- **代码高亮**: 支持多种编程语言语法高亮
- **图片处理**: 自动优化和响应式图片
- **自定义块**: 支持扩展内容类型
- **实时预览**: 编辑时即时预览效果

## 🎨 主题系统

### 小清新设计风格

- **主色调**: 蓝色 (#3B82F6) 和粉色 (#EC4899)
- **背景**: 白色/深色主题切换
- **卡片**: 圆角设计，柔和阴影
- **渐变**: 蓝粉渐变背景元素
- **字体**: Inter (UI) + JetBrains Mono (代码)

### 主题配置

主题样式在 `src/config/styles.ts` 和 `src/app/globals.css` 中定义。支持明暗主题切换，通过 `next-themes` 实现。

## 📊 性能优化

- ✅ 静态生成 (SSG)
- ✅ 代码分割
- ✅ 图片优化
- ✅ 字体优化
- ✅ CSS 压缩

## 🔧 开发脚本

```bash
# 开发
pnpm dev             # 启动开发服务器 (使用 Turbopack)

# 构建
pnpm build           # 构建生产版本
pnpm start           # 启动生产服务器

# 代码质量
pnpm lint            # ESLint 检查
```

## 🔧 Sanity 配置

### 环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

### Sanity Studio 部署

```bash
pnpm sanity deploy
```

---

## 🌟 特色功能

- **RSS 订阅**: `/rss.xml` 自动生成
- **站点地图**: 自动生成 SEO 友好的站点地图
- **国际化**: 中英文内容分别管理和展示
- **性能优化**: 图片懒加载，智能缓存
- **响应式设计**: 移动端友好的用户体验

---

**享受小清新的写作和阅读体验！** ✨
