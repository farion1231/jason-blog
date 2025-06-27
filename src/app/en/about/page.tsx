import { getTranslations } from '@/lib/i18n';
import { siteConfig } from '@/config/site';

export default function EnglishAboutPage() {
  const t = getTranslations('en');

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            {t.about.title}
          </span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          {t.about.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* About */}
        <div className="space-y-6">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: t.about.content }}
          />
        </div>

        {/* Skills & Contact */}
        <div className="space-y-8">
          {/* Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.about.skills}
            </h3>
            <div className="flex flex-wrap gap-3">
              {siteConfig.author.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 bg-blue-500/10 text-blue-500 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.about.contact}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.about.email}</p>
                  <a 
                    href={`mailto:${siteConfig.author.email}`} 
                    className="text-blue-500 hover:text-pink-500 transition-colors"
                  >
                    {siteConfig.author.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}