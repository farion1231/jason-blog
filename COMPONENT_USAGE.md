# 组件使用文档

本文档介绍了 Jason's Blog 项目中所有自定义组件的使用方法和最佳实践。

## 目录

- [基础 UI 组件](#基础-ui-组件)
  - [Button 按钮](#button-按钮)
  - [Card 卡片](#card-卡片)
  - [Badge 徽章](#badge-徽章)
  - [Input 输入框](#input-输入框)
  - [Textarea 文本域](#textarea-文本域)
  - [Select 选择器](#select-选择器)
  - [Dialog 对话框](#dialog-对话框)
  - [Dropdown 下拉菜单](#dropdown-下拉菜单)
  - [Switch 开关](#switch-开关)
  - [Toggle 切换按钮](#toggle-切换按钮)
  - [Skeleton 骨架屏](#skeleton-骨架屏)
  - [Toast 通知](#toast-通知)
  - [Alert 警告](#alert-警告)
- [复杂组件](#复杂组件)
  - [PostCard 文章卡片](#postcard-文章卡片)
  - [SearchBox 搜索框](#searchbox-搜索框)
  - [TagCloud 标签云](#tagcloud-标签云)
  - [ThemeToggle 主题切换](#themetoggle-主题切换)
  - [LanguageToggle 语言切换](#languagetoggle-语言切换)
- [布局组件](#布局组件)
  - [NavigationHeader 导航栏](#navigationheader-导航栏)
  - [FooterComponent 页脚](#footercomponent-页脚)
- [其他组件](#其他组件)
  - [LazyImage 懒加载图片](#lazyimage-懒加载图片)
  - [Loading 加载状态](#loading-加载状态)
  - [SmartLoading 智能加载](#smartloading-智能加载)

## 基础 UI 组件

### Button 按钮

支持多种变体和尺寸的按钮组件。

```tsx
import { Button } from '@/components/ui/button'

// 基础用法
<Button>默认按钮</Button>

// 不同变体
<Button variant="default">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>
<Button variant="gradient">渐变按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="default">默认按钮</Button>
<Button size="lg">大按钮</Button>

// 作为链接使用
<Button asChild>
  <Link href="/path">链接按钮</Link>
</Button>
```

### Card 卡片

支持玻璃拟态效果的卡片容器组件。

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

// 基础卡片
<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述</CardDescription>
  </CardHeader>
  <CardContent>
    卡片内容
  </CardContent>
  <CardFooter>
    卡片底部
  </CardFooter>
</Card>

// 玻璃拟态效果
<Card variant="glass" hover>
  <CardContent>悬停时有动画效果</CardContent>
</Card>
```

### Badge 徽章

用于显示标签或状态的小型标识组件。

```tsx
import { Badge } from '@/components/ui/badge'

// 不同变体
<Badge>默认徽章</Badge>
<Badge variant="secondary">次要徽章</Badge>
<Badge variant="outline">轮廓徽章</Badge>
<Badge variant="gradient">渐变徽章</Badge>
```

### Input 输入框

增强的输入框组件，支持错误状态。

```tsx
import { Input } from '@/components/ui/input'

// 基础用法
<Input type="text" placeholder="请输入..." />

// 带错误状态
<Input type="email" error placeholder="邮箱地址" />

// 受控组件
const [value, setValue] = useState('')
<Input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>
```

### Textarea 文本域

多行文本输入组件。

```tsx
import { Textarea } from '@/components/ui/textarea'

// 基础用法
<Textarea placeholder="请输入多行文本..." />

// 设置行数
<Textarea rows={5} placeholder="固定5行高度" />

// 错误状态
<Textarea error placeholder="内容有误" />
```

### Select 选择器

下拉选择组件。

```tsx
import { Select } from '@/components/ui/select'

// 基础用法
<Select>
  <option value="">请选择</option>
  <option value="1">选项一</option>
  <option value="2">选项二</option>
</Select>

// 错误状态
<Select error>
  <option value="">请选择</option>
</Select>
```

### Dialog 对话框

模态对话框组件。

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

// 基础用法
<Dialog>
  <DialogTrigger asChild>
    <Button>打开对话框</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>对话框标题</DialogTitle>
      <DialogDescription>
        对话框描述内容
      </DialogDescription>
    </DialogHeader>
    <div>对话框主体内容</div>
    <DialogFooter>
      <Button variant="outline">取消</Button>
      <Button>确定</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dropdown 下拉菜单

下拉菜单组件，支持多种触发方式。

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '@/components/ui/dropdown'

// 基础用法
<Dropdown>
  <DropdownTrigger asChild>
    <Button>菜单</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem onSelect={() => console.log('点击了编辑')}>
      编辑
    </DropdownItem>
    <DropdownItem onSelect={() => console.log('点击了复制')}>
      复制
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem onSelect={() => console.log('点击了删除')}>
      删除
    </DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Switch 开关

用于二元选择的开关组件。

```tsx
import { Switch } from '@/components/ui/switch'

// 基础用法
const [enabled, setEnabled] = useState(false)

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  aria-label="启用功能"
/>
```

### Toggle 切换按钮

可切换状态的按钮组件。

```tsx
import { Toggle } from '@/components/ui/toggle'

// 基础用法
const [pressed, setPressed] = useState(false)

<Toggle
  pressed={pressed}
  onPressedChange={setPressed}
  aria-label="切换粗体"
>
  <Bold className="h-4 w-4" />
</Toggle>

// 不同变体
<Toggle variant="outline">轮廓样式</Toggle>
```

### Skeleton 骨架屏

加载占位组件。

```tsx
import { Skeleton } from '@/components/ui/skeleton'

// 基础用法
<Skeleton className="w-full h-4" />

// 圆形骨架屏
<Skeleton className="w-12 h-12 rounded-full" />

// 带动画
<Skeleton className="w-full h-20" animate />
```

### Toast 通知

全局通知组件系统。

```tsx
import { useToast } from '@/lib/toast'
import { ToastProvider } from '@/lib/toast'

// 1. 在应用根组件包裹 Provider
function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <YourApp />
    </ToastProvider>
  )
}

// 2. 在组件中使用
function MyComponent() {
  const { toast } = useToast()

  // 不同类型的通知
  const handleSuccess = () => {
    toast.success('操作成功！')
  }

  const handleError = () => {
    toast.error('操作失败', {
      description: '请稍后重试',
      duration: 10000 // 10秒后自动关闭
    })
  }

  const handleWarning = () => {
    toast.warning('注意', {
      description: '这是一个警告信息'
    })
  }

  const handleInfo = () => {
    toast.info('提示', {
      description: '这是一个提示信息'
    })
  }

  // 自定义通知
  const handleCustom = () => {
    toast.custom({
      title: '自定义标题',
      description: '自定义内容',
      duration: 0 // 不自动关闭
    })
  }
}
```

### Alert 警告

静态警告提示组件。

```tsx
import { Alert, AlertDialog } from '@/components/ui/alert'

// 基础 Alert
<Alert type="info" title="提示">
  这是一个信息提示
</Alert>

// 不同类型
<Alert type="success" title="成功">
  操作已成功完成
</Alert>

<Alert type="error" title="错误">
  发生了一个错误
</Alert>

<Alert type="warning" title="警告">
  请注意这个警告信息
</Alert>

// 可关闭的 Alert
<Alert 
  type="info" 
  title="可关闭提示" 
  closable 
  onClose={() => console.log('关闭了')}
>
  点击右上角可以关闭
</Alert>

// AlertDialog 样式
<AlertDialog
  type="warning"
  title="确认操作"
  description="您确定要执行这个操作吗？"
  footer={
    <div className="flex gap-2">
      <Button variant="outline">取消</Button>
      <Button>确定</Button>
    </div>
  }
>
  <p>这个操作不可撤销，请谨慎操作。</p>
</AlertDialog>
```

## 复杂组件

### PostCard 文章卡片

用于展示文章摘要的卡片组件。

```tsx
import PostCard from '@/components/post/PostCard'

const post = {
  slug: 'my-first-post',
  title: '我的第一篇文章',
  description: '这是文章的描述内容...',
  date: '2024-01-01',
  readingTime: 5,
  tags: ['React', 'Next.js']
}

<PostCard
  post={post}
  locale="zh-CN"
  dateLocale={zhCN}
  t={{
    readingTime: (time) => `${time} 分钟`,
    readMore: '阅读更多'
  }}
/>
```

### SearchBox 搜索框

全功能搜索组件，支持搜索建议。

```tsx
import { SearchBox } from '@/components/ui/SearchBox'

<SearchBox
  locale="zh-CN"
  placeholder="搜索文章..."
/>
```

### TagCloud 标签云

标签云展示组件。

```tsx
import { TagCloud } from '@/components/ui/TagCloud'

const tags = ['React', 'Vue', 'Next.js', 'TypeScript', 'JavaScript']

<TagCloud 
  tags={tags} 
  locale="zh-CN"
/>
```

### ThemeToggle 主题切换

深色/浅色模式切换组件。

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle'

<ThemeToggle />
```

### LanguageToggle 语言切换

多语言切换组件。

```tsx
import { LanguageToggle } from '@/components/ui/LanguageToggle'

<LanguageToggle currentLocale="zh-CN" />
```

## 布局组件

### NavigationHeader 导航栏

网站顶部导航栏组件。

```tsx
import NavigationHeader from '@/components/layout/NavigationHeader'

<NavigationHeader locale="zh-CN" />
```

### FooterComponent 页脚

网站底部页脚组件。

```tsx
import FooterComponent from '@/components/layout/FooterComponent'

<FooterComponent locale="zh-CN" />
```

## 其他组件

### LazyImage 懒加载图片

支持懒加载的图片组件。

```tsx
import LazyImage from '@/components/common/LazyImage'

<LazyImage
  src="/images/photo.jpg"
  alt="照片描述"
  width={800}
  height={600}
  className="rounded-lg"
/>

// 优先加载的图片
<LazyImage
  src="/images/hero.jpg"
  alt="主图"
  width={1200}
  height={600}
  priority
/>
```

### Loading 加载状态

基础加载组件。

```tsx
import Loading from '@/components/common/Loading'

// 基础用法
<Loading />

// 自定义文本
<Loading text="正在加载..." />
```

### SmartLoading 智能加载

带有动态文案的智能加载组件。

```tsx
import { SmartLoading } from '@/components/common/SmartLoading'

<SmartLoading locale="zh-CN" />
```

## 性能优化建议

1. **使用 React.memo 的组件**
   - PostCard、Badge、LazyImage 已经使用了 React.memo 优化
   - 在列表中使用这些组件时性能会更好

2. **懒加载**
   - 使用 LazyImage 代替普通 img 标签
   - 大型组件可以使用 React.lazy 进行代码分割

3. **状态管理**
   - 避免在父组件中频繁更新状态
   - 使用 useCallback 和 useMemo 优化传递给子组件的 props

4. **列表渲染**
   - 为列表项提供稳定的 key
   - 考虑使用虚拟滚动库处理长列表

## 样式定制

所有组件都支持通过 `className` 属性添加自定义样式：

```tsx
<Button className="custom-class">自定义样式</Button>
<Card className="bg-gradient-to-r from-blue-500 to-pink-500">
  渐变背景卡片
</Card>
```

组件使用 Tailwind CSS 构建，可以直接使用 Tailwind 的工具类进行样式定制。