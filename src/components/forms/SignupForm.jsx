import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NeonButton from '../ui/NeonButton'
import GlassCard from '../ui/GlassCard'
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    setError('')
  }

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '' }
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'text-red-400' }
    if (password.length < 8) return { strength: 2, label: 'Fair', color: 'text-yellow-400' }
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 3, label: 'Strong', color: 'text-green-400' }
    }
    return { strength: 2, label: 'Fair', color: 'text-yellow-400' }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions')
      return
    }

    setLoading(true)

    try {
      const result = await signup(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      )
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || 'Signup failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard className="p-8 md:p-12 max-w-md mx-auto">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-cyberpunk-cyan mb-2 text-center">
        Register
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Create your account to get started.
      </p>

      {error && (
        <div className="mb-4 p-3 glass-card border border-red-500 text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="cyberpunk-input w-full pl-12"
              placeholder="Enter your full name"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="cyberpunk-input w-full pl-12"
              placeholder="Enter your email"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="cyberpunk-input w-full pl-12"
              placeholder="Enter your phone number"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="cyberpunk-input w-full pl-12 pr-12"
              placeholder="Create a password"
              aria-required="true"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyberpunk-cyan transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FiEyeOff className="text-lg" aria-hidden="true" />
              ) : (
                <FiEye className="text-lg" aria-hidden="true" />
              )}
            </button>
          </div>
          {formData.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${
                      level <= passwordStrength.strength
                        ? passwordStrength.color.replace('text-', 'bg-').replace('-400', '-500')
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs ${passwordStrength.color}`}>
                {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="cyberpunk-input w-full pl-12 pr-12"
              placeholder="Confirm your password"
              aria-required="true"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyberpunk-cyan transition-colors"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="text-lg" aria-hidden="true" />
              ) : (
                <FiEye className="text-lg" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 mt-1 rounded border-dark-border bg-dark-card text-cyberpunk-cyan focus:ring-cyberpunk-cyan"
              aria-required="true"
            />
            <span className="text-gray-300 text-sm">
              I agree to the{' '}
              <Link to="/terms" className="text-cyberpunk-cyan hover:text-cyberpunk-pink">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-cyberpunk-cyan hover:text-cyberpunk-pink">
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        <NeonButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </NeonButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-cyberpunk-cyan hover:text-cyberpunk-pink transition-colors font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </GlassCard>
  )
}

export default SignupForm
