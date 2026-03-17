'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Send, 
  User, 
  Bot, 
  AlertTriangle, 
  Heart,
  Shield,
  Clock,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Activity,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  emotionalScore?: number
  severity?: 'mild' | 'moderate' | 'severe'
  context?: string
}

interface AssessmentResult {
  overallSeverity: 'mild' | 'moderate' | 'severe'
  emotionalProfile: {
    anxiety: number
    depression: number
    stress: number
    anger: number
    sadness: number
  }
  riskFactors: string[]
  recommendations: string[]
  nextSteps: string[]
  crisisLevel: number
}

// Simulated BERT-like transformer model for mental health assessment
class MentalHealthTransformer {
  private emotionalKeywords = {
    anxiety: ['worried', 'anxious', 'nervous', 'panic', 'fear', 'stress', 'overwhelmed'],
    depression: ['sad', 'hopeless', 'empty', 'worthless', 'tired', 'unmotivated', 'lonely'],
    stress: ['stressed', 'pressure', 'overwhelmed', 'burnout', 'exhausted', 'tension'],
    anger: ['angry', 'frustrated', 'irritated', 'mad', 'rage', 'hostile'],
    sadness: ['sad', 'melancholy', 'grief', 'sorrow', 'despair', 'blue']
  }

  private severityIndicators = {
    mild: ['sometimes', 'occasionally', 'a little', 'slightly', 'manageable'],
    moderate: ['often', 'frequently', 'regularly', 'difficult', 'challenging'],
    severe: ['always', 'constantly', 'unbearable', 'crisis', 'emergency', 'suicidal']
  }

  private crisisKeywords = ['kill myself', 'suicide', 'end it all', 'no reason to live', 'better off dead']

