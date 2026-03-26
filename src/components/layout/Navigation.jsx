import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiBookOpen,
  FiGlobe,
  FiSettings,
  FiFileText,
  FiImage,
  FiInfo,
  FiMail
} from 'react-icons/fi'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + '/')

  return (
    <nav className="hidden lg:flex flex-nowrap items-center gap-3 xl:gap-4">
      {/* Home */}
      <NavItem to="/" active={isActive('/')}>
        <FiHome />
        Home
      </NavItem>

      {/* Colleges */}
      <NavItem to="/colleges" active={isActive('/colleges')}>
        <FiBookOpen />
        Colleges
      </NavItem>

      {/* Study Abroad */}
      <NavItem to="/study-abroad" active={isActive('/study-abroad')}>
        <FiGlobe />
        Study Abroad
      </NavItem>

      {/* Services */}
      <NavItem to="/services" active={isActive('/services')}>
        <FiSettings />
        Services
      </NavItem>

      {/* Entrance Exams */}
      <NavItem to="/entrance-exams" active={isActive('/entrance-exams')}>
        <FiFileText />
        Entrance Exams
      </NavItem>

      {/* Gallery */}
      <NavItem to="/gallery" active={isActive('/gallery')}>
        <FiImage />
        Gallery
      </NavItem>

      {/* About Us */}
      <NavItem to="/about-us" active={isActive('/about-us')}>
        <FiInfo />
        About Us
      </NavItem>

      {/* Contact Us */}
      <NavItem to="/contact-us" active={isActive('/contact-us')}>
        <FiMail />
        Contact Us
      </NavItem>
    </nav>
  )
}

const NavItem = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center gap-1 shrink-0 py-1.5 px-2 -mx-2 rounded transition-colors whitespace-nowrap
        ${active
          ? 'bg-light-navActiveBg text-light-navActiveText dark:bg-transparent dark:text-cyberpunk-cyan'
          : 'text-inherit hover:bg-light-navHover dark:text-gray-300 dark:hover:bg-dark-card dark:hover:text-cyberpunk-cyan'}
      `}
    >
      <span className="text-sm shrink-0">{children[0]}</span>
      <span className="text-sm">{children[1]}</span>

      {active && (
        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-light-highlight dark:bg-cyberpunk-cyan rounded-full" />
      )}
    </Link>
  )
}

export default Navigation
