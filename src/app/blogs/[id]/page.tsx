import { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'The Psychology Behind UX Design - Ayman Taher',
  description: 'Exploring the psychological principles that make great UX design',
}

const relatedBlogs = [
  { id: 2, title: 'Creative landing page' },
  { id: 3, title: 'Creative landing page' },
]

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-text mb-6">
            <span>UX Design</span>
            <span>•</span>
            <span>15 Jan 2024</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            The Psychology Behind UX Design
          </h1>

          {/* Share Button */}
          <div className="flex justify-end">
            <button className="p-2 rounded-lg bg-dark-card hover:bg-dark-lighter transition-colors">
              <svg
                className="w-5 h-5 text-gray-text"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12 bg-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-card overflow-hidden">
            {/* Placeholder for blog featured image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-dark-lighter rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 bg-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Section 1 */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Team Identifiers, Benefits, and How to Build One that Works
            </h2>
            <p className="text-gray-text leading-relaxed mb-6">
              Bring to the table win-win survival strategies to ensure proactive domination at the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content in real time will have multiple touchpoints for offshoring.
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-12">
              The Work & Life Style For All
            </h2>
            <p className="text-gray-text leading-relaxed mb-6">
              Bring to the table win-win survival strategies to ensure proactive domination at the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content.
            </p>

            <p className="text-gray-text leading-relaxed mb-6">
              Bring to the table win-win survival strategies to ensure proactive domination at the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content in real time will have multiple touchpoints for offshoring.
            </p>

            <p className="text-gray-text leading-relaxed mb-6">
              Bring to the table win-win survival strategies to ensure proactive domination at the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content in real time will have multiple touchpoints for offshoring.
            </p>

            {/* List */}
            <ul className="space-y-3 mb-12">
              <li className="text-gray-text leading-relaxed">
                • Dynamically target high-payoff intellectual capital for customized
              </li>
              <li className="text-gray-text leading-relaxed">
                • Interactively procrastinate high-payoff content
              </li>
              <li className="text-gray-text leading-relaxed">
                • Credibly reinter mediate backend ideas for cross-platform models
              </li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-12">
              The Work & Life Style For All
            </h2>
            <p className="text-gray-text leading-relaxed mb-6">
              Bring to the table win-win survival strategies to ensure proactive domination at the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content.
            </p>

            <p className="text-gray-text leading-relaxed mb-6">
              Bring to the table win-win survival strategies to ensure proactive domination at the end of the day, going forward a new normal that has evolved from generation on the runway heading towards a streamlined cloud solution user generated content.
            </p>

            {/* Ordered List */}
            <ol className="space-y-3 mb-12 list-decimal list-inside">
              <li className="text-gray-text leading-relaxed">
                It brings the right people together with all the right information and tools to get work done
              </li>
              <li className="text-gray-text leading-relaxed">
                We provide operational efficiency, data security, and flexible scale
              </li>
              <li className="text-gray-text leading-relaxed">
                Your best work, together in one package that works seamlessly from your computer
              </li>
            </ol>
          </div>
        </div>
      </article>

      {/* Recommended Blogs */}
      <section className="py-16 bg-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Recommended Blogs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBlogs.map((blog) => (
              <Card key={blog.id} padding="none" hover className="overflow-hidden">
                {/* Blog Image */}
                <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-32 bg-amber-200 rounded-t-lg border-4 border-amber-300" />
                  </div>
                </div>

                {/* Blog Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {blog.title}
                  </h3>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-primary text-sm hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                  >
                    Read more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </>
  )
}
