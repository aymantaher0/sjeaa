import Card from '@/components/ui/Card'

const shots = [
  { id: 1 },
  { id: 2 },
]

export default function SelectedShots() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Some Selected Shots
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shots.map((shot) => (
            <Card key={shot.id} padding="none" className="overflow-hidden bg-white" hover>
              <div className="relative h-96 bg-gray-100">
                {/* Placeholder for shot image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-48 bg-gray-300 rounded-lg shadow-lg" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
