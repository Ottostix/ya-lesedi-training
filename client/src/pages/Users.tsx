import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Staff', status: 'Active', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Trainer', status: 'Active', joinDate: '2024-03-10' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Staff' });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, {
        id: users.length + 1,
        ...newUser,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0]
      }]);
      setNewUser({ name: '', email: '', role: 'Staff' });
      setShowForm(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Staff Management</h1>
          <p className="text-slate-600">Manage your restaurant staff and training assignments</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Staff
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-amber-600">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Staff Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              >
                <option>Staff</option>
                <option>Manager</option>
                <option>Trainer</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddUser}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-bold">Name</th>
                  <th className="px-6 py-4 text-left font-bold">Email</th>
                  <th className="px-6 py-4 text-left font-bold">Role</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-left font-bold">Join Date</th>
                  <th className="px-6 py-4 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{user.name}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.joinDate}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
