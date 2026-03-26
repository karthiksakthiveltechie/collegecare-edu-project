import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NeonButton from '../ui/NeonButton'
import GlassCard from '../ui/GlassCard'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || 'Login failed. Please try again.')
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
        Sign In
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Welcome back! Please sign in to your account.
      </p>

      {error && (
        <div className="mb-4 p-3 glass-card border border-red-500 text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email or Phone
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="cyberpunk-input w-full pl-12"
              placeholder="Enter your email or phone"
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
              placeholder="Enter your password"
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
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-dark-border bg-dark-card text-cyberpunk-cyan focus:ring-cyberpunk-cyan"
            />
            <span className="text-gray-300 text-sm">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-cyberpunk-cyan hover:text-cyberpunk-pink text-sm transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <NeonButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </NeonButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-cyberpunk-cyan hover:text-cyberpunk-pink transition-colors font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </GlassCard>
  )
}

export default LoginForm
