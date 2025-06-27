export type Locale = 'zh-CN' | 'en';

export const translations = {
  'zh-CN': {
    // 导航
    nav: {
      home: '首页',
      projects: '项目',
      about: '关于',
      blog: 'Jason\'s Blog',
    },
    // 页脚
    footer: {
      slogan: '简洁 • 优雅 • 分享',
      copyright: '© 2025 Jason\'s Blog. All rights reserved.',
    },
    // 首页
    home: {
      title: '我的博客',
      subtitle: (count: number) => `共 ${count} 篇文章 • 持续更新中 🌱`,
      noPosts: '还没有发布任何文章',
      noPostsDesc: '敬请期待更多精彩内容...',
      readMore: '阅读全文',
      readingTime: (time: number) => `⏱️ ${time} 分钟阅读`,
    },
    // 关于页面
    about: {
      title: '关于我',
      subtitle: '个人简介',
      content: `
        <p>你好！我是 Jason，一名充满热情的全栈开发者。</p>
        <p>我专注于现代 Web 技术栈，包括 React、Next.js、TypeScript 和 Node.js。</p>
        <p>通过这个博客，我希望分享我的技术经验、学习心得以及对技术的思考。</p>
        <p>如果你对我感兴趣，欢迎通过邮件联系我！</p>
      `,
      skills: '技能',
      contact: '联系方式',
      email: '邮箱',
    },
    // 项目页面
    projects: {
      title: '我的项目',
      subtitle: '探索我的作品集',
      featured: '精选项目',
      all: '所有项目',
      demo: '演示',
      code: '代码',
      status: {
        completed: '已完成',
        inProgress: '开发中',
        planned: '计划中'
      }
    },
    // 文章页面
    post: {
      backToHome: '← 返回首页',
      publishedOn: '发布于',
      tags: '标签',
      readingTime: (time: number) => `${time} 分钟阅读`,
    },
    // 错误页面
    error: {
      title: '出错了',
      message: '遇到了意外错误，别担心，这不是你的问题！',
      tryAgain: '重试',
      goHome: '回到首页',
      notFound: {
        title: '页面未找到',
        message: '你要找的页面不存在或已被移动。',
        backToHome: '返回首页',
      },
      post: {
        title: '文章加载失败',
        message: '无法加载这篇文章，可能已被移动或删除。',
        retry: '重试',
        allPosts: '所有文章',
      },
    },
  },
  'en': {
    // 导航
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      blog: 'Jason\'s Blog',
    },
    // 页脚
    footer: {
      slogan: 'Simple • Elegant • Share',
      copyright: '© 2025 Jason\'s Blog. All rights reserved.',
    },
    // 首页
    home: {
      title: 'My Blog',
      subtitle: (count: number) => `${count} articles • Continuously updating 🌱`,
      noPosts: 'No articles published yet',
      noPostsDesc: 'Stay tuned for more exciting content...',
      readMore: 'Read More',
      readingTime: (time: number) => `⏱️ ${time} min read`,
    },
    // 关于页面
    about: {
      title: 'About Me',
      subtitle: 'Personal Introduction',
      content: `
        <p>Hello! I'm Jason, a passionate full-stack developer.</p>
        <p>I focus on modern web technology stack, including React, Next.js, TypeScript, and Node.js.</p>
        <p>Through this blog, I hope to share my technical experience, learning insights, and thoughts on technology.</p>
        <p>If you're interested in me, feel free to contact me via email!</p>
      `,
      skills: 'Skills',
      contact: 'Contact',
      email: 'Email',
    },
    // 项目页面
    projects: {
      title: 'My Projects',
      subtitle: 'Explore my portfolio',
      featured: 'Featured Projects',
      all: 'All Projects',
      demo: 'Demo',
      code: 'Code',
      status: {
        completed: 'Completed',
        inProgress: 'In Progress',
        planned: 'Planned'
      }
    },
    // 文章页面
    post: {
      backToHome: '← Back to Home',
      publishedOn: 'Published on',
      tags: 'Tags',
      readingTime: (time: number) => `${time} min read`,
    },
    // 错误页面
    error: {
      title: 'Oops! Something went wrong',
      message: 'We encountered an unexpected error. Don\'t worry, it\'s not your fault!',
      tryAgain: 'Try again',
      goHome: 'Go home',
      notFound: {
        title: 'Page not found',
        message: 'The page you\'re looking for doesn\'t exist or has been moved.',
        backToHome: 'Back to home',
      },
      post: {
        title: 'Failed to load article',
        message: 'We couldn\'t load this article. It might have been moved or deleted.',
        retry: 'Retry',
        allPosts: 'All posts',
      },
    },
  },
};

export function getTranslations(locale: Locale) {
  return translations[locale];
}