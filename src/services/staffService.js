// Staff Service - Handles staff management operations

// Mock staff data for demonstration
const MOCK_STAFF = [
  {
    id: 'staff-1',
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@restaurant.com',
    contact: '+27 123 456 7890',
    store: 'Main Branch',
    designation: 'Waiter',
    status: 'active',
    joinDate: '2024-01-15',
    trainingProgress: 65,
    completedQuizzes: 3,
    totalQuizzes: 6,
    certificates: 2
  },
  {
    id: 'staff-2',
    name: 'Sarah',
    surname: 'Smith',
    email: 'sarah.smith@restaurant.com',
    contact: '+27 234 567 8901',
    store: 'Downtown Branch',
    designation: 'Chef',
    status: 'active',
    joinDate: '2023-11-20',
    trainingProgress: 85,
    completedQuizzes: 5,
    totalQuizzes: 6,
    certificates: 4
  },
  {
    id: 'staff-3',
    name: 'Michael',
    surname: 'Johnson',
    email: 'michael.johnson@restaurant.com',
    contact: '+27 345 678 9012',
    store: 'Main Branch',
    designation: 'Manager',
    status: 'active',
    joinDate: '2023-06-10',
    trainingProgress: 95,
    completedQuizzes: 6,
    totalQuizzes: 6,
    certificates: 6
  },
  {
    id: 'staff-4',
    name: 'Emma',
    surname: 'Williams',
    email: 'emma.williams@restaurant.com',
    contact: '+27 456 789 0123',
    store: 'Downtown Branch',
    designation: 'Hostess',
    status: 'inactive',
    joinDate: '2024-02-01',
    trainingProgress: 40,
    completedQuizzes: 1,
    totalQuizzes: 6,
    certificates: 0
  }
]

// Get all staff members
export const getAllStaff = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_STAFF)
    }, 500)
  })
}

// Get staff by ID
export const getStaffById = async (staffId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const staff = MOCK_STAFF.find(s => s.id === staffId)
      resolve(staff || null)
    }, 300)
  })
}

// Add new staff member
export const addStaffMember = async (staffData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStaff = {
        id: `staff-${Date.now()}`,
        ...staffData,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        trainingProgress: 0,
        completedQuizzes: 0,
        totalQuizzes: 6,
        certificates: 0
      }
      MOCK_STAFF.push(newStaff)
      resolve(newStaff)
    }, 500)
  })
}

// Update staff member
export const updateStaffMember = async (staffId, staffData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = MOCK_STAFF.findIndex(s => s.id === staffId)
      if (index !== -1) {
        MOCK_STAFF[index] = { ...MOCK_STAFF[index], ...staffData }
        resolve(MOCK_STAFF[index])
      } else {
        resolve(null)
      }
    }, 500)
  })
}

// Delete staff member
export const deleteStaffMember = async (staffId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = MOCK_STAFF.findIndex(s => s.id === staffId)
      if (index !== -1) {
        const deleted = MOCK_STAFF.splice(index, 1)
        resolve(deleted[0])
      } else {
        resolve(null)
      }
    }, 500)
  })
}

// Get staff by store
export const getStaffByStore = async (storeName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const staff = MOCK_STAFF.filter(s => s.store === storeName)
      resolve(staff)
    }, 500)
  })
}

// Get staff statistics
export const getStaffStatistics = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = {
        totalStaff: MOCK_STAFF.length,
        activeStaff: MOCK_STAFF.filter(s => s.status === 'active').length,
        inactiveStaff: MOCK_STAFF.filter(s => s.status === 'inactive').length,
        averageTrainingProgress: Math.round(
          MOCK_STAFF.reduce((sum, s) => sum + s.trainingProgress, 0) / MOCK_STAFF.length
        ),
        certificatesIssued: MOCK_STAFF.reduce((sum, s) => sum + s.certificates, 0),
        stores: [...new Set(MOCK_STAFF.map(s => s.store))]
      }
      resolve(stats)
    }, 500)
  })
}

// Get staff training history
export const getStaffTrainingHistory = async (staffId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const staff = MOCK_STAFF.find(s => s.id === staffId)
      if (staff) {
        const history = [
          {
            id: 'training-1',
            quizTitle: 'Food Safety Manual',
            completedDate: '2024-10-15',
            score: 85,
            status: 'passed'
          },
          {
            id: 'training-2',
            quizTitle: 'Customer Service & Five Steps of Service',
            completedDate: '2024-10-10',
            score: 92,
            status: 'passed'
          },
          {
            id: 'training-3',
            quizTitle: 'Storage Handling Procedures',
            completedDate: '2024-10-05',
            score: 78,
            status: 'passed'
          }
        ]
        resolve(history)
      } else {
        resolve([])
      }
    }, 500)
  })
}

export default {
  getAllStaff,
  getStaffById,
  addStaffMember,
  updateStaffMember,
  deleteStaffMember,
  getStaffByStore,
  getStaffStatistics,
  getStaffTrainingHistory
}

