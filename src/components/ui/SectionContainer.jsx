import React from 'react'

/**
 * Reusable Section Container Component
 * @param {ReactNode} children - Section content
 * @param {string} id - Section ID for navigation
 * @param {string} className - Additional CSS classes
 * @param {boolean} noPadding - Remove default padding
 */
const SectionContainer = ({
  children,
  id,
  className = '',
  noPadding = false,
}) => {
  const paddingStyles = noPadding ? '' : 'section-spacing'

  return (
    <section
      id={id}
      className={`${paddingStyles} ${className}`}
    >
      <div className="container-custom">
        {children}
      </div>
    </section>
  )
}

export default SectionContainer