  analyzeMessage(text: string, conversationHistory: Message[] = []): {
    emotionalScore: number
    detectedEmotions: Record<string, number>
    severity: 'mild' | 'moderate' | 'severe'
    context: string
    crisisRisk: number
    conversationInsights: {
      emotionalProgression: 'improving' | 'stable' | 'declining'
      topicConsistency: number
      engagementLevel: number
    }
  } {
    const lowerText = text.toLowerCase()
    let emotionalScore = 0
    const detectedEmotions: Record<string, number> = {}
    let crisisRisk = 0

    // Enhanced emotional analysis with context awareness
    Object.entries(this.emotionalKeywords).forEach(([emotion, keywords]) => {
      const emotionScore = keywords.reduce((score, keyword) => {
        if (lowerText.includes(keyword)) {
          // Weight based on frequency and intensity
          const frequency = (lowerText.match(new RegExp(keyword, 'g')) || []).length
          return score + (frequency * 1.5)
        }
        return score
      }, 0)
      
      if (emotionScore > 0) {
        detectedEmotions[emotion] = emotionScore
        emotionalScore += emotionScore * 2
      }
    })

    // Enhanced crisis detection with expanded keywords
    const expandedCrisisKeywords = [
      ...this.crisisKeywords,
      'want to die', 'hurt myself', 'self harm', 'cutting', 'overdose',
      'no point', 'worthless', 'burden', 'everyone would be better off'
    ]
    
    expandedCrisisKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        crisisRisk += 10
      }
    })

    // Enhanced severity analysis with conversation context
    let severity: 'mild' | 'moderate' | 'severe' = 'mild'
    let severityScore = 0

    Object.entries(this.severityIndicators).forEach(([level, indicators]) => {
      indicators.forEach(indicator => {
        if (lowerText.includes(indicator)) {
          severityScore += level === 'mild' ? 1 : level === 'moderate' ? 3 : 5
        }
      })
    })

    // Analyze conversation patterns for severity
    if (conversationHistory.length > 0) {
      const recentEmotionalScores = conversationHistory
        .filter(m => m.sender === 'user' && m.emotionalScore)
        .slice(-3)
        .map(m => m.emotionalScore!)
      
      if (recentEmotionalScores.length > 0) {
        const avgRecentScore = recentEmotionalScores.reduce((a, b) => a + b, 0) / recentEmotionalScores.length
        if (avgRecentScore > 7) severityScore += 3
        else if (avgRecentScore > 4) severityScore += 1
      }
    }

    if (severityScore >= 8 || crisisRisk > 0) {
      severity = 'severe'
    } else if (severityScore >= 4) {
      severity = 'moderate'
    }

    // Enhanced context analysis
    const context = this.extractContext(lowerText)

    // Conversation insights analysis
    const conversationInsights = this.analyzeConversationPatterns(text, conversationHistory)

    return {
      emotionalScore: Math.min(emotionalScore, 10),
      detectedEmotions,
      severity,
      context,
      crisisRisk: Math.min(crisisRisk, 10),
      conversationInsights
    }
  }

  private analyzeConversationPatterns(currentMessage: string, conversationHistory: Message[]): {
    emotionalProgression: 'improving' | 'stable' | 'declining'
    topicConsistency: number
    engagementLevel: number
  } {
    if (conversationHistory.length === 0) {
      return {
        emotionalProgression: 'stable',
        topicConsistency: 1,
        engagementLevel: 1
      }
    }

    const userMessages = conversationHistory.filter(m => m.sender === 'user')
    const recentScores = userMessages.slice(-3).map(m => m.emotionalScore || 0)
    
    // Analyze emotional progression
    let emotionalProgression: 'improving' | 'stable' | 'declining' = 'stable'
    if (recentScores.length >= 2) {
      const trend = recentScores[recentScores.length - 1] - recentScores[0]
      if (trend < -1) emotionalProgression = 'improving'
      else if (trend > 1) emotionalProgression = 'declining'
    }

    // Analyze topic consistency
    const contexts = userMessages.map(m => m.context || '').filter(c => c)
    const uniqueContexts = new Set(contexts)
    const topicConsistency = contexts.length > 0 ? 1 - (uniqueContexts.size / contexts.length) : 1

    // Analyze engagement level based on message length and emotional content
    const avgMessageLength = userMessages.reduce((sum, m) => sum + m.text.length, 0) / userMessages.length
    const engagementLevel = Math.min(avgMessageLength / 100, 1) // Normalize to 0-1

    return {
      emotionalProgression,
      topicConsistency,
      engagementLevel
    }
  }

  private extractContext(text: string): string {
    if (text.includes('work') || text.includes('job')) return 'work-related stress'
    if (text.includes('relationship') || text.includes('partner')) return 'relationship issues'
    if (text.includes('family') || text.includes('parent')) return 'family dynamics'
    if (text.includes('sleep') || text.includes('insomnia')) return 'sleep problems'
    if (text.includes('social') || text.includes('friend')) return 'social isolation'
    return 'general mental health'
  }

  generateResponse(
    userMessage: string,
    conversationHistory: Message[],
    assessment: AssessmentResult
  ): string {
    const analysis = this.analyzeMessage(userMessage)
    const userMessages = conversationHistory.filter(m => m.sender === 'user')
    const messageCount = userMessages.length
    
    // Crisis detection and immediate response
    if (analysis.crisisRisk > 7) {
      return "I'm very concerned about what you're sharing. If you're having thoughts of harming yourself, please call 988 immediately - the National Suicide Prevention Lifeline. You're not alone, and help is available 24/7. Would you like me to help you find immediate support?"
    }

    // Generate contextual follow-up questions based on conversation analysis
    const followUpQuestions = this.generateFollowUpQuestions(userMessage, conversationHistory, analysis)
    
    // Adaptive response based on conversation stage and emotional state
    if (messageCount <= 2) {
      // Initial conversation - gather basic information
      return this.generateInitialResponse(analysis, followUpQuestions)
    } else if (messageCount <= 5) {
      // Deepening conversation - explore specific areas
      return this.generateDeepeningResponse(analysis, followUpQuestions, userMessage)
    } else {
      // Advanced conversation - provide insights and recommendations
      return this.generateAdvancedResponse(analysis, followUpQuestions, conversationHistory)
    }
  }

  private generateInitialResponse(analysis: any, followUpQuestions: string[]): string {
    const responses = [
      "Thank you for sharing that with me. I can sense some emotional intensity in what you're describing. ",
      "I appreciate you opening up to me. Your words suggest you're dealing with some challenging feelings. ",
      "It sounds like you're going through a difficult time. I'm here to listen and understand better. "
    ]
    
    const baseResponse = responses[Math.floor(Math.random() * responses.length)]
    const followUp = followUpQuestions.length > 0 ? followUpQuestions[0] : "Can you tell me more about what's been on your mind lately?"
    
    return baseResponse + followUp
  }

  private generateDeepeningResponse(analysis: any, followUpQuestions: string[], userMessage: string): string {
    const context = analysis.context
    const emotions = Object.keys(analysis.detectedEmotions).filter(emotion => analysis.detectedEmotions[emotion] > 0)
    
    let response = ""
    
    if (context.includes('work')) {
      response = "I can see work is really affecting your mental health. "
    } else if (context.includes('relationship')) {
      response = "It sounds like relationship issues are weighing heavily on you. "
    } else if (context.includes('family')) {
      response = "Family dynamics can be incredibly challenging. "
    } else if (emotions.includes('anxiety')) {
      response = "I notice you're experiencing anxiety. "
    } else if (emotions.includes('depression')) {
      response = "I can sense you're dealing with depression. "
    } else {
      response = "I want to understand your situation better. "
    }
    
    const followUp = followUpQuestions.length > 0 ? followUpQuestions[0] : "How long have you been feeling this way?"
    
    return response + followUp
  }

  private generateAdvancedResponse(analysis: any, followUpQuestions: string[], conversationHistory: Message[]): string {
    const recentEmotionalScores = conversationHistory
      .filter(m => m.sender === 'user' && m.emotionalScore)
      .slice(-3)
      .map(m => m.emotionalScore!)
    
    const avgEmotionalScore = recentEmotionalScores.reduce((a, b) => a + b, 0) / recentEmotionalScores.length
    
    let response = ""
    
    if (avgEmotionalScore > 7) {
      response = "Based on our conversation, I'm seeing consistent signs of significant emotional distress. "
    } else if (avgEmotionalScore > 4) {
      response = "I've noticed some patterns in our conversation that suggest you're dealing with moderate emotional challenges. "
    } else {
      response = "While you're experiencing some difficulties, I'm also seeing some positive coping mechanisms. "
    }
    
    const followUp = followUpQuestions.length > 0 ? followUpQuestions[0] : "What would be most helpful for you right now?"
    
    return response + followUp
  }

  private generateFollowUpQuestions(userMessage: string, conversationHistory: Message[], analysis: any): string[] {
    const questions: string[] = []
    const lowerMessage = userMessage.toLowerCase()
    
    // Context-based questions
    if (lowerMessage.includes('work') || lowerMessage.includes('job')) {
      questions.push("How long have you been feeling this way about work?")
      questions.push("What specific aspects of your work are most challenging?")
      questions.push("Do you feel supported by your colleagues or supervisors?")
    }
    
    if (lowerMessage.includes('relationship') || lowerMessage.includes('partner')) {
      questions.push("How long have you been experiencing these relationship difficulties?")
      questions.push("What would you like to see change in your relationship?")
      questions.push("Do you feel comfortable talking to your partner about these issues?")
    }
    
    if (lowerMessage.includes('family')) {
      questions.push("How do these family issues affect your daily life?")
      questions.push("What kind of support do you wish you had from your family?")
      questions.push("Have you tried talking to family members about these concerns?")
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      questions.push("How long have you been having trouble sleeping?")
      questions.push("What do you think might be causing your sleep problems?")
      questions.push("How does poor sleep affect your mood during the day?")
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worry')) {
      questions.push("What specific things are you most worried about?")
      questions.push("How does anxiety affect your daily activities?")
      questions.push("What helps you feel less anxious?")
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      questions.push("How long have you been feeling this way?")
      questions.push("What activities used to bring you joy?")
      questions.push("Do you have people you can talk to about these feelings?")
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
      questions.push("What are the main sources of stress in your life right now?")
      questions.push("How do you typically cope with stress?")
      questions.push("What would help you feel less overwhelmed?")
    }
    
    // Emotional intensity questions
    if (analysis.emotionalScore > 7) {
      questions.push("How are you coping with these intense feelings?")
      questions.push("Do you have a support system you can rely on?")
      questions.push("What would help you feel safer or more supported right now?")
    }
    
    // Duration and frequency questions
    if (conversationHistory.length > 3) {
      questions.push("How long have these feelings been affecting you?")
      questions.push("Are there times when you feel better or worse?")
      questions.push("What triggers these difficult emotions?")
    }
    
    // Coping and support questions
    questions.push("What helps you feel better when you're struggling?")
    questions.push("Do you have people in your life you can talk to about these feelings?")
    questions.push("What would you like to see change in your life?")
    
    return questions.slice(0, 3) // Return top 3 most relevant questions
  }

  generateAssessment(conversationHistory: Message[]): AssessmentResult {
    let totalEmotionalScore = 0
    let crisisCount = 0
    const emotionalProfile = { anxiety: 0, depression: 0, stress: 0, anger: 0, sadness: 0 }
    const riskFactors: string[] = []
    const contexts = new Set<string>()

    conversationHistory.forEach(message => {
      if (message.sender === 'user') {
        const analysis = this.analyzeMessage(message.text)
        totalEmotionalScore += analysis.emotionalScore
        crisisCount += analysis.crisisRisk > 5 ? 1 : 0
        
        Object.entries(analysis.detectedEmotions).forEach(([emotion, score]) => {
          emotionalProfile[emotion as keyof typeof emotionalProfile] += score
        })

        if (analysis.context) contexts.add(analysis.context)
      }
    })

    const avgEmotionalScore = totalEmotionalScore / conversationHistory.filter(m => m.sender === 'user').length
    const overallSeverity = avgEmotionalScore > 7 ? 'severe' : avgEmotionalScore > 4 ? 'moderate' : 'mild'

    // Generate recommendations based on assessment
    const recommendations = this.generateRecommendations(overallSeverity, emotionalProfile, Array.from(contexts))
    const nextSteps = this.generateNextSteps(overallSeverity, crisisCount)

    return {
      overallSeverity,
      emotionalProfile,
      riskFactors,
      recommendations,
      nextSteps,
      crisisLevel: crisisCount
    }
  }

  private generateRecommendations(
    severity: string,
    emotionalProfile: Record<string, number>,
    contexts: string[]
  ): string[] {
    const recommendations = []

    if (severity === 'severe') {
      recommendations.push('Consider immediate professional mental health support')
      recommendations.push('Practice grounding techniques when feeling overwhelmed')
    } else if (severity === 'moderate') {
      recommendations.push('Regular self-care activities and stress management')
      recommendations.push('Consider speaking with a counselor or therapist')
    } else {
      recommendations.push('Continue monitoring your mental health')
      recommendations.push('Maintain healthy lifestyle habits')
    }

    if (emotionalProfile.anxiety > 3) {
      recommendations.push('Practice deep breathing and mindfulness exercises')
    }
    if (emotionalProfile.depression > 3) {
      recommendations.push('Stay connected with supportive friends and family')
    }

    return recommendations
  }

  private generateNextSteps(severity: string, crisisCount: number): string[] {
    if (crisisCount > 0) {
      return [
        'Contact crisis hotline: 988',
        'Seek immediate professional help',
        'Remove access to harmful items'
      ]
    }

    if (severity === 'severe') {
      return [
        'Schedule consultation with mental health professional',
        'Consider intensive treatment programs',
        'Establish safety plan with trusted individuals'
      ]
    } else if (severity === 'moderate') {
      return [
        'Book counseling session through our platform',
        'Access self-help resources',
        'Monitor symptoms and track progress'
      ]
    } else {
      return [
        'Continue with self-care practices',
        'Access our wellness resources',
        'Regular mental health check-ins'
      ]
    }
  }
}

