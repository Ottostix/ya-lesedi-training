import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff } from 'lucide-react';

interface LoginAttempt {
  username: string;
  timestamp: number;
}

const SECURE_CREDENTIALS = {
  'admin': { password: 'Admin@2024!Secure', role: 'master_admin' },
  'manager': { password: 'Manager@2024!Secure', role: 'store_manager' },
  'staff': { password: 'Staff@2024!Secure', role: 'staff' },
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Check for account lockout on mount
  useEffect(() => {
    const lockoutData = localStorage.getItem('loginLockout');
    if (lockoutData) {
      const { timestamp } = JSON.parse(lockoutData);
      const now = Date.now();
      if (now - timestamp < LOCKOUT_DURATION) {
        setIsLocked(true);
        const remaining = Math.ceil((LOCKOUT_DURATION - (now - timestamp)) / 1000);
        setLockoutTime(remaining);
      } else {
        localStorage.removeItem('loginLockout');
        localStorage.removeItem('loginAttempts');
      }
    }
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    if (!isLocked || lockoutTime <= 0) return;
    const timer = setInterval(() => {
      setLockoutTime(prev => {
        if (prev <= 1) {
          setIsLocked(false);
          localStorage.removeItem('loginLockout');
          localStorage.removeItem('loginAttempts');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked, lockoutTime]);

  const recordLoginAttempt = (username: string) => {
    const attempts: LoginAttempt[] = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
    const now = Date.now();
    
    // Filter out old attempts outside the window
    const recentAttempts = attempts.filter(a => now - a.timestamp < ATTEMPT_WINDOW);
    recentAttempts.push({ username, timestamp: now });
    
    localStorage.setItem('loginAttempts', JSON.stringify(recentAttempts));
    
    // Check if max attempts exceeded
    if (recentAttempts.length >= MAX_ATTEMPTS) {
      localStorage.setItem('loginLockout', JSON.stringify({ timestamp: now }));
      setIsLocked(true);
      setLockoutTime(Math.ceil(LOCKOUT_DURATION / 1000));
      return true;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account locked. Try again in ${lockoutTime} seconds.`);
      return;
    }

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate secure authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = SECURE_CREDENTIALS[username as keyof typeof SECURE_CREDENTIALS];
    
    if (!user || user.password !== password) {
      const shouldLock = recordLoginAttempt(username);
      setError(shouldLock ? 'Too many failed attempts. Account locked for 15 minutes.' : 'Invalid username or password');
      setLoading(false);
      return;
    }

    // Clear login attempts on successful login
    localStorage.removeItem('loginAttempts');

    // Store secure session
    const session = {
      username,
      role: user.role,
      loginTime: Date.now(),
      sessionId: Math.random().toString(36).substring(2),
    };
    
    localStorage.setItem('session', JSON.stringify(session));
    
    setLoading(false);
    setLocation('/dashboard');
  };

  const handleDemoLogin = (demoUsername: string) => {
    setUsername(demoUsername);
    setPassword(SECURE_CREDENTIALS[demoUsername as keyof typeof SECURE_CREDENTIALS].password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header with Logo */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <img
          src="/ya-lesedi-logo.png"
          alt="Ya Lesedi Logo"
          style={{
            height: '40px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
        <span style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#d4af37',
          fontFamily: "'Playfair Display', serif",
        }}>
          Ya Lesedi
        </span>
      </div>

      {/* Login Container */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Title */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2rem',
            fontFamily: "'Playfair Display', serif",
            color: '#ffffff',
            margin: '0 0 0.5rem 0',
          }}>
            Ya Lesedi
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: '#b8bcc4',
            margin: 0,
          }}>
            Restaurant Training System
          </p>
        </div>

        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <img
            src="/ya-lesedi-logo.png"
            alt="Ya Lesedi Logo"
            style={{
              height: '80px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid rgba(231, 76, 60, 0.3)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            color: '#ff6b6b',
            fontSize: '0.9rem',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ marginBottom: '1.5rem' }}>
          {/* Username */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLocked || loading}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                background: 'rgba(36, 45, 61, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                fontFamily: "'Inter', sans-serif",
                outline: 'none',
                boxSizing: 'border-box',
                opacity: isLocked || loading ? 0.6 : 1,
                cursor: isLocked || loading ? 'not-allowed' : 'text',
              }}
              onFocus={(e) => {
                if (!isLocked && !loading) {
                  e.target.style.borderColor = '#d4af37';
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked || loading}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 1rem',
                  paddingRight: '2.5rem',
                  background: 'rgba(36, 45, 61, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: isLocked || loading ? 0.6 : 1,
                  cursor: isLocked || loading ? 'not-allowed' : 'text',
                }}
                onFocus={(e) => {
                  if (!isLocked && !loading) {
                    e.target.style.borderColor = '#d4af37';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked || loading}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#d4af37',
                  cursor: isLocked || loading ? 'not-allowed' : 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isLocked || loading ? 0.6 : 1,
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLocked || loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: isLocked
                ? 'rgba(212, 175, 55, 0.3)'
                : 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
              color: isLocked ? '#999' : '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: isLocked || loading ? 'not-allowed' : 'pointer',
              boxShadow: isLocked ? 'none' : '0 4px 15px rgba(212, 175, 55, 0.3)',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : isLocked ? `Locked (${lockoutTime}s)` : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        {!isLocked && (
          <div style={{
            borderTop: '1px solid rgba(212, 175, 55, 0.1)',
            paddingTop: '1.5rem',
          }}>
            <p style={{
              fontSize: '0.8rem',
              color: '#b8bcc4',
              textAlign: 'center',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Demo Credentials
            </p>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '6px',
                color: '#d4af37',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '0.5rem',
                opacity: loading ? 0.6 : 1,
              }}
            >
              👨‍💼 Admin Account
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('manager')}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '6px',
                color: '#d4af37',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '0.5rem',
                opacity: loading ? 0.6 : 1,
              }}
            >
              🏪 Store Manager
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('staff')}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '6px',
                color: '#d4af37',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              👤 Staff Account
            </button>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div style={{
        marginTop: '2rem',
        fontSize: '0.8rem',
        color: '#b8bcc4',
        textAlign: 'center',
        maxWidth: '420px',
      }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          🔒 Secure login with rate-limiting and account lockout protection
        </p>
        <p style={{ margin: 0 }}>
          © 2024 Ya Lesedi Restaurant Training System
        </p>
      </div>
    </div>
  );
}
