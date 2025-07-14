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

## 代码注释规范

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

**业务逻辑注释：**
- 数据流向和处理逻辑
- 状态管理和生命周期
- 用户交互和响应机制
- 性能优化考虑

**技术实现注释：**
- 算法选择原因
- 第三方库使用说明
- 配置参数含义
- 兼容性和限制说明

### 示例注释模板

**React 组件示例：**
```typescript
/**
 * 文章卡片组件
 * 用于在列表页面展示文章摘要信息，包含标题、描述、发布日期、阅读时间、标签等
 * 采用玻璃拟态设计风格，支持悬停交互效果
 */
interface PostCardProps {
  post: PostMeta;         // 文章元数据
  locale: Locale;         // 当前语言环境
  t: TranslationFunction; // 国际化翻译函数
}

/**
 * 文章卡片主组件
 * 渲染单篇文章的卡片视图，包含完整的文章信息和交互元素
 */
export default function PostCard({ post, locale, t }: PostCardProps) {
  return (
    <Card variant="glass" hover className="group overflow-hidden">
      {/* 文章头部：标题和元信息 */}
      <CardHeader>
        {/* 标题链接 - 悬停时颜色变化 */}
        <CardTitle className="group-hover:text-blue-500 transition-colors">
          <Link href={`/${locale}/posts/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
```

**Hook 示例：**
```typescript
/**
 * 防抖 Hook
 * 延迟更新值，避免频繁触发，常用于搜索输入、API调用等场景
 * 在指定延迟时间内，如果值再次改变，则重新计时
 */

/**
 * 防抖Hook主函数
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖处理后的值
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 设置定时器，延迟更新防抖值
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 清理函数：在值再次改变或组件卸载时清除定时器
    return () => clearTimeout(handler)
  }, [value, delay]) // 依赖值或延迟时间改变时重新执行

  return debouncedValue
}
```

### 注释质量检查

**编写代码时必须确保：**
- 每个文件都有顶部功能说明
- 所有导出的函数/组件都有详细注释
- 复杂业务逻辑有清晰的解释
- 接口定义完整且每个属性都有说明
- 重要的 JSX 结构有适当的注释

**AI 助手工作时：**
- 新建任何组件都要按此规范添加注释
- 修改现有代码时要更新相关注释
- 重构代码时要保持注释的准确性
- 发现缺失注释时要主动补充