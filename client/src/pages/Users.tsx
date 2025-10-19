import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'staff' | 'manager' | 'master';
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
}

export default function Users({ onLogout, currentUser }: any) {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'john_dlamini',
      email: 'john@yalesedi.com',
      fullName: 'John Dlamini',
      role: 'staff',
      department: 'Kitchen',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      username: 'sarah_nkosi',
      email: 'sarah@yalesedi.com',
      fullName: 'Sarah Nkosi',
      role: 'manager',
      department: 'Front of House',
      status: 'active',
      joinDate: '2023-06-20',
    },
    {
      id: '3',
      username: 'mike_johnson',
      email: 'mike@yalesedi.com',
      fullName: 'Mike Johnson',
      role: 'staff',
      department: 'Kitchen',
      status: 'active',
      joinDate: '2024-03-10',
    },
    {
      id: '4',
      username: 'amelia_chen',
      email: 'amelia@yalesedi.com',
      fullName: 'Amelia Chen',
      role: 'staff',
      department: 'Front of House',
      status: 'on-leave',
      joinDate: '2023-11-05',
    },
    {
      id: '5',
      username: 'david_mthembu',
      email: 'david@yalesedi.com',
      fullName: 'David Mthembu',
      role: 'manager',
      department: 'Management',
      status: 'active',
      joinDate: '2023-02-28',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    username: '',
    email: '',
    fullName: '',
    role: 'staff',
    department: 'Kitchen',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
  });

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!formData.username || !formData.email || !formData.fullName) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
      setEditingId(null);
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
      };
      setUsers([...users, newUser]);
    }

    setFormData({
      username: '',
      email: '',
      fullName: '',
      role: 'staff',
      department: 'Kitchen',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const handleEditUser = (user: User) => {
    setFormData({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      department: user.department,
      status: user.status,
      joinDate: user.joinDate,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'master':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Staff Management</h1>
            <p className="text-slate-600 mt-2">Manage your restaurant staff and training assignments</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                username: '',
                email: '',
                fullName: '',
                role: 'staff',
                department: 'Kitchen',
                status: 'active',
                joinDate: new Date().toISOString().split('T')[0],
              });
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={20} /> Add Staff Member
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, username, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {editingId ? 'Edit Staff Member' : 'Add New Staff Member'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Dlamini"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="john_dlamini"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@yalesedi.com"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="master">Master</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                >
                  <option value="Kitchen">Kitchen</option>
                  <option value="Front of House">Front of House</option>
                  <option value="Management">Management</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddUser}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
              >
                {editingId ? 'Update' : 'Add'} Staff Member
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{user.fullName}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.department}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No staff members found</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Total Staff</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Active</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{users.filter(u => u.status === 'active').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">On Leave</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{users.filter(u => u.status === 'on-leave').length}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

