import React from 'react'

/**
 * Reusable Badge Component
 * @param {ReactNode} children - Badge content
 * @param {string} variant - Badge style variant (primary, secondary, success, warning, error)
 * @param {string} className - Additional CSS classes
 */
const Badge = ({ children, variant = 'primary', className = '' }) => {
  const baseStyles = 'badge'

  const variants = {
    primary: 'badge-primary',
    secondary: 'bg-dark-300 text-neutral-200 border border-dark-200',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
