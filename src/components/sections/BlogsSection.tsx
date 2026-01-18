import Link from 'next/link'
import Card from '@/components/ui/Card'

const blogs = [
  {
    id: 1,
    title: 'Creative landing page',
    excerpt: 'Read more',
  },
  {
    id: 2,
    title: 'Creative landing page',
    excerpt: 'Read more',
  },
]

export default function BlogsSection() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blogs */}
          <Card>
            <h3 className="text-2xl font-bold text-white mb-6">Blogs</h3>
            <p className="text-gray-text mb-8">
              Drive alignment and productivity with secure, shared environments for cross-functional work.
            </p>

            <div className="space-y-6">
              {blogs.map((blog) => (
                <Card key={blog.id} padding="none" className="overflow-hidden" hover>
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                    {/* Placeholder for blog image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-dark-lighter rounded-lg" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-2">{blog.title}</h4>
                    <Link href={`/blogs/${blog.id}`} className="text-primary text-sm hover:text-primary-dark transition-colors inline-flex items-center gap-1">
                      {blog.excerpt}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Podcast */}
          <Card className="bg-gradient-to-br from-dark-card to-dark-lighter">
            <h3 className="text-2xl font-bold text-white mb-6">
              Podcast - <span className="text-right" dir="rtl">حروف پادکاست</span>
            </h3>
            <p className="text-gray-text mb-8">
              Drive alignment and productivity with secure, shared environments for cross-functional work.
            </p>

            {/* Podcast Player */}
            <div className="relative">
              <div className="bg-dark rounded-card p-6">
                {/* Podcast Cover */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
                  <div>
                    <h4 className="text-white font-semibold" dir="rtl">حروف کاست</h4>
                    <p className="text-gray-text text-sm">Episode 1</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-text mb-2">
                    <span>0:00</span>
                    <span>3:45</span>
                  </div>
                  <div className="h-1 bg-dark-lighter rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary rounded-full" />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  <button className="text-gray-text hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors">
                    <svg className="w-6 h-6 text-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" />
                    </svg>
                  </button>
                  <button className="text-gray-text hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
