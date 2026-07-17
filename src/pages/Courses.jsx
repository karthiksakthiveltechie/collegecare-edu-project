import React, { useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import {
  COURSE_DISCIPLINES,
  getDisciplineBySlug,
  getCoursesForDiscipline,
  getCourseCount,
} from '../data/courses'

const BASE_URL = 'https://collegecare.in'

const Courses = () => {
  const { discipline: disciplineSlug } = useParams()
  const discipline = getDisciplineBySlug(disciplineSlug)
  const groups = useMemo(
    () => (disciplineSlug ? getCoursesForDiscipline(disciplineSlug) : []),
    [disciplineSlug]
  )
  const total = disciplineSlug ? getCourseCount(disciplineSlug) : 0

  if (!disciplineSlug) {
    return <Navigate to={COURSE_DISCIPLINES[0].path} replace />
  }

  if (!discipline) {
    return <Navigate to="/courses" replace />
  }

  const pageUrl = `${BASE_URL}${discipline.path}`

  return (
    <div className="min-h-[60vh] bg-light-bg dark:bg-dark-bg">
      <SEO
        title={`${discipline.label} Courses`}
        description={discipline.description}
        path={discipline.path}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Courses', url: `${BASE_URL}/courses` },
          { name: discipline.label, url: pageUrl },
        ])}
      />
      <JsonLd
        data={buildWebPageSchema({
          name: `${discipline.label} Courses - College Care`,
          description: discipline.description,
          url: pageUrl,
        })}
      />

      <section className="border-b border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
          <nav className="mb-3 text-sm text-light-textMuted dark:text-gray-400" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-light-primary dark:hover:text-cyberpunk-cyan">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to="/courses" className="hover:text-light-primary dark:hover:text-cyberpunk-cyan">
                  Courses
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-light-text dark:text-gray-200">{discipline.label}</li>
            </ol>
          </nav>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-light-text dark:text-white">
            {discipline.label} Courses
          </h1>
          <p className="mt-2 max-w-2xl text-light-textMuted dark:text-gray-400">
            {discipline.description}{' '}
            <span className="text-light-text dark:text-gray-300 font-medium">
              ({total} {total === 1 ? 'course' : 'courses'})
            </span>
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-56 shrink-0" aria-label="Course disciplines">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-light-textMuted dark:text-gray-500 mb-2">
              Disciplines
            </h2>
            <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {COURSE_DISCIPLINES.map((d) => {
                const active = d.id === disciplineSlug
                return (
                  <li key={d.id} className="shrink-0">
                    <Link
                      to={d.path}
                      className={`block whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                        active
                          ? 'bg-light-navItemActiveBg text-light-navItemActiveText font-medium dark:bg-white/10 dark:text-cyberpunk-cyan'
                          : 'text-light-text dark:text-gray-300 hover:bg-light-listHover dark:hover:bg-white/5'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {d.label}
                      <span className="ml-1.5 text-xs text-light-textMuted dark:text-gray-500">
                        ({getCourseCount(d.id)})
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>

          <div className="min-w-0 flex-1 space-y-8">
            {groups.map((group, gi) => (
              <section key={group.title ?? gi} aria-labelledby={group.title ? `group-${gi}` : undefined}>
                {group.title && (
                  <h2
                    id={`group-${gi}`}
                    className="mb-3 font-heading text-lg font-semibold text-light-text dark:text-white"
                  >
                    {group.title}
                  </h2>
                )}
                <ol className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card divide-y divide-light-border dark:divide-dark-border overflow-hidden">
                  {group.courses.map((name, i) => (
                    <li
                      key={`${name}-${i}`}
                      className="flex gap-3 px-4 py-2.5 text-sm text-light-textCourse dark:text-gray-200 hover:bg-light-listHover dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="w-8 shrink-0 tabular-nums text-light-textMuted dark:text-gray-500">
                        {i + 1}.
                      </span>
                      <span className="min-w-0 leading-snug">{name}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
