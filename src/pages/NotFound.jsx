import React from 'react'
import { Link } from 'react-router-dom'
import NeonButton from '../components/ui/NeonButton'
import GlassCard from '../components/ui/GlassCard'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  return (
    <main className="py-12 md:py-20 px-4 min-h-[80vh] flex items-center">
      <div className="container mx-auto">
        <GlassCard className="p-8 md:p-12 max-w-2xl mx-auto text-center">
          <div className="text-8xl md:text-9xl font-heading font-bold text-cyberpunk-cyan mb-6">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <NeonButton className="flex items-center gap-2">
                <FiHome className="text-lg" aria-hidden="true" />
                Go Home
              </NeonButton>
            </Link>
            <button onClick={() => window.history.back()}>
              <NeonButton variant="secondary" className="flex items-center gap-2">
                <FiArrowLeft className="text-lg" aria-hidden="true" />
                Go Back
              </NeonButton>
            </button>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}

export default NotFound
