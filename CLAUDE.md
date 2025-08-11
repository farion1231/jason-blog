# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 常用命令

**开发相关：**
- `pnpm dev` - 启动开发服务器，使用 Turbopack (localhost:3000)
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行 ESLint 检查
- `pnpm type-check` - TypeScript 类型检查

**Sanity CMS：**
- `pnpm sanity deploy` - 部署 Sanity Studio
- `pnpm sanity manage` - 打开 Sanity 管理界面
- Studio 访问: `http://localhost:3000/studio`

**注意：** 
- 项目使用 pnpm 作为包管理器，请始终使用 pnpm 命令
- 开发时优先使用 `pnpm dev`，它使用 Turbopack 提供更快的热更新

## 🏗️ 架构概览

这是一个基于 Next.js 15 的现代博客系统，采用小清新设计风格，界面简洁优雅。

**技术栈：**
- **框架**: Next.js 15 (App Router) + React 19 + TypeScript
- **CMS**: Sanity Headless CMS - 提供可视化编辑器和实时预览
- **样式**: Tailwind CSS + 玻璃拟态设计系统
- **内容**: Portable Text 格式 - 支持富文本和结构化内容
- **国际化**: 完整的中英双语支持
- **优化**: SSG 静态生成 + 图片优化 + 懒加载

## 📁 项目结构

```
src/
├── app/                    # Next.js 15 App Router
│   ├── [locale]/          # 国际化路由
│   │   ├── page.tsx       # 首页
│   │   ├── posts/[slug]/  # 文章详情页
│   │   ├── archive/       # 归档页面
│   │   ├── tags/          # 标签页面
│   │   ├── search/        # 搜索页面
│   │   ├── projects/      # 项目展示页
│   │   └── about/         # 关于页面
│   ├── studio/            # Sanity Studio CMS
│   └── rss.xml/          # RSS 订阅
│
├── components/            # React 组件
│   ├── common/           # 通用组件
│   ├── layout/           # 布局组件
│   ├── post/             # 文章组件
│   └── ui/               # UI 组件库
│
├── sanity/               # Sanity CMS 配置
│   ├── lib/              # 客户端和查询
│   └── schemaTypes/      # 内容模式定义
│
├── config/               # 配置文件
│   ├── i18n.ts          # 国际化配置
│   ├── site.ts          # 站点配置
│   └── styles.ts        # 样式配置
│
├── hooks/                # 自定义 Hook
├── lib/                  # 工具函数
└── types/                # TypeScript 类型定义
```

## 🎨 设计系统

