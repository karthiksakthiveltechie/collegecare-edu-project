/**
 * Single source of truth: load all discipline JSON files and expose for UI.
 * Engineering & Technology, Medical, Arts & Science, Agriculture, Law — each from its own file.
 * Accepts flat array or section-based format; normalizes to flat list.
 */
import rawEngData from "./Eng-institutions.json";
import rawMedicalData from "./Medical_institutions.json";
import rawArtsScienceData from "./Arts-Science-institutions.json";
import rawAgricultureData from "./Agriculture_institutions.json";
import rawLawData from "./Law-institutions.json";
import {
  normalizeEngInstitutionsData,
  normalizeAgricultureData,
  validateInstitutionsSchema,
  groupEngineering,
  groupBySectionLabel,
  slugifyCollegeType,
} from "./institutionUtils";

const institutionsData = [
  ...normalizeEngInstitutionsData(rawEngData),
  ...normalizeEngInstitutionsData(rawMedicalData),
  ...normalizeEngInstitutionsData(rawArtsScienceData),
  ...normalizeAgricultureData(rawAgricultureData),
  ...normalizeEngInstitutionsData(rawLawData),
];

// Optional: validate on load in development to catch schema drift
if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
  const { valid, errors } = validateInstitutionsSchema(institutionsData);
  if (!valid) {
    console.warn("[institutions] schema validation issues:", errors);
  }
}

/** Canonical list of all institutions (do not mutate). */
export const institutions = Array.isArray(institutionsData) ? institutionsData : [];

/**
 * Discipline names for UI (e.g. Course Preference dropdown).
 * Derived from category menu so it stays in sync with current and future discipline data.
 * @param {Array} [data] - institutions (default: loaded)
 * @returns {string[]} Sorted display names e.g. ["Agriculture", "Arts & Science", "Engineering & Technology", "Medical", ...]
 */
export function getDisciplineNamesForCoursePreference(data = institutions) {
  const menu = getCategoryMenuFromInstitutions(data, { includeEmpty: false });
  const names = menu.map((c) => c.name).filter(Boolean);
  return [...new Set(names)].sort();
}

/**
 * Build category menu structure from data.
 * Engineering uses college_type groups (IIT | NIT | Central University | ...); others use flat colleges.
 *
 * @param {Array} [data] - institutions array (default: loaded institutions)
 * @param {{ includeEmpty?: boolean }} [opts]
 * @returns {Array<{ name: string, slug: string, colleges?: Array<{ name: string, slug: string }>, groups?: Array<{ collegeType: string, colleges: Array<{ name: string, slug: string }> }> }>}
 */
export function getCategoryMenuFromInstitutions(data = institutions, opts = {}) {
  const includeEmpty = opts.includeEmpty ?? false;
  const disciplineSlugMap = {
    engineering: "Engineering",
    medical: "Medical",
    "arts-science": "Arts & Science",
    law: "Law",
    pharma: "Pharma",
    agriculture: "Agriculture",
  };
  const slugToLabel = {
    engineering: "Engineering & Technology",
    medical: "Medical",
    "arts-science": "Arts & Science",
    law: "Law",
    pharma: "Pharma",
    agriculture: "Agriculture",
  };

  const result = [];
  for (const [slug, discipline] of Object.entries(disciplineSlugMap)) {
    const list = (data || []).filter(
      (inst) => inst.discipline && inst.discipline.includes(discipline)
    );
    if (list.length === 0 && !includeEmpty) continue;

    if (slug === "engineering") {
      const { groups } = groupEngineering(data || []);
      result.push({
        name: slugToLabel[slug] || discipline,
        slug,
        groups: groups.map((g) => ({
          collegeType: g.collegeType,
          colleges: g.institutions.map((inst) => ({ name: inst.name, slug: inst.id })),
        })),
      });
    } else if (slug === "medical" || slug === "arts-science" || slug === "agriculture" || slug === "law") {
      const { groups } = groupBySectionLabel(data || [], discipline);
      if (groups.length > 0) {
        result.push({
          name: slugToLabel[slug] || discipline,
          slug,
          groups: groups.map((g) => ({
            collegeType: g.groupLabel,
            colleges: g.institutions.map((inst) => ({ name: inst.name, slug: inst.id })),
          })),
        });
      } else {
        result.push({
          name: slugToLabel[slug] || discipline,
          slug,
          colleges: list.map((inst) => ({ name: inst.name, slug: inst.id })),
        });
      }
    } else {
      result.push({
        name: slugToLabel[slug] || discipline,
        slug,
        colleges: list.map((inst) => ({ name: inst.name, slug: inst.id })),
      });
    }
  }
  return result;
}

/**
 * Discipline value used in institution data for filtering (e.g. "Engineering", "Medical").
 * Use this when filtering institutions by category; do not use slugToLabel (display name).
 * @param {string} categorySlug - e.g. "engineering", "medical"
 * @returns {string}
 */
export function getDisciplineForFilter(categorySlug) {
  const disciplineSlugMap = {
    engineering: "Engineering",
    medical: "Medical",
    "arts-science": "Arts & Science",
    law: "Law",
    pharma: "Pharma",
    agriculture: "Agriculture",
  };
  return disciplineSlugMap[categorySlug] ?? categorySlug;
}

/**
 * For a given category slug, return a map of URL segment (college type slug) → display label.
 * Used to detect when /colleges/:category/:segment is a college type list vs college detail.
 * @param {string} categorySlug - e.g. "engineering", "medical"
 * @param {Array} [data] - institutions (default: loaded)
 * @returns {{ [slug: string]: string }}
 */
export function getCollegeTypeSlugToLabel(categorySlug, data = institutions) {
  const menu = getCategoryMenuFromInstitutions(data, { includeEmpty: false });
  const category = menu.find((c) => c.slug === categorySlug);
  if (!category?.groups?.length) return {};
  const map = {};
  for (const grp of category.groups) {
    const slug = slugifyCollegeType(grp.collegeType);
    if (slug) map[slug] = grp.collegeType;
  }
  return map;
}
