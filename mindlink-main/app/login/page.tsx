'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ArrowRight, Eye, EyeOff, Users, Heart, Calendar, X, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showClientModal, setShowClientModal] = useState(false)
  const [showCounselorModal, setShowCounselorModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [clientRegData, setClientRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [counselorRegData, setCounselorRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    license: '',
    specialization: ''
  })
  
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Static login with conditional routing based on email
    if (formData.email === 'counselor@gmail.com') {
      router.push('/dashboard/counselor')
    } else if (formData.email === 'client@gmail.com') {
      router.push('/dashboard/client')
    } else {
      // Default routing for other emails
      router.push('/dashboard/client')
    }
  }

  const handleClientRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Client registration:', clientRegData)
    setShowClientModal(false)
    // After registration, route to client dashboard
    router.push('/dashboard/client')
  }

  const handleCounselorRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Counselor registration:', counselorRegData)
    setShowCounselorModal(false)
    // After registration, route to counselor dashboard
    router.push('/dashboard/counselor')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-[#F9FBFA]">
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="bg-primary-100 p-2 rounded-xl group-hover:bg-primary-200 transition-colors">
              <Brain className="h-6 w-6 text-primary-600" />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-900">MindLink</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-primary-600 font-medium transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-10"
            >
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-lg text-slate-500 mb-8">Sign in to access your MindLink account</p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                    <span className="ml-2 text-sm text-slate-600">Remember me</span>
                  </label>
                  <Link href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Forgot password?
                  </Link>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center group"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* Registration Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">New to MindLink?</h2>
                <p className="text-lg text-slate-500 mb-8">
                  Join our community and start your mental wellness journey today.
                </p>
              </div>

              <div className="space-y-6">
                {/* Client Registration */}
                <button 
                  onClick={() => setShowClientModal(true)}
                  className="block w-full glass-card p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group text-left"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-primary-50 p-4 rounded-2xl group-hover:bg-primary-100 transition-colors">
                      <Users className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Join as Client</h3>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        Access AI screening, book counseling sessions, track your progress, and get personalized mental health support.
                      </p>
                      <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                        Register as Client
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => setShowCounselorModal(true)}
                  className="block w-full glass-card p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group text-left"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-success-50 p-4 rounded-2xl group-hover:bg-success-100 transition-colors">
                      <Heart className="h-8 w-8 text-success-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Join as Counselor</h3>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        Help others on their wellness journey, manage appointments, access AI insights, and grow your practice.
                      </p>
                      <div className="flex items-center text-success-600 font-semibold group-hover:text-success-700">
                        Register as Counselor
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </button>

              {/* Benefits Section */}
              <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-3xl border border-primary-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Why Choose MindLink?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-slate-700">Free AI-powered mental health screening</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-slate-700">Professional licensed counselors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-slate-700">24/7 AI companion support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-slate-700">Privacy-first, HIPAA compliant</span>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Client Registration Modal */}
      <AnimatePresence>
        {showClientModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowClientModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Register as Client</h3>
                <button
                  onClick={() => setShowClientModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              
              <form onSubmit={handleClientRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={clientRegData.firstName}
                      onChange={(e) => setClientRegData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={clientRegData.lastName}
                      onChange={(e) => setClientRegData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={clientRegData.email}
                    onChange={(e) => setClientRegData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={clientRegData.phone}
                    onChange={(e) => setClientRegData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={clientRegData.password}
                    onChange={(e) => setClientRegData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={clientRegData.confirmPassword}
                    onChange={(e) => setClientRegData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary py-3"
                >
                  Create Account
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Counselor Registration Modal */}
      <AnimatePresence>
        {showCounselorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowCounselorModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Register as Counselor</h3>
                <button
                  onClick={() => setShowCounselorModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              
              <form onSubmit={handleCounselorRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={counselorRegData.firstName}
                      onChange={(e) => setCounselorRegData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={counselorRegData.lastName}
                      onChange={(e) => setCounselorRegData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={counselorRegData.email}
                    onChange={(e) => setCounselorRegData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={counselorRegData.phone}
                    onChange={(e) => setCounselorRegData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">License Number</label>
                  <input
                    type="text"
                    value={counselorRegData.license}
                    onChange={(e) => setCounselorRegData(prev => ({ ...prev, license: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                  <select
                    value={counselorRegData.specialization}
                    onChange={(e) => setCounselorRegData(prev => ({ ...prev, specialization: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                    required
                  >
                    <option value="">Select specialization</option>
                    <option value="anxiety">Anxiety Disorders</option>
                    <option value="depression">Depression</option>
                    <option value="trauma">Trauma & PTSD</option>
                    <option value="relationships">Relationship Counseling</option>
                    <option value="family">Family Therapy</option>
                    <option value="addiction">Addiction Counseling</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={counselorRegData.password}
                    onChange={(e) => setCounselorRegData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={counselorRegData.confirmPassword}
                    onChange={(e) => setCounselorRegData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-success-500 hover:bg-success-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Create Counselor Account
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
