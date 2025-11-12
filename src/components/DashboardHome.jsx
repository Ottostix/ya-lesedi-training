import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Trophy,
  Target,
  Zap,
  AlertCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'

const DashboardHome = () => {
  const [motivationalIndex, setMotivationalIndex] = useState(0)
  const [badges] = useState([
    { id: 1, name: 'Quick Learner', icon: '⚡', earned: true },
    { id: 2, name: 'Perfect Score', icon: '🎯', earned: false },
    { id: 3, name: 'Consistent', icon: '📈', earned: true }
  ])

  const motivationalMessages = [
    "🎉 Great progress! Your team is 94% complete with training.",
    "⭐ Sarah just earned a certificate! Celebrate team wins.",
    "📈 Completion rate up 5% this week. Keep the momentum!",
    "🏆 Your restaurant is in the top 10% for training compliance."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationalIndex((prev) => (prev + 1) % motivationalMessages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  const stats = [
    {
      title: 'Total Employees',
      value: '24',
      change: '+2 this month',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Active Training',
      value: '8',
      change: '3 pending completion',
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Certifications',
      value: '156',
      change: '+12 this week',
      icon: <Award className="h-6 w-6 text-amber-600" />,
      color: 'bg-amber-50'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+5% from last month',
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      color: 'bg-purple-50'
    }
  ]

  const recentActivities = [
    {
      type: 'completion',
      message: 'Sarah Johnson completed Food Safety Training',
      time: '2 hours ago',
      icon: <CheckCircle className="h-4 w-4 text-green-600" />
    },
    {
      type: 'new',
      message: 'New employee Marcus Williams added to system',
      time: '4 hours ago',
      icon: <Users className="h-4 w-4 text-blue-600" />
    },
    {
      type: 'alert',
      message: 'Temperature Control quiz deadline approaching',
      time: '6 hours ago',
      icon: <AlertTriangle className="h-4 w-4 text-amber-600" />
    },
    {
      type: 'completion',
      message: 'Team completed Emergency Procedures training',
      time: '1 day ago',
      icon: <CheckCircle className="h-4 w-4 text-green-600" />
    }
  ]

  const upcomingTraining = [
    {
      title: 'Food Safety Refresher',
      date: 'Oct 5, 2024',
      participants: 12,
      status: 'scheduled'
    },
    {
      title: 'Customer Service Excellence',
      date: 'Oct 8, 2024',
      participants: 18,
      status: 'upcoming'
    },
    {
      title: 'Emergency Response Drill',
      date: 'Oct 12, 2024',
      participants: 24,
      status: 'planning'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Motivational Banner */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <p className="text-lg font-semibold text-gray-900">
            {motivationalMessages[motivationalIndex]}
          </p>
        </CardContent>
      </Card>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="luxury-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all">
          <span className="text-2xl">📋</span>
          <span className="text-sm font-medium text-gray-700">Assign Training</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all">
          <span className="text-2xl">📊</span>
          <span className="text-sm font-medium text-gray-700">View Reports</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all">
          <span className="text-2xl">💬</span>
          <span className="text-sm font-medium text-gray-700">Message Team</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all">
          <span className="text-2xl">❓</span>
          <span className="text-sm font-medium text-gray-700">Create Quiz</span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-0.5">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>
        </div>

        {/* Gamification & Badges */}
        <div>
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-amber-600" />
              <span>Team Badges & Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Your Achievements</p>
              <div className="space-y-2">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-lg text-center transition-all ${
                      badge.earned
                        ? 'bg-amber-50 border-2 border-amber-200'
                        : 'bg-gray-100 border-2 border-gray-200 opacity-50'
                    }`}
                  >
                    <p className="text-2xl mb-1">{badge.icon}</p>
                    <p className="text-xs font-semibold text-gray-700">{badge.name}</p>
                    {!badge.earned && <p className="text-xs text-gray-500 mt-1">Locked</p>}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Branch Leaderboard</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">🥇 Your Restaurant</span>
                  <span className="font-semibold text-amber-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">🥈 Downtown Branch</span>
                  <span className="font-semibold text-gray-600">88%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">🥉 Midtown Branch</span>
                  <span className="font-semibold text-gray-600">82%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Upcoming Training */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              <span>Upcoming Training</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTraining.map((training, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{training.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      training.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                      training.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {training.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{training.date}</span>
                    <span>{training.participants} participants</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 luxury-button text-white">
              Schedule New Training
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Tips */}
      <Card className="luxury-card bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Engagement Tips for Better Completion</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Send personalized messages to staff who are behind on training</li>
            <li>✓ Celebrate staff wins publicly to boost morale</li>
            <li>✓ Create friendly competition between branches</li>
            <li>✓ Schedule training during quieter shifts for better completion</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardHome
