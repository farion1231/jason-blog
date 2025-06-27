import { getTranslations, type Locale } from '@/lib/i18n';
import { projects, type Project } from '@/data/projects';
import Image from 'next/image';

interface ProjectsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                {t.projects.title}
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t.projects.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
              ⭐ {t.projects.featured}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} t={t.projects} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
            📚 {t.projects.all}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} t={t.projects} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


interface ProjectTranslations {
  demo: string;
  code: string;
  status: {
    completed: string;
    inProgress: string;
    planned: string;
  };
}

function ProjectCard({ 
  project, 
  locale, 
  t,
  featured = false 
}: { 
  project: Project; 
  locale: Locale;
  t: ProjectTranslations;
  featured?: boolean;
}) {
  const statusColors = {
    'completed': 'bg-green-500/10 text-green-500',
    'in-progress': 'bg-yellow-500/10 text-yellow-500',
    'planned': 'bg-gray-500/10 text-gray-500'
  };

  const statusLabels = {
    'completed': t.status.completed,
    'in-progress': t.status.inProgress,
    'planned': t.status.planned
  };

  return (
    <article className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${featured ? 'md:col-span-1' : ''}`}>
      <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-pink-500/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {project.title[locale]}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 line-clamp-3">
          {project.description[locale]}
        </p>
        
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 pt-2">
          {project.demoUrl && (
            <a 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-500 hover:text-pink-500 transition-colors"
            >
              <span>🌐</span>
              {t.demo}
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-500 hover:text-pink-500 transition-colors"
            >
              <span>💻</span>
              {t.code}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}