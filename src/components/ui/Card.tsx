import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverClass = hover ? 'hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300' : ''

  return (
    <div
      className={`bg-dark-card rounded-card shadow-card ${paddingClasses[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  )
}
