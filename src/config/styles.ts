// 统一的样式常量，减少重复的样式类
export const styles = {
  // 布局相关
  layout: {
    container: 'container mx-auto max-w-4xl px-4',
    page: 'py-8',
    section: 'py-12',
    center: 'flex flex-col items-center justify-center',
    stack: 'flex flex-col gap-4',
  },
  
  // 错误页面
  error: {
    container: 'flex flex-col items-center justify-center min-h-[50vh] px-4',
    wrapper: 'text-center space-y-6 max-w-lg',
    icon: 'h-24 w-24',
    title: 'text-3xl font-bold text-gray-800 dark:text-white',
    message: 'text-gray-600 dark:text-gray-400',
  },
  
  // 按钮样式
  button: {
    primary: 'inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors',
    secondary: 'inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors',
    ghost: 'inline-flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors',
  },
  
  // 卡片样式
  card: {
    base: 'bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow',
    glass: 'glass rounded-xl',
    padding: 'p-6',
  },
  
  // 文本样式
  text: {
    title: 'text-3xl font-bold text-gray-900 dark:text-white',
    subtitle: 'text-xl text-gray-600 dark:text-gray-400',
    body: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-500',
  },
  
  // 通用样式组合
  combine: (...classes: string[]) => classes.join(' '),
};