import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';

const API_BASE_URL = 'https://ya-lesedi-backend.onrender.com/api';

export default function Stores({ onLogout, currentUser }: any) {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<any>({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', location: '', manager_name: '', contact_number: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/stores`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStores(data.stores || []);
      }
    } catch (error) {
      console.error('Error loading stores:', error);
      setMessage({ type: 'error', text: 'Failed to load stores' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newStore)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Store created successfully!' });
        setNewStore({ name: '', location: '', manager_name: '', contact_number: '', email: '' });
        setShowForm(false);
        loadStores();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create store' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' });
    }
  };

  const filteredStores = stores.filter(store =>
    store.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.manager_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Store Management</h1>
            <p className="text-slate-600 mt-1">Manage your restaurant locations</p>
          </div>
          {(currentUser?.role === 'master' || currentUser?.role === 'manager') && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {showForm ? 'Cancel' : 'Add New Store'}
            </Button>
          )}
        </div>

        {message.text && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-4">
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {showForm && (currentUser?.role === 'master' || currentUser?.role === 'manager') && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Store</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateStore} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Store Name</label>
                    <Input
                      type="text"
                      placeholder="Store Name"
                      value={newStore.name}
                      onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      type="text"
                      placeholder="Location"
                      value={newStore.location}
                      onChange={(e) => setNewStore({ ...newStore, location: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Manager Name</label>
                    <Input
                      type="text"
                      placeholder="Manager Name"
                      value={newStore.manager_name}
                      onChange={(e) => setNewStore({ ...newStore, manager_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Number</label>
                    <Input
                      type="tel"
                      placeholder="Contact Number"
                      value={newStore.contact_number}
                      onChange={(e) => setNewStore({ ...newStore, contact_number: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={newStore.email}
                      onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  Create Store
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Stores List</CardTitle>
            <CardDescription>Total stores: {stores.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-200"
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : filteredStores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStores.map((store: any) => (
                  <div key={store.id} className="p-4 border border-slate-200 rounded-lg hover:border-amber-300 hover:shadow-md transition">
                    <h3 className="font-semibold text-slate-900 text-lg">{store.name}</h3>
                    <p className="text-sm text-slate-600 mt-2">📍 {store.location}</p>
                    <p className="text-sm text-slate-600 mt-1">👤 Manager: {store.manager_name}</p>
                    <p className="text-sm text-slate-600 mt-1">📞 {store.contact_number}</p>
                    <p className="text-sm text-slate-600 mt-1">✉️ {store.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                No stores found
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

