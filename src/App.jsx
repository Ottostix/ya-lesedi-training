import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { BookOpen, Award, Users, FileText, ChefHat, Shield, Clock, TrendingUp, CheckCircle2, Star, Upload, Plus, LogOut, Eye, EyeOff } from 'lucide-react'
import yaLesediLogo from './assets/ya-lesedi-logo.jpg'
import './App.css'

const API_BASE_URL = 'http://localhost:5000/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Login state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Data state
  const [users, setUsers] = useState([])
  const [stores, setStores] = useState([])
  const [menus, setMenus] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [stats, setStats] = useState(null)
  
  // Form state
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'staff', full_name: '', email: '' })
  const [newStore, setNewStore] = useState({ name: '', location: '', manager_name: '', contact_number: '', email: '' })
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStoreId, setUploadStoreId] = useState('')
  const [menuType, setMenuType] = useState('food')
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [token])

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated, activeTab])

  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCurrentUser(data.user)
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('token')
        setToken(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('token')
      setToken(null)
      setIsAuthenticated(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setCurrentUser(data.user)
        setIsAuthenticated(true)
        setUsername('')
        setPassword('')
      } else {
        setLoginError(data.message || 'Login failed')
      }
    } catch (error) {
      setLoginError('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
    
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    setCurrentUser(null)
    setActiveTab('dashboard')
  }

  const loadData = async () => {
    try {
      if (activeTab === 'users' && ['master', 'manager'].includes(currentUser?.role)) {
        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setUsers(data.users)
        }
      }

      if (activeTab === 'stores') {
        const response = await fetch(`${API_BASE_URL}/stores`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setStores(data.stores)
        }
      }

      if (activeTab === 'menus') {
        const response = await fetch(`${API_BASE_URL}/menus`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setMenus(data.menus)
        }
      }

      if (activeTab === 'quizzes') {
        const response = await fetch(`${API_BASE_URL}/quizzes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setQuizzes(data.quizzes)
        }
      }

      if (activeTab === 'dashboard') {
        const response = await fetch(`${API_BASE_URL}/quizzes/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'User created successfully!' })
        setNewUser({ username: '', password: '', role: 'staff', full_name: '', email: '' })
        loadData()
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create user' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    }
  }

  const handleCreateStore = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newStore)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Store created successfully!' })
        setNewStore({ name: '', location: '', manager_name: '', contact_number: '', email: '' })
        loadData()
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create store' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    }
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile || !uploadStoreId) {
      setMessage({ type: 'error', text: 'Please select a file and store' })
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('store_id', uploadStoreId)
    formData.append('menu_type', menuType)

    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/menus/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `Menu uploaded! ${data.questions_generated} questions generated.` })
        setSelectedFile(null)
        setUploadStoreId('')
        loadData()
      } else {
        setMessage({ type: 'error', text: data.message || 'Upload failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setIsLoading(false)
    }
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-stone-900/50 border-[#d4af37]/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <img 
              src={yaLesediLogo} 
              alt="Ya Lesedi Logo" 
              className="h-24 w-24 mx-auto rounded-lg object-cover shadow-lg shadow-[#d4af37]/20 mb-4"
            />
            <CardTitle className="text-3xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
              YA LESEDI
            </CardTitle>
            <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
              Restaurant Training System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <Alert className="bg-red-900/20 border-red-500/50">
                  <AlertDescription className="text-red-400" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                    {loginError}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                  style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37] pr-10"
                    style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d4af37]/60 hover:text-[#d4af37]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#d4af37] hover:bg-[#d4af37]/90 text-stone-950 font-medium"
                style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              
              <div className="text-center text-xs text-[#d4af37]/60 mt-4" style={{ fontFamily: 'Calibri, sans-serif' }}>
                <p>Demo Accounts:</p>
                <p>Master: Tshepo / 2402</p>
                <p>Staff: Staff / 1101</p>
                <p>Manager: Management / 1101</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main Application
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
      {/* Header */}
      <header className="border-b border-[#d4af37]/20 bg-stone-950/50 backdrop-blur-sm sticky top-0 z-50">
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
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                  {currentUser?.full_name}
                </p>
                <Badge className="bg-[#d4af37]/20 text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '12px' }}>
                  {currentUser?.role}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {message.text && (
          <Alert className={`mb-4 ${message.type === 'success' ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <AlertDescription className={message.type === 'success' ? 'text-green-400' : 'text-red-400'} style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-stone-900/50 border border-[#d4af37]/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#d4af37]/20 data-[state=active]:text-[#d4af37]">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="data-[state=active]:bg-[#d4af37]/20 data-[state=active]:text-[#d4af37]">
              Quizzes
            </TabsTrigger>
            {['master', 'manager'].includes(currentUser?.role) && (
              <>
                <TabsTrigger value="users" className="data-[state=active]:bg-[#d4af37]/20 data-[state=active]:text-[#d4af37]">
                  Users
                </TabsTrigger>
                <TabsTrigger value="stores" className="data-[state=active]:bg-[#d4af37]/20 data-[state=active]:text-[#d4af37]">
                  Stores
                </TabsTrigger>
                <TabsTrigger value="menus" className="data-[state=active]:bg-[#d4af37]/20 data-[state=active]:text-[#d4af37]">
                  Menus
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Welcome, {currentUser?.full_name}!
              </h2>
              <p className="text-[#d4af37]/70 text-lg" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                Your comprehensive restaurant training solution
              </p>
            </div>

            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-stone-900/50 border-[#d4af37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                      Total Attempts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[#d4af37]">{stats.total_attempts}</p>
                  </CardContent>
                </Card>
                <Card className="bg-stone-900/50 border-[#d4af37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                      Pass Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[#d4af37]">{stats.pass_rate}%</p>
                  </CardContent>
                </Card>
                <Card className="bg-stone-900/50 border-[#d4af37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                      Average Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[#d4af37]">{stats.average_score}%</p>
                  </CardContent>
                </Card>
                <Card className="bg-stone-900/50 border-[#d4af37]/20">
                  <CardHeader>
                    <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                      Passed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[#d4af37]">{stats.passed_attempts}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            <Card className="bg-stone-900/50 border-[#d4af37]/20">
              <CardHeader>
                <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  Available Quizzes
                </CardTitle>
                <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                  Test your knowledge with 35-question quizzes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {quizzes.length === 0 ? (
                  <p className="text-[#d4af37]/60 text-center py-8" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                    No quizzes available yet. Upload menus to generate quizzes.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizzes.map((quiz) => (
                      <Card key={quiz.id} className="bg-stone-800/50 border-[#d4af37]/10">
                        <CardHeader>
                          <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                            {quiz.title}
                          </CardTitle>
                          <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                            {quiz.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                              Questions: {quiz.question_count}
                            </p>
                            <p className="text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                              Passing Score: {quiz.passing_score}%
                            </p>
                            <Button className="w-full bg-[#d4af37] hover:bg-[#d4af37]/90 text-stone-950">
                              Start Quiz
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          {['master', 'manager'].includes(currentUser?.role) && (
            <TabsContent value="users" className="space-y-6">
              <Card className="bg-stone-900/50 border-[#d4af37]/20">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                    Create New User
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Username</Label>
                        <Input
                          value={newUser.username}
                          onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Password</Label>
                        <Input
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Full Name</Label>
                        <Input
                          value={newUser.full_name}
                          onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Role</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                          <SelectTrigger className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Email</Label>
                        <Input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-stone-950">
                      <Plus className="h-4 w-4 mr-2" /> Create User
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-stone-900/50 border-[#d4af37]/20">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                    Users List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg">
                        <div>
                          <p className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                            {user.full_name}
                          </p>
                          <p className="text-[#d4af37]/60 text-sm" style={{ fontFamily: 'Calibri, sans-serif' }}>
                            {user.username} - {user.role}
                          </p>
                        </div>
                        <Badge className="bg-[#d4af37]/20 text-[#d4af37]">
                          {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Stores Tab */}
          {['master', 'manager'].includes(currentUser?.role) && (
            <TabsContent value="stores" className="space-y-6">
              <Card className="bg-stone-900/50 border-[#d4af37]/20">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                    Create New Store
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateStore} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Store Name</Label>
                        <Input
                          value={newStore.name}
                          onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Location</Label>
                        <Input
                          value={newStore.location}
                          onChange={(e) => setNewStore({...newStore, location: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Manager Name</Label>
                        <Input
                          value={newStore.manager_name}
                          onChange={(e) => setNewStore({...newStore, manager_name: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Contact Number</Label>
                        <Input
                          value={newStore.contact_number}
                          onChange={(e) => setNewStore({...newStore, contact_number: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Email</Label>
                        <Input
                          type="email"
                          value={newStore.email}
                          onChange={(e) => setNewStore({...newStore, email: e.target.value})}
                          className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-stone-950">
                      <Plus className="h-4 w-4 mr-2" /> Create Store
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-stone-900/50 border-[#d4af37]/20">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                    Stores List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stores.map((store) => (
                      <Card key={store.id} className="bg-stone-800/50 border-[#d4af37]/10">
                        <CardHeader>
                          <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                            {store.name}
                          </CardTitle>
                          <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                            {store.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1 text-sm text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                            <p>Manager: {store.manager_name}</p>
                            <p>Employees: {store.employee_count}</p>
                            <p>Contact: {store.contact_number}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Menus Tab */}
          {['master', 'manager'].includes(currentUser?.role) && (
            <TabsContent value="menus" className="space-y-6">
              <Card className="bg-stone-900/50 border-[#d4af37]/20">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                    Upload Menu & Generate Quiz
                  </CardTitle>
                  <CardDescription className="text-[#d4af37]/70" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                    Upload food or drinks menu. AI will automatically generate 35 quiz questions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFileUpload} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Select Store</Label>
                        <Select value={uploadStoreId} onValueChange={setUploadStoreId}>
                          <SelectTrigger className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]">
                            <SelectValue placeholder="Choose store" />
                          </SelectTrigger>
                          <SelectContent>
                            {stores.map((store) => (
                              <SelectItem key={store.id} value={store.id.toString()}>
                                {store.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Menu Type</Label>
                        <Select value={menuType} onValueChange={setMenuType}>
                          <SelectTrigger className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food">Food Menu</SelectItem>
                            <SelectItem value="drinks">Drinks Menu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>Upload File (PDF, DOCX, XLSX, TXT)</Label>
                      <Input
                        type="file"
                        accept=".pdf,.docx,.xlsx,.txt"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="bg-stone-800 border-[#d4af37]/20 text-[#d4af37]"
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-stone-950" disabled={isLoading}>
                      <Upload className="h-4 w-4 mr-2" /> {isLoading ? 'Uploading & Generating...' : 'Upload & Generate Quiz'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-stone-900/50 border-[#d4af37]/20">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]" style={{ fontFamily: 'Calibri, sans-serif' }}>
                    Uploaded Menus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {menus.map((menu) => (
                      <div key={menu.id} className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg">
                        <div>
                          <p className="text-[#d4af37] font-medium" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
                            {menu.file_name}
                          </p>
                          <p className="text-[#d4af37]/60 text-sm" style={{ fontFamily: 'Calibri, sans-serif' }}>
                            {menu.menu_type} - {menu.question_count} questions generated
                          </p>
                        </div>
                        <Badge className={menu.is_processed ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'}>
                          {menu.is_processed ? 'Processed' : 'Processing'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4af37]/20 bg-stone-950/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-[#d4af37]/60 text-sm" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '14px' }}>
            <p>© 2024 Ya Lesedi Consulting (Pty) Ltd. All rights reserved.</p>
            <p className="mt-1">Secure Cloud-Based Training Platform with AI-Powered Quiz Generation</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

