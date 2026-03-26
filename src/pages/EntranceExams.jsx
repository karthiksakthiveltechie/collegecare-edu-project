import React from 'react'
import GlassCard from '../components/ui/GlassCard'
import NeonButton from '../components/ui/NeonButton'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import { FiCalendar, FiBook, FiAward, FiDownload } from 'react-icons/fi'

const EntranceExams = () => {
  const exams = [
    {
      id: 1,
      name: 'GATE',
      fullName: 'Graduate Aptitude Test in Engineering',
      date: 'February 2026',
      description: 'National level examination for admission to M.Tech and Ph.D. programs in IITs, NITs, and other top engineering colleges.',
      eligibility: 'Bachelor\'s degree in Engineering/Technology',
      subjects: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Chemical'],
      resources: ['Previous year papers', 'Mock tests', 'Study materials'],
    },
    {
      id: 2,
      name: 'NEET',
      fullName: 'National Eligibility cum Entrance Test',
      date: 'May 2026',
      description: 'National level medical entrance examination for admission to MBBS, BDS, and other medical courses.',
      eligibility: '10+2 with Physics, Chemistry, Biology',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      resources: ['NCERT books', 'Practice tests', 'Video lectures'],
    },
    {
      id: 3,
      name: 'JEE',
      fullName: 'Joint Entrance Examination',
      date: 'April 2026 (Main), June 2026 (Advanced)',
      description: 'Engineering entrance examination for admission to IITs, NITs, and other premier engineering institutes.',
      eligibility: '10+2 with Physics, Chemistry, Mathematics',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      resources: ['Previous papers', 'Online coaching', 'Study plans'],
    },
  ]

  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="Entrance Exams 2026 - GATE, NEET, JEE, CAT & More"
        description="Complete guide to top entrance exams in India including GATE, NEET, JEE Main, CAT, and UPSC. Get exam dates, eligibility criteria, syllabus, and preparation tips."
        path="/entrance-exams"
        keywords="entrance exams India 2026, GATE exam, NEET exam, JEE Main, CAT exam, UPSC, exam dates, eligibility"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'Entrance Exams', url: 'https://collegecare.in/entrance-exams' },
      ])} />
      <JsonLd data={buildWebPageSchema({
        name: 'Entrance Exams 2026 - Complete Guide',
        description: 'Complete guide to top entrance exams in India including GATE, NEET, JEE Main, CAT, and UPSC.',
        url: 'https://collegecare.in/entrance-exams',
      })} />
      <div className="container mx-auto">
        <h1 className="section-title mb-8">Entrance Exams</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <GlassCard hover key={exam.id} className="p-6 md:p-8 flex flex-col h-full">
              <div className="mb-6">
                <h2 className="text-3xl font-heading font-bold text-cyberpunk-cyan mb-2">
                  {exam.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{exam.fullName}</p>
                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <FiCalendar className="text-cyberpunk-green" aria-hidden="true" />
                  <span className="text-sm">{exam.date}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6 flex-1">{exam.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-cyberpunk-cyan font-semibold mb-2 flex items-center gap-2">
                    <FiBook className="text-sm" aria-hidden="true" />
                    Eligibility
                  </h3>
                  <p className="text-gray-400 text-sm">{exam.eligibility}</p>
                </div>

                <div>
                  <h3 className="text-cyberpunk-cyan font-semibold mb-2 flex items-center gap-2">
                    <FiAward className="text-sm" aria-hidden="true" />
                    Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {exam.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass-card rounded-full text-xs text-gray-300"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-cyberpunk-cyan font-semibold mb-2 flex items-center gap-2">
                    <FiDownload className="text-sm" aria-hidden="true" />
                    Resources
                  </h3>
                  <ul className="space-y-1">
                    {exam.resources.map((resource, index) => (
                      <li key={index} className="text-gray-400 text-sm">
                        • {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-dark-border">
                <NeonButton variant="secondary" className="flex-1">
                  Learn More
                </NeonButton>
                <NeonButton className="flex-1">
                  Apply Now
                </NeonButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12">
          <GlassCard className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-cyberpunk-cyan mb-4">
                Need Help Preparing?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Our expert counselors can help you create a personalized study plan and guide you 
                through the preparation process for any entrance exam.
              </p>
              <NeonButton className="text-lg px-8 py-4">
                Get Free Counseling
              </NeonButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

export default EntranceExams
