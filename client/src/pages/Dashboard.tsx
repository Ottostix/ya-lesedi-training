import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, Store, TrendingUp } from 'lucide-react';

const API_BASE_URL = 'https://ya-lesedi-backend.onrender.com/api';

interface DashboardStats {
  totalStores: number;
  totalQuizzes: number;
  averageScore: number;
  completionRate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStores: 0,
    totalQuizzes: 0,
    averageScore: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLocation('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [setLocation]);

  const chartData = [
    { month: 'Jan', score: 65, completion: 45 },
    { month: 'Feb', score: 72, completion: 52 },
    { month: 'Mar', score: 78, completion: 58 },
    { month: 'Apr', score: 82, completion: 65 },
    { month: 'May', score: 85, completion: 72 },
    { month: 'Jun', score: 88, completion: 78 },
  ];

  const StatCard = ({ icon: Icon, label, value, unit = '' }: any) => (
    <div className="luxury-card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Live</span>
      </div>
      <p className="text-slate-600 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900">{value}{unit}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <img 
              src="/ya-lesedi-logo.jpg" 
              alt="Ya Lesedi" 
              className="w-20 h-20 object-contain drop-shadow-lg"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
              <p className="text-slate-300 text-lg">Welcome back to Ya Lesedi Training System</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={Store} 
            label="Total Stores" 
            value={stats.totalStores}
          />
          <StatCard 
            icon={BookOpen} 
            label="Training Quizzes" 
            value={stats.totalQuizzes}
          />
          <StatCard 
            icon={TrendingUp} 
            label="Average Score" 
            value={stats.averageScore.toFixed(1)}
            unit="%"
          />
          <StatCard 
            icon={Users} 
            label="Completion Rate" 
            value={stats.completionRate.toFixed(1)}
            unit="%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Training Performance Chart */}
          <div className="luxury-card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Training Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd5" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #d4af37',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#d4af37" 
                  strokeWidth={3}
                  dot={{ fill: '#d4af37', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Avg Score (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Completion Rate Chart */}
          <div className="luxury-card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Completion Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd5" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #d4af37',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="completion" 
                  fill="#d4af37"
                  radius={[8, 8, 0, 0]}
                  name="Completion (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="luxury-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gold-accent">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Staff Engagement</h3>
              <p className="text-3xl font-bold text-primary mb-2">94%</p>
              <p className="text-sm text-slate-600">Active participation in training modules</p>
            </div>
            <div className="gold-accent">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Certification Rate</h3>
              <p className="text-3xl font-bold text-primary mb-2">87%</p>
              <p className="text-sm text-slate-600">Staff successfully certified</p>
            </div>
            <div className="gold-accent">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Training ROI</h3>
              <p className="text-3xl font-bold text-primary mb-2">340%</p>
              <p className="text-sm text-slate-600">Return on investment in training</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="luxury-card p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Staff Certification', user: 'John Smith', time: '2 hours ago', status: 'completed' },
              { action: 'Quiz Completed', user: 'Sarah Johnson', time: '4 hours ago', status: 'completed' },
              { action: 'Training Module Started', user: 'Mike Davis', time: '6 hours ago', status: 'in-progress' },
              { action: 'New Store Added', user: 'Admin', time: '1 day ago', status: 'completed' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-semibold text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-600">{activity.user}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    activity.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status === 'completed' ? '✓ Completed' : '⟳ In Progress'}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

