# 组件重构剩余工作清单

## 已完成的工作 ✅

### 基础 UI 组件
- [x] Button - 按钮组件（支持多种变体）
- [x] Card - 卡片组件（包含 glass 效果）
- [x] Badge - 徽章组件（支持渐变效果）
- [x] Skeleton - 骨架屏组件
- [x] Input - 输入框组件
- [x] Textarea - 文本域组件
- [x] Select - 下拉选择组件
- [x] Dialog - 对话框组件
- [x] Dropdown - 下拉菜单组件
- [x] Toggle - 切换按钮组件
- [x] Switch - 开关组件

### 核心组件重构
- [x] NavigationHeader - 导航栏组件（已拆分为子组件）
- [x] SearchBox - 搜索框组件（已拆分为 SearchInput 和 SearchResults）
- [x] PostCard - 文章卡片组件（使用新的 UI 组件）
- [x] Pagination - 分页组件（使用 Button 组件）

## 所有工作已完成 ✅

### 中等优先级组件重构 ✅ 已完成

#### 1. ThemeToggle 组件 ✅
- [x] 使用 Toggle 或 Switch 组件重构
- [x] 移除对 @heroicons/react 的依赖
- [x] 优化主题切换逻辑
- 文件路径：`src/components/ui/ThemeToggle.tsx`

#### 2. LanguageToggle 组件 ✅
- [x] 使用 Dropdown 组件重构
- [x] 优化语言切换的用户体验
- [x] 考虑添加语言图标或标识
- 文件路径：`src/components/ui/LanguageToggle.tsx`

#### 3. Loading 和 SmartLoading 组件 ✅
- [x] 基于 Skeleton 组件重构 Loading
- [x] 优化 SmartLoading 的文案切换逻辑
- [x] 考虑合并为一个组件，通过 props 控制行为
- 文件路径：
  - `src/components/common/Loading.tsx`
  - `src/components/common/SmartLoading.tsx`

#### 4. TagCloud 组件 ✅
- [x] 使用 Badge 组件显示标签
- [x] 优化标签大小计算逻辑
- [x] 考虑添加标签过滤功能
- 文件路径：`src/components/ui/TagCloud.tsx`

#### 5. FooterComponent 组件 ✅
- [x] 使用新的组件系统重构
- [x] 优化响应式布局
- [x] 考虑添加更多社交媒体链接
- 文件路径：`src/components/layout/FooterComponent.tsx`

#### 6. ErrorLayout 组件 ✅
- [x] 使用新的 Button 组件
- [x] 优化错误页面的视觉效果
- [x] 考虑添加更多错误类型处理
- 文件路径：`src/components/common/ErrorLayout.tsx`

### 低优先级任务 ✅ 已完成

#### 7. 创建 Toast/Alert 组件系统 ✅
- [x] 创建 Toast 组件用于通知
- [x] 创建 Alert 组件用于警告/提示
- [x] 实现 Toast 的全局管理器
- [x] 支持不同类型（success、error、warning、info）

#### 8. 优化组件导出 ✅
- [x] 更新 `src/components/ui/index.ts` 添加所有组件导出
- [x] 创建组件文档，说明各组件的使用方法（COMPONENT_USAGE.md）
- [ ] 考虑创建组件预览页面

#### 9. 移除旧依赖 ✅
- [x] 完全移除 @heroicons/react 依赖（已替换所有使用处）
- [x] 统一使用 lucide-react 图标
- [x] 更新 package.json 清理未使用的依赖（移除了 @sanity/code-input）

### 测试和优化

#### 10. 功能测试 ✅
- [x] 运行 `pnpm dev` 测试所有页面
- [x] 检查响应式布局是否正常
- [x] 测试暗色模式切换
- [x] 测试语言切换功能
- [x] 测试搜索功能

#### 11. 性能优化 ✅
- [x] 检查组件是否需要 React.memo 优化
- [x] 优化大型列表的渲染性能（PostCard、Badge、LazyImage 已添加 React.memo）
- [x] 检查并优化重复渲染问题

#### 12. 代码质量 ✅
- [x] 运行 `pnpm lint` 修复代码规范问题
- [x] 添加必要的 TypeScript 类型定义
- [x] 为复杂组件添加注释说明

## 实施建议

1. **优先完成 ThemeToggle 和 LanguageToggle**
   - 这两个组件使用频率高，重构后能立即提升用户体验

2. **批量处理相似组件**
   - Loading 和 SmartLoading 可以一起重构
   - 所有使用旧图标库的组件可以一起更新

3. **测试驱动开发**
   - 每完成一个组件就立即测试
   - 确保不破坏现有功能

4. **保持设计一致性**
   - 继续使用小清新风格
   - 保持蓝粉渐变的主题色
   - 确保圆角、阴影等细节统一

## 预计工作量

- ThemeToggle 重构：0.5 小时
- LanguageToggle 重构：0.5 小时
- Loading 组件重构：1 小时
- TagCloud 重构：1 小时
- FooterComponent 重构：0.5 小时
- ErrorLayout 重构：1 小时
- Toast/Alert 系统：2 小时
- 测试和优化：2 小时

**总计预估：8-10 小时**

## 备注

- 所有组件重构都应保持向后兼容
- 重构时注意保留原有的动画效果
- 可以考虑使用 Storybook 来展示组件库
- 完成后可以考虑将组件库抽取为独立包