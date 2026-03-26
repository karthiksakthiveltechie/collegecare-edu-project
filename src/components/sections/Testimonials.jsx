import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import TestimonialCard from '../ui/TestimonialCard'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Engineering Student',
      college: 'IIT Delhi',
      rating: 5,
      testimonial: 'College Care helped me secure admission to my dream college. Their guidance was invaluable throughout the entire process.',
      image: 'https://placehold.co/80x80/00FFFF/0A0A0F?text=PS',
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'Medical Student',
      college: 'AIIMS Delhi',
      rating: 5,
      testimonial: 'The team at College Care made the complex admission process so much easier. Highly recommended for medical aspirants!',
      image: 'https://placehold.co/80x80/FF00FF/0A0A0F?text=RK',
    },
    {
      id: 3,
      name: 'Anjali Patel',
      role: 'Master\'s Student',
      college: 'Harvard University',
      rating: 5,
      testimonial: 'Thanks to College Care, I got admission to Harvard for my Master\'s. Their study abroad guidance is exceptional.',
      image: 'https://placehold.co/80x80/00FF41/0A0A0F?text=AP',
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Law Student',
      college: 'NLU Delhi',
      rating: 5,
      testimonial: 'Professional service and excellent support. College Care helped me navigate the law school admission process smoothly.',
      image: 'https://placehold.co/80x80/9D00FF/0A0A0F?text=VS',
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      role: 'Allied Healthcare',
      college: 'Manipal University',
      rating: 5,
      testimonial: 'The counseling sessions were very helpful. I got into my preferred course at a top university. Thank you College Care!',
      image: 'https://placehold.co/80x80/FF6B00/0A0A0F?text=SR',
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = []
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % testimonials.length
    visibleTestimonials.push(testimonials[index])
  }

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-12">What Our Students Say</h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevTestimonial}
              className="p-3 glass-card-hover rounded-lg text-cyberpunk-cyan hover:text-cyberpunk-pink transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="text-2xl" aria-hidden="true" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-cyberpunk-cyan w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-3 glass-card-hover rounded-lg text-cyberpunk-cyan hover:text-cyberpunk-pink transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="text-2xl" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
