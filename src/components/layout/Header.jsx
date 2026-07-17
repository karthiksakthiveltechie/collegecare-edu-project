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
        { label: 'Allied Healthcare', path: '/colleges/allied-healthcare' },
        { label: 'Agriculture', path: '/colleges/agriculture' },
        { label: 'Arts and Science', path: '/colleges/arts-science' },
        { label: 'Law', path: '/colleges/law' },
        { label: "Master's Degree", path: '/colleges/masters' },
      ],
    },
    {
      label: 'Courses',
      path: '/courses',
      subItems: [
        { label: 'Engineering', path: '/courses/engineering' },
        { label: 'Medical', path: '/courses/medical' },
        { label: 'Allied Healthcare', path: '/courses/allied-healthcare' },
        { label: 'Agriculture', path: '/courses/agriculture' },
        { label: 'Arts & Science', path: '/courses/arts-science' },
        { label: 'Law', path: '/courses/law' },
        { label: 'PG', path: '/courses/pg' },
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
    <header className="sticky top-0 z-50 w-full max-w-full box-border border-b bg-light-navBg text-light-navText border-light-navBorder shadow-sm dark:bg-dark-card dark:text-white dark:border-dark-border">
      {/* Full-width bar: tighter horizontal padding below 2xl to widen nav strip */}
      <div className="w-full max-w-full box-border px-3 2xl:px-6">
        {/*
          Desktop (lg+): nav-left | nav-center | nav-right — flex + space-between
          Items 1 — brand · 2–10 — Navigation · 11–13 — Theme, Login, Sign Up
        */}
        <div className="flex h-14 md:h-16 min-w-0 w-full max-w-full items-center justify-between gap-x-2 lg:gap-x-3 xl:gap-x-5 box-border isolate">
          {/* nav-left — Item 1 */}
          <Link 
            to="/" 
            className="nav-left group relative z-[2] flex min-w-0 max-w-[min(40%,280px)] shrink-0 items-center gap-2 sm:max-w-none sm:gap-2.5 lg:max-w-none"
            aria-label="College Care Home"
          >
            <img
              src={`${import.meta.env.BASE_URL}college-care-logo.png`}
              alt=""
              className="h-8 w-auto shrink-0 md:h-10"
              loading="eager"
              aria-hidden
            />
            <div className="flex min-w-0 flex-col leading-none">
              <span className="font-heading text-2xl font-bold whitespace-nowrap transition-opacity group-hover:opacity-90 2xl:text-[1.625rem]">
                <span className="text-brand-college">COLLEGE</span>{' '}
                <span className="text-brand-care">CARE</span>
              </span>
              <span className="mt-0.5 text-xs leading-tight text-light-textMuted dark:text-gray-400 font-body font-normal">
                Defining your way to Education
              </span>
            </div>
          </Link>

          {/* nav-center — Items 2–10; spacing handled in Navigation (uniform gaps, no overlap) */}
          <div className="nav-center relative z-0 hidden min-w-0 flex-1 items-center justify-center overflow-visible lg:flex">
            <Navigation />
          </div>

          {/* nav-right — Items 11–13 (desktop); mobile: hamburger only */}
          <div className="nav-right relative z-[2] flex min-w-0 shrink-0 items-center justify-end gap-3">
            <div
              className="hidden items-center gap-3 lg:flex"
              role="toolbar"
              aria-label="Theme, login, and sign up"
            >
              <ThemeToggle />
              {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-light-text dark:text-gray-300">Welcome, {user.name}</span>
                  {isLight ? (
                    <button type="button" onClick={logout} className="btn-outline-aurora text-sm px-3 py-1.5">
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
                      <Link to="/login" className="inline-flex shrink-0 whitespace-nowrap border-2 border-light-primary text-light-primary hover:bg-light-listHover rounded-lg text-sm font-medium px-3 py-1.5 transition-colors">
                        Login
                      </Link>
                      <Link to="/signup" className="inline-flex shrink-0 whitespace-nowrap bg-light-highlight text-light-highlightText hover:bg-amber-400 rounded-lg text-sm font-semibold px-3 py-1.5 transition-colors">
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="inline-flex shrink-0 whitespace-nowrap">
                        <NeonButton variant="secondary" className="text-sm px-3 py-1.5">Login</NeonButton>
                      </Link>
                      <Link to="/signup" className="inline-flex shrink-0 whitespace-nowrap">
                        <NeonButton className="text-sm px-3 py-1.5">Sign Up</NeonButton>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden shrink-0 p-2 text-light-text dark:text-gray-300 hover:bg-light-listHover dark:hover:bg-dark-card hover:text-light-primary dark:hover:text-cyberpunk-cyan transition-colors rounded"
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-light-border dark:border-dark-border">
            <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
              {mobileNavItems.map((item) => (
                <div key={item.path}>
                    <Link
                    to={item.path}
                    className="block px-4 py-2 rounded-lg text-light-text dark:text-gray-300 hover:bg-light-listHover dark:hover:bg-dark-card hover:text-light-primary dark:hover:text-cyberpunk-cyan transition-all duration-300 whitespace-nowrap"
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
                          className="block px-4 py-2 rounded-lg text-sm text-light-text dark:text-gray-400 hover:bg-light-listHover dark:hover:bg-dark-card hover:text-light-primary dark:hover:text-cyberpunk-cyan transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-light-border dark:border-dark-border mt-2 flex flex-col gap-2">
                <div className="flex items-center justify-between px-4 pb-2">
                  <span className="text-sm text-light-textMuted dark:text-gray-400">Theme</span>
                  <ThemeToggle />
                </div>
                {user ? (
                  <>
                    <span className="px-4 py-2 text-light-text dark:text-gray-300">Welcome, {user.name}</span>
                    {isLight ? (
                      <button type="button" onClick={logout} className="mx-4 btn-outline-aurora">
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
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mx-4 border-2 border-light-primary text-light-primary hover:bg-light-listHover rounded-lg font-medium py-2 text-center transition-colors">
                          Login
                        </Link>
                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="mx-4 bg-light-highlight text-light-highlightText hover:bg-amber-400 rounded-lg font-semibold py-2 text-center transition-colors">
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
