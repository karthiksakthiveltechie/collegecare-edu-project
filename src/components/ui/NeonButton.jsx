import React from 'react'

const NeonButton = ({ 
  children, 
  className = '', 
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  ...props 
}) => {
  const variantClasses = {
    primary: 'neon-button',
    secondary: 'neon-button border-cyberpunk-pink',
    success: 'neon-button border-cyberpunk-green',
    danger: 'neon-button border-cyberpunk-orange',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default NeonButton
