'use client';

import { useState } from 'react';
import { projects, getAllTags, getAllLanguages } from '@/lib/projects';
import { Project } from '@/types/project';

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<Project['status'] | ''>('');

  const filteredProjects = projects.filter(project => {
    if (selectedTag && !project.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()))) {
      return false;
    }
    if (selectedLanguage && project.language !== selectedLanguage) {
      return false;
    }
    if (selectedStatus && project.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'archived':
        return '已归档';
      default:
        return status;
    }
  };

  const clearFilters = () => {
    setSelectedTag('');
    setSelectedLanguage('');
    setSelectedStatus('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
            我的项目
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            这里展示了我开发的一些项目，涵盖前端、后端、移动端等多个领域
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">标签:</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white/80 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">全部标签</option>
                {getAllTags().map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">语言:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white/80 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">全部语言</option>
                {getAllLanguages().map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">状态:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Project['status'] | '')}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white/80 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">全部状态</option>
                <option value="active">进行中</option>
                <option value="completed">已完成</option>
                <option value="archived">已归档</option>
              </select>
            </div>

            {(selectedTag || selectedLanguage || selectedStatus) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                清除筛选
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                {project.featured && (
                  <span className="text-yellow-500 text-lg">⭐</span>
                )}
              </div>

              {/* Project Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Project Meta */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  {project.language}
                </span>
                {project.stars && (
                  <span className="flex items-center gap-1">
                    ⭐ {project.stars}
                  </span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>

              {/* Project Links */}
              <div className="flex gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white text-center rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  GitHub
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-center rounded-lg hover:from-blue-600 hover:to-pink-600 transition-all text-sm"
                  >
                    演示
                  </a>
                )}
              </div>

              {/* Creation Date */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400">
                创建于 {new Date(project.createdAt).toLocaleDateString('zh-CN')}
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">没有找到匹配的项目</h3>
            <p className="text-gray-500">请尝试调整筛选条件</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">项目统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
              <div className="text-sm text-gray-600">总项目数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {projects.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">进行中</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">
                {projects.reduce((sum, p) => sum + (p.stars || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">总星标数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {getAllLanguages().length}
              </div>
              <div className="text-sm text-gray-600">使用语言</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}