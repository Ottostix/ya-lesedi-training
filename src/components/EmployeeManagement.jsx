import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  Award,
  Edit,
  Trash2
} from 'lucide-react'

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const employees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@restaurant.com',
      phone: '+1 (555) 123-4567',
      position: 'Head Chef',
      department: 'Kitchen',
      hireDate: '2023-01-15',
      status: 'active',
      completedTraining: 8,
      totalTraining: 10,
      certifications: ['Food Safety', 'Kitchen Management', 'HACCP']
    },
    {
      id: 2,
      name: 'Marcus Williams',
      email: 'marcus.williams@restaurant.com',
      phone: '+1 (555) 234-5678',
      position: 'Server',
      department: 'Front of House',
      hireDate: '2023-03-20',
      status: 'active',
      completedTraining: 6,
      totalTraining: 8,
      certifications: ['Customer Service', 'Wine Knowledge']
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily.chen@restaurant.com',
      phone: '+1 (555) 345-6789',
      position: 'Sous Chef',
      department: 'Kitchen',
      hireDate: '2022-11-10',
      status: 'active',
      completedTraining: 9,
      totalTraining: 10,
      certifications: ['Food Safety', 'Allergen Management', 'Inventory Control']
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.rodriguez@restaurant.com',
      phone: '+1 (555) 456-7890',
      position: 'Bartender',
      department: 'Bar',
      hireDate: '2023-05-08',
      status: 'training',
      completedTraining: 4,
      totalTraining: 7,
      certifications: ['Responsible Service', 'Mixology Basics']
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@restaurant.com',
      phone: '+1 (555) 567-8901',
      position: 'Manager',
      department: 'Management',
      hireDate: '2021-08-12',
      status: 'active',
      completedTraining: 12,
      totalTraining: 12,
      certifications: ['Leadership', 'Food Safety', 'HR Management', 'Financial Planning']
    }
  ]

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || employee.status === selectedFilter

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'training': return 'bg-blue-100 text-blue-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getProgressColor = (completed, total) => {
    const percentage = (completed / total) * 100
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="training">In Training</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <Button className="luxury-button text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="luxury-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-gray-600">{employee.position} • {employee.department}</p>
                    </div>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="h-4 w-4" />
                      <span>{employee.certifications.length} Certifications</span>
                    </div>
                  </div>

                  {/* Training Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Training Progress</span>
                      <span className="text-sm text-gray-600">
                        {employee.completedTraining}/{employee.totalTraining} completed
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(employee.completedTraining, employee.totalTraining)}`}
                        style={{ width: `${(employee.completedTraining / employee.totalTraining) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Certifications</span>
                    <div className="flex flex-wrap gap-2">
                      {employee.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="luxury-card">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first employee'}
            </p>
            <Button className="luxury-button text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default EmployeeManagement
