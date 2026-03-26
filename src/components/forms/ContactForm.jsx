import React, { useState } from 'react'
import NeonButton from '../ui/NeonButton'
import GlassCard from '../ui/GlassCard'
import { FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    // Implement form submission
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <GlassCard className="p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-heading font-bold text-cyberpunk-cyan mb-6">
        Request a Callback
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-2">
            <FiUser className="inline mr-2" aria-hidden="true" />
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="cyberpunk-input w-full"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2">
            <FiMail className="inline mr-2" aria-hidden="true" />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="cyberpunk-input w-full"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-2">
            <FiPhone className="inline mr-2" aria-hidden="true" />
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="cyberpunk-input w-full"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-300 mb-2">
            <FiMessageSquare className="inline mr-2" aria-hidden="true" />
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="cyberpunk-input w-full resize-none"
            aria-required="true"
          />
        </div>
        <NeonButton type="submit" className="w-full">
          Submit Request
        </NeonButton>
      </form>
    </GlassCard>
  )
}

export default ContactForm
