import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const API_BASE_URL = 'https://ya-lesedi-backend.onrender.com/api';

export default function Dashboard({ onLogout, currentUser }: any) {
  const [stats, setStats] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load stats
      const statsResponse = await fetch(`${API_BASE_URL}/quizzes/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsResponse.ok) {
        const data = await statsResponse.json();
        setStats(data);
      }

      // Load stores
      const storesResponse = await fetch(`${API_BASE_URL}/stores`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (storesResponse.ok) {
        const data = await storesResponse.json();
        setStores(data.stores || []);
      }

      // Load quizzes
      const quizzesResponse = await fetch(`${API_BASE_URL}/quizzes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (quizzesResponse.ok) {
        const data = await quizzesResponse.json();
        setQuizzes(data.quizzes || []);
      }

      // Load recent activity
      const activityResponse = await fetch(`${API_BASE_URL}/activity/recent`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (activityResponse.ok) {
        const data = await activityResponse.json();
        setRecentActivity(data.activities || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome back, {currentUser?.full_name || currentUser?.username}!
          </h1>
          <p className="text-slate-600">Here's what's happening with your restaurant training system.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Stores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{stores.length}</div>
                  <p className="text-xs text-slate-500 mt-1">Active locations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{quizzes.length}</div>
                  <p className="text-xs text-slate-500 mt-1">Training assessments</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Avg Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{stats?.average_score?.toFixed(1) || 'N/A'}%</div>
                  <p className="text-xs text-slate-500 mt-1">Overall performance</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{stats?.completion_rate?.toFixed(1) || 'N/A'}%</div>
                  <p className="text-xs text-slate-500 mt-1">Training completion</p>
                </CardContent>
              </Card>
            </div>

            {/* Stores Section */}
            {stores.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Stores</CardTitle>
                  <CardDescription>Manage your restaurant locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stores.slice(0, 6).map((store: any) => (
                      <div key={store.id} className="p-4 border border-slate-200 rounded-lg hover:border-amber-300 transition">
                        <h3 className="font-semibold text-slate-900">{store.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{store.location}</p>
                        <p className="text-xs text-slate-500 mt-2">Manager: {store.manager_name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            {recentActivity.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity: any, idx: number) => (
                      <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-0">
                        <div className="w-2 h-2 rounded-full bg-amber-600 mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">{activity.description}</p>
                          <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

