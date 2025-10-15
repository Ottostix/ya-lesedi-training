import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { BookOpen, Award, Users, FileText, ChefHat, Shield, Clock, TrendingUp, CheckCircle2, Star } from 'lucide-react'
import yaLesediLogo from './assets/ya-lesedi-logo.jpg'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Active Users', value: '250+', icon: Users, color: 'text-[#d4af37]' },
    { label: 'Training Modules', value: '5', icon: BookOpen, color: 'text-[#d4af37]' },
    { label: 'Completion Rate', value: '92%', icon: TrendingUp, color: 'text-[#d4af37]' },
    { label: 'Certifications', value: '180+', icon: Award, color: 'text-[#d4af37]' },
  ]

  const modules = [
    {
      title: 'Food Safety & Hygiene',
      description: 'SANS 10049 compliance standards and South African food safety regulations',
      icon: ChefHat,
      progress: 85,
      status: 'In Progress'
    },
    {
      title: 'Occupational Health & Safety',
      description: 'OHS Act 85 of 1993 compliance and restaurant-specific safety requirements',
      icon: Shield,
      progress: 100,
      status: 'Completed'
    },
    {
      title: 'South African Labour Law',
      description: 'National Minimum Wage Act and Basic Conditions of Employment Act',
      icon: FileText,
      progress: 60,
      status: 'In Progress'
    },
    {
      title: '5-Star Service Excellence',
      description: 'South African hospitality standards and wine service protocols',
      icon: Star,
      progress: 45,
      status: 'In Progress'
    },
    {
      title: 'Emergency Procedures',
      description: 'Critical emergency response protocols with South African emergency numbers',
      icon: Clock,
      progress: 100,
      status: 'Completed'
    },
  ]

  const achievements = [
    { title: 'First Quiz Completed', earned: true },
    { title: '5-Day Learning Streak', earned: true },
    { title: 'Perfect Score', earned: false },
    { title: 'All Modules Complete', earned: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
      {/* Header */}
      <header className="border-b border-[#d4af37]/20 bg-stone-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={yaLesediLogo} 
                alt="Ya Lesedi Logo" 
                className="h-16 w-16 rounded-lg object-cover shadow-lg shadow-[#d4af37]/20"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  YA LESEDI
                </h1>
                <p className="text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Restaurant Training System
                </p>
              </div>
            </div>
            <nav className="flex gap-2">
              <Button 
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className="text-[#d4af37] hover:bg-[#d4af37]/10"
                style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
              >
                Dashboard
              </Button>
              <Button 
                variant={activeTab === 'modules' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('modules')}
                className="text-[#d4af37] hover:bg-[#d4af37]/10"
                style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
              >
                Training Modules
              </Button>
              <Button 
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className="text-[#d4af37] hover:bg-[#d4af37]/10"
                style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
              >
                Profile
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Welcome to Ya Lesedi Training Platform
              </h2>
              <p className="text-[#d4af37]/70 text-lg" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                Your comprehensive restaurant training solution for South African excellence
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                      {stat.label}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Training Progress */}
            <Card className="bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Training Progress Overview
                </CardTitle>
                <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                  Track your progress across all training modules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <module.icon className="h-5 w-5 text-[#d4af37]" />
                        <div>
                          <p className="font-medium text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                            {module.title}
                          </p>
                          <p className="text-xs text-[#d4af37]/60" style={{ fontFamily: 'Calibri, sans-serif' }}>
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={module.status === 'Completed' ? 'default' : 'secondary'}
                        className={module.status === 'Completed' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-stone-800 text-[#d4af37]/70'}
                        style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
                      >
                        {module.status}
                      </Badge>
                    </div>
                    <Progress value={module.progress} className="h-2 bg-stone-800" />
                    <p className="text-xs text-right text-[#d4af37]/60" style={{ fontFamily: 'Calibri, sans-serif' }}>
                      {module.progress}% Complete
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Achievements
                </CardTitle>
                <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                  Your learning milestones and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-[#d4af37]/10 border-[#d4af37]/30' 
                          : 'bg-stone-800/30 border-stone-700/30'
                      } text-center space-y-2 transition-all hover:scale-105`}
                    >
                      {achievement.earned ? (
                        <CheckCircle2 className="h-8 w-8 text-[#d4af37] mx-auto" />
                      ) : (
                        <Award className="h-8 w-8 text-[#d4af37]/30 mx-auto" />
                      )}
                      <p className={`text-xs font-medium ${
                        achievement.earned ? 'text-[#d4af37]' : 'text-[#d4af37]/40'
                      }`} style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                        {achievement.title}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#d4af37] mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Training Modules
              </h2>
              <p className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                Comprehensive training content aligned with South African standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <Card key={index} className="bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm hover:shadow-xl hover:shadow-[#d4af37]/20 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-[#d4af37]/10">
                          <module.icon className="h-6 w-6 text-[#d4af37]" />
                        </div>
                        <div>
                          <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                            {module.title}
                          </CardTitle>
                        </div>
                      </div>
                      <Badge 
                        variant={module.status === 'Completed' ? 'default' : 'secondary'}
                        className={module.status === 'Completed' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-stone-800 text-[#d4af37]/70'}
                        style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
                      >
                        {module.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-[#d4af37]/70 mt-2" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Progress</span>
                        <span className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2 bg-stone-800" />
                    </div>
                    <Button 
                      className="w-full bg-[#d4af37] hover:bg-[#d4af37]/90 text-stone-950 font-medium"
                      style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
                    >
                      {module.status === 'Completed' ? 'Review Module' : 'Continue Learning'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-[#d4af37] mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
                User Profile
              </h2>
              <p className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                Manage your account and training preferences
              </p>
            </div>

            <Card className="bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Full Name</label>
                    <p className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Demo User</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Role</label>
                    <p className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Staff Member</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Store Location</label>
                    <p className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Johannesburg Central</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Member Since</label>
                    <p className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>January 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Training Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-[#d4af37]/5">
                    <p className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>78%</p>
                    <p className="text-xs text-[#d4af37]/70 mt-1" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Overall Progress</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[#d4af37]/5">
                    <p className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>12</p>
                    <p className="text-xs text-[#d4af37]/70 mt-1" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Quizzes Completed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[#d4af37]/5">
                    <p className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>15</p>
                    <p className="text-xs text-[#d4af37]/70 mt-1" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Hours Trained</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[#d4af37]/5">
                    <p className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>2</p>
                    <p className="text-xs text-[#d4af37]/70 mt-1" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Certificates Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Compliance & Legal
                </CardTitle>
                <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                  POPIA-compliant data management and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#d4af37]/5">
                  <span className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Data Processing Consent</span>
                  <CheckCircle2 className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#d4af37]/5">
                  <span className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>License Agreement Accepted</span>
                  <CheckCircle2 className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#d4af37]/5">
                  <span className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Two-Factor Authentication</span>
                  <Badge className="bg-[#d4af37]/20 text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Enabled</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4af37]/20 bg-stone-950/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-[#d4af37]/60 text-sm" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
            <p>© 2024 Ya Lesedi Consulting (Pty) Ltd. All rights reserved.</p>
            <p className="mt-1">POPIA-Compliant Restaurant Training Platform</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

