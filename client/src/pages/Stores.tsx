import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Plus, Edit2, Trash2, Search, TrendingUp, Users, BookOpen } from 'lucide-react';

interface Store {
  id: number;
  name: string;
  location: string;
  manager: string;
  staff: number;
  trainingProgress: number;
  revenue: string;
  status: string;
}

export default function Stores() {
  const [, setLocation] = useLocation();
  const [stores, setStores] = useState<Store[]>([
    {
      id: 1,
      name: 'Downtown Bistro',
      location: 'Johannesburg',
      manager: 'Mike Davis',
      staff: 24,
      trainingProgress: 92,
      revenue: '$125,400',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Uptown Grill',
      location: 'Pretoria',
      manager: 'Sarah Johnson',
      staff: 18,
      trainingProgress: 78,
      revenue: '$98,200',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Riverside Cafe',
      location: 'Cape Town',
      manager: 'James Wilson',
      staff: 15,
      trainingProgress: 85,
      revenue: '$87,600',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Sunset Restaurant',
      location: 'Durban',
      manager: 'Emma Thompson',
      staff: 22,
      trainingProgress: 65,
      revenue: '$112,300',
      status: 'Active',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    manager: '',
  });

  const filteredStores = stores.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStore = () => {
    if (formData.name && formData.location) {
      if (editingId) {
        setStores(stores.map(s => s.id === editingId ? {
          ...s,
          ...formData,
          staff: s.staff,
          trainingProgress: s.trainingProgress,
          revenue: s.revenue,
        } : s));
        setEditingId(null);
      } else {
        setStores([...stores, {
          id: stores.length + 1,
          ...formData,
          staff: 0,
          trainingProgress: 0,
          revenue: '$0',
          status: 'Active',
        }]);
      }
      setFormData({ name: '', location: '', manager: '' });
      setShowForm(false);
    }
  };

  const handleEdit = (s: Store) => {
    setFormData({
      name: s.name,
      location: s.location,
      manager: s.manager,
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setStores(stores.filter(s => s.id !== id));
  };

  const totalStaff = stores.reduce((sum, s) => sum + s.staff, 0);
  const avgTrainingProgress = Math.round(stores.reduce((sum, s) => sum + s.trainingProgress, 0) / stores.length);
  const totalRevenue = stores.reduce((sum, s) => {
    const num = parseInt(s.revenue.replace(/[$,]/g, ''));
    return sum + num;
  }, 0);

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
              Store Management & Analytics
            </h1>
            <p style={{ color: '#b8bcc4', marginTop: '0.5rem' }}>
              Monitor restaurant locations and performance
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', location: '', manager: '' });
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
            <Plus size={20} /> Add Store
          </button>
        </div>

        {/* Analytics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#b8bcc4', margin: 0, fontSize: '0.9rem' }}>Total Staff</p>
                <p style={{
                  fontSize: '2rem',
                  fontFamily: "'Playfair Display', serif",
                  color: '#d4af37',
                  fontWeight: 700,
                  margin: '0.5rem 0 0 0',
                }}>
                  {totalStaff}
                </p>
              </div>
              <Users style={{ color: '#d4af37', opacity: 0.3 }} size={40} />
            </div>
          </div>

          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#b8bcc4', margin: 0, fontSize: '0.9rem' }}>Avg Training Progress</p>
                <p style={{
                  fontSize: '2rem',
                  fontFamily: "'Playfair Display', serif",
                  color: '#d4af37',
                  fontWeight: 700,
                  margin: '0.5rem 0 0 0',
                }}>
                  {avgTrainingProgress}%
                </p>
              </div>
              <BookOpen style={{ color: '#d4af37', opacity: 0.3 }} size={40} />
            </div>
          </div>

          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#b8bcc4', margin: 0, fontSize: '0.9rem' }}>Total Revenue</p>
                <p style={{
                  fontSize: '2rem',
                  fontFamily: "'Playfair Display', serif",
                  color: '#d4af37',
                  fontWeight: 700,
                  margin: '0.5rem 0 0 0',
                }}>
                  ${(totalRevenue / 1000).toFixed(0)}K
                </p>
              </div>
              <TrendingUp style={{ color: '#d4af37', opacity: 0.3 }} size={40} />
            </div>
          </div>
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
              {editingId ? 'Edit Store' : 'Add New Store'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <input
                type="text"
                placeholder="Store Name"
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
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <input
                type="text"
                placeholder="Manager Name"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddStore}
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
                {editingId ? 'Update' : 'Add'} Store
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', location: '', manager: '' });
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

        {/* Search */}
        <div style={{ marginBottom: '2rem', position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#d4af37',
          }} />
          <input
            type="text"
            placeholder="Search stores by name or location..."
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

        {/* Stores Table */}
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
                }}>Store Name</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Location</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Manager</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Staff</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Training</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Revenue</th>
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
              {filteredStores.map((store) => (
                <tr
                  key={store.id}
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
                  <td style={{ padding: '1rem', color: '#ffffff', fontWeight: 600 }}>{store.name}</td>
                  <td style={{ padding: '1rem', color: '#b8bcc4' }}>{store.location}</td>
                  <td style={{ padding: '1rem', color: '#b8bcc4' }}>{store.manager}</td>
                  <td style={{ padding: '1rem', color: '#ffffff' }}>{store.staff}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      background: 'rgba(36, 45, 61, 0.5)',
                      borderRadius: '4px',
                      height: '6px',
                      overflow: 'hidden',
                      marginBottom: '0.25rem',
                    }}>
                      <div style={{
                        background: `linear-gradient(90deg, #d4af37 0%, #aa8c2c 100%)`,
                        height: '100%',
                        width: `${store.trainingProgress}%`,
                      }} />
                    </div>
                    <span style={{ color: '#b8bcc4', fontSize: '0.8rem' }}>{store.trainingProgress}%</span>
                  </td>
                  <td style={{ padding: '1rem', color: '#d4af37', fontWeight: 600 }}>{store.revenue}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEdit(store)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        marginRight: '1rem',
                      }}
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(store.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#f44336',
                        cursor: 'pointer',
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
          {filteredStores.length === 0 && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#b8bcc4',
            }}>
              No stores found.
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

