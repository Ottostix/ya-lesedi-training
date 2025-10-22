import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { hasPermission } from '@/utils/roleBasedAccess'

const ProtectedRoute = ({ children, requiredPermission = null, requiredRole = null }) => {
  const { isAuthenticated, role, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  if (requiredPermission && !hasPermission(role, requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          <a href="/dashboard" className="text-amber-600 hover:text-amber-700 font-medium">
            Return to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute

