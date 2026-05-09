import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiBookOpen,
  FiGlobe,
  FiSettings,
  FiFileText,
  FiImage,
  FiInfo,
  FiMail,
  FiLayers,
  FiChevronDown
} from 'react-icons/fi'

const COURSE_LINKS = [
  { label: 'Engineering & Technology', path: '/colleges/engineering' },
  { label: 'Medical', path: '/colleges/medical' },
  { label: 'Allied Healthcare', path: '/colleges/allied-healthcare' },
  { label: 'Arts & Science', path: '/colleges/arts-science' },
  { label: 'Law', path: '/colleges/law' },
]

/** Desktop main nav only (lg+). Order matches header spec: Items 2–10 —
 *  Home, Colleges, Courses, Study Abroad, Services, Entrance Exams, Gallery, About Us, Contact Us.
 */
const Navigation = () => {
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + '/')

  const coursesActive = COURSE_LINKS.some(
    ({ path }) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`)
  )

  return (
    <nav
      className="flex w-full min-w-0 max-w-full flex-nowrap items-center justify-center gap-x-1.5 2xl:gap-x-3"
      aria-label="Main navigation"
    >
      {/* Item 2 */}
      <NavItem to="/" active={isActive('/')}>
        <FiHome />
        Home
      </NavItem>

      {/* Item 3 */}
      <NavItem to="/colleges" active={isActive('/colleges') && !coursesActive}>
        <FiBookOpen />
        Colleges
      </NavItem>

      {/* Item 4 — dropdown */}
      <NavCourses active={coursesActive} />

      {/* Item 5 */}
      <NavItem to="/study-abroad" active={isActive('/study-abroad')}>
        <FiGlobe />
        Study Abroad
      </NavItem>

      {/* Item 6 */}
      <NavItem to="/services" active={isActive('/services')}>
        <FiSettings />
        Services
      </NavItem>

      {/* Item 7 */}
      <NavItem to="/entrance-exams" active={isActive('/entrance-exams')}>
        <FiFileText />
        Entrance Exams
      </NavItem>

      {/* Item 8 */}
      <NavItem to="/gallery" active={isActive('/gallery')}>
        <FiImage />
        Gallery
      </NavItem>

      {/* Item 9 */}
      <NavItem to="/about-us" active={isActive('/about-us')}>
        <FiInfo />
        About Us
      </NavItem>

      {/* Item 10 */}
      <NavItem to="/contact-us" active={isActive('/contact-us')}>
        <FiMail />
        Contact Us
      </NavItem>
    </nav>
  )
}

const NavCourses = ({ active }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div
      className="relative z-0 inline-flex max-w-max shrink-0 items-center rounded px-1 py-1.5 2xl:px-1.5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`relative z-0 flex items-center gap-1 whitespace-nowrap rounded px-0.5 transition-colors 2xl:gap-1.5 ${
          active
            ? 'bg-light-navItemActiveBg text-light-navItemActiveText dark:bg-transparent dark:text-cyberpunk-cyan'
            : 'text-inherit hover:bg-light-listHover dark:text-gray-300 dark:hover:bg-dark-card dark:hover:text-cyberpunk-cyan'
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="nav-courses-menu"
        id="nav-courses-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="shrink-0 text-[11px] leading-none tracking-tight 2xl:text-xs">
          <FiLayers aria-hidden className="h-3.5 w-3.5 2xl:h-4 2xl:w-4" />
        </span>
        <span className="text-sm leading-none tracking-tight 2xl:text-base">Courses</span>
        <FiChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform 2xl:h-4 2xl:w-4 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
        {active && (
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0.5 rounded-full bg-light-primary dark:bg-cyberpunk-cyan"
            aria-hidden
          />
        )}
      </button>

      {open && (
        <div
          id="nav-courses-menu"
          role="menu"
          aria-labelledby="nav-courses-trigger"
          className="absolute left-0 top-full z-[100] pt-1 min-w-[min(100vw-2rem,260px)]"
        >
          <div className="rounded-lg border shadow-lg bg-light-dropdownBg dark:bg-dark-bg border-light-border dark:border-dark-border py-1 ring-1 ring-black/5 dark:ring-white/10">
            {COURSE_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                role="menuitem"
                to={path}
                className="block px-4 py-2 text-sm text-light-text dark:text-gray-200 hover:bg-light-listHover dark:hover:bg-white/10 transition-colors whitespace-nowrap"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const NavItem = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`relative z-0 inline-flex max-w-max shrink-0 items-center gap-1 rounded px-1 py-1.5 transition-colors whitespace-nowrap tracking-tight 2xl:gap-1.5 2xl:px-1.5
        ${active
          ? 'bg-light-navItemActiveBg text-light-navItemActiveText dark:bg-transparent dark:text-cyberpunk-cyan'
          : 'text-inherit hover:bg-light-listHover dark:text-gray-300 dark:hover:bg-dark-card dark:hover:text-cyberpunk-cyan'}
      `}
    >
      <span className="shrink-0 leading-none [&>svg]:h-3.5 [&>svg]:w-3.5 2xl:[&>svg]:h-4 2xl:[&>svg]:w-4">
        {children[0]}
      </span>
      <span className="text-sm leading-none tracking-tight 2xl:text-base">{children[1]}</span>

      {active && (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0.5 rounded-full bg-light-primary dark:bg-cyberpunk-cyan"
          aria-hidden
        />
      )}
    </Link>
  )
}

export default Navigation
