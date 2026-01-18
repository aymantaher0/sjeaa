import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import CaseStudies from './components/sections/CaseStudies'
import Solutions from './components/sections/Solutions'
import Testimonials from './components/sections/Testimonials'
import Activities from './components/sections/Activities'
import CTASections from './components/sections/CTASections'
import SelectedShots from './components/sections/SelectedShots'
import CoreSupport from './components/sections/CoreSupport'

function App() {
  return (
    <div className="min-h-screen bg-dark-600">
      <Header />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <Solutions />
        <Testimonials />
        <Activities />
        <CTASections />
        <SelectedShots />
        <CoreSupport />
      </main>
      <Footer />
    </div>
  )
}

export default App
