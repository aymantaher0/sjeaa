import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Ayman Taher - Product Design Lead & Education Consultant',
  description: 'Product Design Lead and Education Consultant specializing in UX/UI design, creating exceptional user experiences for web and mobile platforms.',
  keywords: ['UX Design', 'UI Design', 'Product Design', 'Education Consultant', 'Ayman Taher'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
