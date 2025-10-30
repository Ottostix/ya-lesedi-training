import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Plus, Edit2, Trash2, Search, Upload, Download, FileText } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  downloads: number;
}

export default function Menus() {
  const [, setLocation] = useLocation();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Restaurant Menu - Downtown',
      type: 'PDF',
      category: 'Menu',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      downloads: 45,
    },
    {
      id: 2,
      name: 'Food Safety Guidelines',
      type: 'PDF',
      category: 'Training Material',
      uploadDate: '2024-02-10',
      size: '1.8 MB',
      downloads: 128,
    },
    {
      id: 3,
      name: 'Staff Handbook',
      type: 'DOCX',
      category: 'Documentation',
      uploadDate: '2024-02-20',
      size: '3.2 MB',
      downloads: 87,
    },
    {
      id: 4,
      name: 'Wine Pairing Guide',
      type: 'PDF',
      category: 'Training Material',
      uploadDate: '2024-03-05',
      size: '5.1 MB',
      downloads: 62,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'PDF',
    category: 'Menu',
  });

  const filteredDocuments = documents.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddDocument = () => {
    if (formData.name) {
      if (editingId) {
        setDocuments(documents.map(d => d.id === editingId ? {
          ...d,
          ...formData,
          size: d.size,
          downloads: d.downloads,
        } : d));
        setEditingId(null);
      } else {
        setDocuments([...documents, {
          id: documents.length + 1,
          ...formData,
          uploadDate: new Date().toISOString().split('T')[0],
          size: '0 MB',
          downloads: 0,
        }]);
      }
      setFormData({ name: '', type: 'PDF', category: 'Menu' });
      setShowForm(false);
    }
  };

  const handleEdit = (d: Document) => {
    setFormData({
      name: d.name,
      type: d.type,
      category: d.category,
    });
    setEditingId(d.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #16213e 100%)',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
            }}>
              Documents & Menus
            </h1>
            <p style={{ color: '#b8bcc4', marginTop: '0.5rem' }}>
              Manage training materials and restaurant menus
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', type: 'PDF', category: 'Menu' });
              setShowForm(!showForm);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            }}
          >
            <Upload size={20} /> Upload Document
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{
            background: 'rgba(26, 31, 46, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontFamily: "'Playfair Display', serif",
              color: '#d4af37',
              marginBottom: '1.5rem',
            }}>
              {editingId ? 'Edit Document' : 'Upload New Document'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <input
                type="text"
                placeholder="Document Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="XLSX">XLSX</option>
                <option value="PPT">PPT</option>
              </select>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <option value="Menu">Menu</option>
                <option value="Training Material">Training Material</option>
                <option value="Documentation">Documentation</option>
                <option value="Procedures">Procedures</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddDocument}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {editingId ? 'Update' : 'Upload'} Document
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', type: 'PDF', category: 'Menu' });
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(212, 175, 55, 0.1)',
                  color: '#d4af37',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#d4af37',
            }} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                background: 'rgba(36, 45, 61, 0.5)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(36, 45, 61, 0.5)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
            }}
          >
            <option value="all">All Categories</option>
            <option value="Menu">Menu</option>
            <option value="Training Material">Training Material</option>
            <option value="Documentation">Documentation</option>
            <option value="Procedures">Procedures</option>
          </select>
        </div>

        {/* Documents Table */}
        <div style={{
          background: 'rgba(26, 31, 46, 0.6)',
          border: '1px solid rgba(212, 175, 55, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{
                background: 'rgba(212, 175, 55, 0.1)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              }}>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Document Name</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Type</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Category</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Upload Date</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Size</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Downloads</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  style={{
                    borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={{ padding: '1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={18} style={{ color: '#d4af37' }} />
                    {doc.name}
                  </td>
                  <td style={{ padding: '1rem', color: '#b8bcc4' }}>{doc.type}</td>
                  <td style={{ padding: '1rem', color: '#d4af37' }}>{doc.category}</td>
                  <td style={{ padding: '1rem', color: '#b8bcc4' }}>{doc.uploadDate}</td>
                  <td style={{ padding: '1rem', color: '#b8bcc4' }}>{doc.size}</td>
                  <td style={{ padding: '1rem', color: '#ffffff', fontWeight: 600 }}>{doc.downloads}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#4caf50',
                        cursor: 'pointer',
                        marginRight: '1rem',
                        fontSize: '1.2rem',
                      }}
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(doc)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        marginRight: '1rem',
                        fontSize: '1.2rem',
                      }}
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#f44336',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                      }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDocuments.length === 0 && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#b8bcc4',
            }}>
              No documents found. Upload your first document to get started!
            </div>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => setLocation('/dashboard')}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(212, 175, 55, 0.1)',
            color: '#d4af37',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

