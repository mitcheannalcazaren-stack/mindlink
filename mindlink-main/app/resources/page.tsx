'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  BookOpen, 
  Video, 
  Headphones, 
  Heart, 
  Shield,
  ArrowLeft,
  ExternalLink,
  Play,
  Download
} from 'lucide-react'
import Link from 'next/link'

const resources = [
  {
    category: 'Self-Help Guides',
    items: [
      {
        title: 'Mindfulness Meditation Guide',
        description: 'Learn basic mindfulness techniques for stress reduction',
        type: 'PDF Guide',
        icon: BookOpen,
        color: 'text-blue-600'
      },
      {
        title: 'CBT Exercises Workbook',
        description: 'Cognitive Behavioral Therapy exercises for anxiety and depression',
        type: 'Interactive PDF',
        icon: Brain,
        color: 'text-purple-600'
      },
      {
        title: 'Sleep Hygiene Tips',
        description: 'Comprehensive guide to improving sleep quality',
        type: 'Article',
        icon: BookOpen,
        color: 'text-blue-600'
      }
    ]
  },
  {
    category: 'Video Resources',
    items: [
      {
        title: 'Breathing Exercises',
        description: 'Guided breathing techniques for anxiety relief',
        type: 'Video (10 min)',
        icon: Video,
        color: 'text-red-600'
      },
      {
        title: 'Progressive Muscle Relaxation',
        description: 'Step-by-step relaxation technique',
        type: 'Video (15 min)',
        icon: Video,
        color: 'text-red-600'
      },
      {
        title: 'Mindfulness for Beginners',
        description: 'Introduction to mindfulness meditation',
        type: 'Video (20 min)',
        icon: Video,
        color: 'text-red-600'
      }
    ]
  },
  {
    category: 'Audio Resources',
    items: [
      {
        title: 'Guided Meditation Series',
        description: 'Daily meditation sessions for mental wellness',
        type: 'Audio Collection',
        icon: Headphones,
        color: 'text-green-600'
      },
      {
        title: 'Stress Relief Sounds',
        description: 'Nature sounds and calming audio',
        type: 'Audio Collection',
        icon: Headphones,
        color: 'text-green-600'
      },
      {
        title: 'Sleep Stories',
        description: 'Narrated stories to help with sleep',
        type: 'Audio Collection',
        icon: Headphones,
        color: 'text-green-600'
      }
    ]
  },
  {
    category: 'Crisis Resources',
    items: [
      {
        title: 'Crisis Hotline Directory',
        description: 'Emergency mental health contact information',
        type: 'Directory',
        icon: Shield,
        color: 'text-red-600'
      },
      {
        title: 'Safety Planning Guide',
        description: 'How to create a safety plan for crisis situations',
        type: 'Guide',
        icon: Shield,
        color: 'text-red-600'
      },
      {
        title: 'Emergency Resources',
        description: 'Immediate help and support resources',
        type: 'Resource List',
        icon: Shield,
        color: 'text-red-600'
      }
    ]
  }
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Mental Health Resources</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mental Health Resources & Self-Help
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access evidence-based resources, guided exercises, and educational materials 
            to support your mental health journey.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-12">
          {resources.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gray-100 ${item.color}`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {item.type}
                          </span>
                          <div className="flex space-x-2">
                            {item.type.includes('Video') && (
                              <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                                <Play className="h-4 w-4" />
                              </button>
                            )}
                            {item.type.includes('PDF') && (
                              <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                                <Download className="h-4 w-4" />
                              </button>
                            )}
                            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-red-50 border border-red-200 rounded-lg p-8"
        >
          <div className="text-center">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-900 mb-4">Need Immediate Help?</h2>
            <p className="text-red-700 mb-6">
              If you're experiencing a mental health crisis or having thoughts of harming yourself, 
              help is available 24/7.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">National Suicide Prevention Lifeline</h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">988</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Crisis Text Line</h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">Text HOME to 741741</p>
                <p className="text-sm text-gray-600">Text for support</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Services</h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">911</p>
                <p className="text-sm text-gray-600">For immediate crisis</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-gray-600 mb-8">
            Connect with a mental health professional for personalized support and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chatbot" className="btn-primary">
              Start AI Chat
            </Link>
            <Link href="/booking" className="btn-outline">
              Book Counseling Session
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
