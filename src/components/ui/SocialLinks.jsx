import React from 'react'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaWhatsapp 
} from 'react-icons/fa'

const SocialLinks = ({ className = '', iconSize = 'text-2xl' }) => {
  // TODO: Replace placeholder URLs with actual social media profiles
  const socialLinks = [
    { icon: FaFacebookF, label: 'Facebook', url: 'https://facebook.com/collegecare', color: 'hover:text-blue-500' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com/collegecare', color: 'hover:text-cyan-400' },
    { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com/collegecare', color: 'hover:text-pink-500' },
    { icon: FaLinkedinIn, label: 'LinkedIn', url: 'https://linkedin.com/company/collegecare', color: 'hover:text-blue-400' },
    { icon: FaYoutube, label: 'YouTube', url: 'https://youtube.com/@collegecare', color: 'hover:text-red-500' },
    { icon: FaWhatsapp, label: 'WhatsApp', url: 'https://wa.me/917871002025', color: 'hover:text-green-400' },
  ]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-gray-400 font-medium mr-2">Follow Us:</span>
      {socialLinks.map(({ icon: Icon, label, url, color }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} text-gray-400 ${color} transition-all duration-300 hover:scale-110`}
          aria-label={`Follow us on ${label}`}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