**小清新视觉风格：**
- **主色调**: 蓝色 (#3B82F6) 和粉色 (#EC4899) 渐变
- **玻璃拟态**: `glass`、`glass-subtle`、`glass-strong` 变体
- **圆角设计**: 统一使用 `rounded-2xl` (16px 圆角)
- **动画效果**: `fadeIn`、`blob`、`hover:scale-[1.02]` 等微交互
- **阴影系统**: 柔和的 `shadow-sm` 和 `shadow-lg`
- **字体配置**: Inter (UI) + JetBrains Mono (代码)

## 📝 Sanity 数据模式

**文章模式 (Post Schema)：**
```typescript
{
  title: string,              // 文章标题
  slug: string,               // URL 路径
  language: 'zh-CN' | 'en',   // 语言
  description: string,        // 文章描述
  publishedAt: string,        // 发布时间
  tags: string[],             // 标签数组
  content: PortableTextBlock[], // 富文本内容
  readingTime: number         // 阅读时间（自动计算）
}
```

**数据查询 (GROQ Queries)：**
- `allPosts`: 获取所有已发布文章
- `postsByLanguage`: 根据语言获取文章列表
- `postBySlugAndLanguage`: 获取特定文章详情
- `postsByLanguagePaginated`: 分页查询文章
- `searchPosts`: 全文搜索
- `postsByTag`: 按标签筛选
- `postArchive`: 归档查询

阅读时间计算公式：`round(length(pt::text(content)) / 5 / 250)`

## 🌍 国际化系统

**支持语言：**
- 中文 (zh-CN) - 默认语言
- 英文 (en)

**路由结构：**
- `/[locale]/`: 国际化路由前缀
- 自动语言检测和重定向
- Cookie 存储语言偏好

**翻译系统：**
- `src/hooks/useTranslations.ts`: 翻译 Hook
- `src/lib/translations.ts`: 翻译字典
- 支持日期格式化和复数处理

## 🧩 核心组件

**布局组件：**
- `NavigationHeader`: 响应式导航栏，支持语言和主题切换
- `FooterComponent`: 页脚组件，显示社交链接和版权信息
- `MobileNav`: 移动端导航菜单

**文章组件：**
- `PostCard`: 文章卡片，玻璃拟态效果
- `PostContent`: 文章内容渲染器
- `PostTags`: 标签展示组件
- `PostArchive`: 归档列表组件

**UI 组件库：**
- `Button`: 多变体按钮组件
- `Card`: 玻璃拟态卡片组件
- `Badge`: 标签/徽章组件
- `Input/Textarea`: 表单组件
- `Skeleton`: 骨架屏加载组件

**特殊组件：**
- `LazyImage`: 懒加载图片组件
- `SmartLoading`: 智能加载状态管理
- `LanguageToggle`: 语言切换器
- `ThemeToggle`: 主题切换器
- `SearchBar`: 搜索栏组件

## ⚡ 性能优化

**图片优化：**
- Sanity 图片 CDN 自动优化
- 响应式图片处理
- 懒加载支持
- WebP 格式自动转换

**加载优化：**
- 组件懒加载 (React.lazy)
- 路由预加载
- 智能加载状态管理
- 分页减少初始数据量

**构建优化：**
- 静态生成 (SSG) 所有页面
- 增量静态再生 (ISR) 支持
- Turbopack 快速开发构建
- Tree Shaking 和代码分割

## 🔧 开发配置

**环境变量 (.env.local)：**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=读取令牌（可选，用于预览）
```

**VSCode 推荐扩展：**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Error Lens

## 📝 代码注释规范

### 注释原则

**所有代码都必须添加详细的中文注释**，遵循以下规则：

1. **文件级注释**：每个组件/模块文件顶部必须有功能说明
2. **函数级注释**：所有导出函数/组件都要有详细说明
3. **复杂逻辑注释**：关键代码段必须有行内注释
4. **接口注释**：TypeScript 接口的每个属性都要注释

### 注释格式标准

**1. 文件顶部注释**
```typescript
/**
 * 组件名称和主要功能描述
 * 详细说明组件的用途、特性和在系统中的作用
 * 如有特殊依赖或注意事项也要说明
 */
```

**2. 组件/函数注释**
```typescript
/**
 * 函数/组件的具体功能说明
 * @param paramName 参数说明
 * @returns 返回值说明
 * 
 * @example
 * // 使用示例（如适用）
 * functionName(param)
 */
```

**3. 接口注释**
```typescript
// 接口整体说明
interface ComponentProps {
  title: string;        // 标题文本
  isVisible: boolean;   // 是否可见
  onClick?: () => void; // 点击事件处理器（可选）
}
```

**4. 行内注释**
```typescript
// 重要逻辑的说明
const result = complexFunction(); 

{/* JSX 中的重要元素说明 */}
<div className="important-section">
  {/* 条件渲染的业务逻辑解释 */}
  {isVisible && <Component />}
</div>
```

### 注释内容要求

**必须包含的信息：**
- 功能目的和业务意义
- 参数说明和类型信息  
- 返回值或渲染内容说明
- 重要的设计决策和原因
- 与其他模块的关系
- 特殊情况和边界条件处理

## 🚦 开发流程

### 新功能开发

1. **创建分支**
   ```bash
   git checkout -b feature/功能名称
   ```

2. **开发功能**
   - 遵循代码注释规范
   - 使用 TypeScript 类型
   - 保持组件化和模块化

3. **测试验证**
   ```bash
   pnpm lint          # 代码检查
   pnpm type-check    # 类型检查
   pnpm build         # 构建测试
   ```

4. **提交代码**
   - 使用语义化提交信息
   - 更新相关文档

### 内容管理

1. **访问 Sanity Studio**
   - 开发环境: `http://localhost:3000/studio`
   - 生产环境: `你的域名/studio`

2. **创建文章**
   - 填写标题、描述、标签
   - 选择语言（中文/英文）
   - 使用 Portable Text 编辑器编写内容
   - 预览后发布

3. **管理内容**
   - 支持草稿和发布状态
   - 版本历史记录
   - 实时预览功能

## 🐛 常见问题

**Q: 如何添加新的语言支持？**
A: 在 `src/config/i18n.ts` 添加语言配置，在 `src/lib/translations.ts` 添加翻译字典。

**Q: 如何自定义主题颜色？**
A: 修改 `tailwind.config.js` 中的颜色配置，主要调整 primary 和 secondary 颜色。

**Q: 如何优化 SEO？**
A: 在每个页面的 `generateMetadata` 函数中配置元数据，确保填写完整的 Open Graph 信息。

**Q: 如何添加新的 Portable Text 组件？**
A: 在 `src/components/post/portable-text-components.tsx` 中添加自定义组件。

## 📚 相关资源

- [Next.js 文档](https://nextjs.org/docs)
- [Sanity 文档](https://www.sanity.io/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Portable Text 文档](https://github.com/portabletext/portabletext)

## 🎯 开发建议

1. **保持代码质量**
   - 遵循 ESLint 规则
   - 添加完整的类型定义
   - 编写清晰的注释

2. **优化用户体验**
   - 确保响应式设计
   - 添加加载状态
   - 处理错误情况

3. **性能优先**
   - 使用图片优化
   - 实施懒加载
   - 减少包体积

4. **持续改进**
   - 监控性能指标
   - 收集用户反馈
   - 定期更新依赖