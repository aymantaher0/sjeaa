import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function BookConsultation() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to succeed
          </h2>
        </div>

        <Card className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Book A consultation
              </h3>
              <p className="text-gray-text mb-6 leading-relaxed">
                Through systematized, proven methodologies, I guide my clients to develop career growth, financial stability, and personal confidence through result-driven coaching programmes designed to tackle the unique challenges of the MENA region.
              </p>
              <Button variant="primary" size="lg">
                Talk with me
              </Button>
            </div>

            {/* Visual Elements */}
            <div className="relative h-64 lg:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Placeholder for consultation visual */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-32 h-32 bg-dark-lighter rounded-lg" />
                  <div className="w-32 h-32 bg-primary/10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
