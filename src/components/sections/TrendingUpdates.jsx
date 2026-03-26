import React from 'react'
import GlassCard from '../ui/GlassCard'
import { FiTrendingUp, FiCalendar, FiArrowRight } from 'react-icons/fi'

const TrendingUpdates = () => {
  const updates = [
    {
      id: 1,
      title: 'NEET 2026 Application Window Open',
      date: '2026-03-10',
      category: 'Entrance Exams',
      description: 'NEET 2026 applications are now live. Last date to apply is April 15, 2026.',
    },
    {
      id: 2,
      title: 'New Engineering Colleges Added',
      date: '2026-03-05',
      category: 'Colleges',
      description: '50+ new engineering colleges added to our database across India.',
    },
    {
      id: 3,
      title: 'Study Abroad Scholarship Opportunities',
      date: '2026-02-28',
      category: 'Study Abroad',
      description: 'Exclusive scholarship opportunities available for USA, UK, and Australia.',
    },
    {
      id: 4,
      title: 'GATE 2026 Results Announced',
      date: '2026-02-20',
      category: 'Entrance Exams',
      description: 'GATE 2026 results are now available. Check your scores and plan your next steps.',
    },
  ]

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FiTrendingUp className="text-3xl text-cyberpunk-cyan" aria-hidden="true" />
          <h2 className="section-title text-3xl md:text-4xl">Trending Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {updates.map((update) => (
            <GlassCard hover key={update.id} className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 glass-card rounded text-cyberpunk-green">
                  {update.category}
                </span>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <FiCalendar className="text-xs" aria-hidden="true" />
                  <time dateTime={update.date}>
                    {new Date(update.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-3 flex-1">
                {update.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{update.description}</p>
              <button className="flex items-center gap-2 text-cyberpunk-cyan hover:text-cyberpunk-pink transition-colors text-sm font-medium self-start">
                Read More
                <FiArrowRight className="text-sm" aria-hidden="true" />
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingUpdates
