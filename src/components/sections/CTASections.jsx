import React from 'react'
import SectionContainer from '../ui/SectionContainer'
import Card from '../ui/Card'
import Button from '../ui/Button'
import {
  HiCalendar,
  HiDocumentText,
  HiMicrophone,
  HiArrowRight,
} from 'react-icons/hi'

const CTASections = () => {
  return (
    <SectionContainer id="cta" className="bg-dark-500">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Everything You Need to{' '}
          <span className="gradient-text">Succeed</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Access exclusive resources, insights, and opportunities to grow your
          skills and business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Book A Consultation */}
        <Card
          hover
          className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-dark-400 border-2 border-primary/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <HiCalendar className="w-8 h-8 text-primary" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Book A Consultation
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Schedule a free consultation to discuss your project needs,
                  explore solutions, and get expert advice on bringing your
                  ideas to life.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Schedule Now
                  <HiArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg
                    className="w-3/4 h-3/4 text-primary/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Blogs */}
        <Card hover className="group">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <HiDocumentText className="w-8 h-8 text-blue-400" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                Blogs
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Discover insights, tutorials, and best practices on design,
                development, and product strategy from industry experience.
              </p>
            </div>

            {/* Blog Preview Images */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-gradient-to-br from-dark-300 to-dark-500 rounded-lg border border-dark-300"
                ></div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Read Articles
              <HiArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Podcast */}
        <Card hover className="group bg-gradient-to-br from-purple-500/5 to-pink-500/5">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <HiMicrophone className="w-8 h-8 text-purple-400" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                Podcast
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Listen to conversations with industry leaders, designers, and
                developers sharing their experiences and insights.
              </p>
            </div>

            {/* Podcast Cover Art */}
            <div className="relative aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl overflow-hidden border-2 border-purple-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <HiMicrophone className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-white font-bold">Tech Talks</div>
                  <div className="text-neutral-400 text-sm">
                    With Ayman Taher
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Listen Now
              <HiArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </SectionContainer>
  )
}

export default CTASections
