import { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff } from 'lucide-react';

const API_BASE_URL = 'https://ya-lesedi-backend.onrender.com/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setLocation('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 transform hover:scale-110 transition-transform duration-300">
            <img 
              src="/1000551394.jpg" 
              alt="Ya Lesedi Logo" 
              className="w-32 h-32 rounded-full shadow-2xl border-4 border-amber-600 object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">Ya Lesedi</h1>
          <p className="text-2xl text-amber-400 mb-2">Restaurant Training System</p>
          <p className="text-slate-300 text-lg">Excellence in Hospitality Excellence</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all duration-300 bg-slate-50 group-hover:bg-white"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all duration-300 bg-slate-50 group-hover:bg-white pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-amber-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            <span className="px-4 text-slate-500 text-sm font-medium">Demo Credentials</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          {/* Demo Credentials */}
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => demoLogin('Tshepo', '2402')}>
              <p className="text-xs font-semibold text-amber-900 mb-1">Master Admin</p>
              <p className="text-sm font-mono text-amber-800"><span className="font-bold">Tshepo</span> / <span className="font-bold">2402</span></p>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => demoLogin('staff', 'password')}>
              <p className="text-xs font-semibold text-blue-900 mb-1">Staff User</p>
              <p className="text-sm font-mono text-blue-800"><span className="font-bold">staff</span> / <span className="font-bold">password</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p className="mb-2">© 2024 Ya Lesedi Restaurant Training System. All rights reserved.</p>
          <p>Transforming hospitality excellence through professional training</p>
        </div>
      </div>
    </div>
  );
}
