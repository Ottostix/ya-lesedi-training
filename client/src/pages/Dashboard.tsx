import { useState } from 'react';
import { useLocation } from 'wouter';
import { BarChart3, Users, BookOpen, FileText, TrendingUp, Award } from 'lucide-react';

interface StatCard {
  label: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  if (!user) {
    setLocation('/');
    return null;
  }

  const stats: StatCard[] = [
    {
      label: 'Total Restaurants',
      value: '47',
      change: '+12% from last month',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600',
    },
    {
      label: 'Active Staff',
      value: '523',
      change: '+8% from last month',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Training Modules',
      value: '28',
      change: '+3 new modules',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Completion Rate',
      value: '92.5%',
      change: '+2.3% improvement',
      icon: <Award className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const recentActivities = [
    { name: 'John Doe', action: 'Completed Module: Food Safety', time: '2 hours ago', status: 'success' },
    { name: 'Sarah Smith', action: 'Started Quiz: Customer Service', time: '4 hours ago', status: 'info' },
    { name: 'Mike Johnson', action: 'Uploaded Document: Menu Update', time: '6 hours ago', status: 'success' },
    { name: 'Emma Wilson', action: 'Assigned to Training: Wine Pairing', time: '8 hours ago', status: 'info' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome, {user.username}!</h1>
              <p className="text-slate-300 text-lg">Restaurant Training Management Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-slate-300 text-sm mb-2">Role: <span className="font-bold text-amber-400">{user.role || 'User'}</span></p>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  setLocation('/');
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className={`bg-gradient-to-br ${stat.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="opacity-80 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                  <TrendingUp className="w-5 h-5 opacity-50" />
                </div>
                <h3 className="text-sm font-semibold opacity-90 mb-2">{stat.label}</h3>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
              </div>
              <div className="p-4 bg-slate-50">
                <p className="text-xs text-slate-600 font-medium">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <button className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1 group border-l-4 border-amber-600">
            <div className="flex items-center mb-3">
              <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Manage Staff</h3>
            <p className="text-sm text-slate-600">Add, edit, or remove staff members</p>
          </button>

          <button className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1 group border-l-4 border-blue-600">
            <div className="flex items-center mb-3">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Training Modules</h3>
            <p className="text-sm text-slate-600">Create and manage training content</p>
          </button>

          <button className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1 group border-l-4 border-green-600">
            <div className="flex items-center mb-3">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Documents</h3>
            <p className="text-sm text-slate-600">Upload and manage training materials</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-slate-200">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="p-6 hover:bg-slate-50 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{activity.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{activity.action}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                    activity.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status === 'success' ? 'Completed' : 'In Progress'}
                  </span>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
