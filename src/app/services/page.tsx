import { Metadata } from 'next'
import Solutions from '@/components/sections/Solutions'
import CaseStudies from '@/components/sections/CaseStudies'
import Testimonials from '@/components/sections/Testimonials'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Services - Ayman Taher',
  description: 'Professional UX/UI design and education consulting services',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Services
            </h1>
            <p className="text-gray-text max-w-2xl mx-auto">
              Professional UX/UI design and education consulting services to help you create exceptional user experiences
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <Solutions />

      {/* Case Studies */}
      <CaseStudies />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  )
}
