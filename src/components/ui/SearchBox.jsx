import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import NeonButton from './NeonButton'

const DEBOUNCE_MS = 250
const MIN_LENGTH_FOR_DROPDOWN = 2

const SearchBox = ({
  onSearch,
  onSearchChange,
  onResultSelect,
  results = [],
  placeholder = "Find your college/course",
  className = '',
  showEmptyState = false,
  emptyStateMessage = "No colleges or courses match",
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const containerRef = useRef(null)
  const listRef = useRef(null)

  const hasResults = Array.isArray(results) && results.length > 0
  const showDropdown =
    isDropdownOpen &&
    searchTerm.length >= MIN_LENGTH_FOR_DROPDOWN &&
    (hasResults || (showEmptyState && results.length === 0))
  const showResultsList = hasResults && showDropdown

  // Debounce onSearchChange
  useEffect(() => {
    if (!onSearchChange) return
    const t = setTimeout(() => {
      onSearchChange(searchTerm)
    }, DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [searchTerm, onSearchChange])

  // Open dropdown when we have a term and results (or empty state)
  useEffect(() => {
    if (searchTerm.length >= MIN_LENGTH_FOR_DROPDOWN) {
      setIsDropdownOpen(true)
      setHighlightedIndex(-1)
    } else {
      setIsDropdownOpen(false)
    }
  }, [searchTerm, results])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard: Escape, ArrowDown, ArrowUp, Enter
  const handleKeyDown = useCallback(
    (e) => {
      if (!showDropdown) return
      if (e.key === 'Escape') {
        setIsDropdownOpen(false)
        setHighlightedIndex(-1)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((i) =>
          showResultsList ? Math.min(i + 1, results.length - 1) : -1
        )
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((i) => Math.max(-1, i - 1))
        return
      }
      if (e.key === 'Enter' && showResultsList && highlightedIndex >= 0 && results[highlightedIndex]) {
        e.preventDefault()
        const inst = results[highlightedIndex]
        if (onResultSelect) onResultSelect(inst)
        setIsDropdownOpen(false)
      }
    },
    [showDropdown, showResultsList, results, highlightedIndex, onResultSelect]
  )

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex < 0 || !listRef.current) return
    const el = listRef.current.children[highlightedIndex]
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [highlightedIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  const handleResultClick = (inst) => {
    if (onResultSelect) onResultSelect(inst)
    setIsDropdownOpen(false)
    setSearchTerm('')
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card-hover flex items-center gap-4 p-4 md:p-6">
          <FiSearch className="text-cyberpunk-cyan text-2xl md:text-3xl flex-shrink-0" aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.length >= MIN_LENGTH_FOR_DROPDOWN && setIsDropdownOpen(true)}
            placeholder={placeholder}
            className="cyberpunk-input flex-1 bg-transparent border-0 focus:ring-0 text-lg md:text-xl"
            aria-label="Search for colleges or courses"
            aria-expanded={showDropdown}
            aria-autocomplete="list"
            aria-controls="search-results-list"
            id="search-input"
          />
          <NeonButton type="submit" className="hidden md:block">
            Search
          </NeonButton>
        </div>
        <NeonButton type="submit" className="w-full mt-4 md:hidden">
          Search
        </NeonButton>
      </form>

      {showDropdown && (
        <div
          id="search-results-list"
          role="listbox"
          aria-labelledby="search-input"
          className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl overflow-hidden bg-light-dropdownBg dark:bg-dark-card border border-light-dropdownBorder dark:border-dark-border shadow-xl max-h-[min(70vh,400px)] overflow-y-auto"
        >
          {showResultsList && (
            <ul ref={listRef} className="py-2 list-none m-0 p-0">
              {results.map((inst, index) => {
                const categorySlug = inst.categorySlug || (inst.discipline && inst.discipline[0] ? String(inst.discipline[0]).toLowerCase().replace(/\s+/g, '-') : 'engineering')
                const to = `/colleges/${categorySlug}/${inst.id}`
                const isHighlighted = index === highlightedIndex
                return (
                  <li key={inst.id} role="option" aria-selected={isHighlighted}>
                    <Link
                      to={to}
                      onClick={() => handleResultClick(inst)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`block px-4 py-3 text-left transition-colors ${
                        isHighlighted
                          ? 'bg-cyberpunk-cyan/20 text-cyberpunk-cyan'
                          : 'hover:bg-light-dropdownHover dark:hover:bg-dark-card text-light-text dark:text-gray-200'
                      }`}
                    >
                      <div className="font-medium truncate">{inst.name}</div>
                      <div className="flex flex-wrap gap-2 mt-0.5 text-sm text-light-textMuted dark:text-gray-400">
                        {inst.discipline && inst.discipline[0] && (
                          <span>{inst.discipline[0]}</span>
                        )}
                        {inst.college_type && (
                          <span className="text-brand-college dark:text-cyberpunk-cyan">
                            {inst.college_type}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          {showEmptyState && searchTerm.length >= MIN_LENGTH_FOR_DROPDOWN && !hasResults && (
            <div className="px-4 py-4 text-light-textMuted dark:text-gray-400 text-sm text-center">
              {emptyStateMessage}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBox
