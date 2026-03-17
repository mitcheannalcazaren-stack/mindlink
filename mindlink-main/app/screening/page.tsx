'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Heart,
  Shield,
  Clock,
  Users,
  BarChart3,
  Sparkles,
  Info,
  Download,
  Share2
} from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: number
  text: string
  category: string
  options: {
    value: number
    label: string
    description: string
  }[]
}

interface ScreeningResult {
  riskLevel: 'Mild' | 'Moderate' | 'Severe'
  score: number
  recommendations: string[]
  nextSteps: string[]
  clinicalNotes: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "Little interest or pleasure in doing things",
    category: "Emotional Well-being",
    options: [
      { value: 0, label: "Not at all", description: "I rarely or never feel this way" },
      { value: 1, label: "Several days", description: "I felt this way for several days" },
      { value: 2, label: "More than half the days", description: "I felt this way for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I felt this way nearly every day" }
    ]
  },
  {
    id: 2,
    text: "Feeling down, depressed, or hopeless",
    category: "Mood",
    options: [
      { value: 0, label: "Not at all", description: "I rarely or never feel this way" },
      { value: 1, label: "Several days", description: "I felt this way for several days" },
      { value: 2, label: "More than half the days", description: "I felt this way for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I felt this way nearly every day" }
    ]
  },
  {
    id: 3,
    text: "Trouble falling or staying asleep, or sleeping too much",
    category: "Physical Health",
    options: [
      { value: 0, label: "Not at all", description: "I sleep well most nights" },
      { value: 1, label: "Several days", description: "I had sleep issues for several days" },
      { value: 2, label: "More than half the days", description: "I had sleep issues for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I had sleep issues nearly every day" }
    ]
  },
  {
    id: 4,
    text: "Feeling tired or having little energy",
    category: "Energy Levels",
    options: [
      { value: 0, label: "Not at all", description: "I usually have good energy" },
      { value: 1, label: "Several days", description: "I felt tired for several days" },
      { value: 2, label: "More than half the days", description: "I felt tired for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I felt tired nearly every day" }
    ]
  },
  {
    id: 5,
    text: "Feeling nervous, anxious, or on edge",
    category: "Anxiety",
    options: [
      { value: 0, label: "Not at all", description: "I rarely feel anxious" },
      { value: 1, label: "Several days", description: "I felt anxious for several days" },
      { value: 2, label: "More than half the days", description: "I felt anxious for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I felt anxious nearly every day" }
    ]
  },
  {
    id: 6,
    text: "Not being able to stop or control worrying",
    category: "Anxiety",
    options: [
      { value: 0, label: "Not at all", description: "I can control my worrying" },
      { value: 1, label: "Several days", description: "I had trouble controlling worry for several days" },
      { value: 2, label: "More than half the days", description: "I had trouble controlling worry for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I had trouble controlling worry nearly every day" }
    ]
  },
  {
    id: 7,
    text: "Becoming easily annoyed or irritable",
    category: "Emotional Regulation",
    options: [
      { value: 0, label: "Not at all", description: "I'm usually patient" },
      { value: 1, label: "Several days", description: "I was easily annoyed for several days" },
      { value: 2, label: "More than half the days", description: "I was easily annoyed for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I was easily annoyed nearly every day" }
    ]
  },
  {
    id: 8,
    text: "Thoughts that you would be better off dead or of hurting yourself in some way",
    category: "Safety",
    options: [
      { value: 0, label: "Not at all", description: "I never have these thoughts" },
      { value: 1, label: "Several days", description: "I had these thoughts for several days" },
      { value: 2, label: "More than half the days", description: "I had these thoughts for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I had these thoughts nearly every day" }
    ]
  },
  {
    id: 9,
    text: "Difficulty concentrating on things like reading or watching TV",
    category: "Cognitive Function",
    options: [
      { value: 0, label: "Not at all", description: "I can concentrate normally" },
      { value: 1, label: "Several days", description: "I had trouble concentrating for several days" },
      { value: 2, label: "More than half the days", description: "I had trouble concentrating for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I had trouble concentrating nearly every day" }
    ]
  },
  {
    id: 10,
    text: "Moving or speaking so slowly that other people have noticed",
    category: "Physical Symptoms",
    options: [
      { value: 0, label: "Not at all", description: "My movements and speech are normal" },
      { value: 1, label: "Several days", description: "Others noticed for several days" },
      { value: 2, label: "More than half the days", description: "Others noticed for more than half the days" },
      { value: 3, label: "Nearly every day", description: "Others noticed nearly every day" }
    ]
  },
  {
    id: 11,
    text: "Feeling bad about yourself or that you're a failure",
    category: "Self-Esteem",
    options: [
      { value: 0, label: "Not at all", description: "I feel good about myself" },
      { value: 1, label: "Several days", description: "I felt this way for several days" },
      { value: 2, label: "More than half the days", description: "I felt this way for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I felt this way nearly every day" }
    ]
  },
  {
    id: 12,
    text: "Trouble making everyday decisions",
    category: "Decision Making",
    options: [
      { value: 0, label: "Not at all", description: "I can make decisions normally" },
      { value: 1, label: "Several days", description: "I had trouble for several days" },
      { value: 2, label: "More than half the days", description: "I had trouble for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I had trouble nearly every day" }
    ]
  },
  {
    id: 13,
    text: "Avoiding social situations or activities you usually enjoy",
    category: "Social Functioning",
    options: [
      { value: 0, label: "Not at all", description: "I engage in social activities normally" },
      { value: 1, label: "Several days", description: "I avoided activities for several days" },
      { value: 2, label: "More than half the days", description: "I avoided activities for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I avoided activities nearly every day" }
    ]
  },
  {
    id: 14,
    text: "Physical symptoms like headaches or stomach problems",
    category: "Physical Health",
    options: [
      { value: 0, label: "Not at all", description: "I don't have physical symptoms" },
      { value: 1, label: "Several days", description: "I had symptoms for several days" },
      { value: 2, label: "More than half the days", description: "I had symptoms for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I had symptoms nearly every day" }
    ]
  },
  {
    id: 15,
    text: "Feeling disconnected from reality or surroundings",
    category: "Perception",
    options: [
      { value: 0, label: "Not at all", description: "I feel connected to reality" },
      { value: 1, label: "Several days", description: "I felt disconnected for several days" },
      { value: 2, label: "More than half the days", description: "I felt disconnected for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I felt disconnected nearly every day" }
    ]
  },
  {
    id: 16,
    text: "Changes in appetite or weight",
    category: "Physical Health",
    options: [
      { value: 0, label: "Not at all", description: "My appetite is normal" },
      { value: 1, label: "Several days", description: "I noticed changes for several days" },
      { value: 2, label: "More than half the days", description: "I noticed changes for more than half the days" },
      { value: 3, label: "Nearly every day", description: "I noticed changes nearly every day" }
    ]
  }
]

