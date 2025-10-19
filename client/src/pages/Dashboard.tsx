import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, Store, TrendingUp, Award, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';

const COLORS = ['#d4af37', '#c9a227', '#1a1a2e', '#2d2d44'];

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      setLocation('/');
      return;
    }
    
    try {
      setCurrentUser(JSON.parse(user));
    } catch (error) {
      console.error('Failed to parse user:', error);
      setLocation('/');
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLocation('/');
  };

  // Mock data for charts
  const performanceData = [
    { month: 'Jan', avgScore: 65, completion: 45, certified: 12 },
    { month: 'Feb', avgScore: 72, completion: 52, certified: 18 },
    { month: 'Mar', avgScore: 78, completion: 58, certified: 25 },
    { month: 'Apr', avgScore: 82, completion: 65, certified: 32 },
    { month: 'May', avgScore: 85, completion: 72, certified: 40 },
    { month: 'Jun', avgScore: 88, completion: 78, certified: 48 },
  ];

  const departmentData = [
    { name: 'Kitchen', value: 45 },
    { name: 'Front of House', value: 35 },
    { name: 'Management', value: 15 },
    { name: 'Support', value: 5 },
  ];

  const recentActivities = [
    { id: 1, user: 'John Dlamini', action: 'Completed Food Safety Quiz', time: '2 hours ago', score: 92 },
    { id: 2, user: 'Sarah Nkosi', action: 'Completed Customer Service Training', time: '4 hours ago', score: 88 },
    { id: 3, user: 'Mike Johnson', action: 'Started Emergency Procedures Quiz', time: '6 hours ago', score: null },
    { id: 4, user: 'Amelia Chen', action: 'Completed Wine Pairing Module', time: '1 day ago', score: 95 },
    { id: 5, user: 'David Mthembu', action: 'Completed POS System Training', time: '1 day ago', score: 87 },
  ];

  const StatCard = ({ icon: Icon, label, value, unit = '', trend = '+5%', color = 'text-amber-600' }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-amber-50 rounded-lg`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">{trend}</span>
      </div>
      <p className="text-slate-600 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900">{value}{unit}</p>
    </div>
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {currentUser.username}!</h1>
          <p className="text-slate-600">Here's your training system overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Store} 
            label="Active Stores" 
            value={24}
            trend="+3"
            color="text-amber-600"
          />
          <StatCard 
            icon={Users} 
            label="Staff Trained" 
            value={342}
            trend="+28"
            color="text-blue-600"
          />
          <StatCard 
            icon={Award} 
            label="Certifications" 
            value={156}
            trend="+12"
            color="text-green-600"
          />
          <StatCard 
            icon={TrendingUp} 
            label="Avg Score" 
            value={88}
            unit="%"
            trend="+4%"
            color="text-purple-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Trend */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Training Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd5" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0dcd5' }}
                  formatter={(value) => `${value}%`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#d4af37" 
                  strokeWidth={2}
                  name="Avg Score"
                  dot={{ fill: '#d4af37', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completion" 
                  stroke="#1a1a2e" 
                  strokeWidth={2}
                  name="Completion Rate"
                  dot={{ fill: '#1a1a2e', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Staff by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} staff`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certifications Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Monthly Certifications Issued</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd5" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0dcd5' }}
                formatter={(value) => `${value} certificates`}
              />
              <Legend />
              <Bar dataKey="certified" fill="#d4af37" name="Certifications Issued" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border-l-4 border-amber-600 bg-amber-50 rounded">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{activity.user}</p>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock size={12} /> {activity.time}
                  </p>
                </div>
                {activity.score && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-600">{activity.score}%</p>
                    <p className="text-xs text-slate-500">Score</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

