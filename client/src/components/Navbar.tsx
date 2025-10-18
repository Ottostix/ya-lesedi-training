import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Navbar({ currentUser, onLogout }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/' },
    ...(currentUser?.role === 'master' || currentUser?.role === 'manager' ? [
      { label: 'Users', href: '/users' },
    ] : []),
    { label: 'Stores', href: '/stores' },
    { label: 'Menus', href: '/menus' },
    { label: 'Quizzes', href: '/quizzes' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2 hover:opacity-80 transition">
              <img 
                src="/ya-lesedi-logo.jpg" 
                alt="Ya Lesedi Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                Ya Lesedi
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition">
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-slate-900">{currentUser?.full_name || currentUser?.username}</p>
              <p className="text-xs text-slate-500 capitalize">{currentUser?.role}</p>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              Logout
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a 
                  className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

