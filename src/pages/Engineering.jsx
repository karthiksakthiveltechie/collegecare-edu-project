/**
 * Engineering page: hierarchy derived from DATA only (Eng-institutions.json).
 * Structure: Engineering -> IIT -> [list], NIT -> [list], Central University -> [list], ...
 * No hardcoded college names; adding institutions requires only data append, no UI change.
 */
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import JsonLd, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/JsonLd'
import { institutions } from "../data/institutionsLoader";
import { groupEngineering } from "../data/institutionUtils";
import GlassCard from "../components/ui/GlassCard";
import { FiBook, FiMapPin } from "react-icons/fi";

const Engineering = () => {
  const { groups, total } = groupEngineering(institutions);

  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="Top Engineering Colleges in India 2026 - IITs, NITs & More"
        description="Discover the best engineering and technology colleges in India including IITs, NITs, and Central Universities. Compare programs, rankings, and admission requirements."
        path="/colleges/engineering"
        keywords="best engineering colleges India, IIT, NIT, engineering admissions 2026, B.Tech colleges India"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'Colleges', url: 'https://collegecare.in/colleges' },
        { name: 'Engineering', url: 'https://collegecare.in/colleges/engineering' },
      ])} />
      <JsonLd data={buildWebPageSchema({
        name: 'Top Engineering Colleges in India 2026',
        description: 'Discover the best engineering and technology colleges in India including IITs, NITs, and Central Universities.',
        url: 'https://collegecare.in/colleges/engineering',
      })} />
      <div className="container mx-auto">
        <h1 className="section-title mb-2">Engineering & Technology</h1>
        {/* Institutions grouped by type. Data from Eng-institutions.json — no hardcoded lists. (not shown in UI) */}

        {/* Hierarchy: Engineering -> IIT | NIT | Central University | ... - scrollable when list exceeds viewport */}
        <div className="college-list-scroll max-h-[75vh] overflow-y-auto overflow-x-hidden pr-1 space-y-10" style={{ scrollbarGutter: 'stable' }}>
          {groups.map(({ collegeType, institutions: list }) => (
            <section key={collegeType} className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-cyberpunk-cyan border-b border-dark-border pb-2">
                {collegeType}
                <span className="text-gray-500 font-normal text-base ml-2">({list.length})</span>
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
                {list.map((inst) => (
                  <li key={inst.id}>
                    <Link to={`/colleges/engineering/${inst.id}`}>
                      <GlassCard hover className="p-4 flex items-center gap-4 h-full">
                        <div className="w-12 h-12 glass-card-hover rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiBook className="text-2xl text-cyberpunk-cyan" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-white truncate">{inst.name}</div>
                          {(inst.city || inst.state) && (
                            <div className="flex items-center gap-1 text-gray-400 text-sm mt-0.5">
                              <FiMapPin className="flex-shrink-0" aria-hidden="true" />
                              <span className="truncate">
                                {[inst.city, inst.state].filter(Boolean).join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                      </GlassCard>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-8">Total: {total} engineering institutions.</p>
      </div>
    </main>
  );
};

export default Engineering;
