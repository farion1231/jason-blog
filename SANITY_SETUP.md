# Sanity CMS 设置指南

你的博客已经成功升级到使用 Sanity Headless CMS！现在你需要完成以下设置：

## 1. 创建 Sanity 项目

1. 访问 [sanity.io](https://sanity.io)
2. 注册/登录账号
3. 创建新项目，记住项目 ID

## 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，填入你的项目信息：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
```

## 3. 更新配置文件

编辑 `sanity.config.ts`，将 `projectId` 替换为你的真实项目 ID。

## 4. 部署 Sanity Studio

运行以下命令部署 Studio：

```bash
# 部署到 Sanity 官方域名
npx sanity deploy

# 或者启动本地 Studio
pnpm dev
# 然后访问 http://localhost:3000/studio
```

## 5. 迁移现有内容

你可以手动将 `content/posts/` 下的 Markdown 文件内容复制到 Sanity Studio 中。

## 6. 开始使用

- 访问 Studio 界面创建和编辑文章
- 使用富文本编辑器，支持：
  - 标题、段落、列表
  - 代码块（支持语法高亮）
  - 图片上传
  - 链接和格式化文本
  - 引用块

## 特性

- ✅ 可视化内容编辑器
- ✅ 实时预览
- ✅ 图片管理和 CDN
- ✅ 版本控制和协作
- ✅ 自动化部署
- ✅ API 驱动的内容分发

现在你的博客拥有了专业级的内容管理系统！