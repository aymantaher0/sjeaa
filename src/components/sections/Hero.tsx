import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Menu Icon (Grid) - Top Right */}
          <div className="flex justify-end mb-8">
            <button className="w-10 h-10 grid grid-cols-3 gap-1 p-2 rounded-lg hover:bg-dark-lighter transition-colors">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
              ))}
            </button>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Ayman Taher<span className="text-primary">.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-text mb-12 max-w-3xl mx-auto">
            Product Design Lead & Education Consultant
          </p>
        </div>
      </div>
    </section>
  )
}
