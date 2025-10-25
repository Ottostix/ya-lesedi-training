import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const stats = [
    { label: 'Total Restaurants', value: '47', change: '+12%', icon: '🏢' },
    { label: 'Active Staff', value: '523', change: '+8%', icon: '👥' },
    { label: 'Training Modules', value: '28', change: '+3', icon: '📚' },
    { label: 'Completion Rate', value: '92.5%', change: '+5%', icon: '✅' },
  ];

  const recentActivities = [
    { id: 1, title: 'New staff member added', description: 'John Smith joined Kitchen Team', time: '2 hours ago', icon: '👤' },
    { id: 2, title: 'Quiz completed', description: 'Sarah Johnson completed Food Safety Quiz', time: '4 hours ago', icon: '✓' },
    { id: 3, title: 'Document uploaded', description: 'Emergency Procedures handbook updated', time: '1 day ago', icon: '📄' },
    { id: 4, title: 'Training assigned', description: 'Customer Service training assigned to 5 staff', time: '2 days ago', icon: '📖' },
  ];

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
          marginBottom: '3rem',
          animation: 'slideIn 0.6s ease-out'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}>
              Dashboard
            </h1>
            <p style={{
              color: '#b8bcc4',
              fontSize: '1rem',
              fontFamily: "'Lora', serif",
            }}>
              Welcome back, {user?.name || 'Admin'}! Here's your training overview.
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 140, 66, 0.05) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            textAlign: 'center',
          }}>
            <p style={{ color: '#b8bcc4', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Role</p>
            <p style={{ color: '#d4af37', fontSize: '1.2rem', fontWeight: 700 }}>{user?.role || 'Administrator'}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(255, 140, 66, 0.05) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                animation: `slideIn 0.6s ease-out ${index * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4af37';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.15)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <p style={{ color: '#b8bcc4', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontSize: '2.5rem',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: '#d4af37',
                  }}>
                    {stat.value}
                  </p>
                </div>
                <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
              </div>
              <p style={{
                color: '#2ecc71',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}>
                {stat.change} vs last month
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
        }}>
          {/* Recent Activities */}
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            borderRadius: '12px',
            padding: '2rem',
            animation: 'slideIn 0.8s ease-out 0.2s both',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              📋 Recent Activities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    background: 'rgba(36, 45, 61, 0.5)',
                    border: '1px solid rgba(212, 175, 55, 0.1)',
                    borderRadius: '8px',
                    padding: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                    e.currentTarget.style.background = 'rgba(36, 45, 61, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.background = 'rgba(36, 45, 61, 0.5)';
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.5rem' }}>{activity.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {activity.title}
                      </p>
                      <p style={{ color: '#b8bcc4', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {activity.description}
                      </p>
                      <p style={{ color: '#8a8f99', fontSize: '0.85rem' }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            borderRadius: '12px',
            padding: '2rem',
            animation: 'slideIn 0.8s ease-out 0.3s both',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              ⚡ Quick Actions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
              }}
              onClick={() => setLocation('/users')}
              >
                👥 Add New Staff Member
              </button>
              <button style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(52, 152, 219, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
              }}
              onClick={() => setLocation('/quizzes')}
              >
                📝 Create New Quiz
              </button>
              <button style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(52, 152, 219, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
              }}
              onClick={() => setLocation('/quizzes')}
              >
                📝 Create New Quiz
              </button>
              <button style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(46, 204, 113, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(46, 204, 113, 0.3)';
              }}
              onClick={() => setLocation('/menus')}
              >
                📄 Upload Document
              </button>
              <button style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(155, 89, 182, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(155, 89, 182, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.3)';
              }}
              onClick={() => setLocation('/stores')}
              >
                📊 View Analytics
              </button>
            </div>

            {/* Training Stats */}
            <div style={{
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.1)',
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1rem',
              }}>
                Training Progress
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#b8bcc4', fontSize: '0.9rem' }}>Food Safety</span>
                    <span style={{ color: '#d4af37', fontWeight: 600 }}>85%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(36, 45, 61, 0.8)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: '85%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #d4af37 0%, #ff8c42 100%)',
                      borderRadius: '10px',
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#b8bcc4', fontSize: '0.9rem' }}>Customer Service</span>
                    <span style={{ color: '#d4af37', fontWeight: 600 }}>72%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(36, 45, 61, 0.8)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: '72%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #d4af37 0%, #ff8c42 100%)',
                      borderRadius: '10px',
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#b8bcc4', fontSize: '0.9rem' }}>Emergency Procedures</span>
                    <span style={{ color: '#d4af37', fontWeight: 600 }}>95%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(36, 45, 61, 0.8)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: '95%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #d4af37 0%, #ff8c42 100%)',
                      borderRadius: '10px',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
