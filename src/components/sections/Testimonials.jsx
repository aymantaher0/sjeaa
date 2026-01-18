import React, { useState } from 'react'
import SectionContainer from '../ui/SectionContainer'
import Card from '../ui/Card'
import { HiStar } from 'react-icons/hi'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      avatar: 'avatar-1',
      rating: 5,
      text: "Working with Ayman was an absolute pleasure. His attention to detail and ability to understand our vision transformed our product completely. The results exceeded our expectations!",
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager, StartupXYZ',
      avatar: 'avatar-2',
      rating: 5,
      text: "Ayman's expertise in both design and development is rare. He delivered a beautiful, functional product that our users love. Highly recommend his services!",
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Founder, DesignHub',
      avatar: 'avatar-3',
      rating: 5,
      text: "The level of professionalism and quality delivered by Ayman is outstanding. He took our complex requirements and created an elegant solution that works perfectly.",
    },
    {
      id: 4,
      name: 'David Martinez',
      role: 'CTO, InnovateCo',
      avatar: 'avatar-4',
      rating: 5,
      text: "Ayman brings a unique combination of technical skills and creative thinking. Our project was completed on time, within budget, and with exceptional quality.",
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Marketing Director, BrandFlow',
      avatar: 'avatar-5',
      rating: 5,
      text: "The transformation of our digital presence has been incredible. Ayman's insights and execution were key to our success. We've seen a 300% increase in engagement!",
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'VP Engineering, CloudTech',
      avatar: 'avatar-6',
      rating: 5,
      text: "Outstanding work from start to finish. Ayman's ability to solve complex problems and deliver elegant solutions is unmatched. Will definitely work with him again!",
    },
  ]

  return (
    <SectionContainer id="testimonials" className="bg-dark-500">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          My Clients <span className="gradient-text">Feedback</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Don't just take my word for it. Here's what my clients have to say
          about working with me.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.id}
            hover
            className={`transition-all duration-300 ${
              index === activeIndex ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-neutral-300 leading-relaxed mb-6 line-clamp-4">
              "{testimonial.text}"
            </p>

            {/* Client Info */}
            <div className="flex items-center space-x-4 pt-4 border-t border-dark-300">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                {testimonial.name.charAt(0)}
              </div>

              {/* Name & Role */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold truncate">
                  {testimonial.name}
                </h4>
                <p className="text-neutral-400 text-sm truncate">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center space-x-3">
        {[0, 1].map((dot) => (
          <button
            key={dot}
            onClick={() => setActiveIndex(dot * 3)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              Math.floor(activeIndex / 3) === dot
                ? 'bg-primary w-8'
                : 'bg-dark-300 hover:bg-dark-200'
            }`}
            aria-label={`Go to testimonial group ${dot + 1}`}
          />
        ))}
      </div>
    </SectionContainer>
  )
}

export default Testimonials
