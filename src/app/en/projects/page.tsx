import { getTranslations } from '@/lib/i18n';

export default function EnglishProjectsPage() {
  const t = getTranslations('en');

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

        {/* Coming Soon */}
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t.projects.comingSoon}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t.projects.comingSoonDesc}
          </p>
        </div>
      </div>
    </div>
  );
}