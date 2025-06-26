export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  stars?: number;
  language: string;
  status: 'active' | 'completed' | 'archived';
  featured?: boolean;
  image?: string;
  createdAt: string;
}