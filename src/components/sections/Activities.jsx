import React from 'react'
import SectionContainer from '../ui/SectionContainer'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { HiCalendar, HiLocationMarker } from 'react-icons/hi'

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: 'Summit & Event & UX Talk',
      date: 'December 15, 2025',
      location: 'San Francisco, CA',
      category: 'Speaking',
      image: 'activity-1',
      description:
        'Keynote presentation on the future of UX design and emerging trends in user experience.',
    },
    {
      id: 2,
      title: 'Summit & Event & UX Talk',
      date: 'November 28, 2025',
      location: 'New York, NY',
      category: 'Workshop',
      image: 'activity-2',
      description:
        'Interactive workshop on building scalable design systems for modern applications.',
    },
  ]

  return (
    <SectionContainer id="activities">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Activities
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          Latest <span className="gradient-text">Activities</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Stay updated with my recent talks, workshops, and events where I
          share insights and knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            hover
            className="overflow-hidden group"
          >
            {/* Image */}
            <div className="relative aspect-video mb-6 -m-6 mb-6 overflow-hidden">
              {/* Placeholder image */}
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-dark-500">
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-primary/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="primary" className="backdrop-blur-sm bg-primary/90 text-dark-600">
                  {activity.category}
                </Badge>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                {activity.title}
              </h3>

              <p className="text-neutral-400 leading-relaxed">
                {activity.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-dark-300">
                <div className="flex items-center space-x-2 text-neutral-400">
                  <HiCalendar className="w-5 h-5 text-primary" />
                  <span className="text-sm">{activity.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-400">
                  <HiLocationMarker className="w-5 h-5 text-primary" />
                  <span className="text-sm">{activity.location}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionContainer>
  )
}

export default Activities
