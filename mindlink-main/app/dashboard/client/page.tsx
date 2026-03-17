'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Activity, 
  Calendar, 
  MessageSquare, 
  BarChart, 
  Settings, 
  User, 
  Bell,
  Play,
  Clock,
  Star,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  X,
  LineChart as LineChartIcon,
  ChevronRight,
  AlertCircle,
  Download,
  Award,
  CalendarDays,
  Flag,
  Sparkles,
  Timer,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Enhanced progress tracking data
  const moodHistory = [
    { date: 'Mar 01', mood: 65, anxiety: 40, energy: 70, stress: 55, sleep: 6.5 },
    { date: 'Mar 05', mood: 68, anxiety: 35, energy: 65, stress: 50, sleep: 7.0 },
    { date: 'Mar 10', mood: 72, anxiety: 30, energy: 75, stress: 45, sleep: 7.2 },
    { date: 'Mar 15', mood: 75, anxiety: 25, energy: 80, stress: 40, sleep: 7.5 },
    { date: 'Mar 20', mood: 80, anxiety: 20, energy: 85, stress: 35, sleep: 8.0 },
  ]

  // Treatment journey milestones
  const treatmentJourney = {
    startDate: '2024-01-15',
    currentPhase: 'Active Treatment',
    phases: [
      { name: 'Initial Assessment', completed: true, date: '2024-01-15', icon: Target },
      { name: 'Treatment Planning', completed: true, date: '2024-01-22', icon: Calendar },
      { name: 'Skill Building', completed: true, date: '2024-02-15', icon: Brain },
      { name: 'Practice & Integration', completed: false, date: null, icon: Activity },
      { name: 'Maintenance', completed: false, date: null, icon: Star }
    ],
    milestones: [
      { id: 1, title: 'First Week Consistency', completed: true, date: '2024-01-22', points: 50 },
      { id: 2, title: '10-Day Streak', completed: true, date: '2024-02-05', points: 100 },
      { id: 3, title: 'Mood Improvement 15%', completed: true, date: '2024-02-20', points: 150 },
      { id: 4, title: 'Anxiety Reduction 20%', completed: false, date: null, points: 200 },
      { id: 5, title: '30-Day Consistency', completed: false, date: null, points: 300 }
    ]
  }

  // Enhanced reminders system
  const reminders = [
    { id: 1, title: 'Morning Mood Check-in', time: '9:00 AM', status: 'pending', importance: 'high', type: 'daily', recurring: true },
    { id: 2, title: 'Evening Reflection', time: '8:00 PM', status: 'pending', importance: 'medium', type: 'daily', recurring: true },
    { id: 3, title: 'Weekly Assessment', time: 'Sunday 6:00 PM', status: 'upcoming', importance: 'high', type: 'weekly', recurring: true },
    { id: 4, title: 'Medication Reminder', time: '2:00 PM', status: 'pending', importance: 'critical', type: 'daily', recurring: true },
    { id: 5, title: 'Therapy Session', time: 'Tomorrow 10:00 AM', status: 'upcoming', importance: 'high', type: 'appointment', recurring: false }
  ]

  // Follow-up schedule
  const followUpSchedule = [
    { id: 1, type: 'Daily Check-in', frequency: 'Daily', nextDue: 'Today 9:00 PM', completed: 6/7, color: 'primary' },
    { id: 2, type: 'Weekly Review', frequency: 'Weekly', nextDue: 'Sunday 6:00 PM', completed: 2/4, color: 'success' },
    { id: 3, type: 'Monthly Assessment', frequency: 'Monthly', nextDue: 'Apr 1, 2024', completed: 1/3, color: 'warning' },
    { id: 4, type: 'Therapy Session', frequency: 'Bi-weekly', nextDue: 'Mar 25, 2024', completed: 3/4, color: 'accent' }
  ]

  // AI insights and recommendations
  const aiInsights = [
    { id: 1, type: 'trend', title: 'Mood Improvement Detected', description: 'Your mood has improved by 23% over the past 30 days', icon: TrendingUp, color: 'success' },
    { id: 2, type: 'recommendation', title: 'Optimal Sleep Pattern', description: 'Your best mood days follow 7+ hours of sleep', icon: Clock, color: 'primary' },
    { id: 3, type: 'alert', title: 'Stress Pattern Identified', description: 'Higher stress levels on weekdays - consider relaxation techniques', icon: AlertCircle, color: 'warning' }
  ]
  
  // Mock data based on screening results and interactions
  const screeningResult = {
    riskLevel: 'Mild',
    score: 12,
    lastScreening: '2024-03-15'
  }

  const personalizedRecommendations = [
    {
      id: 1,
      title: 'Morning Mindfulness Routine',
      type: 'exercise',
      duration: '10 minutes',
      difficulty: 'Beginner',
      description: 'Start your day with a 5-minute breathing exercise followed by gratitude journaling.',
      icon: Brain,
      color: 'primary'
    },
    {
      id: 2,
      title: 'Progressive Muscle Relaxation',
      type: 'exercise',
      duration: '15 minutes',
      difficulty: 'Intermediate',
      description: 'Learn systematic muscle relaxation techniques to reduce physical tension and anxiety.',
      icon: Heart,
      color: 'success'
    },
    {
      id: 3,
      title: 'Cognitive Reframing',
      type: 'exercise',
      duration: '20 minutes',
      difficulty: 'Advanced',
      description: 'Practice identifying and challenging negative thought patterns with guided exercises.',
      icon: Target,
      color: 'warning'
    },
    {
      id: 4,
      title: 'Body Scan Meditation',
      type: 'meditation',
      duration: '15 minutes',
      difficulty: 'Beginner',
      description: 'Systematic awareness of bodily sensations to promote relaxation and present-moment awareness.',
      icon: Brain,
      color: 'primary'
    },
    {
      id: 5,
      title: '5-4-3-2-1 Grounding Technique',
      type: 'exercise',
      duration: '5 minutes',
      difficulty: 'Beginner',
      description: 'Quick anxiety-reducing technique using your five senses to reconnect with the present moment.',
      icon: Heart,
      color: 'success'
    },
    {
      id: 6,
      title: 'Thought Journaling',
      type: 'practice',
      duration: '10 minutes daily',
      difficulty: 'Intermediate',
      description: 'Daily writing practice to identify thought patterns and emotional triggers for better self-awareness.',
      icon: Target,
      color: 'warning'
    },
    {
      id: 7,
      title: 'Deep Breathing Exercises',
      type: 'exercise',
      duration: '8 minutes',
      difficulty: 'Beginner',
      description: 'Learn diaphragmatic breathing techniques to activate parasympathetic nervous system and reduce stress.',
      icon: Brain,
      color: 'primary'
    },
    {
      id: 8,
      title: 'Progressive Muscle Relaxation',
      type: 'exercise',
      duration: '20 minutes',
      difficulty: 'Intermediate',
      description: 'Systematic tensing and releasing of muscle groups to achieve deep physical relaxation.',
      icon: Heart,
      color: 'success'
    },
    {
      id: 9,
      title: 'Mindful Walking',
      type: 'activity',
      duration: '20 minutes',
      difficulty: 'Beginner',
      description: 'Outdoor walking practice focusing on sensory awareness and stress reduction through movement.',
      icon: Activity,
      color: 'accent'
    },
    {
      id: 10,
      title: 'Loving-Kindness Meditation',
      type: 'meditation',
      duration: '12 minutes',
      difficulty: 'Intermediate',
      description: 'Cultivate self-compassion through guided meditation focused on kindness and acceptance.',
      icon: Heart,
      color: 'success'
    },
    {
      id: 11,
      title: 'Sleep Hygiene Routine',
      type: 'practice',
      duration: 'Daily practice',
      difficulty: 'Beginner',
      description: 'Establish consistent bedtime rituals and environmental optimizations for better sleep quality.',
      icon: Target,
      color: 'warning'
    },
    {
      id: 12,
      title: 'Gratitude Practice',
      type: 'practice',
      duration: '5 minutes daily',
      difficulty: 'Beginner',
      description: 'Regular practice of identifying and appreciating positive aspects of your life to boost mood and well-being.',
      icon: Brain,
      color: 'primary'
    }
  ]

  const articles = [
    {
      id: 1,
      title: 'Understanding Anxiety: A Comprehensive Guide',
      category: 'Mental Health Education',
      readTime: '8 min read',
      preview: 'Learn about the science behind anxiety and evidence-based coping strategies...',
      featured: true,
      relevance: 'high'
    },
    {
      id: 2,
      title: 'Building Resilience in Daily Life',
      category: 'Personal Growth',
      readTime: '6 min read',
      preview: 'Discover practical techniques to strengthen your emotional resilience...',
      featured: false,
      relevance: 'medium'
    },
    {
      id: 3,
      title: 'The Science of Sleep and Mental Health',
      category: 'Wellness Tips',
      readTime: '10 min read',
      preview: 'Explore the critical connection between quality sleep and emotional well-being...',
      featured: false,
      relevance: 'medium'
    },
    {
      id: 4,
      title: 'Mindfulness for Stress Reduction',
      category: 'Practical Techniques',
      readTime: '12 min read',
      preview: 'Step-by-step guide to incorporating mindfulness into your daily routine for better stress management...',
      featured: true,
      relevance: 'high'
    },
    {
      id: 5,
      title: 'Healthy Relationships and Boundaries',
      category: 'Relationship Health',
      readTime: '7 min read',
      preview: 'Learn to establish healthy boundaries and improve communication skills for stronger relationships...',
      featured: false,
      relevance: 'medium'
    },
    {
      id: 6,
      title: 'Nutrition for Mental Wellness',
      category: 'Physical Health',
      readTime: '9 min read',
      preview: 'Discover the connection between diet, gut health, and mental well-being with practical nutrition tips...',
      featured: false,
      relevance: 'medium'
    },
    {
      id: 7,
      title: 'Managing Depression: Self-Help Strategies',
      category: 'Mental Health Conditions',
      readTime: '15 min read',
      preview: 'Comprehensive guide to understanding depression symptoms and effective self-management techniques...',
      featured: true,
      relevance: 'high'
    },
    {
      id: 8,
      title: 'Work-Life Balance and Burnout Prevention',
      category: 'Professional Wellness',
      readTime: '11 min read',
      preview: 'Practical strategies for maintaining healthy boundaries between work and personal life to prevent burnout...',
      featured: false,
      relevance: 'medium'
    },
    {
      id: 9,
      title: 'Introduction to Meditation',
      category: 'Meditation Guide',
      readTime: '10 min read',
      preview: 'Beginner-friendly guide to starting a meditation practice with basic techniques and benefits...',
      featured: false,
      relevance: 'low'
    },
    {
      id: 10,
      title: 'Cognitive Behavioral Therapy Basics',
      category: 'Therapy Approaches',
      readTime: '13 min read',
      preview: 'Understanding the principles of CBT and how these techniques can help reframe negative thoughts...',
      featured: false,
      relevance: 'medium'
    }
  ]

  const upcomingSession = {
    date: 'Tomorrow, 10:00 AM',
    counselor: 'Dr. Sarah Johnson',
    type: 'Video Session',
    topic: 'Progress Review and Goal Setting'
  }

  const progressStats = {
    sessionsCompleted: 8,
    moodImprovement: 23,
    exercisesCompleted: 15,
    streakDays: 12
  }

  const quickActions = [
    { icon: MessageSquare, label: 'Chat with AI', color: 'primary', href: '/chatbot' },
    { icon: Calendar, label: 'Book Session', color: 'success', href: '/booking' },
    { icon: BookOpen, label: 'Resources', color: 'warning' },
    { icon: Activity, label: 'Quick Exercise', color: 'accent' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
                  <p className="text-primary-100">Your personalized wellness journey continues</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-black">{screeningResult.score}</div>
                    <div className="text-sm text-primary-200">Current Score</div>
                    <div className="text-xs text-primary-300 mt-1">{screeningResult.riskLevel} Risk Level</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={action.label}
                  href={action.href || '#'}
                  className="group"
                >
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all ${
                      action.color === 'primary' ? 'hover:bg-primary-50' :
                      action.color === 'success' ? 'hover:bg-success-50' :
                      action.color === 'warning' ? 'hover:bg-warning-50' :
                      'hover:bg-accent-50'
                    }`}
                  >
                    <action.icon className={`h-8 w-8 mx-auto mb-3 ${
                      action.color === 'primary' ? 'text-primary-600' :
                      action.color === 'success' ? 'text-success-600' :
                      action.color === 'warning' ? 'text-warning-600' :
                      'text-accent-600'
                    }`} />
                    <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{action.label}</p>
                  </motion.button>
                </Link>
              ))}
            </div>

            {/* Progress Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Sessions</h3>
                  <TrendingUp className="h-5 w-5 text-success-500" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{progressStats.sessionsCompleted}</div>
                <p className="text-sm text-slate-500">Completed</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Mood</h3>
                  <Star className="h-5 w-5 text-primary-500" />
                </div>
                <div className="text-3xl font-bold text-slate-900">+{progressStats.moodImprovement}%</div>
                <p className="text-sm text-slate-500">Improvement</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Exercises</h3>
                  <Zap className="h-5 w-5 text-warning-500" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{progressStats.exercisesCompleted}</div>
                <p className="text-sm text-slate-500">Completed</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Streak</h3>
                  <Activity className="h-5 w-5 text-accent-500" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{progressStats.streakDays}</div>
                <p className="text-sm text-slate-500">Days</p>
              </div>
            </div>

            {/* Enhanced Progress Tracking */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Mood Progress Chart */}
              <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Mental Health Progress</h3>
                    <p className="text-sm text-slate-500">Tracking your wellness journey over the last 30 days</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-primary-500" /> Mood
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-success-600 bg-success-50 px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-success-500" /> Energy
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-warning-600 bg-warning-50 px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-warning-500" /> Anxiety
                    </span>
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moodHistory}>
                      <defs>
                        <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAnxiety" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis 
                        hide 
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorMood)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={0}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="anxiety" 
                        stroke="#f59e0b" 
                        strokeWidth={3}
                        fillOpacity={0}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reminders and Follow-ups */}
              <div className="lg:col-span-4 space-y-6">
                {/* Reminders */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Reminders</h3>
                    <button className="bg-primary-100 p-2 rounded-xl hover:bg-primary-200 transition-colors">
                      <Plus className="h-5 w-5 text-primary-600" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {reminders.slice(0, 3).map((reminder) => (
                      <div key={reminder.id} className="group p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-primary-100 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className={`mt-1 w-2 h-2 rounded-full ${
                              reminder.status === 'pending' ? 'bg-warning-500 animate-pulse' : 
                              reminder.status === 'upcoming' ? 'bg-primary-500' : 'bg-success-500'
                            }`} />
                            <div>
                              <p className="text-sm font-bold text-slate-800">{reminder.title}</p>
                              <p className="text-xs text-slate-500">{reminder.time}</p>
                            </div>
                          </div>
                          {reminder.importance === 'critical' && (
                            <AlertCircle className="h-4 w-4 text-danger-500" />
                          )}
                        </div>
                        <button className="w-full mt-3 py-2 bg-white rounded-xl text-xs font-black uppercase tracking-widest text-primary-600 border border-primary-50 hover:bg-primary-500 hover:text-white transition-all">
                          {reminder.status === 'pending' ? 'Complete Now' : 'View Details'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 rounded-3xl border border-primary-100">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-primary-600" />
                    <h3 className="text-xl font-bold text-slate-900">AI Insights</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {aiInsights.map((insight) => (
                      <div key={insight.id} className="flex gap-3">
                        <div className={`p-2 rounded-lg ${
                          insight.color === 'success' ? 'bg-success-100' :
                          insight.color === 'primary' ? 'bg-primary-100' :
                          'bg-warning-100'
                        }`}>
                          <insight.icon className={`h-4 w-4 ${
                            insight.color === 'success' ? 'text-success-600' :
                            insight.color === 'primary' ? 'text-primary-600' :
                            'text-warning-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">{insight.title}</p>
                          <p className="text-xs text-slate-600">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Session */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Upcoming Session</h3>
              <div className="flex items-start gap-6">
                <div className="bg-primary-50 p-4 rounded-2xl">
                  <Calendar className="h-8 w-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-900">{upcomingSession.date}</p>
                  <p className="text-slate-600 mb-2">with {upcomingSession.counselor}</p>
                  <div className="flex items-center gap-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                      {upcomingSession.type}
                    </span>
                    <span className="text-sm text-slate-500">Topic: {upcomingSession.topic}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'treatment-journey':
        return (
          <div className="space-y-8">
            {/* Treatment Journey Header */}
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-8 rounded-3xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Treatment Journey</h2>
                  <p className="text-primary-100">Started: {new Date(treatmentJourney.startDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="text-center">
                    <Award className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{treatmentJourney.milestones.filter(m => m.completed).length}</div>
                    <div className="text-sm">Milestones Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Phases */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Treatment Phases</h3>
              <div className="space-y-4">
                {treatmentJourney.phases.map((phase, index) => (
                  <div key={phase.name} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100">
                    <div className={`p-3 rounded-xl ${
                      phase.completed ? 'bg-success-100' : 'bg-slate-100'
                    }`}>
                      <phase.icon className={`h-6 w-6 ${
                        phase.completed ? 'text-success-600' : 'text-slate-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{phase.name}</h4>
                      <p className="text-sm text-slate-500">
                        {phase.completed ? `Completed: ${new Date(phase.date).toLocaleDateString()}` : 'Upcoming'}
                      </p>
                    </div>
                    {phase.completed && (
                      <CheckCircle className="h-6 w-6 text-success-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Achievement Milestones</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {treatmentJourney.milestones.map((milestone) => (
                  <div key={milestone.id} className={`p-6 rounded-2xl border-2 ${
                    milestone.completed ? 'bg-success-50 border-success-200' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          milestone.completed ? 'bg-success-100' : 'bg-slate-200'
                        }`}>
                          <Award className={`h-5 w-5 ${
                            milestone.completed ? 'text-success-600' : 'text-slate-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{milestone.title}</h4>
                          <p className="text-sm text-slate-500">
                            {milestone.completed ? new Date(milestone.date).toLocaleDateString() : 'In Progress'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">{milestone.points}</div>
                        <div className="text-xs text-slate-500">points</div>
                      </div>
                    </div>
                    {milestone.completed ? (
                      <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-xs font-bold w-fit">
                        Completed
                      </div>
                    ) : (
                      <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold w-fit">
                        In Progress
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up Schedule */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Follow-up Schedule</h3>
              <div className="space-y-4">
                {followUpSchedule.map((followUp) => (
                  <div key={followUp.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-${followUp.color}-100`}>
                        <CalendarDays className={`h-6 w-6 text-${followUp.color}-600`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{followUp.type}</h4>
                        <p className="text-sm text-slate-500">{followUp.frequency} • Next: {followUp.nextDue}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{Math.round(followUp.completed * 100)}%</div>
                      <div className="text-sm text-slate-500">Completed</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'exercises':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Personalized Exercises</h2>
              <p className="text-slate-500">Recommended based on your screening results</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalizedRecommendations.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      exercise.color === 'primary' ? 'bg-primary-100' :
                      exercise.color === 'success' ? 'bg-success-100' :
                      exercise.color === 'warning' ? 'bg-warning-100' :
                      'bg-accent-100'
                    }`}>
                      <exercise.icon className={`h-6 w-6 ${
                        exercise.color === 'primary' ? 'text-primary-600' :
                        exercise.color === 'success' ? 'text-success-600' :
                        exercise.color === 'warning' ? 'text-warning-600' :
                        'text-accent-600'
                      }`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        exercise.difficulty === 'Beginner' ? 'bg-success-100 text-success-700' :
                        exercise.difficulty === 'Intermediate' ? 'bg-warning-100 text-warning-700' :
                        'bg-danger-100 text-danger-700'
                      }`}>
                        {exercise.difficulty}
                      </span>
                      <span className="text-sm text-slate-500">{exercise.duration}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{exercise.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{exercise.description}</p>
                  
                  <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center group">
                    <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Start Exercise
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'resources':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Guided Resources</h2>
              <p className="text-slate-500">Educational content tailored to your needs</p>
            </div>
            
            <div className="space-y-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group ${
                    article.featured ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          article.relevance === 'high' ? 'bg-primary-100 text-primary-700' :
                          article.relevance === 'medium' ? 'bg-warning-100 text-warning-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {article.category}
                        </span>
                        {article.featured && (
                          <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                        <span className="text-sm text-slate-500">{article.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-4">{article.preview}</p>
                      
                      <div className="flex items-center justify-between">
                        <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-2">
                          Read More
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'counseling':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Virtual Counseling Session</h2>
              <p className="text-slate-500">Connect with your counselor via secure video call</p>
            </div>

            {/* Video Call Interface */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Video Area */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Counselor Video */}
                  <div className="relative bg-slate-700 rounded-2xl overflow-hidden aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-primary-100 p-6 rounded-full mb-4 mx-auto w-24 h-24 flex items-center justify-center">
                          <User className="h-12 w-12 text-primary-600" />
                        </div>
                        <p className="text-white font-semibold text-lg">Dr. Sarah Johnson</p>
                        <p className="text-slate-300 text-sm">Licensed Professional Counselor</p>
                      </div>
                    </div>
                    
                    {/* Call Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                      <button className="bg-slate-600 hover:bg-slate-500 text-white p-3 rounded-full transition-colors">
                        <Calendar className="h-5 w-5" />
                      </button>
                      <button className="bg-slate-600 hover:bg-slate-500 text-white p-3 rounded-full transition-colors">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Client Video */}
                  <div className="relative bg-slate-700 rounded-2xl overflow-hidden aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-success-100 p-6 rounded-full mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                          <User className="h-10 w-10 text-success-600" />
                        </div>
                        <p className="text-white font-medium">You</p>
                        <p className="text-slate-300 text-sm">Camera Ready</p>
                      </div>
                    </div>
                    
                    {/* Camera Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
                        <Zap className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                  {/* Session Info */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <h3 className="text-white font-bold text-lg mb-4">Session Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-slate-300" />
                        <span className="text-slate-200">Duration: 45 min</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-slate-300" />
                        <span className="text-slate-200">Started: 3:30 PM</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart className="h-4 w-4 text-slate-300" />
                        <span className="text-slate-200">Topic: Progress Review</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Panel */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <h3 className="text-white font-bold text-lg mb-4">Session Notes</h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-slate-200 text-sm">Client reports improved sleep quality</p>
                        <span className="text-slate-400 text-xs">3:35 PM</span>
                      </div>
                      <div className="bg-primary-500/20 p-3 rounded-lg">
                        <p className="text-slate-200 text-sm">Discussed coping strategies</p>
                        <span className="text-slate-400 text-xs">3:38 PM</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-slate-200 text-sm">Homework: Daily mindfulness practice</p>
                        <span className="text-slate-400 text-xs">3:42 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-colors">
                      Share Screen
                    </button>
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors border border-white/20">
                      Record Session
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Support */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Technical Support</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-success-50 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Camera</p>
                    <p className="text-sm text-slate-500">Working</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success-50 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Microphone</p>
                    <p className="text-sm text-slate-500">Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success-50 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Connection</p>
                    <p className="text-sm text-slate-500">Stable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FBFA]">
      {/* Sidebar Navigation */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r border-slate-200/50 z-40">
        <div className="p-8">
          <Link href="/" className="flex items-center group mb-8">
            <div className="bg-primary-100 p-2 rounded-xl group-hover:bg-primary-200 transition-colors">
              <Brain className="h-6 w-6 text-primary-600" />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-900">Client Portal</span>
          </Link>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: BarChart },
              { id: 'treatment-journey', label: 'Treatment Journey', icon: Target },
              { id: 'exercises', label: 'Exercises', icon: Activity },
              { id: 'resources', label: 'Resources', icon: BookOpen },
              { id: 'counseling', label: 'Virtual Counseling', icon: MessageSquare }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-slate-200/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'treatment-journey' && 'Treatment Journey'}
                {activeTab === 'exercises' && 'Personalized Exercises'}
                {activeTab === 'resources' && 'Guided Resources'}
              </h1>
              <p className="text-slate-500">Last screening: {screeningResult.lastScreening}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors">
                <Bell className="h-5 w-5 text-slate-500" />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 p-2 rounded-xl">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <span className="font-medium text-slate-700">Client User</span>
              </div>
              <Link href="/login" className="btn-outline">
                Logout
              </Link>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </main>
    </div>
  )
}
