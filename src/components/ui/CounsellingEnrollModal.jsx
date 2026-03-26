import React, { useState, useEffect, useMemo, useRef } from 'react'
import { FiX, FiBookOpen, FiUsers } from 'react-icons/fi'
import { useCounsellingModal } from '../../context/CounsellingModalContext'
import { getDisciplineNamesForCoursePreference } from '../../data/institutionsLoader'

const STORAGE_KEY = 'counsellingModalDismissedUntil'
const SHOW_DELAY_MS = 10000
const IDLE_MS = 50000

const DEFAULT_FORMSPREE_URL = 'https://formspree.io/f/mwvnyyje'
const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_COUNSELLING_URL || DEFAULT_FORMSPREE_URL

const CITY_OPTIONS = [
  'Bengaluru',
  'Chennai',
  'Delhi',
  'Mumbai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Chandigarh',
  'Kochi',
  'Other',
]

function isCounsellingSnoozed() {
  try {
    const until = localStorage.getItem(STORAGE_KEY)
    return Boolean(until && Date.now() < Number(until))
  } catch {
    return false
  }
}

const CounsellingEnrollModal = () => {
  const { isOpen, openModal, closeModal } = useCounsellingModal()
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  const courseOptions = useMemo(
    () => [...getDisciplineNamesForCoursePreference(), 'Other'],
    []
  )
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    coursePreference: '',
    preferredCity: '',
  })

  // First visit delay: always schedule (do not skip when STORAGE_KEY snooze is set — that was preventing any timer after dismiss).
  // At fire time only skip if the modal is already open (e.g. user opened via Apply).
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpenRef.current) return
      openModal()
    }, SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [openModal])

  useEffect(() => {
    let idleTimer = null
    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        if (isOpen) return
        if (isCounsellingSnoozed()) return
        openModal()
        idleTimer = null
      }, IDLE_MS)
    }
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, resetIdleTimer))
    resetIdleTimer()
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdleTimer))
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [openModal, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreed) {
      alert('Please consent to receive updates from College Care by checking the box above.')
      return
    }
    if (!FORMSPREE_URL) {
      setSubmitError('Form submission is not configured. Please try again later.')
      return
    }
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Submission failed (${res.status})`)
      }
      alert('Thank you! We will contact you shortly for free counselling.')
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        coursePreference: '',
        preferredCity: '',
      })
      setAgreed(false)
      closeModal()
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="counselling-modal-title"
    >
      <div
        className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl bg-light-bgAlt dark:bg-dark-card border border-light-border dark:border-dark-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Yellow header */}
        <div className="bg-[#FBBF24] px-4 py-3 text-center">
          <h2
            id="counselling-modal-title"
            className="font-heading font-bold text-black text-lg sm:text-xl"
          >
            Enroll for Free Counselling
          </h2>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Social proof */}
          <div className="flex justify-center gap-6 text-sm">
            <span className="flex items-center gap-1.5 text-light-text dark:text-gray-300">
              <FiBookOpen className="text-[#FBBF24] shrink-0" aria-hidden="true" />
              5000+ Students
            </span>
            <span className="flex items-center gap-1.5 text-light-text dark:text-gray-300">
              <FiUsers className="text-[#FBBF24] shrink-0" aria-hidden="true" />
              99% Success rate
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="counselling-input w-full"
                aria-label="First name"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="counselling-input w-full"
                aria-label="Last name"
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (e.g. +91XXXXXXXXXX)"
              required
              className="counselling-input w-full"
              aria-label="Phone number"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email (e.g. email@example.com)"
              required
              className="counselling-input w-full"
              aria-label="Email"
            />
            <select
              name="coursePreference"
              value={formData.coursePreference}
              onChange={handleChange}
              className="counselling-input w-full appearance-none cursor-pointer"
              aria-label="Course preference"
            >
              <option value="">Course Preference</option>
              {courseOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              name="preferredCity"
              value={formData.preferredCity}
              onChange={handleChange}
              className="counselling-input w-full appearance-none cursor-pointer"
              aria-label="Preferred city"
            >
              <option value="">Select Preferred City</option>
              {CITY_OPTIONS.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <label className="flex items-start gap-2 cursor-pointer mt-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-[#FBBF24] focus:ring-[#FBBF24]"
                aria-label="Consent to receive updates from College Care"
              />
              <span className="text-sm text-light-text dark:text-gray-300">
                I consent to receive admission updates, counselling guidance, and notifications from College Care via Email, SMS, and WhatsApp
              </span>
            </label>

            {submitError && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 font-heading font-bold text-black bg-[#FBBF24] hover:bg-[#F59E0B] rounded-lg transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Submit Now'}
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 p-1 rounded-full text-black/70 hover:bg-black/10 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default CounsellingEnrollModal
