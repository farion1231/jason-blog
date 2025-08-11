# Jason's Blog 🌸

一个基于 Next.js 15 和 Sanity CMS 构建的现代博客系统，采用小清新设计风格，提供优雅的内容创作和阅读体验。

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-3.0-f03e2f?style=flat-square&logo=sanity)](https://www.sanity.io/)

## ✨ 核心特性

### 🎨 设计与用户体验
- **小清新设计风格** - 蓝粉渐变配色，玻璃拟态效果，圆角卡片设计
- **响应式布局** - 完美适配桌面、平板和移动设备
- **明暗主题切换** - 护眼模式，适应不同光线环境
- **流畅动画交互** - 微动效提升用户体验

### 📝 内容管理系统
- **Sanity Headless CMS** - 强大的可视化内容编辑器
- **Portable Text** - 富文本编辑，支持代码高亮、图片、自定义块
- **实时预览** - 编辑内容即时预览效果
- **版本控制** - 内容历史记录和版本管理

### 🌍 国际化支持
- **多语言内容** - 中英双语支持，独立内容管理
- **自动语言检测** - 根据用户偏好自动切换语言
- **格式化本地化** - 日期、时间等格式自动适配

### ⚡ 性能优化
- **静态生成 (SSG)** - 构建时生成静态页面，极速加载
- **图片优化** - 自动压缩、懒加载、响应式图片
- **代码分割** - 按需加载，减少初始包体积
- **Turbopack** - 开发环境快速热更新

### 🎯 博客功能
- **文章管理** - 创建、编辑、发布文章
- **标签系统** - 文章分类和标签管理
- **全文搜索** - 快速查找文章内容
- **归档功能** - 按时间归档文章
- **阅读时间** - 自动计算文章阅读时间
- **RSS 订阅** - 支持 RSS Feed 订阅
- **SEO 优化** - 完整的元数据和 Open Graph 支持

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Next.js** | 15 | React 框架，App Router |
| **React** | 19 | UI 库 |
| **TypeScript** | 5.0+ | 类型安全 |
| **Tailwind CSS** | 3.4 | 原子化 CSS |
| **Sanity** | 3.0 | Headless CMS |
| **Portable Text** | 2.0 | 富文本格式 |
| **next-themes** | 0.3 | 主题切换 |
| **pnpm** | 8.0+ | 包管理器 |

## 🚀 快速开始

### 前置要求

- Node.js 18.0 或更高版本
- pnpm 8.0 或更高版本
- Sanity 账号（[免费注册](https://www.sanity.io/)）

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/jason-blog.git
cd jason-blog
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
# Sanity 配置
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=你的读取令牌（可选）
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问：
- 博客首页: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### 5. 构建生产版本

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
jason-blog/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── [locale]/          # 国际化路由
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── posts/[slug]/  # 文章详情页
│   │   │   ├── archive/       # 归档页面
│   │   │   ├── tags/          # 标签页面
│   │   │   ├── search/        # 搜索页面
│   │   │   ├── projects/      # 项目展示页
│   │   │   └── about/         # 关于页面
│   │   ├── studio/            # Sanity Studio CMS
│   │   ├── rss.xml/          # RSS 订阅
│   │   └── layout.tsx         # 根布局
│   │
│   ├── components/            # React 组件
│   │   ├── common/           # 通用组件（分页、懒加载等）
│   │   ├── layout/           # 布局组件（导航、页脚）
│   │   ├── post/             # 文章相关组件
│   │   └── ui/               # UI 组件库
│   │
│   ├── sanity/               # Sanity CMS 配置
│   │   ├── lib/              # 客户端、查询、工具
│   │   └── schemaTypes/      # 内容模式定义
│   │
│   ├── config/               # 配置文件
│   │   ├── i18n.ts          # 国际化配置
│   │   ├── site.ts          # 站点配置
│   │   └── styles.ts        # 样式配置
│   │
│   ├── hooks/                # 自定义 Hook
│   ├── lib/                  # 工具函数
│   ├── types/                # TypeScript 类型定义
│   └── middleware.ts         # 国际化中间件
│
├── public/                   # 静态资源
│   └── fonts/               # 自定义字体
│
├── sanity.config.ts          # Sanity 配置
├── tailwind.config.js        # Tailwind 配置
├── next.config.ts            # Next.js 配置
└── package.json              # 项目依赖
```

## ✍️ 内容管理

### Sanity Studio

Sanity Studio 提供强大的内容管理功能：

1. **访问 Studio**: `http://localhost:3000/studio`
2. **创建文章**:
   - 填写标题、描述、标签
   - 选择语言（中文/英文）
   - 使用富文本编辑器编写内容
   - 设置发布时间
3. **管理内容**:
   - 草稿和发布状态管理
   - 版本历史查看
   - 实时预览功能
   - 批量操作支持

### 文章数据模型

```typescript
interface Post {
  title: string;              // 文章标题
  slug: string;               // URL 路径
  language: 'zh-CN' | 'en';   // 语言
  description: string;        // 文章描述
  publishedAt: string;        // 发布时间
  tags: string[];             // 标签数组
  content: PortableTextBlock[]; // 富文本内容
  readingTime: number;        // 阅读时间（自动计算）
}
```

### Portable Text 特性

- **富文本编辑**: 标题、段落、列表、引用等
- **代码块**: 支持语法高亮的代码展示
- **图片管理**: 自动优化和响应式处理
- **自定义组件**: 可扩展的内容块类型
- **嵌入内容**: 支持视频、推文等外部内容

## 🎨 设计系统

### 视觉风格

博客采用清新优雅的设计语言：

- **配色方案**: 
  - 主色：蓝色 `#3B82F6`
  - 辅色：粉色 `#EC4899`
  - 背景：白色/深色自适应
  
- **玻璃拟态效果**:
  - `glass`: 标准玻璃效果
  - `glass-subtle`: 轻微玻璃效果
  - `glass-strong`: 强烈玻璃效果

- **设计元素**:
  - 圆角卡片 (`rounded-2xl`)
  - 柔和阴影 (`shadow-sm`, `shadow-lg`)
  - 平滑过渡动画
  - 悬停交互效果

### 组件系统

项目包含完整的 UI 组件库：

- **基础组件**: Button, Card, Badge, Input
- **布局组件**: NavigationHeader, FooterComponent, Container
- **文章组件**: PostCard, PostContent, PostTags
- **功能组件**: SearchBar, LanguageToggle, ThemeToggle
- **优化组件**: LazyImage, SmartLoading, Skeleton

## ⚡ 性能优化

### 构建优化
- **静态生成**: 所有页面构建时预渲染
- **增量静态再生**: 支持 ISR 更新内容
- **代码分割**: 自动拆分和懒加载
- **Tree Shaking**: 移除未使用代码

### 运行时优化
- **图片优化**: 
  - Sanity CDN 自动优化
  - WebP 格式支持
  - 懒加载实现
  - 响应式图片
  
- **加载策略**:
  - 组件懒加载
  - 路由预加载
  - 智能缓存策略
  - 分页数据加载

### 开发体验
- **Turbopack**: 极速热更新
- **TypeScript**: 完整类型支持
- **ESLint**: 代码质量保证
- **Prettier**: 代码格式化

## 📝 开发指南

### 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器 (Turbopack)
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器

# 代码质量
pnpm lint             # ESLint 检查
pnpm type-check       # TypeScript 类型检查

# Sanity
pnpm sanity deploy    # 部署 Sanity Studio
pnpm sanity manage    # 打开 Sanity 管理界面
```

### 添加新功能

1. **创建组件**:
   - 在 `src/components` 相应目录创建组件
   - 添加 TypeScript 类型定义
   - 编写中文注释说明

2. **添加页面**:
   - 在 `src/app/[locale]` 创建页面目录
   - 实现 `generateMetadata` 函数
   - 处理国际化内容

3. **扩展 Sanity**:
   - 在 `src/sanity/schemaTypes` 定义模式
   - 更新 `src/sanity/lib/queries.ts` 查询
   - 添加相应的 TypeScript 类型

### 部署

项目可以部署到以下平台：

- **Vercel** (推荐): 一键部署，自动 CI/CD
- **Netlify**: 支持静态站点部署
- **自托管**: Docker 容器化部署

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Sanity](https://www.sanity.io/) - 内容管理平台
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vercel](https://vercel.com/) - 部署平台

---

**打造优雅的内容创作体验** 🌸 如果这个项目对你有帮助，请给个 Star ⭐️