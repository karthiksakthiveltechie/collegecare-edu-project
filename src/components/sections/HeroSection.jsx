import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBox from '../ui/SearchBox'
import NeonButton from '../ui/NeonButton'
import { institutions } from '../../data/institutionsLoader'
import { searchInstitutions } from '../../data/institutionUtils'
import { useTheme } from '../../context/ThemeContext'
import {
  FiFileText,
  FiHelpCircle,
  FiMapPin,
  FiClock,
} from 'react-icons/fi'

/* Hero image: diverse graduates (emotional touch) – uses public/hero-graduates.png */
const HERO_GRADUATES_LOCAL = `${import.meta.env.BASE_URL}hero-graduates.png`
const HERO_GRADUATES_FALLBACK =
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'

const HeroSection = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [results, setResults] = useState([])

  const handleSearchChange = useCallback((term) => {
    const list = searchInstitutions(term, institutions, { limit: 25 })
    setResults(list)
  }, [])

  const handleResultSelect = useCallback(() => {
    setResults([])
  }, [])

  const handleSearch = useCallback((searchTerm) => {
    const trimmed = (searchTerm || '').trim()
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }, [navigate])

  const concernCards = [
    { icon: FiHelpCircle, text: 'Confused about college choice?' },
    { icon: FiClock, text: 'Application deadlines stressing you?' },
  ]


  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-6 pb-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left column: value proposition, CTAs, social proof */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-light-text dark:text-white mb-4 md:mb-6 leading-tight">
              Navigate Your Future.{' '}
              <span className="text-brand-college dark:text-cyberpunk-cyan">Uncover Your Path.</span>
            </h1>
            <p className="text-lg md:text-xl text-light-textMuted dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Your trusted partner for higher education. 12+ years of excellence, 1000+ successful students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                to="/contact-us"
                className={isLight
                  ? 'inline-flex items-center justify-center bg-light-highlight text-light-navActiveText hover:bg-amber-400 px-6 py-3.5 rounded-lg font-semibold transition-all duration-250'
                  : ''}
              >
                {isLight ? (
                  'Book a Free Session'
                ) : (
                  <NeonButton className="w-full sm:w-auto">Book a Free Session</NeonButton>
                )}
              </Link>
              <Link
                to="/services"
                className={isLight
                  ? 'inline-flex items-center justify-center border-2 border-light-primary text-light-primary hover:bg-light-submenuBg px-6 py-3.5 rounded-lg font-semibold transition-all duration-250'
                  : ''}
              >
                {isLight ? (
                  'Explore Our Services'
                ) : (
                  <NeonButton variant="secondary" className="w-full sm:w-auto">Explore Our Services</NeonButton>
                )}
              </Link>
            </div>

            <div className="max-w-xl mx-auto lg:mx-0 mb-8">
              <SearchBox
                onSearch={handleSearch}
                onSearchChange={handleSearchChange}
                onResultSelect={handleResultSelect}
                results={results}
                showEmptyState
                emptyStateMessage="No colleges or courses match"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <span className="text-sm text-light-textMuted dark:text-gray-400">Trusted by students — guided by experts</span>
            </div>
          </div>

          {/* Right column: pattern, tilted cards, graduate image */}
          <div className="relative order-1 lg:order-2 hero-pattern rounded-2xl min-h-[320px] md:min-h-[400px] flex flex-col justify-end">
            <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4 mb-4">
              {concernCards.map((card, i) => {
                const Icon = card.icon
                const rotations = ['rotate-[-2deg]', 'rotate-[3deg]', 'rotate-[-1deg]', 'rotate-[2deg]']
                return (
                  <div
                    key={card.text}
                    className={`tilted-card ${rotations[i % 4]} ${i >= 2 ? 'hidden sm:block' : ''}`}
                  >
                    <Icon className="text-xl md:text-2xl text-light-primary dark:text-cyberpunk-cyan mb-2" aria-hidden="true" />
                    <p className="text-sm md:text-base font-medium text-light-text dark:text-gray-200">
                      {card.text}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="relative z-0 rounded-xl overflow-hidden border border-light-border dark:border-dark-border shadow-soft-ui aspect-[4/3] max-h-[280px] md:max-h-[320px]">
              <img
                src={HERO_GRADUATES_LOCAL}
                alt="Diverse university graduates celebrating success — caps in the air, golden confetti"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = HERO_GRADUATES_FALLBACK
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
