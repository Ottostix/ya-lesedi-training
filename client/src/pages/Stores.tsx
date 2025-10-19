import { useState } from 'react';
import { Plus, MapPin, Users, Star, Edit2, Trash2 } from 'lucide-react';

interface Store {
  id: number;
  name: string;
  location: string;
  manager: string;
  staff: number;
  rating: number;
  status: string;
}

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([
    { id: 1, name: 'Downtown Restaurant', location: 'Main Street', manager: 'John Doe', staff: 25, rating: 4.8, status: 'Active' },
    { id: 2, name: 'Riverside Bistro', location: 'River Road', manager: 'Sarah Smith', staff: 18, rating: 4.6, status: 'Active' },
    { id: 3, name: 'Garden Café', location: 'Park Avenue', manager: 'Mike Johnson', staff: 12, rating: 4.9, status: 'Active' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', location: '', manager: '', staff: 0 });

  const handleAddStore = () => {
    if (newStore.name && newStore.location) {
      setStores([...stores, {
        id: stores.length + 1,
        ...newStore,
        rating: 4.5,
        status: 'Active'
      }]);
      setNewStore({ name: '', location: '', manager: '', staff: 0 });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Restaurant Locations</h1>
          <p className="text-slate-600">Manage your restaurant locations and staff</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Location
        </button>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-amber-600">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Restaurant Name"
                value={newStore.name}
                onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <input
                type="text"
                placeholder="Location"
                value={newStore.location}
                onChange={(e) => setNewStore({...newStore, location: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <input
                type="text"
                placeholder="Manager Name"
                value={newStore.manager}
                onChange={(e) => setNewStore({...newStore, manager: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <input
                type="number"
                placeholder="Staff Count"
                value={newStore.staff}
                onChange={(e) => setNewStore({...newStore, staff: parseInt(e.target.value)})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddStore}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                <div className="flex items-center gap-2 text-blue-100">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">{store.location}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 space-y-2">
                  <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Manager:</span> {store.manager}</p>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <p className="text-sm"><span className="font-semibold text-slate-900">{store.staff}</span> Staff</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <p className="text-sm font-semibold text-slate-900">{store.rating} Rating</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-200">
                  <button className="flex-1 p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all flex items-center justify-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all flex items-center justify-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
