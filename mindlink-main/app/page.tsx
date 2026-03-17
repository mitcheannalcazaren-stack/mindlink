'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Zap, 
  ArrowRight, 
  CheckCircle,
  Star,
  Phone,
  Calendar,
  BarChart3,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Screening',
      description: 'Free mental health assessment using advanced AI to determine risk levels and provide instant recommendations.'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Tailored treatment plans based on your unique needs and AI-generated insights.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'HIPAA-compliant platform ensuring your mental health data is protected and confidential.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access mental health support anytime, anywhere with our round-the-clock platform.'
    },
    {
      icon: Users,
      title: 'Expert Counselors',
      description: 'Licensed professionals with AI-enhanced insights for better treatment outcomes.'
    },
         {
       icon: Zap,
       title: 'Smart Scheduling',
       description: 'Intelligent appointment booking system supporting both virtual and in-person sessions.'
     },
     {
       icon: MessageSquare,
       title: 'AI Chatbot',
       description: 'Conversational AI companion with transformer-based NLP for real-time mental health assessment and support.'
     }
  ]

  const stats = [
    { number: '10,000+', label: 'People Helped' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' },
    { number: 'Free', label: 'Initial Screening' }
  ]

  return (
    <div className="min-h-screen selection:bg-primary-100 selection:text-primary-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center group cursor-pointer">
              <div className="bg-primary-100 p-2 rounded-xl group-hover:bg-primary-200 transition-colors">
                <Brain className="h-7 w-7 text-primary-600" />
              </div>
              <span className="ml-3 text-2xl font-bold tracking-tight text-slate-900">MindLink</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#features" className="text-slate-600 font-medium hover:text-primary-600 transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-slate-600 font-medium hover:text-primary-600 transition-colors">
                About
              </Link>
              <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
              <Link href="/chatbot" className="text-primary-600 font-semibold hover:text-primary-700">
                AI Chat
              </Link>
              <Link href="/login" className="text-slate-600 font-medium hover:text-primary-600 transition-colors px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                Login
              </Link>
              <Link href="/screening" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mental-health-gradient pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/30 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-white/50 border border-white/50 px-4 py-2 rounded-full mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span className="text-sm font-semibold text-primary-700 uppercase tracking-wider">AI-Powered Care Platform</span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-8 text-slate-900 leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Your journey to <br />
                <span className="text-primary-500 italic">inner peace</span> starts here
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-slate-600 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                MindLink provides a safe, accessible space for your mental health. 
                Experience the perfect blend of advanced AI insights and professional human support.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link 
                  href="/screening"
                  className="btn-primary text-lg px-10 py-4 flex items-center justify-center group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Free Assessment
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1.5' : ''}`} />
                </Link>
                <Link 
                  href="/about"
                  className="btn-outline text-lg px-10 py-4 bg-white/30 backdrop-blur-sm"
                >
                  Explore Features
                </Link>
              </motion.div>
            </div>
            
            <div className="flex-1 w-full max-w-xl">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="glass-card p-10 relative"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-60"></div>
                
                <div className="space-y-6 relative">
                  <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl shadow-sm">
                    <div className="bg-success-100 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-success-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">AI Screening Complete</p>
                      <p className="text-xs text-slate-500">Risk Level: Mild Anxiety</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl shadow-sm ml-8">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <Calendar className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Counselor Booked</p>
                      <p className="text-xs text-slate-500">Tomorrow at 10:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl shadow-sm">
                    <div className="bg-accent-100 p-2 rounded-lg">
                      <Star className="h-6 w-6 text-accent-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Daily Goal Reached</p>
                      <p className="text-xs text-slate-500">Keep up the great progress!</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 group-hover:text-primary-500 transition-colors">
                  {stat.number}
                </div>
                <div className="text-slate-500 font-medium tracking-wide uppercase text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-[#F9FBFA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              A holistic approach to <br /><span className="text-primary-500">mental wellness</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Our platform provides the tools you need to understand, 
              manage, and improve your mental health.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="card group hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-100 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Simple steps to care
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              We've streamlined the process to make getting help as easy as possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-50 -translate-y-1/2 -z-10"></div>
            
            <motion.div 
              className="text-center relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-500 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary-500/20 group-hover:rotate-6 transition-transform">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">1. AI Assessment</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                A confidential, AI-powered screening to understand your current state.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-secondary-500 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-secondary-500/20 group-hover:-rotate-6 transition-transform">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Personalized Plan</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                Receive a tailored treatment plan and book sessions with experts.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-accent-500 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-accent-500/20 group-hover:rotate-6 transition-transform">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Continuous Support</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                Ongoing care, progress tracking, and 24/7 AI companion support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass-card bg-primary-600 text-white p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 to-primary-600 -z-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Take the first step <br /> towards feeling better.
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have found peace of mind with MindLink. 
            Start your free AI screening today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/screening"
              className="bg-white text-primary-600 hover:bg-slate-50 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-xl shadow-black/10 hover:-translate-y-1"
            >
              Start Free Screening
            </Link>
            <Link 
              href="/login"
              className="bg-primary-700/50 backdrop-blur-sm border border-white/20 text-white hover:bg-primary-700 font-bold py-5 px-12 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-8">
                <div className="bg-primary-500 p-1.5 rounded-lg mr-3">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">MindLink</span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Democratizing mental health care through the power of AI and human compassion.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/screening" className="hover:text-primary-400 transition-colors">AI Screening</Link></li>
                <li><Link href="/booking" className="hover:text-primary-400 transition-colors">Find Counselors</Link></li>
                <li><Link href="/chatbot" className="hover:text-primary-400 transition-colors">AI Companion</Link></li>
                <li><Link href="/resources" className="hover:text-primary-400 transition-colors">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest">Support</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="#" className="hover:text-primary-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest">Emergency</h4>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  If you're in immediate danger, please contact emergency services or a crisis hotline.
                </p>
                <Link href="#" className="flex items-center text-primary-400 font-bold hover:text-primary-300">
                  <Phone className="w-5 h-5 mr-2" />
                  988 Crisis Lifeline
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MindLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
