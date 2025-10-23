import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Users, Award, TrendingUp, BookOpen, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Training',
      description: 'Structured modules covering all aspects of restaurant operations and staff development.'
    },
    {
      icon: Users,
      title: 'Staff Management',
      description: 'Easy onboarding, role assignment, and performance tracking for your entire team.'
    },
    {
      icon: Award,
      title: 'Certification System',
      description: 'Digital certificates and badges to recognize staff achievements and milestones.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Reports',
      description: 'Real-time insights into staff performance, training progress, and operational metrics.'
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Stay compliant with industry standards and regulations with automated documentation.'
    },
    {
      icon: Zap,
      title: 'Quick Implementation',
      description: 'Get your team trained and certified in days, not months.'
    }
  ];

  const benefits = [
    'Reduce training time by 60% with structured approach',
    '100% training records accuracy for audits',
    'Improved staff retention through professional development',
    'Consistent training across all locations',
    '24/7 access to training materials',
    'Real-time progress tracking and reporting'
  ];

  const stats = [
    { number: '500+', label: 'Restaurants Served' },
    { number: '10,000+', label: 'Staff Trained' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/ya-lesedi-logo.png" alt="Ya Lesedi" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-bold text-white">Ya Lesedi</h1>
              <p className="text-xs text-amber-400">Restaurant Development Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigate('/login')}
              className="px-6 py-2 text-white hover:text-amber-400 transition-colors font-medium"
            >
              Staff Login
            </button>
            <button
              onClick={() => handleNavigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-amber-500/50"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full mb-4">
                  <span className="text-sm font-medium text-amber-300">🏆 Trusted by Leading Restaurants</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Revolutionize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Hospitality Training</span>
                </h2>
              </div>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Say goodbye to outdated training methods and paperwork headaches. Our innovative platform transforms how hospitality businesses train staff, track progress, and maintain compliance. Streamline your entire training workflow with intuitive digital tools.
              </p>

              <p className="text-lg text-slate-400 mb-8">
                From onboarding new hires to ongoing skill development, our platform creates unprecedented accountability while saving managers countless hours on administrative tasks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => handleNavigate('/login')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-amber-500/50"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-amber-400/50 hover:border-amber-400 text-white rounded-lg font-bold text-lg transition-all">
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Logo/Image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-blue-400/20 rounded-2xl blur-2xl"></div>
                <img
                  src="/ya-lesedi-logo.png"
                  alt="Ya Lesedi Consulting"
                  className="relative w-full max-w-md h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-slate-900/50 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300 mb-2">
                  {stat.number}
                </p>
                <p className="text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Comprehensive Training Solutions</h3>
            <p className="text-xl text-slate-400">Everything you need to build, train, and manage an exceptional restaurant team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 hover:border-amber-400/30 rounded-xl p-8 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="mb-4">
                    <div className="inline-block p-3 bg-amber-500/20 border border-amber-400/30 rounded-lg group-hover:bg-amber-500/30 transition-all">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-white mb-8">Why Choose Ya Lesedi?</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 border border-amber-400/30">
                      <span className="text-amber-400 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Industry Expertise</h4>
                    <p className="text-slate-400">Built by restaurant professionals for restaurant professionals who understand the unique challenges of hospitality training.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 border border-amber-400/30">
                      <span className="text-amber-400 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Time-Saving</h4>
                    <p className="text-slate-400">Reduce training time by 60% with our structured approach and automated workflows.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 border border-amber-400/30">
                      <span className="text-amber-400 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Compliance Ready</h4>
                    <p className="text-slate-400">Stay compliant with industry standards and regulations with automated documentation and audit trails.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 border border-amber-400/30">
                      <span className="text-amber-400 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">BEE-Registered</h4>
                    <p className="text-slate-400">A small BEE-registered business committed to empowering South African hospitality excellence.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-blue-900/30 border border-amber-400/20 rounded-2xl p-8">
              <p className="text-lg text-slate-200 leading-relaxed mb-6">
                "Revolutionize Your Hospitality Training with Our All-in-One Solution"
              </p>
              <p className="text-slate-400 leading-relaxed">
                Built specifically for the dynamic hospitality environment by industry insiders, we're proud to offer this game-changing technology. Our platform integrates seamlessly with your existing operations, providing unprecedented accountability while saving managers countless hours on administrative tasks.
              </p>
              <div className="mt-8 pt-8 border-t border-slate-700/50">
                <p className="text-sm text-slate-500">Ya Lesedi Consulting</p>
                <p className="text-amber-400 font-bold text-lg">Your Recipe to Success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Restaurant?</h3>
          <p className="text-xl text-slate-400 mb-8">Join hundreds of restaurants already using Ya Lesedi Training to build exceptional teams</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNavigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-amber-500/50"
            >
              Start Your Journey Today
            </button>
            <button className="px-8 py-4 border-2 border-amber-400/50 hover:border-amber-400 text-white rounded-lg font-bold text-lg transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/ya-lesedi-logo.png" alt="Ya Lesedi" className="h-8 w-8 object-contain" />
                <span className="font-bold text-white">Ya Lesedi</span>
              </div>
              <p className="text-slate-400 text-sm">Transforming hospitality excellence through professional training</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-500 text-sm">© 2024 Ya Lesedi Restaurant Training System. All rights reserved.</p>
              <p className="text-amber-400 font-medium text-sm mt-4 md:mt-0">Your Recipe to Success</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

