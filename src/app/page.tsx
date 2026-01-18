import Hero from '@/components/sections/Hero'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import CompanyLogos from '@/components/sections/CompanyLogos'
import CaseStudies from '@/components/sections/CaseStudies'
import Solutions from '@/components/sections/Solutions'
import Testimonials from '@/components/sections/Testimonials'
import LatestActivities from '@/components/sections/LatestActivities'
import BookConsultation from '@/components/sections/BookConsultation'
import BlogsSection from '@/components/sections/BlogsSection'
import SelectedShots from '@/components/sections/SelectedShots'
import ContactCTA from '@/components/sections/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <CompanyLogos />
      <CaseStudies />
      <Solutions />
      <Testimonials />
      <LatestActivities />
      <BookConsultation />
      <BlogsSection />
      <SelectedShots />
      <ContactCTA />
    </>
  )
}
