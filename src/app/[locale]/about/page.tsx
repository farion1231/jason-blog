import { getTranslations, type Locale } from '@/lib/i18n';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                {t.about.title}
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg space-y-8">
            {/* About Text */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: t.about.content }}
            />

            {/* Skills */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t.about.skills}</h2>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'TailwindCSS', 'PostgreSQL', 'Docker'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-pink-500/10 text-gray-700 dark:text-gray-300 rounded-lg font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t.about.contact}</h2>
              <div className="space-y-3">
                <a href="mailto:jason@example.com" className="inline-flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <span className="text-xl">✉️</span>
                  <span>{t.about.email}: jason@example.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}