const transformer = new MentalHealthTransformer()

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI mental health companion. I'm here to listen and help you understand your mental health better. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null)
  const [showAssessment, setShowAssessment] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      const analysis = transformer.analyzeMessage(inputText, [...messages, userMessage])
      const response = transformer.generateResponse(inputText, [...messages, userMessage], assessment!)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        emotionalScore: analysis.emotionalScore,
        severity: analysis.severity,
        context: analysis.context
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)

      // Generate assessment after 5+ messages
      if (messages.length >= 8) {
        const newAssessment = transformer.generateAssessment([...messages, userMessage, botMessage])
        setAssessment(newAssessment)
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'text-red-600 bg-red-100'
      case 'moderate': return 'text-yellow-600 bg-yellow-100'
      case 'mild': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FBFA] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center bg-white p-2 rounded-xl shadow-sm hover:bg-primary-50 transition-colors mr-6">
                <ArrowLeft className="h-5 w-5 text-slate-600 group-hover:text-primary-600" />
              </Link>
              <div className="bg-primary-100 p-2 rounded-xl mr-3">
                <Brain className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none">MindLink AI Chat</h1>
                <p className="text-xs text-slate-400 font-medium mt-1 flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                  </span>
                  AI Companion Online
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <Shield className="h-4 w-4 text-primary-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 pt-32 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 h-full max-h-[800px]">
          {/* Chat Interface */}
          <div className="lg:col-span-8 flex flex-col h-full">
            <div className="glass-card flex flex-col h-full overflow-hidden p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                          message.sender === 'user' ? 'bg-primary-500' : 'bg-white border border-slate-100'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <div className={`px-6 py-4 rounded-[2rem] shadow-sm text-lg leading-relaxed ${
                            message.sender === 'user' 
                              ? 'bg-primary-600 text-white rounded-tr-none' 
                              : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                          }`}>
                            <p>{message.text}</p>
                          </div>
                          
                          {message.emotionalScore && (
                            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              message.sender === 'user' ? 'justify-end text-slate-400' : 'text-slate-400'
                            }`}>
                              <span className="flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                Analysis: {message.emotionalScore}/10
                              </span>
                              {message.severity && (
                                <span className={`px-2 py-0.5 rounded-full ${
                                  message.severity === 'severe' ? 'bg-danger-100 text-danger-600' :
                                  message.severity === 'moderate' ? 'bg-warning-100 text-warning-600' :
                                  'bg-success-100 text-success-600'
                                }`}>
                                  {message.severity}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                      <Bot className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="bg-white border border-slate-100 px-6 py-4 rounded-[2rem] rounded-tl-none shadow-sm flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-150"></span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Thinking</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                <div className="relative flex items-center gap-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share your thoughts with me..."
                      className="w-full bg-white border border-slate-200 rounded-[2rem] px-8 py-5 pr-16 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-400 transition-all resize-none shadow-sm text-lg"
                      rows={1}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-bold uppercase tracking-widest pointer-events-none">
                      Press Enter
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="w-16 h-16 bg-primary-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Real-time Insights */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary-100 p-2 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Live Insights</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Messages</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-sm font-bold text-slate-700">
                    {messages.filter(m => m.sender === 'user').length}
                  </span>
                </div>
                
                {messages.length > 2 ? (
                  <div className="space-y-6">
                    <div className="h-[2px] bg-slate-100 w-full"></div>
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Emotional Intensity</span>
                      <div className="space-y-3">
                        {messages.slice(-3).map((m) => (
                          m.sender === 'user' && m.emotionalScore && (
                            <div key={m.id} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                <span>Recent Message</span>
                                <span>{m.emotionalScore}/10</span>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(m.emotionalScore / 10) * 100}%` }}
                                  className="bg-primary-500 h-full rounded-full"
                                />
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-slate-400 italic">Continue chatting to generate insights...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Assessment Status */}
            <div className="glass-card p-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/10 p-2 rounded-xl">
                    <Activity className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold">Health Profile</h3>
                </div>
                
                {assessment ? (
                  <div className="space-y-6">
                    <div className={`inline-flex px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                      assessment.overallSeverity === 'severe' ? 'bg-danger-500/20 text-danger-400 border border-danger-500/30' :
                      assessment.overallSeverity === 'moderate' ? 'bg-warning-500/20 text-warning-400 border border-warning-500/30' :
                      'bg-success-500/20 text-success-400 border border-success-500/30'
                    }`}>
                      {assessment.overallSeverity} Risk Detected
                    </div>
                    
                    <button
                      onClick={() => setShowAssessment(true)}
                      className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center group"
                    >
                      View Full Analysis
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Our AI needs a few more messages to generate a comprehensive emotional profile.
                    </p>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary-500 h-full transition-all duration-1000"
                        style={{ width: `${Math.min((messages.length / 8) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-8">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/screening" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-primary-50 transition-colors group cursor-pointer">
                  <span className="font-bold text-slate-600 group-hover:text-primary-600">Full Assessment</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary-400" />
                </Link>
                <Link href="/booking" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-primary-50 transition-colors group cursor-pointer">
                  <span className="font-bold text-slate-600 group-hover:text-primary-600">Book Counselor</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Assessment Modal */}
      <AnimatePresence>
        {showAssessment && assessment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAssessment(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative glass-card bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-10 md:p-14"
            >
              <button
                onClick={() => setShowAssessment(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-12">
                <div className="text-center">
                  <div className={`inline-flex px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-6 ${
                    assessment.overallSeverity === 'severe' ? 'bg-danger-100 text-danger-600' :
                    assessment.overallSeverity === 'moderate' ? 'bg-warning-100 text-warning-600' :
                    'bg-success-100 text-success-600'
                  }`}>
                    {assessment.overallSeverity} Risk Level
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight">AI Emotional Analysis</h2>
                </div>

                <div className="grid gap-10">
                  <section>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Recommendations</h3>
                    <div className="space-y-4">
                      {assessment.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-4 bg-slate-50 p-5 rounded-2xl">
                          <CheckCircle className="h-6 w-6 text-primary-500 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 font-medium">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Next Steps</h3>
                    <div className="space-y-4">
                      {assessment.nextSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary-600 font-bold shadow-sm">
                            {i + 1}
                          </div>
                          <p className="text-slate-700 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                  <Link href="/booking" className="btn-primary flex-1 text-center justify-center">
                    Book a Consultation
                  </Link>
                  <button
                    onClick={() => setShowAssessment(false)}
                    className="btn-outline flex-1 text-center justify-center"
                  >
                    Continue Chatting
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

