export const siteConfig = {
  name: "Jason's Blog",
  description: "A clean and elegant personal blog",
  author: {
    name: 'Jason',
    email: 'jason@example.com',
    skills: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 
      'Python', 'PostgreSQL', 'Docker', 'AWS'
    ]
  },
  nav: {
    items: [
      { href: '/', labelKey: 'nav.home' },
      { href: '/projects', labelKey: 'nav.projects' },
      { href: '/about', labelKey: 'nav.about' },
    ]
  }
} as const;