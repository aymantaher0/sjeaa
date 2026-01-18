import Image from 'next/image'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-text">
            I offer a complete education system for designers centered around two main products: Course
          </p>
        </div>

        <Card className="overflow-hidden" padding="none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-80 lg:h-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-dark-lighter rounded-full" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                About Me
              </h3>

              <div className="space-y-4 mb-8">
                <p className="text-gray-text leading-relaxed">
                  Create an <span className="text-primary">Innovative User Experience</span> for your users on the web and mobile platforms.
                </p>

                <p className="text-gray-text leading-relaxed">
                  Ayman Taher, the Product Design Lead at Aman E-Payment, is the founder and CEO of Syntax, a Creative Education Company in the MENA region based in Egypt.
                </p>

                <p className="text-gray-text leading-relaxed">
                  Ayman Taher, the Product Design Lead at Aman E-Payment, is the founder and CEO of Syntax, a Creative Education Company in the MENA region based in Egypt.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary">
                  Download Resume
                </Button>
                <Button variant="outline">
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
