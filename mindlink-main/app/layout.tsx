import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MindLink | Your Path to Mental Wellness',
  description: 'Experience compassionate, AI-powered mental health support. Accessible, affordable, and personalized care for everyone.',
  keywords: 'mental health, AI, counseling, therapy, screening, virtual care',
  authors: [{ name: 'MindLink Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-slate-800`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
