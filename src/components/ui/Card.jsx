import React from 'react'

/**
 * Reusable Card Component
 * @param {ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Enable hover effect
 * @param {function} onClick - Click handler
 */
const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'card-base'
  const hoverStyles = hover ? 'card-hover cursor-pointer' : ''

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
