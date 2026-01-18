import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function ContactCTA() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-dark-card to-dark-lighter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Let's start something new together
              </h2>
              <p className="text-gray-text mb-8 leading-relaxed">
                Say hi to me or do you want to get started with your project and you need my help? Feel free to contact me.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Talk with me
                </Button>
                <Button variant="outline" size="lg">
                  Book Appointment
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <Card className="bg-dark">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-text mb-1">CHAT WITH ME</p>
                    <p className="text-white font-medium">kevin.gilbert.com</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-dark">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-text mb-1">CALL ME</p>
                    <p className="text-white font-medium">+1-202-555-0190</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
