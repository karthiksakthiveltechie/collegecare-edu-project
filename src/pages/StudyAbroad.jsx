import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import { FiGlobe, FiMapPin, FiDollarSign, FiBook } from 'react-icons/fi'

const StudyAbroad = () => {
  const { country } = useParams()
  const [selectedCountry, setSelectedCountry] = useState(country || 'all')

  const countries = [
    { id: 'all', label: 'All Countries', flag: '🌍' },
    { id: 'usa', label: 'USA', flag: '🇺🇸' },
    { id: 'uk', label: 'UK', flag: '🇬🇧' },
    { id: 'australia', label: 'Australia', flag: '🇦🇺' },
    { id: 'russia', label: 'Russia', flag: '🇷🇺' },
    { id: 'germany', label: 'Germany', flag: '🇩🇪' },
  ]

  const universities = [
    {
      id: 1,
      name: 'Harvard University',
      country: 'USA',
      location: 'Cambridge, Massachusetts',
      programs: ['Engineering', 'Business', 'Medicine'],
      tuition: '$50,000/year',
      description: 'World-renowned university offering top-tier education.',
    },
    {
      id: 2,
      name: 'MIT',
      country: 'USA',
      location: 'Cambridge, Massachusetts',
      programs: ['Engineering', 'Computer Science', 'Physics'],
      tuition: '$53,000/year',
      description: 'Leading institution for technology and engineering.',
    },
    {
      id: 3,
      name: 'Oxford University',
      country: 'UK',
      location: 'Oxford, England',
      programs: ['Law', 'Medicine', 'Arts'],
      tuition: '£25,000/year',
      description: 'One of the oldest and most prestigious universities.',
    },
    {
      id: 4,
      name: 'University of Cambridge',
      country: 'UK',
      location: 'Cambridge, England',
      programs: ['Engineering', 'Science', 'Arts'],
      tuition: '£30,000/year',
      description: 'Renowned for academic excellence and research.',
    },
    {
      id: 5,
      name: 'University of Melbourne',
      country: 'Australia',
      location: 'Melbourne, Victoria',
      programs: ['Business', 'Engineering', 'Medicine'],
      tuition: 'A$40,000/year',
      description: 'Top-ranked Australian university.',
    },
    {
      id: 6,
      name: 'Moscow State University',
      country: 'Russia',
      location: 'Moscow',
      programs: ['Engineering', 'Science', 'Medicine'],
      tuition: '₽300,000/year',
      description: 'Premier Russian university with excellent programs.',
    },
    {
      id: 7,
      name: 'Technical University of Munich',
      country: 'Germany',
      location: 'Munich',
      programs: ['Engineering', 'Technology', 'Science'],
      tuition: 'Free (Public)',
      description: 'Leading technical university in Germany.',
    },
  ]

  const filteredUniversities = selectedCountry === 'all'
    ? universities
    : universities.filter(uni => uni.country.toLowerCase() === selectedCountry.toUpperCase())

  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="Study Abroad Programs - USA, UK, Australia, Russia & More"
        description="Explore study abroad opportunities with College Care. Expert guidance for admissions to top universities in USA, UK, Australia, Russia, and 50+ countries. Scholarship assistance included."
        path="/study-abroad"
        keywords="study abroad India, study in USA, study in UK, study in Australia, international admissions, overseas education consultants"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'Study Abroad', url: 'https://collegecare.in/study-abroad' },
      ])} />
      <JsonLd data={buildWebPageSchema({
        name: 'Study Abroad Programs',
        description: 'Explore study abroad opportunities with expert guidance for top universities in USA, UK, Australia, and 50+ countries.',
        url: 'https://collegecare.in/study-abroad',
      })} />
      <div className="container mx-auto">
        <h1 className="section-title mb-8">Study Abroad</h1>
        
        {/* Country Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  selectedCountry === c.id
                    ? 'glass-card-hover border-2 border-cyberpunk-cyan text-cyberpunk-cyan'
                    : 'glass-card text-gray-300 hover:text-cyberpunk-cyan hover:border-cyberpunk-cyan'
                }`}
              >
                <span className="text-2xl">{c.flag}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((university) => (
            <GlassCard hover key={university.id} className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 glass-card-hover flex items-center justify-center rounded-lg flex-shrink-0">
                  <FiGlobe className="text-3xl text-cyberpunk-cyan" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold text-white mb-2">
                    {university.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FiMapPin className="text-sm" aria-hidden="true" />
                    <span>{university.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 flex-1">{university.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <FiBook className="text-cyberpunk-green" aria-hidden="true" />
                  <span className="text-gray-300">Programs: {university.programs.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiDollarSign className="text-cyberpunk-cyan" aria-hidden="true" />
                  <span className="text-gray-300">Tuition: {university.tuition}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                <span className="text-cyberpunk-green text-sm font-medium">
                  {university.country}
                </span>
                <button className="text-cyberpunk-cyan hover:text-cyberpunk-pink transition-colors text-sm font-medium">
                  Learn More →
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </main>
  )
}

export default StudyAbroad
