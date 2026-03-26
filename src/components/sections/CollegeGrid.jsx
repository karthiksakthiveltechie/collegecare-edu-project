import React from 'react'
import { Link } from 'react-router-dom'
import GlassCard from '../ui/GlassCard'
import { FiBook } from 'react-icons/fi'

const CollegeGrid = ({ colleges, title = "Colleges" }) => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <Link key={college.id} to={`/colleges/${college.slug}`}>
              <GlassCard hover className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 glass-card-hover flex items-center justify-center rounded-lg flex-shrink-0">
                    <FiBook className="text-3xl text-cyberpunk-cyan" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold text-white mb-2">
                      {college.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{college.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 flex-1">{college.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-cyberpunk-green text-sm font-medium">
                    {college.category}
                  </span>
                  <span className="text-cyberpunk-cyan text-sm">View Details →</span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollegeGrid
