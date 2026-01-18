import React from 'react'
import SectionContainer from '../ui/SectionContainer'
import Button from '../ui/Button'
import { HiDownload } from 'react-icons/hi'

const About = () => {
  const stats = [
    { value: '+10k', label: 'Followers' },
    { value: '+10k', label: 'Subscribers' },
    { value: '+10k', label: 'Clients' },
    { value: '+10k', label: 'Projects' },
  ]

  const companies = [
    { name: 'Jira', logo: 'jira' },
    { name: 'Intel', logo: 'intel' },
    { name: 'Google', logo: 'google' },
    { name: 'HubSpot', logo: 'hubspot' },
    { name: 'Salesforce', logo: 'salesforce' },
    { name: 'Stripe', logo: 'stripe' },
  ]

  return (
    <SectionContainer id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Profile Image */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Placeholder for profile image */}
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-dark-400 rounded-3xl flex items-center justify-center">
              <div className="w-full h-full bg-dark-400 rounded-3xl border-2 border-primary/20 flex items-center justify-center">
                <svg
                  className="w-1/2 h-1/2 text-primary/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        </div>

        {/* About Content */}
        <div className="space-y-6">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              Turning Ideas Into{' '}
              <span className="gradient-text">Reality</span>
            </h2>
          </div>

          <div className="space-y-4 text-neutral-400 leading-relaxed">
            <p>
              Hello, I'm a Product Designer and Full-Stack Developer with a
              passion for creating exceptional digital experiences. With over
              10 years of experience, I've helped numerous businesses transform
              their ideas into successful products.
            </p>
            <p>
              My expertise spans across UX/UI design, front-end development,
              and product strategy. I believe in the power of combining
              beautiful design with robust functionality to create products
              that users love.
            </p>
          </div>

          <div className="pt-4">
            <Button variant="primary" size="lg">
              <HiDownload className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Company Logos */}
          <div className="pt-8">
            <p className="text-sm text-neutral-500 mb-6 uppercase tracking-wider">
              Trusted by leading companies
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                >
                  {/* Company logo placeholder - replace with actual logos */}
                  <div className="w-full h-12 bg-dark-300 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-neutral-400 font-semibold">
                      {company.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default About
