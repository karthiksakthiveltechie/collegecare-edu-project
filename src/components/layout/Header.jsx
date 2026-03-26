import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import Navigation from './Navigation'
import NeonButton from '../ui/NeonButton'
import ThemeToggle from '../ui/ThemeToggle'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const mobileNavItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Colleges', 
      path: '/colleges',
      subItems: [
        { label: 'Engineering & Technology', path: '/colleges/engineering' },
        { label: 'Medical', path: '/colleges/medical' },
        { label: 'Arts and Science', path: '/colleges/arts-science' },
        { label: 'Agriculture', path: '/colleges/agriculture' },
        { label: 'Allied Healthcare', path: '/colleges/allied-healthcare' },
        { label: 'Law', path: '/colleges/law' },
        { label: "Master's Degree", path: '/colleges/masters' },
      ],
    },
    { 
      label: 'Study Abroad', 
      path: '/study-abroad',
      subItems: [
        { label: 'USA', path: '/study-abroad/usa' },
        { label: 'UK', path: '/study-abroad/uk' },
        { label: 'Australia', path: '/study-abroad/australia' },
        { label: 'Russia', path: '/study-abroad/russia' },
        { label: 'Germany', path: '/study-abroad/germany' },
      ],
    },
    { label: 'Services', path: '/services' },
    { label: 'Entrance Exams', path: '/entrance-exams' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact Us', path: '/contact-us' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b bg-light-navBg text-light-navText border-light-navHover dark:bg-dark-card dark:text-white dark:border-dark-border dark:border-dark-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 min-w-0">
          {/* Logo – brand name colors kept in both themes */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="College Care Home"
          >
            <img
              src={`${import.meta.env.BASE_URL}college-care-logo.png`}
              alt="College Care"
              className="h-8 w-auto md:h-10 block flex-shrink-0"
              loading="eager"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base md:text-lg font-heading font-bold whitespace-nowrap group-hover:opacity-90 transition-opacity">
                <span className="text-brand-college">COLLEGE</span>{' '}
                <span className="text-brand-care">CARE</span>
              </span>
              <span className="text-[10px] md:text-xs text-white/80 dark:text-gray-400 font-body font-normal mt-0.5">
                Defining your way to Education
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex-1 min-w-0 overflow-hidden flex justify-center px-2 flex-nowrap">
            <Navigation />
          </div>

          {/* Theme toggle + Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white dark:text-gray-300">Welcome, {user.name}</span>
                {isLight ? (
                  <button type="button" onClick={logout} className="btn-outline-aurora border-white text-white hover:bg-white/10 text-sm px-3 py-1.5">
                    Logout
                  </button>
                ) : (
                  <NeonButton onClick={logout} variant="secondary">Logout</NeonButton>
                )}
              </div>
            ) : (
              <>
                {isLight ? (
                  <>
                    <Link to="/login" className="whitespace-nowrap border-2 border-white text-white hover:bg-white/10 rounded-lg text-sm font-medium px-3 py-1.5 transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="whitespace-nowrap bg-light-navActiveBg text-light-navActiveText hover:bg-amber-400 rounded-lg text-sm font-semibold px-3 py-1.5 transition-colors">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="whitespace-nowrap">
                      <NeonButton variant="secondary" className="text-sm px-3 py-1.5">Login</NeonButton>
                    </Link>
                    <Link to="/signup" className="whitespace-nowrap">
                      <NeonButton className="text-sm px-3 py-1.5">Sign Up</NeonButton>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white dark:text-gray-300 hover:bg-light-navHover dark:hover:bg-dark-card hover:text-white dark:hover:text-cyberpunk-cyan transition-colors rounded"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <FiX className="text-2xl" aria-hidden="true" />
            ) : (
              <FiMenu className="text-2xl" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20 dark:border-dark-border">
            <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
              {mobileNavItems.map((item) => (
                <div key={item.path}>
                    <Link
                    to={item.path}
                    className="block px-4 py-2 rounded-lg text-white dark:text-gray-300 hover:bg-light-navHover dark:hover:bg-dark-card hover:text-white dark:hover:text-cyberpunk-cyan transition-all duration-300 whitespace-nowrap"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <div className="pl-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 rounded-lg text-sm text-white/90 dark:text-gray-400 hover:bg-light-navHover dark:hover:bg-dark-card hover:text-white dark:hover:text-cyberpunk-cyan transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/20 dark:border-dark-border mt-2 flex flex-col gap-2">
                <div className="flex items-center justify-between px-4 pb-2">
                  <span className="text-sm text-white/80 dark:text-gray-400">Theme</span>
                  <ThemeToggle />
                </div>
                {user ? (
                  <>
                    <span className="px-4 py-2 text-white dark:text-gray-300">Welcome, {user.name}</span>
                    {isLight ? (
                      <button type="button" onClick={logout} className="mx-4 btn-outline-aurora border-white text-white hover:bg-white/10">
                        Logout
                      </button>
                    ) : (
                      <NeonButton onClick={logout} variant="secondary" className="mx-4">Logout</NeonButton>
                    )}
                  </>
                ) : (
                  <>
                    {isLight ? (
                      <>
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mx-4 border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium py-2 text-center transition-colors">
                          Login
                        </Link>
                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="mx-4 bg-light-navActiveBg text-light-navActiveText hover:bg-amber-400 rounded-lg font-semibold py-2 text-center transition-colors">
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                          <NeonButton variant="secondary" className="w-full mx-4">Login</NeonButton>
                        </Link>
                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                          <NeonButton className="w-full mx-4">Sign Up</NeonButton>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
