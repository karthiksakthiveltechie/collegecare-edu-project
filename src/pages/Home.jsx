import React from 'react'
import SEO from '../components/SEO'
import JsonLd, { ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, buildWebPageSchema } from '../components/JsonLd'
import HeroSection from '../components/sections/HeroSection'
import TrendingUpdates from '../components/sections/TrendingUpdates'
import Testimonials from '../components/sections/Testimonials'
import ContactForm from '../components/forms/ContactForm'
import SocialLinks from '../components/ui/SocialLinks'
import GlassCard from '../components/ui/GlassCard'
import NeonButton from '../components/ui/NeonButton'
import { Link } from 'react-router-dom'
import { FiUsers, FiAward, FiGlobe, FiTrendingUp } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const Home = () => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const stats = [
    { icon: FiUsers, value: '1000+', label: 'Successful Students' },
    { icon: FiAward, value: '12+', label: 'Years of Experience' },
    { icon: FiGlobe, value: '50+', label: 'Countries Covered' },
    { icon: FiTrendingUp, value: '95%', label: 'Success Rate' },
  ]

  return (
    <main>
      <SEO
        title="Find Best Colleges, Courses & Admissions in India"
        description="College Care is India's trusted higher education consulting platform. 12+ years of excellence helping 1000+ students with college admissions, entrance exams, study abroad guidance, and free counselling."
        path="/"
        keywords="college consulting India, higher education guidance, best colleges India, college admission help, entrance exam preparation, study abroad, free counselling"
      />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={LOCAL_BUSINESS_SCHEMA} />
      <JsonLd data={buildWebPageSchema({
        name: 'College Care - Higher Education Consulting',
        description: "India's trusted higher education consulting platform with 12+ years of excellence.",
        url: 'https://collegecare.in/',
      })} />
      <HeroSection />
      
      <TrendingUpdates />

      {/* Stats Section – alternate background per Aurora */}
      <section className="py-12 md:py-20 px-4 bg-light-bgAlt dark:bg-transparent">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <GlassCard hover key={index} className="p-6 text-center">
                  <Icon className="text-4xl text-brand-college dark:text-cyberpunk-cyan mx-auto mb-4" aria-hidden="true" />
                  <div className="text-3xl md:text-4xl font-heading font-bold text-brand-college dark:text-cyberpunk-cyan mb-2">
                    {stat.value}
                  </div>
                  <div className="text-light-textMuted dark:text-gray-400 text-sm md:text-base">{stat.label}</div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Contact/Request Callback Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="section-title mb-6">Get Free Counselling</h2>
              <p className="text-light-textMuted dark:text-gray-300 text-lg mb-6">
                Our expert counselors are here to help you make the right decision for your 
                higher education journey. Book a free consultation today!
              </p>
              <Link to="/services" className={isLight ? 'inline-block' : ''}>
                {isLight ? (
                  <span className="btn-primary-aurora inline-block w-full md:w-auto text-center">Learn More About Our Services</span>
                ) : (
                  <NeonButton className="w-full md:w-auto">Learn More About Our Services</NeonButton>
                )}
              </Link>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-6">About College Care</h2>
            <p className="text-light-textMuted dark:text-gray-300 text-lg mb-8">
              College Care has been serving students for over 12 years, helping more than 
              1000 students successfully transition from school education to undergraduate programs 
              and continue with Master's degrees. We provide comprehensive guidance for both 
              domestic and international study opportunities.
            </p>
            <Link to="/about-us" className={isLight ? 'inline-block' : ''}>
              {isLight ? (
                <span className="btn-secondary-aurora inline-block">Learn More About Us</span>
              ) : (
                <NeonButton variant="secondary">Learn More About Us</NeonButton>
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Follow Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-college dark:text-cyberpunk-cyan mb-6">
              Follow Us on Social Media
            </h2>
            <p className="text-light-textMuted dark:text-gray-300 mb-8">
              Stay updated with the latest news, updates, and success stories from College Care.
            </p>
            <SocialLinks className="justify-center" iconSize="text-3xl" />
          </GlassCard>
        </div>
      </section>
    </main>
  )
}

export default Home
