import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChefHat, Users, BookOpen, TrendingUp, Star, Award, Clock, Shield, CheckCircle, Zap, Target } from 'lucide-react'
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

  const topFeatures = [
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Smart Staff Management",
      benefit: "Track training progress and performance across all your locations in one place."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-amber-600" />,
      title: "Engaging Training Modules",
      benefit: "Interactive courses built for hospitality professionals to learn at their own pace."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-amber-600" />,
      title: "Real-Time Analytics",
      benefit: "See completion rates, performance metrics, and team progress instantly."
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: "Digital Certifications",
      benefit: "Issue professional certificates when staff pass training modules."
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-600" />,
      title: "Compliance Ready",
      benefit: "Meet South African hospitality industry standards and regulations."
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-600" />,
      title: "Quick Setup",
      benefit: "Get started in minutes—no technical expertise needed."
    }
  ]

  const stats = [
    { number: "500+", label: "Restaurants Using Ya Lesedi" },
    { number: "50,000+", label: "Staff Trained Successfully" },
    { number: "95%", label: "Training Completion Rate" },
    { number: "24/7", label: "South African Support" }
  ]

  const testimonials = [
    {
      name: "Thabo Mkhize",
      role: "Restaurant Manager, Johannesburg",
      quote: "Ya Lesedi cut our training time in half. Our staff are more confident and compliant."
    },
    {
      name: "Naledi Dlamini",
      role: "Franchise Owner, Cape Town",
      quote: "The best investment we've made. Easy to use and our team loves the certificates."
    },
    {
      name: "Sipho Nkosi",
      role: "Head Chef, Durban",
      quote: "Finally, a training system built for South African restaurants. Highly recommend!"
    }
  ]

  const ctaOptions = [
    { text: "Start Free Trial", tagline: "No credit card needed" },
    { text: "Book a Demo", tagline: "See it in action" },
    { text: "See How It Works", tagline: "2-minute walkthrough" }
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
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 elegant-text">Ya Lesedi</span>
                <span className="text-xs text-amber-600 font-semibold">Training Academy</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-700 hover:text-amber-600 font-medium text-sm">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-amber-600 font-medium text-sm">Pricing</a>
              <a href="#faq" className="text-gray-700 hover:text-amber-600 font-medium text-sm">FAQ</a>
              <Link to="/login">
                <Button className="luxury-button text-white font-medium px-6 py-2">
                  Login
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Link to="/login">
                <Button className="luxury-button text-white font-medium px-4 py-2 text-sm">
                  Login
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 elegant-text">
              Your Recipe to Success
            </h1>
            <p className="text-lg md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto font-semibold">
              The #1 Staff Training Platform for South African Restaurants
            </p>
            <p className="text-base md:text-lg text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Revolutionize how you train staff, track compliance, and build exceptional teams. Say goodbye to outdated training methods—embrace digital excellence with Ya Lesedi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link to="/login">
                <Button size="lg" className="luxury-button text-white font-semibold px-8 py-4 text-lg hover:shadow-xl transition-all">
                  Start Free Trial
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              >
                Book a Demo
              </Button>
            </div>
            <p className="text-sm text-gray-200">✓ No credit card required  ✓ Setup in minutes  ✓ 24/7 South African support</p>
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
                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 5 Features Section */}
      <section id="features" className="py-20 elegant-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 elegant-text">
              Why Choose Ya Lesedi?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Built specifically for South African restaurants. Everything you need to train, track, and celebrate your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topFeatures.map((feature, index) => (
              <Card key={index} className="luxury-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.benefit}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 elegant-text">
              Loved by South African Restaurants
            </h2>
            <p className="text-xl text-gray-700">See what restaurant leaders are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="luxury-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            Join hundreds of South African restaurants already using Ya Lesedi to build exceptional teams and ensure compliance.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {ctaOptions.map((option, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Link to="/login">
                  <Button className="w-full luxury-button text-white font-semibold py-3 mb-2">
                    {option.text}
                  </Button>
                </Link>
                <p className="text-sm text-gray-600">{option.tagline}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600">
            Questions? <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold">Contact our South African support team</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-amber-600 p-2 rounded-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Ya Lesedi</span>
                  <p className="text-xs text-amber-400">Training Academy</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering South African restaurants with world-class staff training and compliance management solutions.
              </p>
              <p className="text-xs text-gray-500">
                🇿🇦 BEE-registered business committed to hospitality excellence
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400">Staff Training</a></li>
                <li><a href="#" className="hover:text-amber-400">Compliance</a></li>
                <li><a href="#" className="hover:text-amber-400">Analytics</a></li>
                <li><a href="#" className="hover:text-amber-400">Certificates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-400">Documentation</a></li>
                <li><a href="#" className="hover:text-amber-400">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ya Lesedi Training Academy. All rights reserved. | Proudly South African 🇿🇦</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
