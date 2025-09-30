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
  Calendar
} from 'lucide-react'

const DashboardHome = () => {
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
      {/* Welcome Section */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
        <p className="text-gray-600">
          Here's what's happening with your restaurant training today.
        </p>
      </div>

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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
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

      {/* Quick Actions */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="luxury-button text-white h-12">
              Add New Employee
            </Button>
            <Button variant="outline" className="h-12 border-amber-300 text-amber-700 hover:bg-amber-50">
              Create Quiz
            </Button>
            <Button variant="outline" className="h-12 border-amber-300 text-amber-700 hover:bg-amber-50">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardHome
