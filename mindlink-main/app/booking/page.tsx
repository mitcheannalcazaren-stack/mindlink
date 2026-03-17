'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  MapPin, 
  Video, 
  Phone, 
  CreditCard,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Shield,
  Heart,
  Search,
  Filter,
  Info,
  ChevronRight,
  ChevronLeft,
  Brain
} from 'lucide-react'
import Link from 'next/link'

interface Counselor {
  id: string
  name: string
  specialization: string[]
  rating: number
  experience: string
  price: number
  availability: string[]
  image: string
  bio: string
  languages: string[]
  sessionTypes: ('virtual' | 'in-person')[]
}

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: ['Depression', 'Anxiety', 'Trauma'],
    rating: 4.9,
    experience: '8 years',
    price: 120,
    availability: ['Mon', 'Wed', 'Fri'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    bio: 'Licensed clinical psychologist specializing in cognitive behavioral therapy and trauma-informed care.',
    languages: ['English', 'Spanish'],
    sessionTypes: ['virtual', 'in-person']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: ['Stress Management', 'Work-Life Balance', 'Mindfulness'],
    rating: 4.8,
    experience: '12 years',
    price: 140,
    availability: ['Tue', 'Thu', 'Sat'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced therapist focusing on stress management and helping clients achieve work-life balance.',
    languages: ['English', 'Mandarin'],
    sessionTypes: ['virtual']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: ['Family Therapy', 'Relationship Issues', 'Grief'],
    rating: 4.7,
    experience: '6 years',
    price: 110,
    availability: ['Mon', 'Tue', 'Wed', 'Thu'],
    image: 'https://images.unsplash.com/photo-1594824475545-9d0c7c4951c5?w=150&h=150&fit=crop&crop=face',
    bio: 'Family therapist with expertise in relationship counseling and grief support.',
    languages: ['English', 'Spanish'],
    sessionTypes: ['virtual', 'in-person']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: ['Addiction Recovery', 'PTSD', 'Men\'s Mental Health'],
    rating: 4.9,
    experience: '15 years',
    price: 150,
    availability: ['Wed', 'Thu', 'Fri', 'Sat'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Specialist in addiction recovery and trauma therapy with extensive experience in men\'s mental health.',
    languages: ['English'],
    sessionTypes: ['virtual', 'in-person']
  }
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function BookingPage() {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [sessionType, setSessionType] = useState<'virtual' | 'in-person'>('virtual')
  const [currentStep, setCurrentStep] = useState(1)
  const [isBooking, setIsBooking] = useState(false)

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor)
    setCurrentStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setCurrentStep(3)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setCurrentStep(4)
  }

  const handleBooking = () => {
    setIsBooking(true)
    setTimeout(() => {
      setIsBooking(false)
      setCurrentStep(5)
    }, 2500)
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
      if (selectedCounselor?.availability.includes(dayName)) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
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
          
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                  currentStep === step ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20 scale-110' : 
                  currentStep > step ? 'bg-success-100 text-success-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-4 h-[2px] mx-1 rounded-full ${
                    currentStep > step ? 'bg-success-200' : 'bg-slate-100'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center max-w-3xl mx-auto space-y-6">
                  <h1 className="text-5xl font-black text-slate-900 tracking-tight">Find your <span className="text-primary-500 italic">ideal partner</span> for growth</h1>
                  <p className="text-xl text-slate-500 leading-relaxed">
                    Every journey is unique. Select a licensed professional who specializes in your areas of concern.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex-1 w-full relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search by name or specialization..."
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-16 pr-6 focus:ring-4 focus:ring-primary-500/10 text-slate-700 font-medium"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors">
                    <Filter className="h-5 w-5" />
                    Filters
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {counselors.map((counselor) => (
                    <div
                      key={counselor.id}
                      onClick={() => handleCounselorSelect(counselor)}
                      className="glass-card group p-8 flex flex-col sm:flex-row gap-8 hover:-translate-y-2 cursor-pointer transition-all duration-500"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={counselor.image}
                          alt={counselor.name}
                          className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute -bottom-3 -right-3 bg-white px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 border border-slate-50">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-black text-slate-800">{counselor.rating}</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{counselor.name}</h3>
                            <p className="text-primary-500 font-black text-xs uppercase tracking-widest">{counselor.experience} Experience</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-slate-900">${counselor.price}</span>
                            <span className="text-[10px] font-black text-slate-400 block uppercase">per hour</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {counselor.specialization.map((spec) => (
                            <span key={spec} className="text-[10px] font-black uppercase tracking-widest bg-primary-50 text-primary-600 px-3 py-1 rounded-full border border-primary-100">
                              {spec}
                            </span>
                          ))}
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                          {counselor.bio}
                        </p>

                        <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                          <div className="flex items-center gap-4">
                            {counselor.sessionTypes.includes('virtual') && (
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Video className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">Virtual</span>
                              </div>
                            )}
                            {counselor.sessionTypes.includes('in-person') && (
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <MapPin className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">In-Person</span>
                              </div>
                            )}
                          </div>
                          <button className="text-sm font-black text-primary-600 flex items-center gap-2 uppercase tracking-widest group/btn">
                            Book Now <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {(currentStep === 2 || currentStep === 3 || currentStep === 4) && selectedCounselor && (
              <motion.div
                key="booking-flow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid lg:grid-cols-12 gap-10"
              >
                <div className="lg:col-span-8 space-y-8">
                  <div className="glass-card p-10 md:p-14">
                    {currentStep === 2 && (
                      <div className="space-y-12">
                        <div className="flex items-center justify-between">
                          <h2 className="text-3xl font-black text-slate-900">Select Date</h2>
                          <div className="flex gap-2">
                            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                          {getAvailableDates().map((date) => {
                            const dateObj = new Date(date)
                            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                            const dayNumber = dateObj.getDate()
                            const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' })
                            
                            return (
                              <button
                                key={date}
                                onClick={() => handleDateSelect(date)}
                                className={`group p-6 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-1 ${
                                  selectedDate === date 
                                    ? 'border-primary-500 bg-primary-500 text-white shadow-2xl shadow-primary-500/30' 
                                    : 'border-slate-50 hover:border-primary-200 hover:bg-white'
                                }`}
                              >
                                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedDate === date ? 'text-white/60' : 'text-slate-400'}`}>{dayName}</span>
                                <span className={`text-2xl font-black ${selectedDate === date ? 'text-white' : 'text-slate-900'}`}>{dayNumber}</span>
                                <span className={`text-[10px] font-bold ${selectedDate === date ? 'text-white/60' : 'text-slate-400'}`}>{monthName}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-12">
                        <h2 className="text-3xl font-black text-slate-900">Choose a Time</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={`group p-6 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-2 ${
                                selectedTime === time 
                                  ? 'border-primary-500 bg-primary-500 text-white shadow-2xl shadow-primary-500/30' 
                                  : 'border-slate-50 hover:border-primary-200 hover:bg-white'
                              }`}
                            >
                              <Clock className={`h-5 w-5 ${selectedTime === time ? 'text-white' : 'text-slate-300'}`} />
                              <span className={`text-lg font-black ${selectedTime === time ? 'text-white' : 'text-slate-700'}`}>{time}</span>
                            </button>
                          ))}
                        </div>
                        <button 
                          onClick={() => setCurrentStep(2)}
                          className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary-600 transition-colors group"
                        >
                          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                          Pick a different date
                        </button>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-12">
                        <h2 className="text-3xl font-black text-slate-900">Final Details</h2>
                        
                        <div className="space-y-10">
                          <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Preferred Format</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <button 
                                onClick={() => setSessionType('virtual')}
                                className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                                  sessionType === 'virtual' ? 'border-primary-500 bg-primary-50 ring-8 ring-primary-500/5' : 'border-slate-50 hover:bg-white'
                                }`}
                              >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sessionType === 'virtual' ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                  <Video className="h-6 w-6" />
                                </div>
                                <span className={`font-black uppercase tracking-widest text-xs ${sessionType === 'virtual' ? 'text-primary-700' : 'text-slate-500'}`}>Virtual Session</span>
                              </button>
                              <button 
                                onClick={() => setSessionType('in-person')}
                                className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                                  sessionType === 'in-person' ? 'border-primary-500 bg-primary-50 ring-8 ring-primary-500/5' : 'border-slate-50 hover:bg-white'
                                }`}
                              >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sessionType === 'in-person' ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                  <MapPin className="h-6 w-6" />
                                </div>
                                <span className={`font-black uppercase tracking-widest text-xs ${sessionType === 'in-person' ? 'text-primary-700' : 'text-slate-500'}`}>In-Person Session</span>
                              </button>
                            </div>
                          </section>

                          <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl"></div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Secure Payment</h3>
                            <div className="space-y-6">
                              <div className="flex justify-between items-center text-slate-400">
                                <span className="font-bold">Session Fee</span>
                                <span className="font-black text-white text-xl">${selectedCounselor.price}</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-400">
                                <span className="font-bold">Platform Insurance</span>
                                <span className="font-black text-white text-xl">$5</span>
                              </div>
                              <div className="h-[1px] bg-white/10 w-full"></div>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black uppercase tracking-widest">Total</span>
                                <span className="text-4xl font-black text-primary-400">${selectedCounselor.price + 5}</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={handleBooking}
                              disabled={isBooking}
                              className="w-full mt-10 btn-primary py-6 text-xl flex items-center justify-center gap-4 shadow-2xl shadow-primary-500/30"
                            >
                              {isBooking ? (
                                <>
                                  <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
                                  <span className="font-black">Securing Session...</span>
                                </>
                              ) : (
                                <>
                                  <CreditCard className="h-6 w-6" />
                                  <span className="font-black uppercase tracking-widest">Confirm & Pay</span>
                                </>
                              )}
                            </button>
                          </section>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="glass-card p-10 sticky top-32">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Selected Counselor</h3>
                    <div className="space-y-8">
                      <div className="flex gap-5">
                        <img
                          src={selectedCounselor.image}
                          alt={selectedCounselor.name}
                          className="w-20 h-20 rounded-3xl object-cover shadow-xl"
                        />
                        <div>
                          <p className="text-xl font-black text-slate-900">{selectedCounselor.name}</p>
                          <p className="text-primary-500 font-bold text-sm">{selectedCounselor.specialization[0]}</p>
                        </div>
                      </div>

                      <div className="space-y-6 pt-8 border-t border-slate-50">
                        {selectedDate && (
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-5 w-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scheduled Date</p>
                              <p className="font-bold text-slate-700">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                            </div>
                          </div>
                        )}
                        {selectedTime && (
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Clock className="h-5 w-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Session Time</p>
                              <p className="font-bold text-slate-700">{selectedTime}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100 flex items-start gap-4">
                        <Info className="h-5 w-5 text-primary-500 mt-0.5" />
                        <p className="text-xs text-primary-700 font-medium leading-relaxed">
                          Your first session includes a comprehensive mental health screening report analysis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && selectedCounselor && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto text-center space-y-12"
              >
                <div className="glass-card p-16 space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-success-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="w-24 h-24 bg-success-100 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-success-500/20">
                    <CheckCircle className="h-12 w-12 text-success-600" />
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">Booking Confirmed</h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-lg mx-auto">
                      Your journey to wellness has begun. A confirmation with session details has been sent to your email.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 text-left space-y-6">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Counselor</p>
                        <p className="text-lg font-bold text-slate-900">{selectedCounselor.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Format</p>
                        <p className="text-lg font-bold text-slate-900">{sessionType === 'virtual' ? 'Virtual Video' : 'In-Person Session'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Date</p>
                        <p className="text-lg font-bold text-slate-900">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Time</p>
                        <p className="text-lg font-bold text-slate-900">{selectedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 pt-6">
                    <Link href="/dashboard/patient" className="btn-primary flex-1 py-5 text-lg justify-center">
                      Go to My Dashboard
                    </Link>
                    <Link href="/" className="bg-white border-2 border-slate-100 hover:border-primary-200 text-slate-600 font-bold flex-1 py-5 rounded-2xl transition-all text-center">
                      Back to Home
                    </Link>
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
