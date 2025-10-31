import { useLocation } from 'wouter';
import { ChefHat, Users, TrendingUp, Award } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #16213e 100%)',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navigation Bar */}
      <nav style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: '#d4af37',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          🍽️ Ya Lesedi
        </div>
        <button
          onClick={() => setLocation('/login')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '900px',
        }}>
          {/* Main Logo */}
          <div style={{
            marginBottom: '3rem',
            fontSize: '5rem',
            animation: 'pulse 3s ease-in-out infinite',
          }}>
            🍽️
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: '3.5rem',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem',
            lineHeight: 1.2,
            letterSpacing: '-1px',
          }}>
            Revolutionize the Hospitality Industry
          </h1>

          {/* Tagline */}
          <h2 style={{
            fontSize: '2rem',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '2rem',
            lineHeight: 1.3,
          }}>
            Your Recipe to Success
          </h2>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            color: '#b8bcc4',
            marginBottom: '3rem',
            lineHeight: 1.8,
            maxWidth: '700px',
            margin: '0 auto 3rem',
          }}>
            Transform your restaurant operations with intelligent staff training, real-time performance analytics, and comprehensive management tools designed for hospitality excellence.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setLocation('/login')}
            style={{
              padding: '1rem 3rem',
              background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(26, 31, 46, 0.3)',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#d4af37',
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            Why Choose Ya Lesedi?
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {/* Feature 1 */}
            <div style={{
              background: 'rgba(26, 31, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: '12px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}>
              <ChefHat style={{
                color: '#d4af37',
                marginBottom: '1rem',
                width: '48px',
                height: '48px',
                margin: '0 auto 1rem',
              }} />
              <h4 style={{
                fontSize: '1.3rem',
                fontFamily: "'Playfair Display', serif",
                color: '#d4af37',
                marginBottom: '0.5rem',
              }}>
                Smart Training
              </h4>
              <p style={{
                color: '#b8bcc4',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}>
                AI-powered quiz generation and personalized learning paths for your team.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              background: 'rgba(26, 31, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: '12px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}>
              <TrendingUp style={{
                color: '#d4af37',
                marginBottom: '1rem',
                width: '48px',
                height: '48px',
                margin: '0 auto 1rem',
              }} />
              <h4 style={{
                fontSize: '1.3rem',
                fontFamily: "'Playfair Display', serif",
                color: '#d4af37',
                marginBottom: '0.5rem',
              }}>
                Real-Time Analytics
              </h4>
              <p style={{
                color: '#b8bcc4',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}>
                Monitor training progress and performance metrics across all locations.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              background: 'rgba(26, 31, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: '12px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}>
              <Users style={{
                color: '#d4af37',
                marginBottom: '1rem',
                width: '48px',
                height: '48px',
                margin: '0 auto 1rem',
              }} />
              <h4 style={{
                fontSize: '1.3rem',
                fontFamily: "'Playfair Display', serif",
                color: '#d4af37',
                marginBottom: '0.5rem',
              }}>
                Team Management
              </h4>
              <p style={{
                color: '#b8bcc4',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}>
                Manage staff, assign roles, and track team development effortlessly.
              </p>
            </div>

            {/* Feature 4 */}
            <div style={{
              background: 'rgba(26, 31, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: '12px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}>
              <Award style={{
                color: '#d4af37',
                marginBottom: '1rem',
                width: '48px',
                height: '48px',
                margin: '0 auto 1rem',
              }} />
              <h4 style={{
                fontSize: '1.3rem',
                fontFamily: "'Playfair Display', serif",
                color: '#d4af37',
                marginBottom: '0.5rem',
              }}>
                Compliance Ready
              </h4>
              <p style={{
                color: '#b8bcc4',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}>
                Automated documentation and compliance tracking for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              color: '#d4af37',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}>
              47+
            </div>
            <p style={{ color: '#b8bcc4' }}>Active Restaurants</p>
          </div>
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              color: '#d4af37',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}>
              523
            </div>
            <p style={{ color: '#b8bcc4' }}>Trained Staff Members</p>
          </div>
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              color: '#d4af37',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}>
              92.5%
            </div>
            <p style={{ color: '#b8bcc4' }}>Training Completion</p>
          </div>
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              color: '#d4af37',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}>
              28
            </div>
            <p style={{ color: '#b8bcc4' }}>Training Modules</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        textAlign: 'center',
        color: '#b8bcc4',
        fontSize: '0.9rem',
      }}>
        <p>© 2024 Ya Lesedi Restaurant Training System. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>Transforming hospitality excellence through professional training</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

