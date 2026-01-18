import React, { useState, useEffect } from 'react'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Ayman Taher.'
  const [showCursor, setShowCursor] = useState(true)

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-600"
    >
      {/* Gradient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-slide-up">
            {displayText}
            <span
              className={`inline-block w-2 h-12 sm:h-16 md:h-20 lg:h-24 bg-primary ml-1 align-middle transition-opacity duration-100 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ verticalAlign: 'middle' }}
            />
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-neutral-400 mb-8 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Product Designer & Developer
          </p>

          <p className="text-base sm:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 animate-slide-up animation-delay-400">
            Crafting exceptional digital experiences through innovative design
            and cutting-edge technology
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
