import React, { useState } from 'react';
import { Shield, Users, Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { ROLE_PERMISSIONS, PERMISSIONS, UserRole } from '../services/rbacService';
import { useRBAC } from '../contexts/RBACContext';

export default function RoleManagement() {
  const { isMasterAdmin } = useRBAC();
  const [selectedRole, setSelectedRole] = useState<UserRole>('staff');

  if (!isMasterAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="font-medium text-red-400">Access Denied</p>
              <p className="text-sm text-red-300">Only Master Admins can manage roles and permissions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const roles: UserRole[] = ['master_admin', 'store_manager', 'staff'];
  const currentRolePerms = ROLE_PERMISSIONS[selectedRole];
  const currentPermissions = currentRolePerms.permissions.map(id => PERMISSIONS[id]).filter(Boolean);

  // Group permissions by category
  const permissionsByCategory = currentPermissions.reduce((acc, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, typeof currentPermissions>);

  const categoryLabels: Record<string, string> = {
    users: '👥 User Management',
    restaurants: '🏪 Restaurant Management',
    training: '📚 Training Management',
    quizzes: '📝 Quiz Management',
    analytics: '📊 Analytics & Reports',
    reports: '📋 Reports',
    settings: '⚙️ Settings'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Settings
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Role Management</h1>
          </div>
          <p className="text-slate-400">Configure roles and permissions for your system</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedRole === role
                  ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20'
                  : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white capitalize">{role.replace('_', ' ')}</h3>
              </div>
              <p className="text-sm text-slate-400">{ROLE_PERMISSIONS[role].description}</p>
            </button>
          ))}
        </div>

        {/* Permissions Display */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                {ROLE_PERMISSIONS[selectedRole].permissions.length} Permissions
              </h2>
            </div>
            <p className="text-slate-400 text-sm">
              {ROLE_PERMISSIONS[selectedRole].description}
            </p>
          </div>

          {/* Permissions by Category */}
          <div className="space-y-6">
            {Object.entries(permissionsByCategory).map(([category, perms]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-bold text-white">{categoryLabels[category] || category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {perms.map(perm => (
                    <div
                      key={perm.id}
                      className="flex items-start gap-3 p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 transition-all"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm">{perm.name}</p>
                        <p className="text-xs text-slate-400">{perm.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Comparison */}
        <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Role Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 font-bold text-white">Feature</th>
                  {roles.map(role => (
                    <th key={role} className="text-center py-3 px-4 font-bold text-white capitalize">
                      {role.replace('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['users', 'restaurants', 'training', 'quizzes', 'analytics', 'settings'].map(category => (
                  <tr key={category} className="border-b border-slate-700/30">
                    <td className="py-3 px-4 text-slate-300 capitalize font-medium">{categoryLabels[category]}</td>
                    {roles.map(role => {
                      const hasCategory = ROLE_PERMISSIONS[role].permissions.some(
                        id => PERMISSIONS[id]?.category === category
                      );
                      return (
                        <td key={`${role}-${category}`} className="text-center py-3 px-4">
                          {hasCategory ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-slate-600 rounded mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permission Details */}
        <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">All Available Permissions</h2>
          <div className="space-y-4">
            {Object.entries(PERMISSIONS).reduce((acc, [_, perm]) => {
              const category = perm.category;
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(perm);
              return acc;
            }, {} as Record<string, typeof PERMISSIONS[string][]>)}
            {Object.entries(
              Object.entries(PERMISSIONS).reduce((acc, [_, perm]) => {
                const category = perm.category;
                if (!acc[category]) {
                  acc[category] = [];
                }
                acc[category].push(perm);
                return acc;
              }, {} as Record<string, typeof PERMISSIONS[string][]>)
            ).map(([category, perms]) => (
              <div key={category}>
                <h3 className="text-sm font-bold text-purple-300 mb-2 uppercase">{categoryLabels[category]}</h3>
                <div className="space-y-2">
                  {perms.map(perm => (
                    <div key={perm.id} className="text-sm text-slate-400 pl-4">
                      <code className="text-purple-300 font-mono">{perm.id}</code>
                      <p className="text-xs text-slate-500">{perm.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

