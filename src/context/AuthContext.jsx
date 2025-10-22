import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken')
    const userRole = localStorage.getItem('userRole')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setRole(userRole || 'staff')
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userRole')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData, userRole = 'staff') => {
    const token = 'mock-jwt-token-' + Date.now()
    localStorage.setItem('authToken', token)
    localStorage.setItem('userRole', userRole)
    localStorage.setItem('userData', JSON.stringify(userData))
    
    setUser(userData)
    setRole(userRole)
    setIsAuthenticated(true)
    
    return token
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userData')
    
    setUser(null)
    setRole(null)
    setIsAuthenticated(false)
  }

  const updateUserRole = (newRole) => {
    setRole(newRole)
    localStorage.setItem('userRole', newRole)
  }

  const value = {
    user,
    role,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUserRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