export default function ScreeningPage() {
  const [step, setStep] = useState<'intro' | 'questions' | 'loading' | 'results'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<ScreeningResult | null>(null)

  const handleStart = () => {
    setStep('questions')
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setStep('loading')
        setTimeout(() => {
          const finalResult = calculateResult(newAnswers)
          setResult(finalResult)
          setStep('results')
        }, 3000)
      }
    }, 300)
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      setStep('intro')
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FBFA] selection:bg-primary-100">
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="bg-primary-100 p-2 rounded-xl group-hover:bg-primary-200 transition-colors">
              <Brain className="h-6 w-6 text-primary-600" />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-900">MindLink</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Clinical Standard Assessment</span>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <Shield className="h-5 w-5 text-success-500" />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-12"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full border border-primary-100">
                    <Sparkles className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-bold text-primary-700 uppercase tracking-widest">Free AI Screening</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                    Understand your <br />
                    <span className="text-primary-500 italic">emotional landscape</span>
                  </h1>
                  <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    This private, clinically-validated assessment takes less than 3 minutes. 
                    Receive instant AI insights and professional guidance tailored to your needs.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                  {[
                    { icon: Shield, title: "100% Private", desc: "Your data is encrypted and secure" },
                    { icon: Clock, title: "Quick Results", desc: "Instant clinical-grade analysis" },
                    { icon: Info, title: "Evidence Based", desc: "Based on PHQ-9 & GAD-7 standards" }
                  ].map((item, i) => (
                    <div key={i} className="glass-card p-8 group hover:bg-white transition-colors">
                      <item.icon className="h-8 w-8 text-primary-500 mb-4" />
                      <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <button
                    onClick={handleStart}
                    className="btn-primary text-lg px-8 py-3 group"
                  >
                    Start My Assessment
                  </button>
                  <p className="mt-6 text-slate-400 text-sm font-medium">
                    No account required for basic results.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'questions' && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <button 
                      onClick={goBack}
                      className="flex items-center gap-2 text-slate-400 hover:text-primary-600 font-bold transition-colors mb-4 group"
                    >
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      Go Back
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-slate-900">{currentQuestion + 1}</span>
                      <span className="text-slate-300 text-2xl font-bold">/ {questions.length}</span>
                    </div>
                  </div>
                  <div className="bg-white/50 px-4 py-2 rounded-2xl border border-white shadow-sm">
                    <span className="text-xs font-black uppercase tracking-widest text-primary-600">
                      Focus: {questions[currentQuestion].category}
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  />
                </div>

                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
                    {questions[currentQuestion].text}
                  </h2>

                  <div className="grid gap-4">
                    {questions[currentQuestion].options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className={`group p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
                          answers[currentQuestion] === option.value
                            ? 'border-primary-500 bg-primary-50/50 ring-6 ring-primary-500/5'
                            : 'border-slate-50 hover:border-primary-200 hover:bg-white shadow-sm hover:shadow-lg hover:shadow-slate-200/50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          answers[currentQuestion] === option.value
                            ? 'border-primary-500 bg-primary-500 scale-110'
                            : 'border-slate-200 group-hover:border-primary-400'
                        }`}>
                          {answers[currentQuestion] === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <p className={`text-lg font-bold mb-1 ${
                            answers[currentQuestion] === option.value ? 'text-primary-900' : 'text-slate-700'
                          }`}>
                            {option.label}
                          </p>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">{option.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-10"
              >
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-primary-100 rounded-full animate-pulse"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent"
                  />
                  <Brain className="absolute inset-0 m-auto h-12 w-12 text-primary-500" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900">Generating Your Insights</h2>
                  <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
                    Our AI is analyzing your responses against clinical benchmarks to provide the most accurate assessment.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'results' && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Main Result Card */}
                <div className="glass-card overflow-hidden">
                  <div className={`relative p-10 md:p-12 text-white overflow-hidden ${
                    result.riskLevel === 'Severe' ? 'bg-gradient-to-br from-danger-500 to-danger-600' : 
                    result.riskLevel === 'Moderate' ? 'bg-gradient-to-br from-warning-500 to-warning-600' : 'bg-gradient-to-br from-primary-500 to-primary-600'
                  }`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-widest">Assessment Complete</span>
                          </div>
                          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                            {result.riskLevel} Risk
                          </h1>
                          <p className="text-lg opacity-90 leading-relaxed max-w-lg">
                            {result.riskLevel === 'Severe' ? 'Immediate professional attention recommended' :
                             result.riskLevel === 'Moderate' ? 'Proactive care would be beneficial' :
                             'Continue maintaining healthy habits'}
                          </p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center min-w-[180px]">
                          <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Score</div>
                          <div className="text-5xl font-black mb-1">{result.score}</div>
                          <div className="text-xs font-bold opacity-40">out of 48</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-10 md:p-12 space-y-12">
                    {/* AI Insights Section */}
                    <section>
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary-50 p-3 rounded-2xl">
                            <Sparkles className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-slate-900">Your AI Insights</h2>
                            <p className="text-sm text-slate-500 mt-1">Personalized recommendations based on your responses</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        {result.recommendations.map((rec, i) => (
                          <div key={i} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                                <CheckCircle className="h-4 w-4 text-primary-600" />
                              </div>
                              <p className="text-slate-700 font-medium leading-relaxed">{rec}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Next Steps Section */}
                    <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-12 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
                      <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Your Next Steps</h2>
                        <p className="text-slate-300 mb-8">Recommended actions to support your mental wellness journey</p>
                        
                        <div className="space-y-4 mb-10">
                          {result.nextSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center font-black text-white text-sm flex-shrink-0">
                                {i + 1}
                              </div>
                              <p className="text-slate-200 leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link href="/booking" className="bg-white text-slate-900 hover:bg-slate-50 font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-black/10 hover:-translate-y-1 text-center">
                            Book a Consultation
                          </Link>
                          <Link href="/chatbot" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl border border-white/20 transition-all text-center">
                            Chat with AI Assistant
                          </Link>
                        </div>
                      </div>
                    </section>

                    {/* Return Home */}
                    <div className="text-center pt-4">
                      <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary-600 font-medium transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Return to Home
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

const calculateResult = (answers: number[]): ScreeningResult => {
  const score = answers.reduce((a, b) => a + b, 0)
  
  if (score >= 36 || answers[7] >= 2) {
    return {
      riskLevel: 'Severe',
      score,
      recommendations: [
        "Immediate professional intervention is highly recommended.",
        "Establishing a crisis safety plan with a trusted person.",
        "Reducing immediate life stressors where possible.",
        "Focusing on high-frequency clinical support."
      ],
      nextSteps: [
        "Call or Text 988 (National Crisis Lifeline) for immediate support.",
        "Book an emergency consultation with a clinical specialist.",
        "Reach out to a trusted family member or friend today."
      ],
      clinicalNotes: "Assessment indicates significant symptoms requiring professional attention."
    }
  }

  if (score >= 20) {
    return {
      riskLevel: 'Moderate',
      score,
      recommendations: [
        "Consistent therapy sessions would be beneficial.",
        "Implement daily mindfulness and grounding exercises.",
        "Establish a regular sleep and activity routine.",
        "Engage in supportive social environments."
      ],
      nextSteps: [
        "Schedule a session with one of our counselors.",
        "Start a daily mood and reflection journal.",
        "Explore our guided breathing resources."
      ],
      clinicalNotes: "Symptoms are present and impacting daily life; proactive care is advised."
    }
  }

  return {
    riskLevel: 'Mild',
    score,
    recommendations: [
      "Maintain your positive wellness habits.",
      "Explore preventive mental health resources.",
      "Practice daily gratitude and self-care.",
      "Stay active and socially connected."
    ],
    nextSteps: [
      "Check out our self-help resource library.",
      "Try a session with our AI mental health companion.",
      "Set up a monthly wellness check-in."
    ],
    clinicalNotes: "Overall scores are within a healthy range; continue prioritizing self-care."
  }
}
