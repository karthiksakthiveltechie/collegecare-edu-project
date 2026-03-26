import React from 'react'
import GlassCard from '../components/ui/GlassCard'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import { FiUsers, FiAward, FiTarget, FiCheckCircle, FiTrendingUp } from 'react-icons/fi'

const AboutUs = () => {
  const whyChooseUs = [
    {
      icon: FiUsers,
      title: 'Expert Counselors',
      description: 'Our team consists of experienced education counselors with deep knowledge of the admission process.',
    },
    {
      icon: FiAward,
      title: 'Proven Track Record',
      description: '12+ years of excellence with 1000+ successful students placed in top colleges.',
    },
    {
      icon: FiTarget,
      title: 'Personalized Guidance',
      description: 'We provide customized counseling based on your interests, strengths, and career goals.',
    },
    {
      icon: FiCheckCircle,
      title: 'End-to-End Support',
      description: 'From college selection to admission confirmation, we support you at every step.',
    },
    {
      icon: FiTrendingUp,
      title: 'High Success Rate',
      description: '95% success rate in helping students secure admissions to their preferred colleges.',
    },
    {
      icon: FiUsers,
      title: 'Global Reach',
      description: 'We assist students for both domestic and international study opportunities.',
    },
  ]

  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="About Us - 12+ Years of Excellence in Education Consulting"
        description="Learn about College Care's 12+ years of experience in higher education consulting. 1000+ successful students, 95% success rate, and expert counselors dedicated to your academic future."
        path="/about-us"
        keywords="about College Care, education consultants India, higher education consulting, student success, Thiruvannamalai"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'About Us', url: 'https://collegecare.in/about-us' },
      ])} />
      <JsonLd data={buildWebPageSchema({
        name: 'About College Care',
        description: "12+ years of experience in higher education consulting. 1000+ successful students, 95% success rate.",
        url: 'https://collegecare.in/about-us',
      })} />
      <div className="container mx-auto">
        {/* Who We Are */}
        <section className="mb-16">
          <h1 className="section-title mb-8">Who We Are</h1>
          <GlassCard className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-300 text-lg mb-6">
                College Care is a leading higher education consulting firm that has been 
                serving students for over 12 years. We have successfully guided more than 1000 
                students in their journey from school education to undergraduate programs and 
                Master's degrees.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                Our mission is to help students find the right path for their higher education 
                by providing expert guidance, personalized counseling, and comprehensive support 
                throughout the admission process.
              </p>
              <p className="text-gray-300 text-lg">
                We serve students looking for both domestic and international study opportunities, 
                offering services for college selection, entrance exam preparation, study abroad 
                guidance, and management quota bookings.
              </p>
            </div>
          </GlassCard>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="section-title mb-8">Our Mission</h2>
          <GlassCard className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <FiTarget className="text-5xl text-cyberpunk-cyan mx-auto mb-6" aria-hidden="true" />
              <p className="text-gray-300 text-lg">
                To empower students with the knowledge, guidance, and support they need to make 
                informed decisions about their higher education and achieve their academic and 
                career aspirations. We strive to make quality education accessible to all students 
                by providing personalized counseling and comprehensive assistance throughout their 
                educational journey.
              </p>
            </div>
          </GlassCard>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <h2 className="section-title mb-8">Our Vision</h2>
          <GlassCard className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <FiAward className="text-5xl text-cyberpunk-cyan mx-auto mb-6" aria-hidden="true" />
              <p className="text-gray-300 text-lg">
                To become the most trusted and respected higher education consulting firm, 
                recognized for our commitment to student success, innovation in counseling 
                methodologies, and excellence in service delivery. We envision a future where 
                every student has access to quality guidance and can pursue their dream education 
                without barriers.
              </p>
            </div>
          </GlassCard>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="section-title mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <GlassCard hover key={index} className="p-6 flex flex-col">
                  <div className="w-16 h-16 glass-card-hover flex items-center justify-center rounded-lg mb-4">
                    <Icon className="text-3xl text-cyberpunk-cyan" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-cyberpunk-cyan mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 flex-1">{item.description}</p>
                </GlassCard>
              )
            })}
          </div>
        </section>

        {/* Stats */}
        <section>
          <GlassCard className="p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-cyberpunk-cyan mb-2">
                  12+
                </div>
                <div className="text-gray-400">Years of Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-cyberpunk-cyan mb-2">
                  1000+
                </div>
                <div className="text-gray-400">Successful Students</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-cyberpunk-cyan mb-2">
                  95%
                </div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-cyberpunk-cyan mb-2">
                  50+
                </div>
                <div className="text-gray-400">Countries Covered</div>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  )
}

export default AboutUs
