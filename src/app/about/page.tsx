export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">关于我</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            一个热爱技术与分享的开发者
          </p>
        </section>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="text-2xl mr-3">👋</span>
                自我介绍
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  一名热爱技术的开发者，专注于前端开发和全栈技术。
                  喜欢探索新技术，分享学习心得，追求代码的优雅与简洁。
                </p>
                <p>
                  相信技术的力量，也相信知识分享的价值。
                  希望通过这个博客，能与更多志同道合的朋友交流学习。
                </p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="text-2xl mr-3">💻</span>
                技能栈
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">前端技术</div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-500 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">后端技术</div>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-pink-500/10 text-pink-500 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">开发工具</div>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'Linux', 'VS Code', 'Figma', 'Vercel'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-500 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="text-2xl mr-3">🚀</span>
                博客介绍
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  这个博客使用 <span className="text-blue-500 font-medium">Next.js 15</span> 构建，
                  采用小清新的设计风格，专注于内容本身。
                </p>
                <p>
                  文章使用 <span className="text-blue-500 font-medium">Markdown</span> 编写，
                  支持代码高亮、数学公式等丰富的内容格式。
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">技术栈</div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>• Next.js 15 (App Router)</div>
                    <div>• TypeScript</div>
                    <div>• Tailwind CSS</div>
                    <div>• Markdown + Code Highlighting</div>
                    <div>• Vercel Deployment</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="text-2xl mr-3">📱</span>
                联系方式
              </h2>
              <div className="space-y-4">
                <a
                  href="https://github.com"
                  className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <div className="text-2xl">📂</div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-500 transition-colors">GitHub</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">@username</div>
                  </div>
                </a>
                
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all group"
                >
                  <div className="text-2xl">📧</div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-pink-500 transition-colors">Email</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">hello@example.com</div>
                  </div>
                </a>

                <a
                  href="https://twitter.com"
                  className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <div className="text-2xl">🐦</div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-500 transition-colors">Twitter</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">@username</div>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Stats Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">博客统计</h2>
            <p className="text-gray-500 dark:text-gray-400">持续分享，持续成长</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">3</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">文章总数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500 mb-2">2024</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">建站年份</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">10+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">技术栈</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">∞</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">学习热情</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}