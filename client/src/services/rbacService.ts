// Role-Based Access Control (RBAC) Service
// Manages permissions and access control for different user roles

export type UserRole = 'master_admin' | 'store_manager' | 'staff';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'restaurants' | 'training' | 'quizzes' | 'analytics' | 'reports' | 'settings';
}

export interface RolePermissions {
  role: UserRole;
  permissions: string[]; // Permission IDs
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  restaurantIds: string[];
  isActive: boolean;
  permissions?: string[];
}

// Define all available permissions
export const PERMISSIONS: Record<string, Permission> = {
  // User Management
  'users.view': {
    id: 'users.view',
    name: 'View Users',
    description: 'View list of users and user details',
    category: 'users'
  },
  'users.create': {
    id: 'users.create',
    name: 'Create Users',
    description: 'Create new user accounts',
    category: 'users'
  },
  'users.edit': {
    id: 'users.edit',
    name: 'Edit Users',
    description: 'Edit user information and details',
    category: 'users'
  },
  'users.delete': {
    id: 'users.delete',
    name: 'Delete Users',
    description: 'Delete user accounts',
    category: 'users'
  },
  'users.verify': {
    id: 'users.verify',
    name: 'Verify Users',
    description: 'Verify and approve new staff members',
    category: 'users'
  },
  'users.assign_roles': {
    id: 'users.assign_roles',
    name: 'Assign Roles',
    description: 'Assign roles to users',
    category: 'users'
  },

  // Restaurant Management
  'restaurants.view': {
    id: 'restaurants.view',
    name: 'View Restaurants',
    description: 'View restaurant information',
    category: 'restaurants'
  },
  'restaurants.create': {
    id: 'restaurants.create',
    name: 'Create Restaurants',
    description: 'Create new restaurant records',
    category: 'restaurants'
  },
  'restaurants.edit': {
    id: 'restaurants.edit',
    name: 'Edit Restaurants',
    description: 'Edit restaurant information',
    category: 'restaurants'
  },
  'restaurants.delete': {
    id: 'restaurants.delete',
    name: 'Delete Restaurants',
    description: 'Delete restaurant records',
    category: 'restaurants'
  },

  // Training Management
  'training.view': {
    id: 'training.view',
    name: 'View Training',
    description: 'View training modules and materials',
    category: 'training'
  },
  'training.create': {
    id: 'training.create',
    name: 'Create Training',
    description: 'Create new training modules',
    category: 'training'
  },
  'training.edit': {
    id: 'training.edit',
    name: 'Edit Training',
    description: 'Edit training modules',
    category: 'training'
  },
  'training.delete': {
    id: 'training.delete',
    name: 'Delete Training',
    description: 'Delete training modules',
    category: 'training'
  },
  'training.upload': {
    id: 'training.upload',
    name: 'Upload Training Materials',
    description: 'Upload training documents and manuals',
    category: 'training'
  },
  'training.assign': {
    id: 'training.assign',
    name: 'Assign Training',
    description: 'Assign training to staff members',
    category: 'training'
  },

  // Quiz Management
  'quizzes.view': {
    id: 'quizzes.view',
    name: 'View Quizzes',
    description: 'View quiz questions and results',
    category: 'quizzes'
  },
  'quizzes.create': {
    id: 'quizzes.create',
    name: 'Create Quizzes',
    description: 'Create new quizzes',
    category: 'quizzes'
  },
  'quizzes.edit': {
    id: 'quizzes.edit',
    name: 'Edit Quizzes',
    description: 'Edit quiz questions and settings',
    category: 'quizzes'
  },
  'quizzes.delete': {
    id: 'quizzes.delete',
    name: 'Delete Quizzes',
    description: 'Delete quizzes',
    category: 'quizzes'
  },
  'quizzes.generate_ai': {
    id: 'quizzes.generate_ai',
    name: 'Generate AI Quizzes',
    description: 'Generate quizzes using AI',
    category: 'quizzes'
  },
  'quizzes.assign': {
    id: 'quizzes.assign',
    name: 'Assign Quizzes',
    description: 'Assign quizzes to staff',
    category: 'quizzes'
  },

  // Analytics & Reports
  'analytics.view': {
    id: 'analytics.view',
    name: 'View Analytics',
    description: 'View training analytics and reports',
    category: 'analytics'
  },
  'analytics.export': {
    id: 'analytics.export',
    name: 'Export Reports',
    description: 'Export analytics and reports',
    category: 'analytics'
  },
  'analytics.view_all': {
    id: 'analytics.view_all',
    name: 'View All Analytics',
    description: 'View analytics for all restaurants',
    category: 'analytics'
  },

  // Settings
  'settings.view': {
    id: 'settings.view',
    name: 'View Settings',
    description: 'View system settings',
    category: 'settings'
  },
  'settings.edit': {
    id: 'settings.edit',
    name: 'Edit Settings',
    description: 'Edit system settings',
    category: 'settings'
  },
  'settings.manage_roles': {
    id: 'settings.manage_roles',
    name: 'Manage Roles',
    description: 'Create and manage roles and permissions',
    category: 'settings'
  }
};

