import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Personal Blog',
    description: '基于 Next.js 15 构建的小清新个人博客系统，支持 Markdown 文章，代码高亮，响应式设计。',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Markdown'],
    githubUrl: 'https://github.com/username/personal-blog',
    demoUrl: 'https://blog.example.com',
    stars: 42,
    language: 'TypeScript',
    status: 'active',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'project-2',
    name: 'React Component Library',
    description: '一套现代化的 React 组件库，提供常用的 UI 组件和实用工具。',
    tags: ['React', 'TypeScript', 'Storybook', 'CSS-in-JS'],
    githubUrl: 'https://github.com/username/react-components',
    stars: 128,
    language: 'TypeScript',
    status: 'active',
    featured: true,
    createdAt: '2023-11-20',
  },
  {
    id: 'project-3',
    name: 'API Gateway',
    description: '轻量级的 API 网关服务，支持路由转发、限流、认证等功能。',
    tags: ['Node.js', 'Express', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/username/api-gateway',
    stars: 67,
    language: 'JavaScript',
    status: 'completed',
    createdAt: '2023-08-10',
  },
  {
    id: 'project-4',
    name: 'Data Visualization Dashboard',
    description: '基于 D3.js 的数据可视化仪表板，支持多种图表类型和实时数据更新。',
    tags: ['D3.js', 'Vue.js', 'WebSocket', 'Chart.js'],
    githubUrl: 'https://github.com/username/data-dashboard',
    demoUrl: 'https://dashboard.example.com',
    stars: 89,
    language: 'JavaScript',
    status: 'active',
    createdAt: '2023-06-05',
  },
  {
    id: 'project-5',
    name: 'CLI Tool',
    description: '开发者工具命令行应用，提供项目初始化、代码生成等功能。',
    tags: ['Python', 'Click', 'Jinja2', 'Poetry'],
    githubUrl: 'https://github.com/username/dev-cli',
    stars: 23,
    language: 'Python',
    status: 'active',
    createdAt: '2023-03-15',
  },
  {
    id: 'project-6',
    name: 'Mobile App',
    description: '跨平台移动应用，提供便捷的生活服务功能。',
    tags: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    githubUrl: 'https://github.com/username/mobile-app',
    stars: 156,
    language: 'TypeScript',
    status: 'archived',
    createdAt: '2022-12-01',
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter(project => project.status === status);
}

export function getProjectsByLanguage(language: string): Project[] {
  return projects.filter(project => project.language === language);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => 
    project.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAllLanguages(): string[] {
  const languages = new Set<string>();
  projects.forEach(project => {
    languages.add(project.language);
  });
  return Array.from(languages).sort();
}