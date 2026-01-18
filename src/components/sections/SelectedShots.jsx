import React from 'react'
import SectionContainer from '../ui/SectionContainer'

const SelectedShots = () => {
  const shots = [
    {
      id: 1,
      title: 'Mobile App Design',
      category: 'UI/UX Design',
    },
    {
      id: 2,
      title: 'Dashboard Interface',
      category: 'Web Design',
    },
  ]

  return (
    <SectionContainer id="shots">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          Some Selected <span className="gradient-text">Shots</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          A curated collection of my recent design work showcasing mobile and
          web interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {shots.map((shot) => (
          <div
            key={shot.id}
            className="group relative"
          >
            {/* Phone Mockup */}
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative mx-auto max-w-sm">
                {/* Phone bezel */}
                <div className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-[3rem] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-neutral-900 rounded-b-3xl z-10"></div>

                  {/* Screen */}
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                    {/* Screen Content Placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                      {/* Mock UI Elements */}
                      <div className="p-6 space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pt-8">
                          <div className="w-8 h-8 bg-neutral-300 rounded-lg"></div>
                          <div className="w-24 h-8 bg-neutral-300 rounded-full"></div>
                          <div className="w-8 h-8 bg-neutral-300 rounded-lg"></div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 pt-4">
                          <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
                          <div className="h-4 bg-neutral-300 rounded w-1/2"></div>
                        </div>

                        {/* Cards */}
                        <div className="space-y-3 pt-4">
                          <div className="h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl border-2 border-primary/20"></div>
                          <div className="h-32 bg-gradient-to-br from-blue-500/30 to-blue-500/10 rounded-2xl border-2 border-blue-500/20"></div>
                          <div className="h-32 bg-gradient-to-br from-purple-500/30 to-purple-500/10 rounded-2xl border-2 border-purple-500/20"></div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300"></div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 blur-3xl transition-all duration-300 -z-10"></div>
              </div>

              {/* Info Badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="glass px-6 py-3 rounded-full">
                  <div className="text-white font-semibold text-sm">
                    {shot.title}
                  </div>
                  <div className="text-primary text-xs">{shot.category}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-16">
        <a
          href="#"
          className="inline-flex items-center text-primary hover:text-primary-400 font-semibold text-lg group"
        >
          <span>View Full Portfolio</span>
          <svg
            className="w-6 h-6 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </SectionContainer>
  )
}

export default SelectedShots
