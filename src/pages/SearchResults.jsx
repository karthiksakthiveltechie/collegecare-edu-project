/**
 * Search results page: shows all matches for the query with filters.
 * Filters: All results (button), State (dropdown), Institute/University (dropdown) in one horizontal row.
 */
import React, { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import { FiBook, FiMapPin } from 'react-icons/fi'
import { institutions } from '../data/institutionsLoader'
import { searchInstitutions } from '../data/institutionUtils'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [filterState, setFilterState] = useState('')
  const [filterCollegeType, setFilterCollegeType] = useState('')

  const allResults = useMemo(() => {
    return searchInstitutions(q, institutions, { noLimit: true })
  }, [q])

  const statesInResults = useMemo(() => {
    const set = new Set()
    allResults.forEach((inst) => {
      if (inst.state) set.add(inst.state)
    })
    return [...set].sort()
  }, [allResults])

  const collegeTypesInResults = useMemo(() => {
    const set = new Set()
    allResults.forEach((inst) => {
      if (inst.college_type) set.add(inst.college_type)
    })
    return [...set].sort()
  }, [allResults])

  const filteredResults = useMemo(() => {
    return allResults.filter((inst) => {
      if (filterState && inst.state !== filterState) return false
      if (filterCollegeType && inst.college_type !== filterCollegeType) return false
      return true
    })
  }, [allResults, filterState, filterCollegeType])

  const clearFilters = () => {
    setFilterState('')
    setFilterCollegeType('')
  }

  const hasActiveFilters = Boolean(filterState || filterCollegeType)

  if (!q.trim()) {
    return (
      <main className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="section-title mb-4">Search</h1>
          <p className="text-light-textMuted dark:text-gray-400">Enter a college, course, or institute name to search.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <h1 className="section-title mb-2">
          Search results for &quot;{q}&quot;
        </h1>
        <p className="text-light-textMuted dark:text-gray-400 mb-6">
          {allResults.length} match{allResults.length !== 1 ? 'es' : ''} found
          {hasActiveFilters && ` (${filteredResults.length} after filters)`}
        </p>

        {/* Filter row: All results + State dropdown + Institute/University dropdown */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            type="button"
            onClick={clearFilters}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !hasActiveFilters
                ? 'bg-light-primary text-white dark:bg-cyberpunk-cyan dark:text-white'
                : 'bg-light-selectedBg dark:bg-dark-card text-light-text dark:text-gray-300 hover:bg-light-filterHover dark:hover:bg-dark-border'
            }`}
          >
            All results
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="filter-state" className="text-sm text-light-textMuted dark:text-gray-400 whitespace-nowrap">
              State
            </label>
            <select
              id="filter-state"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="search-filter-select min-w-[160px] px-3 py-2 rounded-lg bg-light-dropdownBg dark:bg-gray-800 border border-light-dropdownBorder dark:border-dark-border text-light-text dark:text-gray-100 text-sm focus:ring-2 focus:ring-light-primary dark:focus:ring-cyberpunk-cyan focus:border-transparent"
            >
              <option value="">All states</option>
              {statesInResults.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="filter-institute" className="text-sm text-light-textMuted dark:text-gray-400 whitespace-nowrap">
              Institute/University
            </label>
            <select
              id="filter-institute"
              value={filterCollegeType}
              onChange={(e) => setFilterCollegeType(e.target.value)}
              className="search-filter-select min-w-[180px] px-3 py-2 rounded-lg bg-light-dropdownBg dark:bg-gray-800 border border-light-dropdownBorder dark:border-dark-border text-light-text dark:text-gray-100 text-sm focus:ring-2 focus:ring-light-primary dark:focus:ring-cyberpunk-cyan focus:border-transparent"
            >
              <option value="">All types</option>
              {collegeTypesInResults.map((typeName) => (
                <option key={typeName} value={typeName}>
                  {typeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results grid */}
        <div className="college-list-scroll max-h-[70vh] overflow-y-auto overflow-x-hidden pr-1" style={{ scrollbarGutter: 'stable' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((inst) => (
              <GlassCard hover key={inst.id} className="p-6 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 glass-card-hover flex items-center justify-center rounded-lg flex-shrink-0 border border-light-border dark:border-dark-border">
                    <FiBook className="text-3xl text-light-primary dark:text-cyberpunk-cyan" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-heading font-semibold text-light-text dark:text-white mb-2 truncate">
                      {inst.name}
                    </h3>
                    <div className="flex items-center gap-2 text-light-textCourse dark:text-gray-400 text-sm mb-2">
                      <FiMapPin className="flex-shrink-0" aria-hidden="true" />
                      <span className="truncate">
                        {[inst.city, inst.state].filter(Boolean).join(', ') || '—'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-light-accent dark:text-cyberpunk-green text-sm font-medium">{inst.college_type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-light-border dark:border-dark-border mt-auto">
                  <span className="text-light-textCourse dark:text-gray-500 text-sm">{(inst.discipline || []).join(', ')}</span>
                  <Link
                    to={`/colleges/${inst.categorySlug || 'engineering'}/${inst.id}`}
                    className="text-light-primary hover:text-light-primaryDark dark:text-cyberpunk-cyan dark:hover:text-cyberpunk-pink transition-colors text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {filteredResults.length === 0 && (
          <p className="text-light-textMuted dark:text-gray-400 text-center py-8">
            No institutions match the current filters. Try &quot;All results&quot; or change filters.
          </p>
        )}
      </div>
    </main>
  )
}

export default SearchResults
