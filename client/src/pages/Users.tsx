import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface Staff {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  restaurant: string;
  trainingProgress: number;
}

export default function Users() {
  const [, setLocation] = useLocation();
  const [staff, setStaff] = useState<Staff[]>([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Chef', status: 'Active', joinDate: '2024-01-15', restaurant: 'Downtown Bistro', trainingProgress: 85 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Server', status: 'Active', joinDate: '2024-02-20', restaurant: 'Uptown Grill', trainingProgress: 72 },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', role: 'Manager', status: 'Active', joinDate: '2023-12-01', restaurant: 'Downtown Bistro', trainingProgress: 95 },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'Bartender', status: 'Inactive', joinDate: '2024-03-10', restaurant: 'Uptown Grill', trainingProgress: 45 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'Staff', restaurant: '' });

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = () => {
    if (newStaff.name && newStaff.email) {
      if (editingId) {
        setStaff(staff.map(s => s.id === editingId ? {
          ...s,
          ...newStaff,
          trainingProgress: s.trainingProgress,
        } : s));
        setEditingId(null);
      } else {
        setStaff([...staff, {
          id: staff.length + 1,
          ...newStaff,
          status: 'Active',
          joinDate: new Date().toISOString().split('T')[0],
          trainingProgress: 0,
        }]);
      }
      setNewStaff({ name: '', email: '', role: 'Staff', restaurant: '' });
      setShowForm(false);
    }
  };

  const handleEdit = (s: Staff) => {
    setNewStaff({ name: s.name, email: s.email, role: s.role, restaurant: s.restaurant });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
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
              Staff Management
            </h1>
            <p style={{ color: '#b8bcc4', marginTop: '0.5rem' }}>
              Manage your restaurant staff and training progress
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setNewStaff({ name: '', email: '', role: 'Staff', restaurant: '' });
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
            <Plus size={20} /> Add Staff
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
              {editingId ? 'Edit Staff Member' : 'Add New Staff Member'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <input
                type="text"
                placeholder="Name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
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
                type="email"
                placeholder="Email"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
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
                placeholder="Role"
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
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
                placeholder="Restaurant"
                value={newStaff.restaurant}
                onChange={(e) => setNewStaff({ ...newStaff, restaurant: e.target.value })}
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
                onClick={handleAddStaff}
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
                {editingId ? 'Update' : 'Add'} Staff
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setNewStaff({ name: '', email: '', role: 'Staff', restaurant: '' });
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
            placeholder="Search by name or email..."
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

        {/* Staff Table */}
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
                }}>Name</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Email</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Role</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  color: '#d4af37',
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                }}>Restaurant</th>
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
                }}>Status</th>
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
              {filteredStaff.map((s) => (
                <tr
                  key={s.id}
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
                  <td style={{ padding: '1rem', color: '#ffffff' }}>{s.name}</td>
                  <td style={{ padding: '1rem', color: '#b8bcc4' }}>{s.email}</td>
                  <td style={{ padding: '1rem', color: '#d4af37' }}>{s.role}</td>
                  <td style={{ padding: '1rem', color: '#b8bcc4' }}>{s.restaurant}</td>
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
                        width: `${s.trainingProgress}%`,
                      }} />
                    </div>
                    <span style={{ color: '#b8bcc4', fontSize: '0.8rem' }}>{s.trainingProgress}%</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: s.status === 'Active' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                      color: s.status === 'Active' ? '#4caf50' : '#f44336',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEdit(s)}
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
                      onClick={() => handleDelete(s.id)}
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
          {filteredStaff.length === 0 && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#b8bcc4',
            }}>
              No staff members found.
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

