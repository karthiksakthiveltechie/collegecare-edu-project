import React from 'react'
import { FaStar } from 'react-icons/fa'
import GlassCard from './GlassCard'

const TestimonialCard = ({ name, role, college, rating, testimonial, image }) => {
  return (
    <GlassCard hover className="p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={image || `https://placehold.co/80x80/00FFFF/0A0A0F?text=${name.charAt(0)}`}
          alt={`${name} profile`}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-cyberpunk-cyan object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-cyberpunk-cyan mb-1">
            {name}
          </h3>
          <p className="text-gray-400 text-sm md:text-base mb-2">{role}</p>
          <p className="text-cyberpunk-green text-sm md:text-base font-medium">{college}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-4" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm md:text-base ${
              i < rating ? 'text-yellow-400' : 'text-gray-600'
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-2 text-gray-400 text-sm">{rating}/5</span>
      </div>
      
      <blockquote className="text-gray-300 text-base md:text-lg flex-1 italic">
        "{testimonial}"
      </blockquote>
    </GlassCard>
  )
}

export default TestimonialCard
