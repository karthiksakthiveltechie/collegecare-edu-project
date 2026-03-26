import React from 'react'
import GlassCard from '../components/ui/GlassCard'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import ContactForm from '../components/forms/ContactForm'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const ContactUs = () => {
  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="Contact Us - Get Free Counselling Today"
        description="Contact College Care for free higher education counselling. Visit our head office in Thiruvannamalai or branch offices across Tamil Nadu. Call +91 787 100 2025 or email info@collegecare.in."
        path="/contact-us"
        keywords="contact College Care, free counselling, education consultant Thiruvannamalai, Tamil Nadu education"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'Contact Us', url: 'https://collegecare.in/contact-us' },
      ])} />
      <JsonLd data={buildWebPageSchema({
        name: 'Contact College Care',
        description: 'Contact College Care for free higher education counselling. Head office in Thiruvannamalai, Tamil Nadu.',
        url: 'https://collegecare.in/contact-us',
      })} />
      <div className="container mx-auto">
        <h1 className="section-title mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <GlassCard className="p-6 md:p-8">
            <h2 className="text-xl font-heading font-semibold text-cyberpunk-cyan mb-6">
              Get in touch
            </h2>
            <ContactForm />
          </GlassCard>

          {/* Contact details */}
          <div className="space-y-6">
            <GlassCard className="p-6 md:p-8">
              <h2 className="text-xl font-heading font-semibold text-cyberpunk-cyan mb-6">
                Reach us
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300">
                  <FiMail className="text-cyberpunk-cyan mt-1 flex-shrink-0" aria-hidden="true" />
                  <a href="mailto:info@collegecare.in" className="hover:text-cyberpunk-cyan transition-colors">
                    info@collegecare.in
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <FiPhone className="text-cyberpunk-cyan mt-1 flex-shrink-0" aria-hidden="true" />
                  <a href="tel:+917871002025" className="hover:text-cyberpunk-cyan transition-colors">
                    +91 787 100 2025
                    +91 892 583 4213
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <FiMapPin className="text-cyberpunk-cyan mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="font-medium text-white">Head Office:</span>
                    <p className="mt-1">
                      696, Outer-Byepass road (Avalurpet Road Junction), Thiruvannamalai - 606 604
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Branch offices located at all districts of Tamilnadu
                    </p>
                  </div>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactUs
