import React from 'react'

/**
 * Reusable Button Component
 * @param {string} variant - Button style variant (primary, secondary, outline)
 * @param {string} size - Button size (sm, md, lg)
 * @param {ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {string} type - Button type (button, submit, reset)
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-600 disabled:opacity-50 disabled:cursor-not-allowed'

  // Variant styles
  const variants = {
    primary:
      'bg-primary text-dark-600 hover:bg-primary-400 hover:shadow-glow focus:ring-primary',
    secondary:
      'bg-dark-300 text-white hover:bg-dark-200 focus:ring-dark-200',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-dark-600 focus:ring-primary',
    ghost:
      'text-primary hover:bg-primary/10 focus:ring-primary',
  }

  // Size styles
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
