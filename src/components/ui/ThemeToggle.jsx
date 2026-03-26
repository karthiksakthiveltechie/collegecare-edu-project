import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg text-inherit dark:text-gray-300 hover:bg-light-navHover dark:hover:bg-dark-card dark:hover:text-cyberpunk-cyan transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <FiSun className="w-5 h-5" aria-hidden="true" />
      ) : (
        <FiMoon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default ThemeToggle
