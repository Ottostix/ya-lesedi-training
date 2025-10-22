// Role-Based Access Control (RBAC) Utility
// Defines permissions for different user roles

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff'
}

export const ROLE_LABELS = {
  admin: 'Master Admin',
  manager: 'Store Manager',
  staff: 'Staff Member'
}

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  admin: {
    // Dashboard
    viewDashboard: true,
    viewAllRestaurants: true,
    viewAllStaff: true,
    
    // Staff Management
    addStaff: true,
    editStaff: true,
    deleteStaff: true,
    viewAllStaffProfiles: true,
    
    // Training & Quizzes
    createQuiz: true,
    editQuiz: true,
    deleteQuiz: true,
    viewAllQuizzes: true,
    assignQuizzes: true,
    
    // Documents
    uploadDocuments: true,
    deleteDocuments: true,
    viewAllDocuments: true,
    
    // Analytics
    viewAllAnalytics: true,
    viewGlobalAnalytics: true,
    exportReports: true,
    
    // Settings
    manageSettings: true,
    manageUsers: true,
    manageRestaurants: true,
    viewSystemLogs: true
  },
  
  manager: {
    // Dashboard
    viewDashboard: true,
    viewAllRestaurants: false,
    viewAllStaff: false,
    
    // Staff Management
    addStaff: true,
    editStaff: true,
    deleteStaff: false,
    viewAllStaffProfiles: true, // Only their store's staff
    
    // Training & Quizzes
    createQuiz: true,
    editQuiz: true,
    deleteQuiz: false,
    viewAllQuizzes: true, // Only their store's quizzes
    assignQuizzes: true,
    
    // Documents
    uploadDocuments: true,
    deleteDocuments: true,
    viewAllDocuments: true, // Only their store's documents
    
    // Analytics
    viewAllAnalytics: true, // Only their store's analytics
    viewGlobalAnalytics: false,
    exportReports: true,
    
    // Settings
    manageSettings: false,
    manageUsers: false,
    manageRestaurants: false,
    viewSystemLogs: false
  },
  
  staff: {
    // Dashboard
    viewDashboard: true,
    viewAllRestaurants: false,
    viewAllStaff: false,
    
    // Staff Management
    addStaff: false,
    editStaff: false,
    deleteStaff: false,
    viewAllStaffProfiles: false,
    
    // Training & Quizzes
    createQuiz: false,
    editQuiz: false,
    deleteQuiz: false,
    viewAllQuizzes: true, // Only assigned quizzes
    assignQuizzes: false,
    
    // Documents
    uploadDocuments: false,
    deleteDocuments: false,
    viewAllDocuments: true, // Only assigned documents
    
    // Analytics
    viewAllAnalytics: false,
    viewGlobalAnalytics: false,
    exportReports: false,
    
    // Settings
    manageSettings: false,
    manageUsers: false,
    manageRestaurants: false,
    viewSystemLogs: false
  }
}

// Check if a user has permission to perform an action
export const hasPermission = (role, permission) => {
  const permissions = ROLE_PERMISSIONS[role]
  if (!permissions) {
    return false
  }
  return permissions[permission] === true
}

// Check multiple permissions (requires all to be true)
export const hasAllPermissions = (role, permissions) => {
  return permissions.every(permission => hasPermission(role, permission))
}

// Check multiple permissions (requires at least one to be true)
export const hasAnyPermission = (role, permissions) => {
  return permissions.some(permission => hasPermission(role, permission))
}

// Get all permissions for a role
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || {}
}

// Get role label
export const getRoleLabel = (role) => {
  return ROLE_LABELS[role] || role
}

// Check if role is admin
export const isAdmin = (role) => {
  return role === ROLES.ADMIN
}

// Check if role is manager
export const isManager = (role) => {
  return role === ROLES.MANAGER
}

// Check if role is staff
export const isStaff = (role) => {
  return role === ROLES.STAFF
}

// Get accessible menu items based on role
export const getAccessibleMenuItems = (role) => {
  const permissions = ROLE_PERMISSIONS[role]
  const menuItems = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: 'Home',
      path: '/dashboard',
      visible: true
    },
    {
      id: 'restaurants',
      label: 'Total Restaurants',
      icon: 'Building2',
      path: '/dashboard/restaurants',
      visible: permissions?.viewAllRestaurants
    },
    {
      id: 'employees',
      label: 'Active Staff',
      icon: 'Users',
      path: '/dashboard/employees',
      visible: true
    },
    {
      id: 'training',
      label: 'Training Modules',
      icon: 'BookOpen',
      path: '/dashboard/training',
      visible: true
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'FileText',
      path: '/dashboard/documents',
      visible: true
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/dashboard/analytics',
      visible: true
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      path: '/dashboard/settings',
      visible: permissions?.manageSettings
    }
  ]
  
  return menuItems.filter(item => item.visible)
}

// Filter data based on role
export const filterDataByRole = (data, role, userStore = null) => {
  if (isAdmin(role)) {
    return data // Admins see all data
  }
  
  if (isManager(role) && userStore) {
    return data.filter(item => item.store === userStore) // Managers see only their store's data
  }
  
  if (isStaff(role)) {
    return data.filter(item => item.assignedTo === role || item.isPublic) // Staff see only assigned data
  }
  
  return []
}

export default {
  ROLES,
  ROLE_LABELS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  getRolePermissions,
  getRoleLabel,
  isAdmin,
  isManager,
  isStaff,
  getAccessibleMenuItems,
  filterDataByRole
}

