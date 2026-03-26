/**
 * Colleges listing and detail — data from Eng-institutions.json only.
 * No hardcoded college lists; category filter and detail use canonical data.
 */
import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import GlassCard from '../components/ui/GlassCard'
import NeonButton from '../components/ui/NeonButton'
import { useCounsellingModal } from '../context/CounsellingModalContext'
import { FiBook, FiMapPin, FiStar, FiExternalLink } from 'react-icons/fi'
import { institutions, getCategoryMenuFromInstitutions, getCollegeTypeSlugToLabel, getDisciplineForFilter } from '../data/institutionsLoader'
import { getInstitutionById } from '../data/institutionUtils'

const slugToLabel = {
  engineering: 'Engineering & Technology',
  medical: 'Medical',
  'arts-science': 'Arts & Science',
  law: 'Law',
  pharma: 'Pharma',
  agriculture: 'Agriculture',
}

const labelToSlug = {
  'Engineering': 'engineering',
  'Engineering & Technology': 'engineering',
  'Medical': 'medical',
  'Arts & Science': 'arts-science',
  'Law': 'law',
  'Pharma': 'pharma',
  'Agriculture': 'agriculture',
}

const Colleges = () => {
  const { category, collegeSlug } = useParams()
  const navigate = useNavigate()
  const { openModal } = useCounsellingModal()
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')

  const menuCategories = useMemo(() => getCategoryMenuFromInstitutions(institutions, { includeEmpty: false }), [])
  const categories = [
    { id: 'all', label: 'All', slug: '' },
    ...menuCategories.map((c) => ({ id: c.slug, label: c.name, slug: c.slug })),
  ]

  const typeSlugToLabel = useMemo(() => (category ? getCollegeTypeSlugToLabel(category) : {}), [category])
  const isCollegeTypeList = Boolean(category && collegeSlug && typeSlugToLabel[collegeSlug])
  const collegeTypeLabel = isCollegeTypeList ? typeSlugToLabel[collegeSlug] : null
  const institution = !isCollegeTypeList && collegeSlug ? getInstitutionById(institutions, collegeSlug) : null

  useEffect(() => {
    if (category) setSelectedCategory(category)
    else setSelectedCategory('all')
  }, [category])

  // Always show Engineering by type when user selects Engineering (no flat list on Colleges page)
  useEffect(() => {
    if (selectedCategory === 'engineering' && !collegeSlug) {
      navigate('/colleges/engineering', { replace: true })
    }
  }, [selectedCategory, collegeSlug, navigate])

  const filteredInstitutions = useMemo(() => {
    if (selectedCategory === 'all') return institutions
    const discipline = getDisciplineForFilter(selectedCategory) || slugToLabel[selectedCategory] || selectedCategory
    let list = institutions.filter(
      (inst) => inst.discipline && inst.discipline.includes(discipline)
    )
    if (collegeTypeLabel) {
      const isEngineering = selectedCategory === 'engineering'
      list = list.filter((inst) =>
        isEngineering ? inst.college_type === collegeTypeLabel : inst.group_label === collegeTypeLabel
      )
    }
    return list
  }, [selectedCategory, collegeTypeLabel])

  if (institution) {
    const backUrl = category ? `/colleges/${category}` : '/colleges'
    return (
      <main className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link to={backUrl} className="text-cyberpunk-cyan hover:underline text-sm mb-6 inline-block">
            ← Back to list
          </Link>
          <GlassCard className="p-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 glass-card-hover rounded-xl flex items-center justify-center flex-shrink-0">
                <FiBook className="text-4xl text-cyberpunk-cyan" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-heading font-bold text-white mb-2">{institution.name}</h1>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-light-accent dark:text-cyberpunk-green text-sm font-medium">{institution.college_type}</span>
                  {institution.funding && (
                    <span className="text-light-textMuted dark:text-gray-400 text-sm">{institution.funding}</span>
                  )}
                </div>
                {(institution.city || institution.state || institution.address) && (
                  <div className="flex items-center gap-2 text-light-textMuted dark:text-gray-400 text-sm">
                    <FiMapPin aria-hidden="true" />
                    <span>
                      {[institution.address, institution.city, institution.state].filter(Boolean).join(', ')}
                      {institution.zip ? ` ${institution.zip}` : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-light-text dark:text-gray-300">
              <div><span className="text-light-textMuted dark:text-gray-500">Discipline</span><br />{(institution.discipline || []).join(', ')}</div>
              <div><span className="text-light-textMuted dark:text-gray-500">Source</span><br />{institution.source}</div>
            </div>
            {institution.official_website && (
              <a
                href={institution.official_website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-cyberpunk-cyan hover:underline"
              >
                <FiExternalLink /> Official website
              </a>
            )}
            <div className="mt-8 pt-6 border-t border-light-navHover dark:border-dark-border">
              <NeonButton
                type="button"
                onClick={() => openModal()}
                className="w-full sm:w-auto min-w-[8rem]"
                aria-label="Apply for free counselling for this college"
              >
                Apply
              </NeonButton>
            </div>
          </GlassCard>
        </div>
      </main>
    )
  }

  const isEngineering = selectedCategory === 'engineering'
  const categorySlugForInst = (inst) =>
    (inst.discipline && inst.discipline[0] && labelToSlug[inst.discipline[0]]) || 'engineering'
  const disciplineName = slugToLabel[selectedCategory] || selectedCategory

  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="Top Colleges in India 2026 - Engineering, Medical, Arts & More"
        description="Explore and compare top colleges in India across engineering, medical, arts, science, law, and agriculture. Get detailed info on rankings, fees, placements, and admissions."
        path="/colleges"
        keywords="top colleges India, best engineering colleges, medical colleges India, college rankings, college admissions 2026"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'Colleges', url: 'https://collegecare.in/colleges' },
      ])} />
      <JsonLd data={buildWebPageSchema({
        name: 'Top Colleges in India 2026',
        description: 'Explore and compare top colleges in India across engineering, medical, arts, science, law, and agriculture.',
        url: 'https://collegecare.in/colleges',
      })} />
      <div className="container mx-auto">
        {isCollegeTypeList ? (
          <>
            <Link to={category ? `/colleges/${category}` : '/colleges'} className="text-cyberpunk-cyan hover:underline text-sm mb-4 inline-block">
              ← Back to {disciplineName}
            </Link>
            <h1 className="section-title mb-2">{disciplineName}</h1>
            <h2 className="text-xl font-heading font-semibold text-cyberpunk-cyan border-b border-dark-border pb-2 mb-8">
              {collegeTypeLabel}
              <span className="text-light-textMuted dark:text-gray-500 font-normal text-base ml-2">({filteredInstitutions.length})</span>
            </h2>
          </>
        ) : (
          <>
            <h1 className="section-title mb-8">Colleges</h1>
            <div className="mb-8 overflow-x-auto">
              <div className="flex gap-4 pb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (cat.id === 'engineering') {
                        navigate('/colleges/engineering')
                        return
                      }
                      navigate(cat.slug ? `/colleges/${cat.slug}` : '/colleges')
                      setSelectedCategory(cat.id)
                    }}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'glass-card-hover border-2 border-light-selectedFilter dark:border-cyberpunk-cyan text-light-selectedFilter dark:text-cyberpunk-cyan bg-light-selectedBg dark:bg-transparent'
                        : 'glass-card text-light-textMuted dark:text-gray-300 hover:text-light-primary dark:hover:text-cyberpunk-cyan hover:border-light-primary dark:hover:border-cyberpunk-cyan'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            {isEngineering && (
              <div className="mb-6">
                <Link
                  to="/colleges/engineering"
                  className="text-cyberpunk-cyan hover:underline font-medium"
                >
                  View Engineering & Technology by type (IIT, NIT, Central University, …) →
                </Link>
              </div>
            )}
          </>
        )}

        <div className="college-list-scroll max-h-[70vh] overflow-y-auto overflow-x-hidden pr-1" style={{ scrollbarGutter: 'stable' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutions.map((inst) => (
            <GlassCard hover key={inst.id} className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 glass-card-hover flex items-center justify-center rounded-lg flex-shrink-0">
                  <FiBook className="text-3xl text-cyberpunk-cyan" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-heading font-semibold text-white mb-2 truncate">
                    {inst.name}
                  </h3>
                  <div className="flex items-center gap-2 text-light-textMuted dark:text-gray-400 text-sm mb-2">
                    <FiMapPin className="flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {[inst.city, inst.state].filter(Boolean).join(', ') || '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-light-accent dark:text-cyberpunk-green text-sm font-medium">{inst.college_type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-dark-border mt-auto">
                <span className="text-light-textCourse dark:text-gray-500 text-sm">{(inst.discipline || []).join(', ')}</span>
                <Link
                  to={`/colleges/${selectedCategory === 'all' ? categorySlugForInst(inst) : selectedCategory}/${inst.id}`}
                  className="text-cyberpunk-cyan hover:text-cyberpunk-pink transition-colors text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>
            </GlassCard>
          ))}
          </div>
        </div>

        {filteredInstitutions.length === 0 && (
          <p className="text-light-textMuted dark:text-gray-500">No institutions in this category yet. Add data to Eng-institutions.json.</p>
        )}
      </div>
    </main>
  )
}

export default Colleges
