import React, { useState } from 'react';
import { BookOpen, Upload, Search, Filter, Award, Users, TrendingUp } from 'lucide-react';
import { DEFAULT_MODULES, TrainingModule } from '../data/trainingModules';

export default function TrainingModules() {
  const [modules, setModules] = useState<TrainingModule[]>(DEFAULT_MODULES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const categories = ['All', 'HR & Compliance', 'Food Safety', 'Service Excellence', 'Safety & Security'];
  
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUploadModule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle file upload logic here
    setShowUploadForm(false);
  };

  const stats = {
    totalModules: modules.length,
    activeModules: modules.filter(m => m.status === 'active').length,
    avgCompletion: Math.round(modules.reduce((sum, m) => sum + (m.completionRate || 0), 0) / modules.length),
    totalStaff: modules.reduce((sum, m) => sum + (m.totalStaff || 0), 0) / modules.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-amber-400" />
          <h1 className="text-3xl font-bold text-white">Training Modules</h1>
        </div>
        <p className="text-slate-400">Manage and distribute training materials across all locations</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">Total Modules</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalModules}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Active Modules</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.activeModules}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-300 text-sm font-medium">Avg Completion</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.avgCompletion}%</p>
            </div>
            <Award className="w-8 h-8 text-amber-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Staff Trained</p>
              <p className="text-2xl font-bold text-white mt-1">{Math.round(stats.totalStaff)}</p>
            </div>
            <Users className="w-8 h-8 text-purple-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 flex gap-4 w-full md:w-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-amber-400/50"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload Module
          </button>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Upload New Training Module</h3>
          <form onSubmit={handleUploadModule} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Module Title</label>
                <input
                  type="text"
                  placeholder="Enter module title"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-amber-400/50">
                  <option>HR & Compliance</option>
                  <option>Food Safety</option>
                  <option>Service Excellence</option>
                  <option>Safety & Security</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                placeholder="Enter module description"
                rows={3}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Upload File (PDF, Word, Text)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-all"
              >
                Upload Module
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map(module => (
          <div
            key={module.id}
            className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg overflow-hidden hover:border-amber-400/30 transition-all group"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full mb-2">
                    <span className="text-xs font-medium text-amber-300">{module.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{module.title}</h3>
                </div>
                {module.isDefault && (
                  <div title="Default Module">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{module.description}</p>

              {/* Stats */}
              <div className="space-y-3 mb-4">
                {module.completionRate !== undefined && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-slate-300">Completion Rate</span>
                      <span className="text-xs font-bold text-amber-400">{module.completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all"
                        style={{ width: `${module.completionRate}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {module.completedStaff !== undefined && module.totalStaff !== undefined && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{module.completedStaff} of {module.totalStaff} staff completed</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <span className="text-xs text-slate-500">Uploaded {module.uploadedDate}</span>
                <button className="px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded text-xs font-medium text-amber-300 hover:bg-amber-500/30 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No training modules found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

