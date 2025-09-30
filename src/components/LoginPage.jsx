import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ChefHat, Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react'
import restaurant2 from '../assets/restaurant2.jpg'

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Demo credentials for testing
      if (formData.email === 'admin@yalesedi.com' && formData.password === 'admin123') {
        // Generate a mock token
        const token = 'mock-jwt-token-' + Date.now()
        onLogin(token)
        navigate('/dashboard')
      } else if (formData.email === 'staff@yalesedi.com' && formData.password === 'staff123') {
        const token = 'mock-jwt-token-staff-' + Date.now()
        onLogin(token)
        navigate('/dashboard')
      } else {
        setError('Invalid email or password. Try admin@yalesedi.com / admin123 or staff@yalesedi.com / staff123')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 elegant-gradient">
        <div className="w-full max-w-md">
          {/* Back to home link */}
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <Card className="luxury-card">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-black p-3 rounded-xl">
                  <ChefHat className="h-10 w-10 text-amber-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 elegant-text">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Sign in to your Ya Lesedi Training account
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full luxury-button text-white font-semibold h-12 text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Demo Credentials:
                </p>
                <div className="mt-2 space-y-1 text-xs text-gray-500">
                  <p>Admin: admin@yalesedi.com / admin123</p>
                  <p>Staff: staff@yalesedi.com / staff123</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <button className="text-amber-600 hover:text-amber-700 font-medium">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src={restaurant2}
          alt="Elegant Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-4xl font-bold mb-4 elegant-text">
              Excellence in Every Detail
            </h2>
            <p className="text-xl opacity-90 max-w-md">
              Transform your restaurant staff into hospitality professionals with our comprehensive training platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
