import { useState } from 'react';
import { Trash2, Edit2, Plus, Search, MapPin, Users, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Store {
  id: string;
  name: string;
  location: string;
  manager: string;
  staff: number;
  rating: number;
  status: 'active' | 'inactive';
  phone: string;
  email: string;
}

export default function Stores({ onLogout, currentUser }: any) {
  const [stores, setStores] = useState<Store[]>([
    {
      id: '1',
      name: 'Ya Lesedi Sandton',
      location: 'Sandton, Johannesburg',
      manager: 'David Mthembu',
      staff: 45,
      rating: 4.8,
      status: 'active',
      phone: '+27 11 123 4567',
      email: 'sandton@yalesedi.com',
    },
    {
      id: '2',
      name: 'Ya Lesedi Rosebank',
      location: 'Rosebank, Johannesburg',
      manager: 'Sarah Nkosi',
      staff: 38,
      rating: 4.6,
      status: 'active',
      phone: '+27 11 234 5678',
      email: 'rosebank@yalesedi.com',
    },
    {
      id: '3',
      name: 'Ya Lesedi Cape Town',
      location: 'V&A Waterfront, Cape Town',
      manager: 'James Pieterse',
      staff: 52,
      rating: 4.9,
      status: 'active',
      phone: '+27 21 345 6789',
      email: 'capetown@yalesedi.com',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Store, 'id'>>({
    name: '',
    location: '',
    manager: '',
    staff: 0,
    rating: 4.5,
    status: 'active',
    phone: '',
    email: '',
  });

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStore = () => {
    if (!formData.name || !formData.location || !formData.manager) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setStores(stores.map(s => s.id === editingId ? { ...s, ...formData } : s));
      setEditingId(null);
    } else {
      const newStore: Store = {
        id: Date.now().toString(),
        ...formData,
      };
      setStores([...stores, newStore]);
    }

    setFormData({
      name: '',
      location: '',
      manager: '',
      staff: 0,
      rating: 4.5,
      status: 'active',
      phone: '',
      email: '',
    });
    setShowForm(false);
  };

  const handleEditStore = (store: Store) => {
    setFormData({
      name: store.name,
      location: store.location,
      manager: store.manager,
      staff: store.staff,
      rating: store.rating,
      status: store.status,
      phone: store.phone,
      email: store.email,
    });
    setEditingId(store.id);
    setShowForm(true);
  };

  const handleDeleteStore = (id: string) => {
    if (confirm('Are you sure you want to delete this store?')) {
      setStores(stores.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Store Management</h1>
            <p className="text-slate-600 mt-2">Manage your restaurant locations and staff</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                name: '',
                location: '',
                manager: '',
                staff: 0,
                rating: 4.5,
                status: 'active',
                phone: '',
                email: '',
              });
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={20} /> Add Store
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by store name, location, or manager..."
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
              {editingId ? 'Edit Store' : 'Add New Store'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ya Lesedi Sandton"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Sandton, Johannesburg"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Manager *</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  placeholder="David Mthembu"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Staff Count</label>
                <input
                  type="number"
                  value={formData.staff}
                  onChange={(e) => setFormData({ ...formData, staff: parseInt(e.target.value) || 0 })}
                  placeholder="45"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+27 11 123 4567"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sandton@yalesedi.com"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 4.5 })}
                  placeholder="4.5"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
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
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddStore}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
              >
                {editingId ? 'Update' : 'Add'} Store
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

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className={`h-2 ${store.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{store.name}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={18} className="text-amber-600" />
                    <span>{store.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={18} className="text-amber-600" />
                    <span>{store.staff} Staff Members</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Star size={18} className="text-amber-600 fill-amber-600" />
                    <span>{store.rating} / 5.0</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 mb-4">
                  <p className="text-sm text-slate-600 mb-1"><strong>Manager:</strong> {store.manager}</p>
                  <p className="text-sm text-slate-600 mb-1"><strong>Phone:</strong> {store.phone}</p>
                  <p className="text-sm text-slate-600"><strong>Email:</strong> {store.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditStore(store)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStore(store.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No stores found</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Total Stores</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stores.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Active Stores</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stores.filter(s => s.status === 'active').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Total Staff</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stores.reduce((sum, s) => sum + s.staff, 0)}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
