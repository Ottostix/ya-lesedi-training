import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChefHat, Users, BookOpen, TrendingUp, Star, Award, Clock, Shield } from 'lucide-react'
import restaurant1 from '../assets/restaurant1.jpg'
import restaurant2 from '../assets/restaurant2.jpg'
import restaurant3 from '../assets/restaurant3.jpg'

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const restaurantImages = [restaurant1, restaurant2, restaurant3]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % restaurantImages.length
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [restaurantImages.length])

  const features = [
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Staff Management",
      description: "Comprehensive employee management system with role-based access and performance tracking."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-amber-600" />,
      title: "Training Modules",
      description: "Interactive training courses designed specifically for restaurant staff excellence."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-amber-600" />,
      title: "Analytics & Reports",
      description: "Real-time insights into staff performance, training progress, and operational metrics."
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: "Certification System",
      description: "Digital certificates and badges to recognize staff achievements and milestones."
    }
  ]

  const stats = [
    { number: "500+", label: "Restaurants Served" },
    { number: "10,000+", label: "Staff Trained" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-black p-2 rounded-lg">
                <ChefHat className="h-8 w-8 text-amber-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 elegant-text">Ya Lesedi Training</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button className="luxury-button text-white font-medium px-6 py-2">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={restaurantImages[currentImageIndex]}
            alt="Elegant Restaurant"
            className="w-full h-full object-cover restaurant-image"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 elegant-text">
              Elevate Your Restaurant
              <span className="block text-amber-400">Staff Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Transform your restaurant operations with our comprehensive staff training and management platform. 
              Designed for the hospitality industry's finest establishments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="luxury-button text-white font-semibold px-8 py-4 text-lg">
                  Get Started Today
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {restaurantImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-amber-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 elegant-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 elegant-text">
              Comprehensive Training Solutions
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Everything you need to build, train, and manage an exceptional restaurant team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="luxury-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 elegant-text">
                Why Choose Ya Lesedi Training?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Star className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Expertise</h3>
                    <p className="text-gray-600">Built by restaurant professionals for restaurant professionals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Time-Saving</h3>
                    <p className="text-gray-600">Reduce training time by 60% with our structured approach</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Ready</h3>
                    <p className="text-gray-600">Stay compliant with industry standards and regulations</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={restaurant2}
                alt="Restaurant Training"
                className="rounded-2xl shadow-2xl restaurant-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 elegant-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 elegant-text">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join hundreds of restaurants already using Ya Lesedi Training to build exceptional teams
          </p>
          <Link to="/login">
            <Button size="lg" className="luxury-button text-white font-semibold px-12 py-4 text-lg">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-amber-600 p-2 rounded-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Ya Lesedi Training</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering restaurant excellence through comprehensive staff training and management solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Staff Management</li>
                <li>Training Modules</li>
                <li>Analytics</li>
                <li>Certifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ya Lesedi Training. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
