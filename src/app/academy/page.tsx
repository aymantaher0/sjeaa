import { Metadata } from 'next'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import BookConsultation from '@/components/sections/BookConsultation'
import BlogsSection from '@/components/sections/BlogsSection'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Programs & Courses - Ayman Taher',
  description: 'Explore UX/UI design courses and programs',
}

const courses = [
  {
    id: 1,
    category: 'UX DESIGN',
    title: 'UX/UI Design Master Course',
    level: 'Beginner',
    duration: '20 session',
  },
  {
    id: 2,
    category: 'UX DESIGN',
    title: 'UX Design Foundation',
    level: 'Beginner',
    duration: '15 Hours',
  },
  {
    id: 3,
    category: 'UX DESIGN',
    title: 'UX/UI Design Master Course',
    level: 'Beginner',
    duration: '20 session',
  },
  {
    id: 4,
    category: 'UX DESIGN',
    title: 'UX Design Foundation',
    level: 'Beginner',
    duration: '15 Hours',
  },
]

export default function AcademyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Programs & Course
            </h1>
            <p className="text-gray-text max-w-2xl mx-auto">
              I offer a complete education system for designers centered around two main products: Course
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {courses.map((course) => (
              <Card key={course.id} padding="none" hover className="overflow-hidden">
                {/* Course Image */}
                <div className="relative h-64 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder for course illustration */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg" />
                      <div className="w-16 h-16 bg-primary/30 rounded-lg" />
                      <div className="w-16 h-16 bg-primary/30 rounded-lg" />
                      <div className="w-16 h-16 bg-primary/20 rounded-lg" />
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <Badge variant="primary" className="mb-3">
                    {course.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-text">
                    <span>• {course.level}</span>
                    <span>• {course.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book Consultation */}
      <BookConsultation />

      {/* Blogs & Podcast */}
      <BlogsSection />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  )
}
