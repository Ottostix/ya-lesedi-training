import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  ChefHat, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  FileText, 
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react'
import EmployeeManagement from './EmployeeManagement'
import QuizzesTraining from './QuizzesTraining'
import Documents from './Documents'
import Analytics from './Analytics'
import SettingsPage from './SettingsPage'
import DashboardHome from './DashboardHome'

const Dashboard = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { 
      id: 'home', 
      label: 'Dashboard', 
      icon: <Home className="h-5 w-5" />, 
      path: '/dashboard' 
    },
    { 
      id: 'employees', 
      label: 'Employee Management', 
      icon: <Users className="h-5 w-5" />, 
      path: '/dashboard/employees' 
    },
    { 
      id: 'training', 
      label: 'Quizzes & Training', 
      icon: <BookOpen className="h-5 w-5" />, 
      path: '/dashboard/training' 
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      icon: <FileText className="h-5 w-5" />, 
      path: '/dashboard/documents' 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: <BarChart3 className="h-5 w-5" />, 
      path: '/dashboard/analytics' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <Settings className="h-5 w-5" />, 
      path: '/dashboard/settings' 
    }
  ]

  const handleMenuClick = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 sidebar-elegant flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700/30">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="bg-amber-600 p-2 rounded-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Ya Lesedi</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 sidebar-item ${
                isActiveRoute(item.path) ? 'active text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-600/20 transition-all duration-200 sidebar-item"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 elegant-text">
                {menuItems.find(item => isActiveRoute(item.path))?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome to Ya Lesedi Training Management System
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Restaurant Manager</p>
                <p className="text-xs text-gray-500">admin@yalesedi.com</p>
              </div>
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">YL</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto content-area p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/training" element={<QuizzesTraining />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
