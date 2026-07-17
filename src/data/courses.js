/**
 * Course catalogues by discipline (from src/doc/COURSES.xlsx).
 * Used by header Courses menu and /courses/:discipline pages.
 */
import coursesData from './coursesData.json'

export const COURSE_DISCIPLINES = [
  {
    id: 'engineering',
    label: 'Engineering',
    path: '/courses/engineering',
    description: 'Undergraduate engineering and technology programmes.',
  },
  {
    id: 'medical',
    label: 'Medical',
    path: '/courses/medical',
    description: 'Medical and AYUSH degree programmes.',
  },
  {
    id: 'allied-healthcare',
    label: 'Allied Healthcare',
    path: '/courses/allied-healthcare',
    description: 'Pharmacy, nursing, and allied health science courses.',
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    path: '/courses/agriculture',
    description: 'Agricultural science and technology programmes.',
  },
  {
    id: 'arts-science',
    label: 'Arts & Science',
    path: '/courses/arts-science',
    description: 'Arts, science, commerce, and computer applications.',
  },
  {
    id: 'law',
    label: 'Law',
    path: '/courses/law',
    description: 'Integrated and LLB law degree programmes.',
  },
  {
    id: 'pg',
    label: 'PG',
    path: '/courses/pg',
    description: 'Postgraduate programmes (MBA, MCA, M.E/M.Tech).',
  },
]

export function getDisciplineBySlug(slug) {
  return COURSE_DISCIPLINES.find((d) => d.id === slug) ?? null
}

/**
 * Returns normalized course groups for a discipline.
 * Shape: [{ title?: string, courses: string[] }]
 */
export function getCoursesForDiscipline(slug) {
  const raw = coursesData[slug]
  if (!raw) return []

  if (slug === 'agriculture' && typeof raw === 'object' && !Array.isArray(raw)) {
    return [
      { title: 'Agricultural Science Courses', courses: raw.science ?? [] },
      { title: 'Agricultural Technology Courses', courses: raw.technology ?? [] },
    ]
  }

  if (Array.isArray(raw)) {
    return [{ courses: raw }]
  }

  return []
}

export function getCourseCount(slug) {
  return getCoursesForDiscipline(slug).reduce((n, g) => n + g.courses.length, 0)
}
