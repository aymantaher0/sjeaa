import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const caseStudies = [
  {
    id: 1,
    category: 'Telemedicine',
    title: 'To Replit Your Application',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content in real-time will have multiple touchpoints for offshoring.',
  },
  {
    id: 2,
    category: 'Telemedicine',
    title: 'To Replit Your Application',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content in real-time will have multiple touchpoints for offshoring.',
  },
  {
    id: 3,
    category: 'Telemedicine',
    title: 'To Replit Your Application',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content in real-time will have multiple touchpoints for offshoring.',
  },
]

export default function CaseStudies() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest case studies
          </h2>
        </div>

        <div className="space-y-6">
          {caseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden" padding="none" hover>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Content Section */}
                <div className="p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
                  <Badge variant="primary" className="w-fit mb-4">
                    {study.category}
                  </Badge>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {study.title}
                  </h3>

                  <p className="text-gray-text leading-relaxed mb-6">
                    {study.description}
                  </p>

                  <div>
                    <Button variant="primary">
                      Discover more
                    </Button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative h-64 lg:h-auto bg-gradient-to-br from-gray-800 to-gray-900 order-1 lg:order-2">
                  {/* Placeholder for case study image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-dark-lighter rounded-lg" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-2">
            View all projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
