import React, { createContext, useContext, ReactNode } from 'react';
import { rbacService, User, UserRole, Permission } from '../services/rbacService';

interface RBACContextType {
  currentUser: User | null;
  hasPermission: (permissionId: string) => boolean;
  hasAnyPermission: (permissionIds: string[]) => boolean;
  hasAllPermissions: (permissionIds: string[]) => boolean;
  getUserPermissions: () => string[];
  getUserRole: () => UserRole | null;
  isAdmin: () => boolean;
  isMasterAdmin: () => boolean;
  isStaff: () => boolean;
  getRoleDescription: (role: UserRole) => string;
  getRolePermissions: (role: UserRole) => Permission[];
  canAccessRestaurant: (restaurantId: string) => boolean;
  setCurrentUser: (user: User | null) => void;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(rbacService.getCurrentUser());

  const handleSetCurrentUser = (user: User | null) => {
    rbacService.setCurrentUser(user);
    setCurrentUser(user);
  };

  const value: RBACContextType = {
    currentUser,
    hasPermission: (permissionId) => rbacService.hasPermission(permissionId),
    hasAnyPermission: (permissionIds) => rbacService.hasAnyPermission(permissionIds),
    hasAllPermissions: (permissionIds) => rbacService.hasAllPermissions(permissionIds),
    getUserPermissions: () => rbacService.getUserPermissions(),
    getUserRole: () => rbacService.getUserRole(),
    isAdmin: () => rbacService.isAdmin(),
    isMasterAdmin: () => rbacService.isMasterAdmin(),
    isStaff: () => rbacService.isStaff(),
    getRoleDescription: (role) => rbacService.getRoleDescription(role),
    getRolePermissions: (role) => rbacService.getRolePermissions(role),
    canAccessRestaurant: (restaurantId) => rbacService.canAccessRestaurant(restaurantId),
    setCurrentUser: handleSetCurrentUser
  };

  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
};

// Custom hook to use RBAC context
export const useRBAC = (): RBACContextType => {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within RBACProvider');
  }
  return context;
};

// Higher-order component for permission-based rendering
export const withPermission = (Component: React.ComponentType<any>, requiredPermission: string) => {
  return (props: any) => {
    const { hasPermission } = useRBAC();

    if (!hasPermission(requiredPermission)) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">Access Denied</p>
          <p className="text-sm">You don't have permission to access this resource.</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

// Component for conditional rendering based on permissions
interface PermissionGateProps {
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  permissions,
  requireAll = false,
  children,
  fallback = null
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useRBAC();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

