export interface Project {
  id: string;
  title: {
    'zh-CN': string;
    'en': string;
  };
  description: {
    'zh-CN': string;
    'en': string;
  };
  longDescription: {
    'zh-CN': string;
    'en': string;
  };
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "jason-blog",
    title: {
      'zh-CN': "Jason's Blog",
      'en': "Jason's Blog"
    },
    description: {
      'zh-CN': "基于 Next.js 15 和 Sanity CMS 的现代化博客系统",
      'en': "Modern blog system built with Next.js 15 and Sanity CMS"
    },
    longDescription: {
      'zh-CN': "一个采用小清新设计风格的个人博客系统，使用 Next.js 15 App Router、Sanity Headless CMS、Tailwind CSS 等现代技术栈构建。支持中英双语、深色模式、响应式设计，具备完整的内容管理功能。",
      'en': "A personal blog system with fresh design, built using Next.js 15 App Router, Sanity Headless CMS, Tailwind CSS and other modern tech stacks. Features bilingual support, dark mode, responsive design, and complete content management functionality."
    },
    tags: ["Next.js", "React", "TypeScript", "Sanity CMS", "Tailwind CSS"],
    demoUrl: "https://your-blog-domain.com",
    githubUrl: "https://github.com/yourusername/jason-blog",
    status: "completed",
    featured: true,
  },
  {
    id: "portfolio-website",
    title: {
      'zh-CN': "个人作品集网站",
      'en': "Personal Portfolio Website"
    },
    description: {
      'zh-CN': "展示个人项目和技能的作品集网站",
      'en': "Portfolio website showcasing personal projects and skills"
    },
    longDescription: {
      'zh-CN': "使用现代 Web 技术构建的个人作品集网站，包含项目展示、技能介绍、联系方式等模块。采用响应式设计，支持多种设备访问。",
      'en': "Personal portfolio website built with modern web technologies, featuring project showcase, skills introduction, contact information and more. Responsive design supports multiple devices."
    },
    tags: ["React", "TypeScript", "CSS3", "Animation"],
    demoUrl: "https://your-portfolio.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    status: "in-progress",
    featured: true,
  },
  {
    id: "task-manager",
    title: {
      'zh-CN': "任务管理系统",
      'en': "Task Management System"
    },
    description: {
      'zh-CN': "一个功能完整的任务管理和协作平台",
      'en': "A full-featured task management and collaboration platform"
    },
    longDescription: {
      'zh-CN': "基于现代技术栈开发的任务管理系统，支持项目管理、团队协作、进度跟踪等功能。具备直观的用户界面和强大的数据管理能力。",
      'en': "Task management system developed with modern tech stack, supporting project management, team collaboration, progress tracking and more. Features intuitive UI and powerful data management capabilities."
    },
    tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Auth"],
    githubUrl: "https://github.com/yourusername/task-manager",
    status: "planned",
    featured: false,
  },
  {
    id: "weather-app",
    title: {
      'zh-CN': "天气预报应用",
      'en': "Weather Forecast App"
    },
    description: {
      'zh-CN': "基于地理位置的天气预报应用",
      'en': "Location-based weather forecast application"
    },
    longDescription: {
      'zh-CN': "一个美观的天气预报应用，支持根据用户位置自动获取天气信息，提供详细的天气数据和未来几天的预报。界面简洁优雅，用户体验良好。",
      'en': "A beautiful weather forecast app that automatically gets weather information based on user location, providing detailed weather data and multi-day forecasts. Clean, elegant interface with great user experience."
    },
    tags: ["React", "Weather API", "Geolocation", "PWA"],
    demoUrl: "https://your-weather-app.com",
    githubUrl: "https://github.com/yourusername/weather-app",
    status: "completed",
    featured: false,
  },
  {
    id: "ecommerce-platform",
    title: {
      'zh-CN': "电商平台系统",
      'en': "E-commerce Platform"
    },
    description: {
      'zh-CN': "全栈电商解决方案",
      'en': "Full-stack e-commerce solution"
    },
    longDescription: {
      'zh-CN': "一个功能完整的电商平台，包含商品管理、订单处理、支付集成、用户管理等核心功能。采用微服务架构，支持高并发和可扩展性。",
      'en': "A fully-featured e-commerce platform with product management, order processing, payment integration, user management and other core features. Uses microservice architecture supporting high concurrency and scalability."
    },
    tags: ["Next.js", "Node.js", "MongoDB", "Redis", "Payment"],
    status: "planned",
    featured: false,
  },
];

export const getProjectsByStatus = (status: Project["status"]) => {
  return projects.filter((project) => project.status === status);
};

export const getFeaturedProjects = () => {
  return projects.filter((project) => project.featured);
};

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};
