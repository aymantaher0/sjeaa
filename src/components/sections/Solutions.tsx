import Card from '@/components/ui/Card'

const solutions = [
  {
    title: 'Search Engine Optimization',
    description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
  },
  {
    title: 'Search Engine Optimization',
    description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
  },
  {
    title: 'Search Engine Optimization',
    description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
  },
]

export default function Solutions() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-text mb-2">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Solution we provide
          </h2>
          <p className="text-gray-text max-w-2xl mx-auto">
            Bring to the table win-win survival strategies to ensure proactive domination at the end of the day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <Card key={index} hover>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-gray-text text-sm">
                    {solution.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
