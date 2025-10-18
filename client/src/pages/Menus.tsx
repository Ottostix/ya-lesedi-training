import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';

const API_BASE_URL = 'https://ya-lesedi-backend.onrender.com/api';

export default function Menus({ onLogout, currentUser }: any) {
  const [menus, setMenus] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<any>({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStoreId, setUploadStoreId] = useState('');
  const [menuType, setMenuType] = useState('food');
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadMenus();
    loadStores();
  }, []);

  const loadMenus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/menus`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMenus(data.menus || []);
      }
    } catch (error) {
      console.error('Error loading menus:', error);
      setMessage({ type: 'error', text: 'Failed to load menus' });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stores`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStores(data.stores || []);
      }
    } catch (error) {
      console.error('Error loading stores:', error);
    }
  };

  const handleUploadMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !uploadStoreId) {
      setMessage({ type: 'error', text: 'Please select a file and store' });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('store_id', uploadStoreId);
    formData.append('menu_type', menuType);

    try {
      const response = await fetch(`${API_BASE_URL}/menus/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Menu uploaded successfully!' });
        setSelectedFile(null);
        setUploadStoreId('');
        setMenuType('food');
        setShowForm(false);
        loadMenus();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to upload menu' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' });
    }
  };

  const filteredMenus = menus.filter(menu =>
    menu.store_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.menu_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Menu Management</h1>
            <p className="text-slate-600 mt-1">Upload and manage restaurant menus</p>
          </div>
          {(currentUser?.role === 'master' || currentUser?.role === 'manager') && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {showForm ? 'Cancel' : 'Upload Menu'}
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
              <CardTitle>Upload Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadMenu} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Store</label>
                  <select
                    value={uploadStoreId}
                    onChange={(e) => setUploadStoreId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    required
                  >
                    <option value="">Choose a store...</option>
                    {stores.map(store => (
                      <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Menu Type</label>
                  <select
                    value={menuType}
                    onChange={(e) => setMenuType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  >
                    <option value="food">Food Menu</option>
                    <option value="beverage">Beverage Menu</option>
                    <option value="dessert">Dessert Menu</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Upload File (PDF, Image)</label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    required
                  />
                </div>

                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  Upload Menu
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Menus List</CardTitle>
            <CardDescription>Total menus: {menus.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search menus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-200"
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : filteredMenus.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMenus.map((menu: any) => (
                  <div key={menu.id} className="p-4 border border-slate-200 rounded-lg hover:border-amber-300 hover:shadow-md transition">
                    <h3 className="font-semibold text-slate-900">{menu.store_name}</h3>
                    <p className="text-sm text-slate-600 mt-2">Type: <span className="capitalize font-medium">{menu.menu_type}</span></p>
                    <p className="text-xs text-slate-500 mt-2">Uploaded: {new Date(menu.created_at).toLocaleDateString()}</p>
                    {menu.file_url && (
                      <a href={menu.file_url} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 text-sm mt-3 inline-block">
                        View Menu →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                No menus found
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

