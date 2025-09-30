import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  Award, 
  Clock,
  Download,
  Calendar
} from 'lucide-react'

const Analytics = () => {
  // Sample data for charts
  const trainingCompletionData = [
    { month: 'Jan', completed: 45, total: 50 },
    { month: 'Feb', completed: 52, total: 55 },
    { month: 'Mar', completed: 48, total: 60 },
    { month: 'Apr', completed: 61, total: 65 },
    { month: 'May', completed: 58, total: 62 },
    { month: 'Jun', completed: 67, total: 70 },
    { month: 'Jul', completed: 72, total: 75 },
    { month: 'Aug', completed: 69, total: 72 },
    { month: 'Sep', completed: 78, total: 80 }
  ]

  const quizScoreData = [
    { category: 'Food Safety', avgScore: 87, completions: 24 },
    { category: 'OHS', avgScore: 82, completions: 20 },
    { category: 'Labor Law', avgScore: 91, completions: 18 },
    { category: '5-Star Procedures', avgScore: 79, completions: 15 },
    { category: 'Cleaning', avgScore: 85, completions: 22 },
    { category: 'Emergency', avgScore: 88, completions: 12 },
    { category: 'Temperature', avgScore: 93, completions: 25 },
    { category: 'Storage', avgScore: 84, completions: 19 }
  ]

  const employeeProgressData = [
    { name: 'Completed', value: 156, color: '#10b981' },
    { name: 'In Progress', value: 34, color: '#f59e0b' },
    { name: 'Not Started', value: 18, color: '#ef4444' }
  ]

  const departmentPerformance = [
    { department: 'Kitchen', score: 88, employees: 8 },
    { department: 'Front of House', score: 85, employees: 12 },
    { department: 'Bar', score: 82, employees: 4 },
    { department: 'Management', score: 95, employees: 3 }
  ]

  const keyMetrics = [
    {
      title: 'Overall Completion Rate',
      value: '94%',
      change: '+5%',
      trend: 'up',
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      color: 'text-green-600'
    },
    {
      title: 'Average Quiz Score',
      value: '86%',
      change: '+2%',
      trend: 'up',
      icon: <Award className="h-6 w-6 text-amber-600" />,
      color: 'text-amber-600'
    },
    {
      title: 'Active Learners',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: 'text-blue-600'
    },
    {
      title: 'Avg. Training Time',
      value: '32 min',
      change: '-5 min',
      trend: 'down',
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training Analytics</h2>
          <p className="text-gray-600 mt-1">Insights into your team's training performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="luxury-button text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="luxury-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Training Completion Trend */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle>Training Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#d97706" 
                  strokeWidth={3}
                  name="Completed"
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Total Assigned"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Employee Progress Distribution */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle>Employee Progress Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employeeProgressData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {employeeProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Performance by Category */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Quiz Performance by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={quizScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#d97706" name="Average Score %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">{dept.department.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{dept.department}</h4>
                    <p className="text-sm text-gray-600">{dept.employees} employees</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{dept.score}%</div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900">100% Food Safety Completion</h4>
                <p className="text-sm text-gray-600">All kitchen staff completed food safety training</p>
              </div>
              <div className="text-sm text-gray-500">2 days ago</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Quiz Score Improvement</h4>
                <p className="text-sm text-gray-600">Average scores increased by 8% this month</p>
              </div>
              <div className="text-sm text-gray-500">1 week ago</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg">
              <BookOpen className="h-8 w-8 text-amber-600" />
              <div>
                <h4 className="font-semibold text-gray-900">New Training Module</h4>
                <p className="text-sm text-gray-600">Emergency Procedures training launched successfully</p>
              </div>
              <div className="text-sm text-gray-500">2 weeks ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics
