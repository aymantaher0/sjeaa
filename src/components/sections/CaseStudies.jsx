import React from 'react'
import SectionContainer from '../ui/SectionContainer'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { HiDownload, HiArrowRight } from 'react-icons/hi'

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      category: 'Protecution',
      title: 'To Rocket Your Application',
      description:
        'A comprehensive guide to scaling your mobile application with modern architecture patterns and best practices for performance optimization.',
      image: 'case-study-1',
    },
    {
      id: 2,
      category: 'Protecution',
      title: 'To Rocket Your Application',
      description:
        'Discover how to implement cutting-edge UI/UX principles that engage users and drive conversion rates through intuitive design patterns.',
      image: 'case-study-2',
    },
    {
      id: 3,
      category: 'Protecution',
      title: 'To Rocket Your Application',
      description:
        'Learn the secrets to building scalable cloud infrastructure that can handle millions of users while maintaining optimal performance.',
      image: 'case-study-3',
    },
  ]

  return (
    <SectionContainer id="work" className="bg-dark-500">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Latest <span className="gradient-text">Case Studies</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Explore my recent projects and see how I've helped businesses achieve
          their goals through innovative solutions.
        </p>
      </div>

      <div className="space-y-8">
        {caseStudies.map((study, index) => (
          <Card
            key={study.id}
            hover
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="space-y-6 order-2 lg:order-1">
                <div className="flex items-center space-x-3">
                  <Badge variant="primary">{study.category}</Badge>
                  <span className="text-sm text-neutral-500">
                    Case Study #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {study.title}
                </h3>

                <p className="text-neutral-400 leading-relaxed">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">
                    <HiDownload className="w-5 h-5 mr-2" />
                    Download Now
                  </Button>
                  <Button variant="outline">
                    View Details
                    <HiArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2">
                <div className="relative group">
                  {/* Image placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-dark-300 to-dark-500 rounded-xl overflow-hidden border border-dark-300">
                    <div className="w-full h-full flex items-center justify-center">
                      {/* Mock device/application image */}
                      <div className="relative w-3/4 h-3/4">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg"></div>
                        <svg
                          className="absolute inset-0 w-full h-full text-primary/20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          View All Case Studies
          <HiArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </SectionContainer>
  )
}

export default CaseStudies
