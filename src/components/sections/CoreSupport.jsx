import React from 'react'
import SectionContainer from '../ui/SectionContainer'
import Card from '../ui/Card'
import {
  HiSupport,
  HiLightningBolt,
  HiShieldCheck,
  HiClock,
} from 'react-icons/hi'

const CoreSupport = () => {
  const supportFeatures = [
    {
      id: 1,
      icon: HiSupport,
      title: '24/7 Support',
      description:
        'Round-the-clock assistance to ensure your projects run smoothly without interruption.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      icon: HiLightningBolt,
      title: 'Fast Delivery',
      description:
        'Quick turnaround times without compromising on quality or attention to detail.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 3,
      icon: HiShieldCheck,
      title: 'Quality Assurance',
      description:
        'Rigorous testing and quality checks to ensure every deliverable meets the highest standards.',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 4,
      icon: HiClock,
      title: 'On-Time Delivery',
      description:
        'Committed to meeting deadlines and keeping your projects on schedule.',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <SectionContainer id="support">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Why Choose Me
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          Core Support <span className="gradient-text">Stories</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Dedicated to providing exceptional service and support throughout your
          project journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportFeatures.map((feature) => (
          <Card
            key={feature.id}
            hover
            className="text-center group"
          >
            {/* Icon */}
            <div className="mb-6">
              <div className="relative inline-block">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mx-auto`}
                >
                  <div className="w-full h-full bg-dark-400 rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="mt-16">
        <Card className="text-center bg-gradient-to-br from-primary/10 to-dark-400 border-2 border-primary/20">
          <div className="max-w-3xl mx-auto py-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-neutral-300 mb-8">
              Let's collaborate to bring your vision to life with exceptional
              design and development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary">Get Started Today</button>
              <button className="btn-outline">Schedule a Call</button>
            </div>
          </div>
        </Card>
      </div>
    </SectionContainer>
  )
}

export default CoreSupport
