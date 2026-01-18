import React from 'react'
import SectionContainer from '../ui/SectionContainer'
import Card from '../ui/Card'
import {
  HiSearch,
  HiLightningBolt,
  HiChartBar,
  HiCode,
  HiColorSwatch,
  HiCog,
} from 'react-icons/hi'

const Solutions = () => {
  const solutions = [
    {
      id: 1,
      icon: HiSearch,
      title: 'Search Engine Optimization',
      description:
        'Boost your online visibility and drive organic traffic with proven SEO strategies tailored to your business needs.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      icon: HiLightningBolt,
      title: 'Performance Optimization',
      description:
        'Maximize your application speed and efficiency with cutting-edge optimization techniques for better user experience.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      icon: HiChartBar,
      title: 'Analytics & Insights',
      description:
        'Make data-driven decisions with comprehensive analytics and actionable insights to grow your business.',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 4,
      icon: HiCode,
      title: 'Custom Development',
      description:
        'Transform your vision into reality with bespoke software solutions built with the latest technologies.',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 5,
      icon: HiColorSwatch,
      title: 'UI/UX Design',
      description:
        'Create stunning user interfaces and seamless experiences that delight users and drive engagement.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 6,
      icon: HiCog,
      title: 'Technical Consulting',
      description:
        'Get expert guidance on technical decisions, architecture, and best practices to ensure project success.',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <SectionContainer id="services">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Services
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          Solutions We <span className="gradient-text">Provide</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Comprehensive services designed to help your business thrive in the
          digital landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <Card
            key={solution.id}
            hover
            className="group"
          >
            {/* Icon */}
            <div className="mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} p-0.5`}
              >
                <div className="w-full h-full bg-dark-400 rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
              {solution.title}
            </h3>

            <p className="text-neutral-400 leading-relaxed mb-6">
              {solution.description}
            </p>

            {/* Learn More Link */}
            <a
              href="#"
              className="inline-flex items-center text-primary hover:text-primary-400 font-semibold group/link"
            >
              <span>Learn More</span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
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
          </Card>
        ))}
      </div>
    </SectionContainer>
  )
}

export default Solutions
