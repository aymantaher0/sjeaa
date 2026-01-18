import { Metadata } from 'next'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import LatestActivities from '@/components/sections/LatestActivities'
import BookConsultation from '@/components/sections/BookConsultation'
import BlogsSection from '@/components/sections/BlogsSection'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'About Me - Ayman Taher',
  description: 'Learn more about Ayman Taher, Product Design Lead and Education Consultant',
}

const companies = [
  'Syntax',
  'ITI',
  'Digital Egypt',
  'udemy',
  'e.youth',
  'Sanaam',
  'Almentor',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Me
            </h1>
            <p className="text-gray-text max-w-2xl mx-auto">
              I offer a complete education system for designers centered around two main products: Course
            </p>
          </div>

          <Card className="overflow-hidden" padding="none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                {/* Placeholder for profile image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-dark-lighter rounded-full" />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  About Me
                </h2>

                <div className="space-y-4 mb-8">
                  <p className="text-gray-text leading-relaxed">
                    Create an <span className="text-primary font-semibold">Innovative User Experience</span> for your users on the web and mobile platforms.
                  </p>

                  <p className="text-gray-text leading-relaxed">
                    Ayman Taher, the Product Design Lead at Aman E-Payment, is the founder and CEO of Syntax, a Creative Education Company in the MENA region based in Egypt.
                  </p>

                  <p className="text-gray-text leading-relaxed">
                    Ayman Taher, the Product Design Lead at Aman E-Payment, is the founder and CEO of Syntax, a Creative Education Company in the MENA region based in Egypt.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">
                    Download Resume
                  </Button>
                  <Button variant="outline">
                    Contact Me
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '+10k', label: 'Unique templates' },
              { value: '+10k', label: 'UI Components' },
              { value: '+10k', label: 'Unique templates' },
              { value: '+10k', label: 'Unique templates' },
            ].map((stat, index) => (
              <Card key={index} className="text-center" hover>
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-dark-lighter rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-text">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My Journey as Education Consultant
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companies.map((company, index) => (
              <Card
                key={index}
                className="flex items-center justify-center h-32 bg-white hover:bg-gray-50 transition-colors"
                hover
              >
                <span className="text-dark font-bold text-xl">
                  {company}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Activities */}
      <LatestActivities />

      {/* Book Consultation */}
      <BookConsultation />

      {/* Blogs & Podcast */}
      <BlogsSection />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  )
}
