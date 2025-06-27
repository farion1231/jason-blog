import { getTranslations } from '@/lib/i18n';
import { projects, getFeaturedProjects } from '@/data/projects';
import { Project } from '@/data/projects';

export default function ProjectsPage() {
  const t = getTranslations('zh-CN');
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              {t.projects.title}
            </span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            {t.projects.subtitle}
          </p>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              ⭐ 精选项目
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            📂 所有项目
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const getStatusBadge = (status: Project['status']) => {
    const badges = {
      completed: { text: '已完成', color: 'bg-green-500/10 text-green-500' },
      'in-progress': { text: '开发中', color: 'bg-blue-500/10 text-blue-500' },
      planned: { text: '计划中', color: 'bg-gray-500/10 text-gray-500' }
    };
    return badges[status];
  };

  const statusBadge = getStatusBadge(project.status);

  return (
    <article className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 group ${featured ? 'md:p-8' : ''}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
              {project.title['zh-CN']}
            </h3>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${statusBadge.color}`}>
              {statusBadge.text}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          {featured ? project.longDescription['zh-CN'] : project.description['zh-CN']}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-blue-500/10 text-blue-500">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-pink-500 font-medium inline-flex items-center gap-1 text-sm"
            >
              🌐 演示
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-pink-500 font-medium inline-flex items-center gap-1 text-sm"
            >
              💻 代码
            </a>
          )}
        </div>
      </div>
    </article>
  );
}