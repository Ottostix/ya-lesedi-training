import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  Edit,
  Trash2,
  Upload,
  Filter,
  Calendar,
  User
} from 'lucide-react'

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const documentCategories = [
    'Policies',
    'Procedures',
    'Training Materials',
    'Certifications',
    'Forms',
    'Manuals',
    'Reports'
  ]

  const documents = [
    {
      id: 1,
      title: 'Food Safety Policy Manual',
      category: 'Policies',
      description: 'Comprehensive food safety policies and guidelines',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      uploadDate: '2024-09-15',
      lastModified: '2024-09-20',
      uploadedBy: 'Lisa Thompson',
      downloads: 45,
      status: 'published'
    },
    {
      id: 2,
      title: 'Emergency Procedures Handbook',
      category: 'Procedures',
      description: 'Step-by-step emergency response procedures',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      uploadDate: '2024-09-10',
      lastModified: '2024-09-18',
      uploadedBy: 'Sarah Johnson',
      downloads: 32,
      status: 'published'
    },
    {
      id: 3,
      title: 'Customer Service Training Guide',
      category: 'Training Materials',
      description: 'Complete guide for exceptional customer service',
      fileType: 'PDF',
      fileSize: '3.1 MB',
      uploadDate: '2024-09-08',
      lastModified: '2024-09-25',
      uploadedBy: 'Marcus Williams',
      downloads: 28,
      status: 'published'
    },
    {
      id: 4,
      title: 'HACCP Certification Template',
      category: 'Certifications',
      description: 'Template for HACCP certification documentation',
      fileType: 'DOCX',
      fileSize: '856 KB',
      uploadDate: '2024-09-12',
      lastModified: '2024-09-22',
      uploadedBy: 'Emily Chen',
      downloads: 15,
      status: 'published'
    },
    {
      id: 5,
      title: 'Employee Onboarding Checklist',
      category: 'Forms',
      description: 'Comprehensive checklist for new employee onboarding',
      fileType: 'PDF',
      fileSize: '645 KB',
      uploadDate: '2024-09-05',
      lastModified: '2024-09-15',
      uploadedBy: 'Lisa Thompson',
      downloads: 52,
      status: 'published'
    },
    {
      id: 6,
      title: 'Kitchen Equipment Manual',
      category: 'Manuals',
      description: 'Operating manual for all kitchen equipment',
      fileType: 'PDF',
      fileSize: '4.2 MB',
      uploadDate: '2024-08-28',
      lastModified: '2024-09-10',
      uploadedBy: 'David Rodriguez',
      downloads: 18,
      status: 'published'
    },
    {
      id: 7,
      title: 'Monthly Training Report - September',
      category: 'Reports',
      description: 'Training completion and performance report',
      fileType: 'XLSX',
      fileSize: '1.2 MB',
      uploadDate: '2024-09-30',
      lastModified: '2024-09-30',
      uploadedBy: 'Lisa Thompson',
      downloads: 8,
      status: 'draft'
    },
    {
      id: 8,
      title: 'Cleaning and Sanitation Procedures',
      category: 'Procedures',
      description: 'Detailed cleaning protocols for all areas',
      fileType: 'PDF',
      fileSize: '2.1 MB',
      uploadDate: '2024-09-18',
      lastModified: '2024-09-28',
      uploadedBy: 'Emily Chen',
      downloads: 35,
      status: 'published'
    }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getFileTypeColor = (fileType) => {
    switch (fileType) {
      case 'PDF': return 'bg-red-100 text-red-700'
      case 'DOCX': return 'bg-blue-100 text-blue-700'
      case 'XLSX': return 'bg-green-100 text-green-700'
      case 'PPTX': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'draft': return 'bg-yellow-100 text-yellow-700'
      case 'archived': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
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
            {documentCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          
          <Button className="luxury-button text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter(d => d.status === 'published').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.reduce((sum, doc) => sum + doc.downloads, 0)}
                </p>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{documentCategories.length}</p>
              </div>
              <Filter className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Cards */}
      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="luxury-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-6 w-6 text-amber-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                    <Badge className={getFileTypeColor(doc.fileType)}>
                      {doc.fileType}
                    </Badge>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-4">{doc.description}</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>By: {doc.uploadedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Download className="h-4 w-4" />
                      <span>{doc.downloads} downloads</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Size: {doc.fileSize}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Last modified: {new Date(doc.lastModified).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="luxury-card">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by uploading your first document'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button className="luxury-button text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Documents
