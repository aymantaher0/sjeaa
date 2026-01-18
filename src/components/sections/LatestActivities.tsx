import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

const activities = [
  {
    id: 1,
    image: '/images/activity-1.jpg',
    category: 'Workshop',
    title: 'Internship Summit & UX Talk',
  },
  {
    id: 2,
    image: '/images/activity-2.jpg',
    category: 'Workshop',
    title: 'Internship Summit & UX Talk',
  },
  {
    id: 3,
    image: '/images/activity-3.jpg',
    category: 'Workshop',
    title: 'Internship Summit & UX Talk',
  },
]

export default function LatestActivities() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest Activites
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} padding="none" hover className="overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Placeholder for activity image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-dark-lighter rounded-lg" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Badge variant="primary" className="mb-3">
                  {activity.category}
                </Badge>
                <h3 className="text-lg font-semibold text-white">
                  {activity.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
