import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle,
  AlertTriangle,
  Play,
  Edit,
  BarChart3
} from 'lucide-react'

const QuizzesTraining = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const quizCategories = [
    'Food Safety',
    'OHS (Occupational Health & Safety)',
    'Employee Labor Law',
    'Restaurant 5-Star Procedures',
    'Cleaning',
    'Emergency Procedures',
    'Temperature Control',
    'Storage Control'
  ]

  const quizzes = [
    {
      id: 1,
      title: 'Food Safety Fundamentals',
      category: 'Food Safety',
      description: 'Essential food safety practices for restaurant staff',
      duration: 30,
      questions: 25,
      difficulty: 'Beginner',
      completions: 18,
      averageScore: 87,
      status: 'active',
      lastUpdated: '2024-09-15'
    },
    {
      id: 2,
      title: 'Workplace Safety Protocols',
      category: 'OHS (Occupational Health & Safety)',
      description: 'Comprehensive workplace safety and health guidelines',
      duration: 45,
      questions: 30,
      difficulty: 'Intermediate',
      completions: 15,
      averageScore: 82,
      status: 'active',
      lastUpdated: '2024-09-20'
    },
    {
      id: 3,
      title: 'Employee Rights and Responsibilities',
      category: 'Employee Labor Law',
      description: 'Understanding labor laws and employee rights',
      duration: 25,
      questions: 20,
      difficulty: 'Beginner',
      completions: 12,
      averageScore: 91,
      status: 'active',
      lastUpdated: '2024-09-10'
    },
    {
      id: 4,
      title: 'Excellence in Service Standards',
      category: 'Restaurant 5-Star Procedures',
      description: 'Delivering exceptional 5-star restaurant service',
      duration: 40,
      questions: 35,
      difficulty: 'Advanced',
      completions: 8,
      averageScore: 79,
      status: 'active',
      lastUpdated: '2024-09-25'
    },
    {
      id: 5,
      title: 'Sanitation and Cleaning Procedures',
      category: 'Cleaning',
      description: 'Proper cleaning and sanitation protocols',
      duration: 35,
      questions: 28,
      difficulty: 'Intermediate',
      completions: 20,
      averageScore: 85,
      status: 'active',
      lastUpdated: '2024-09-18'
    },
    {
      id: 6,
      title: 'Emergency Response Training',
      category: 'Emergency Procedures',
      description: 'Handling emergencies and crisis situations',
      duration: 50,
      questions: 40,
      difficulty: 'Advanced',
      completions: 6,
      averageScore: 88,
      status: 'draft',
      lastUpdated: '2024-09-28'
    },
    {
      id: 7,
      title: 'Temperature Control and Monitoring',
      category: 'Temperature Control',
      description: 'Maintaining proper food temperatures and monitoring',
      duration: 20,
      questions: 18,
      difficulty: 'Beginner',
      completions: 22,
      averageScore: 93,
      status: 'active',
      lastUpdated: '2024-09-12'
    },
    {
      id: 8,
      title: 'Food Storage and Inventory Management',
      category: 'Storage Control',
      description: 'Proper food storage techniques and inventory control',
      duration: 30,
      questions: 25,
      difficulty: 'Intermediate',
      completions: 14,
      averageScore: 84,
      status: 'active',
      lastUpdated: '2024-09-22'
    }
  ]

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'Advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      case 'archived': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search quizzes and training..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Categories</option>
            {quizCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <Button className="luxury-button text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quizzes.filter(q => q.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Completions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quizzes.reduce((sum, quiz) => sum + quiz.completions, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(quizzes.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizzes.length)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Cards */}
      <div className="grid gap-6">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="luxury-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                    <Badge className={getStatusColor(quiz.status)}>
                      {quiz.status}
                    </Badge>
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-4">{quiz.description}</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{quiz.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{quiz.completions} completions</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Average Score: </span>
                        <span className={`font-semibold ${getScoreColor(quiz.averageScore)}`}>
                          {quiz.averageScore}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Updated: {new Date(quiz.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button className="luxury-button text-white" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <Card className="luxury-card">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first quiz'}
            </p>
            <Button className="luxury-button text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default QuizzesTraining
