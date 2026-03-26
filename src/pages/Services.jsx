import React from 'react'
import GlassCard from '../components/ui/GlassCard'
import NeonButton from '../components/ui/NeonButton'
import ContactForm from '../components/forms/ContactForm'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import { FiHeadphones, FiBookOpen, FiCheckCircle, FiUsers } from 'react-icons/fi'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Free Counselling',
      icon: FiHeadphones,
      description: 'Get expert guidance from our experienced counselors to help you make informed decisions about your higher education journey.',
      features: [
        'One-on-one counseling sessions',
        'Career assessment',
        'Course and college selection',
        'Application guidance',
      ],
    },
    {
      id: 2,
      title: 'Management Quota Booking',
      icon: FiBookOpen,
      description: 'Secure your seat through management quota in top colleges across India. We help you navigate the admission process.',
      features: [
        'Direct admission assistance',
        'Documentation support',
        'Fee structure guidance',
        'Seat confirmation',
      ],
    },
    {
      id: 3,
      title: 'College Selection',
      icon: FiUsers,
      description: 'Comprehensive support in selecting the right college based on your preferences, budget, and career goals.',
      features: [
        'College comparison',
        'Ranking and reviews',
        'Placement statistics',
        'Campus visit assistance',
      ],
    },
    {
      id: 4,
      title: 'Study Abroad Guidance',
      icon: FiCheckCircle,
      description: 'Complete assistance for studying abroad including visa processing, documentation, and university applications.',
      features: [
        'Country selection',
        'University applications',
        'Visa processing',
        'Pre-departure support',
      ],
    },
  ]

  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="Our Services - Free Counselling, College Selection & More"
        description="College Care offers free counselling, management quota booking, college selection guidance, and study abroad assistance. 12+ years of experience helping students achieve their education dreams."
        path="/services"
        keywords="education counselling, free counselling, management quota, college selection help, admission guidance India"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'Services', url: 'https://collegecare.in/services' },
      ])} />
      <JsonLd data={buildWebPageSchema({
        name: 'Our Services - College Care',
        description: 'Free counselling, management quota booking, college selection guidance, and study abroad assistance.',
        url: 'https://collegecare.in/services',
      })} />
      <div className="container mx-auto">
        <h1 className="section-title mb-8">Our Services</h1>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <GlassCard hover key={service.id} className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 glass-card-hover flex items-center justify-center rounded-lg flex-shrink-0">
                    <Icon className="text-3xl text-cyberpunk-cyan" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading font-bold text-cyberpunk-cyan mb-2">
                      {service.title}
                    </h2>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <FiCheckCircle className="text-cyberpunk-green flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <NeonButton variant="secondary" className="w-full">
                  Learn More
                </NeonButton>
              </GlassCard>
            )
          })}
        </div>

        {/* Free Counselling CTA */}
        <section id="counselling" className="mb-16">
          <GlassCard className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <FiHeadphones className="text-5xl text-cyberpunk-cyan mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-cyberpunk-cyan mb-4">
                Get Free Counselling
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Book a free counseling session with our experts and take the first step towards 
                your dream career. We'll help you understand your options and make the right choice.
              </p>
              <NeonButton className="text-lg px-8 py-4">
                Book Free Session
              </NeonButton>
            </div>
          </GlassCard>
        </section>

        {/* Management Quota Booking */}
        <section id="quota" className="mb-16">
          <GlassCard className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <FiBookOpen className="text-5xl text-cyberpunk-cyan mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-cyberpunk-cyan mb-4">
                Management Quota Booking
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Secure your seat in top colleges through management quota. Our team will guide 
                you through the entire process, from application to admission confirmation.
              </p>
              <NeonButton variant="secondary" className="text-lg px-8 py-4">
                Enquire Now
              </NeonButton>
            </div>
          </GlassCard>
        </section>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}

export default Services
