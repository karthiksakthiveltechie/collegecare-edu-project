import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube
} from 'react-icons/fi'
import SocialLinks from '../ui/SocialLinks'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Colleges', path: '/colleges' },
    { label: 'Study Abroad', path: '/study-abroad' },
    { label: 'Services', path: '/services' },
    { label: 'Entrance Exams', path: '/entrance-exams' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact Us', path: '/contact-us' },
  ]

  const services = [
    { label: 'Free Counselling', path: '/services#counselling' },
    { label: 'Management Quota Booking', path: '/services#quota' },
    { label: 'College Selection', path: '/colleges' },
    { label: 'Study Abroad Guidance', path: '/study-abroad' },
  ]

  return (
    <footer className="border-t border-light-footerBg/50 dark:border-dark-border mt-auto bg-light-footerBg text-light-footerText dark:bg-dark-card dark:text-gray-400 dark:border-dark-border" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info – brand name colors kept */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-1">
              <span className="text-brand-college">College</span>{' '}
              <span className="text-brand-care">Care</span>
            </h3>
            <p className="text-light-footerText dark:text-gray-400 text-xs mb-2 opacity-90">Defining your way to Education</p>
            <p className="text-light-footerText dark:text-gray-400 text-sm mb-4 opacity-90">
              Serving students for 12+ years, helping 1000+ students achieve their higher education dreams.
            </p>
            <SocialLinks iconSize="text-xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-light-footerText dark:text-gray-400 hover:text-white dark:hover:text-cyberpunk-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white dark:text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-light-footerText dark:text-gray-400 hover:text-white dark:hover:text-cyberpunk-cyan transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-light-footerText dark:text-gray-400 text-sm opacity-90">
                <FiMail className="text-white dark:text-cyberpunk-cyan mt-1 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@collegecare.in" className="hover:text-white dark:hover:text-cyberpunk-cyan transition-colors">
                  info@collegecare.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-light-footerText dark:text-gray-400 text-sm opacity-90">
                <FiPhone className="text-white dark:text-cyberpunk-cyan mt-1 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+917871002025" className="hover:text-white dark:hover:text-cyberpunk-cyan transition-colors">
                  +91 787 100 2025
                  +91 892 583 4213
                </a>
              </li>
              <li className="flex items-start gap-3 text-light-footerText dark:text-gray-400 text-sm opacity-90">
                <FiMapPin className="text-white dark:text-cyberpunk-cyan mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium mr-2">Head Office:</span>
              </li>
              <li className="flex items-start gap-3 text-light-footerText dark:text-gray-400 text-sm opacity-90">
                <span>696, Outer-Byepass road (Avalurpet Road Junction), Thiruvannamalai - 606 604 </span>
              </li>
              <li className="flex items-start gap-3 text-light-footerText dark:text-gray-400 text-sm opacity-90">
                <span>(Branch offices located at all districts of Tamilnadu) </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-light-footerText/30 dark:border-dark-border pt-6 text-center">
          <p className="text-light-footerText dark:text-gray-400 text-sm opacity-90">
            &copy; {currentYear}{' '}
            <span className="text-brand-college">College</span>{' '}
            <span className="text-brand-care">Care</span>. All rights reserved.
          </p>
          <p className="text-light-footerText dark:text-gray-500 text-xs mt-2 opacity-75">
            Serving students for 12+ years | 1000+ successful students
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
