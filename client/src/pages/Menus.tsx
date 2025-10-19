import { useState } from 'react';
import { Trash2, Download, Plus, Search, FileText, Calendar, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Document {
  id: string;
  name: string;
  type: 'Menu' | 'SOP' | 'Training' | 'Policy';
  uploadedBy: string;
  uploadDate: string;
  size: string;
  category: string;
}

export default function Menus({ onLogout, currentUser }: any) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Main Menu - Sandton',
      type: 'Menu',
      uploadedBy: 'David Mthembu',
      uploadDate: '2024-10-15',
      size: '2.4 MB',
      category: 'Food & Beverage',
    },
    {
      id: '2',
      name: 'Wine Pairing Guide',
      type: 'Training',
      uploadedBy: 'Sarah Nkosi',
      uploadDate: '2024-10-10',
      size: '1.8 MB',
      category: 'Training Materials',
    },
    {
      id: '3',
      name: 'Food Safety SOP',
      type: 'SOP',
      uploadedBy: 'John Dlamini',
      uploadDate: '2024-10-08',
      size: '3.1 MB',
      category: 'Standard Procedures',
    },
    {
      id: '4',
      name: 'Customer Service Policy',
      type: 'Policy',
      uploadedBy: 'Amelia Chen',
      uploadDate: '2024-10-05',
      size: '1.2 MB',
      category: 'Policies',
    },
    {
      id: '5',
      name: 'Dessert Menu - All Locations',
      type: 'Menu',
      uploadedBy: 'David Mthembu',
      uploadDate: '2024-10-01',
      size: '2.7 MB',
      category: 'Food & Beverage',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Menu' as 'Menu' | 'SOP' | 'Training' | 'Policy',
    category: 'Food & Beverage',
    file: null as File | null,
  });

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleUploadDocument = () => {
    if (!formData.name || !formData.file) {
      alert('Please fill in all required fields');
      return;
    }

    const newDocument: Document = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      uploadedBy: currentUser?.username || 'Unknown',
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      category: formData.category,
    };

    setDocuments([newDocument, ...documents]);
    setFormData({
      name: '',
      type: 'Menu',
      category: 'Food & Beverage',
      file: null,
    });
    setShowUploadForm(false);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const handleDownloadDocument = (doc: Document) => {
    alert(`Downloading: ${doc.name}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Menu':
        return 'bg-blue-100 text-blue-800';
      case 'SOP':
        return 'bg-green-100 text-green-800';
      case 'Training':
        return 'bg-purple-100 text-purple-800';
      case 'Policy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Documents & Menus</h1>
            <p className="text-slate-600 mt-2">Upload and manage training materials and menus</p>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={20} /> Upload Document
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Upload New Document</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Document Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Main Menu - Sandton"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Document Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                >
                  <option value="Menu">Menu</option>
                  <option value="SOP">Standard Operating Procedure</option>
                  <option value="Training">Training Material</option>
                  <option value="Policy">Policy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                >
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Training Materials">Training Materials</option>
                  <option value="Standard Procedures">Standard Procedures</option>
                  <option value="Policies">Policies</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">File *</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUploadDocument}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
              >
                Upload Document
              </button>
              <button
                onClick={() => setShowUploadForm(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Document Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Uploaded By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-amber-600" />
                        <span className="font-medium text-slate-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.category}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-slate-600">{new Date(doc.uploadDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.size}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleDownloadDocument(doc)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
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
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No documents found</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Total Documents</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{documents.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Menus</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{documents.filter(d => d.type === 'Menu').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Training Materials</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{documents.filter(d => d.type === 'Training').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Policies</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{documents.filter(d => d.type === 'Policy').length}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
