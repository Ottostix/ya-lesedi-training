import { useState } from 'react';
import { Plus, FileText, Upload, Download, Trash2, Calendar } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
}

export default function Menus() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Food Safety Guidelines.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '2024-10-15', category: 'Training' },
    { id: 2, name: 'Menu Descriptions.docx', type: 'DOCX', size: '1.1 MB', uploadDate: '2024-10-14', category: 'Menu' },
    { id: 3, name: 'Wine Pairing Guide.pdf', type: 'PDF', size: '3.2 MB', uploadDate: '2024-10-13', category: 'Training' },
    { id: 4, name: 'Beverage Menu.xlsx', type: 'XLSX', size: '0.8 MB', uploadDate: '2024-10-12', category: 'Menu' },
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Menu');

  const handleUpload = () => {
    if (uploadName) {
      setDocuments([...documents, {
        id: documents.length + 1,
        name: uploadName,
        type: 'PDF',
        size: '1.5 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        category: uploadCategory
      }]);
      setUploadName('');
      setShowUpload(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'DOCX': return 'bg-blue-100 text-blue-800';
      case 'XLSX': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Documents & Menus</h1>
          <p className="text-slate-600">Upload and manage training materials and menus</p>
        </div>

        <button
          onClick={() => setShowUpload(!showUpload)}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload Document
        </button>

        {showUpload && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-amber-600">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload New Document</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Document Name"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              >
                <option>Menu</option>
                <option>Training</option>
                <option>Policy</option>
                <option>Other</option>
              </select>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4 hover:border-amber-600 transition-colors">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 font-medium">Click to upload or drag and drop</p>
              <p className="text-slate-500 text-sm">PDF, DOCX, XLSX up to 10MB</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
              >
                Upload
              </button>
              <button
                onClick={() => setShowUpload(false)}
                className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-bold">Document Name</th>
                  <th className="px-6 py-4 text-left font-bold">Type</th>
                  <th className="px-6 py-4 text-left font-bold">Category</th>
                  <th className="px-6 py-4 text-left font-bold">Size</th>
                  <th className="px-6 py-4 text-left font-bold">Upload Date</th>
                  <th className="px-6 py-4 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <span className="font-semibold text-slate-900">{doc.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.category}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.size}</td>
                    <td className="px-6 py-4 flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      {doc.uploadDate}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all">
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