// Define role-based permission mappings
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  master_admin: {
    role: 'master_admin',
    description: 'Full system access - Can manage all restaurants, users, and settings',
    permissions: Object.keys(PERMISSIONS) // All permissions
  },

  store_manager: {
    role: 'store_manager',
    description: 'Restaurant manager - Can manage users and training for their restaurant',
    permissions: [
      // Users
      'users.view',
      'users.create',
      'users.edit',
      'users.verify',
      'users.assign_roles',

      // Restaurants
      'restaurants.view',
      'restaurants.edit',

      // Training
      'training.view',
      'training.create',
      'training.edit',
      'training.upload',
      'training.assign',

      // Quizzes
      'quizzes.view',
      'quizzes.create',
      'quizzes.edit',
      'quizzes.generate_ai',
      'quizzes.assign',

      // Analytics
      'analytics.view',
      'analytics.export',

      // Settings
      'settings.view'
    ]
  },

  staff: {
    role: 'staff',
    description: 'Staff member - Can view training and complete quizzes',
    permissions: [
      // Training
      'training.view',

      // Quizzes
      'quizzes.view',

      // Analytics
      'analytics.view'
    ]
  }
};

export class RBACService {
  private static instance: RBACService;
  private currentUser: User | null = null;

  private constructor() {
    this.loadCurrentUser();
  }

  static getInstance(): RBACService {
    if (!RBACService.instance) {
      RBACService.instance = new RBACService();
    }
    return RBACService.instance;
  }

  /**
   * Load current user from localStorage
   */
  private loadCurrentUser(): void {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }

  /**
   * Set current user
   */
  setCurrentUser(user: User | null): void {
    this.currentUser = user;
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Check if user has permission
   */
  hasPermission(permissionId: string): boolean {
    if (!this.currentUser) {
      return false;
    }

    // Master admin has all permissions
    if (this.currentUser.role === 'master_admin') {
      return true;
    }

    // Check role-based permissions
    const rolePerms = ROLE_PERMISSIONS[this.currentUser.role];
    if (!rolePerms) {
      return false;
    }

    return rolePerms.permissions.includes(permissionId);
  }

  /**
   * Check if user has any of the given permissions
   */
  hasAnyPermission(permissionIds: string[]): boolean {
    return permissionIds.some(id => this.hasPermission(id));
  }

  /**
   * Check if user has all of the given permissions
   */
  hasAllPermissions(permissionIds: string[]): boolean {
    return permissionIds.every(id => this.hasPermission(id));
  }

  /**
   * Get user's permissions
   */
  getUserPermissions(): string[] {
    if (!this.currentUser) {
      return [];
    }

    const rolePerms = ROLE_PERMISSIONS[this.currentUser.role];
    return rolePerms ? rolePerms.permissions : [];
  }

  /**
   * Get user's role
   */
  getUserRole(): UserRole | null {
    return this.currentUser?.role || null;
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.currentUser?.role === 'master_admin' || this.currentUser?.role === 'store_manager';
  }

  /**
   * Check if user is master admin
   */
  isMasterAdmin(): boolean {
    return this.currentUser?.role === 'master_admin';
  }

  /**
   * Check if user is staff
   */
  isStaff(): boolean {
    return this.currentUser?.role === 'staff';
  }

  /**
   * Get role description
   */
  getRoleDescription(role: UserRole): string {
    return ROLE_PERMISSIONS[role]?.description || '';
  }

  /**
   * Get all permissions for a role
   */
  getRolePermissions(role: UserRole): Permission[] {
    const rolePerms = ROLE_PERMISSIONS[role];
    if (!rolePerms) {
      return [];
    }

    return rolePerms.permissions.map(id => PERMISSIONS[id]).filter(Boolean);
  }

  /**
   * Get permission details
   */
  getPermissionDetails(permissionId: string): Permission | undefined {
    return PERMISSIONS[permissionId];
  }

  /**
   * Get all permissions grouped by category
   */
  getPermissionsByCategory(category: string): Permission[] {
    return Object.values(PERMISSIONS).filter(p => p.category === category);
  }

  /**
   * Check if user can access restaurant
   */
  canAccessRestaurant(restaurantId: string): boolean {
    if (!this.currentUser) {
      return false;
    }

    // Master admin can access all restaurants
    if (this.currentUser.role === 'master_admin') {
      return true;
    }

    // Check if user is assigned to restaurant
    return this.currentUser.restaurantIds.includes(restaurantId);
  }

  /**
   * Get accessible restaurants
   */
  getAccessibleRestaurants(allRestaurants: any[]): any[] {
    if (!this.currentUser) {
      return [];
    }

    // Master admin can access all restaurants
    if (this.currentUser.role === 'master_admin') {
      return allRestaurants;
    }

    // Filter by assigned restaurants
    return allRestaurants.filter(r => this.currentUser!.restaurantIds.includes(r.id));
  }
}

// Export singleton instance
export const rbacService = RBACService.getInstance();

