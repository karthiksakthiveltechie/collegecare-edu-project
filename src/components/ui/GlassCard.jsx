import React from 'react'

const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  const baseClasses = hover ? 'glass-card-hover' : 'glass-card'
  
  return (
    <div 
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassCard
