/**
 * Institution data utilities: grouping, validation, and extensibility.
 * Single source of truth: src/data/Eng-institutions.json
 * - Discipline is PRIMARY (e.g. Engineering, Medical, Law).
 * - college_type is SECONDARY grouping (IIT, NIT, Central University, etc.).
 * No hardcoded institution lists in UI; all derived from this data.
 *
 * @typedef {{
 *   id: string;
 *   name: string;
 *   discipline: string[];
 *   college_type: 'IIT'|'NIT'|'Central University'|'Deemed University'|'State University'|'TN Government'|'TN Private'|'TN State University'|'Other';
 *   group_label?: string|null;
 *   funding: string|null;
 *   city: string|null;
 *   state: string|null;
 *   address: string|null;
 *   zip: string|null;
 *   official_website: string|null;
 *   source: string;
 *   status: string;
 * }} Institution
 */

/** Allowed college_type values (secondary grouping) - do not extend without architecture review */
export const COLLEGE_TYPES = [
  "IIT",
  "NIT",
  "Central University",
  "Deemed University",
  "State University",
  "TN Government",
  "TN State University",
  "TN Private",
  "Other",
];

/** Order for Engineering page hierarchy (same order = consistent UX) */
const COLLEGE_TYPE_ORDER = [
  "IIT",
  "NIT",
  "Central University",
  "Deemed University",
  "State University",
  "TN Government",
  "TN State University",
  "TN Private",
  "Other",
];

/**
 * Slugify a college type or section label for URL segment (e.g. "State University" → "state-university").
 * @param {string} label
 * @returns {string}
 */
export function slugifyCollegeType(label) {
  if (label == null || typeof label !== "string") return "";
  return label
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Map section_id from extracted JSON to canonical college_type */
const SECTION_ID_TO_COLLEGE_TYPE = {
  engineering_deemeduniversity_list: "Deemed University",
  engineering_iit_college_list: "IIT",
  engineering_stateuniversity_list: "State University",
  engineering_nit_list: "NIT",
  engineering_centraluniversity_list: "Central University",
  /** Tamil Nadu engineering lists (Eng-institutions.json) */
  tn_govt: "TN Government",
  tn_private: "TN Private",
  tn_university: "TN State University",
  "medical-state": "State University",
  "medical-private": "Other",
  arts_science_state_list: "State University",
  arts_science_private_list: "Other",
};

/**
 * Normalize Eng-institutions.json: accept either flat array or section-based format.
 * Section-based format: [{ discipline_id, discipline_name, college_type_sections: [{ section_id, institutions }] }]
 * Output: flat array of { id, name, discipline, college_type, ... } for UI/validation.
 *
 * @param {unknown} raw - parsed Eng-institutions.json
 * @returns {Array<Institution>}
 */
export function normalizeEngInstitutionsData(raw) {
  if (!Array.isArray(raw)) return [];
  const first = raw[0];
  if (!first || typeof first !== "object") return raw;

  if (first.discipline_id != null && first.college_type_sections != null) {
    const out = [];
    for (const block of raw) {
      const disciplineName = block.discipline_name || block.discipline_id || "Engineering";
      const sections = Array.isArray(block.college_type_sections) ? block.college_type_sections : [];
      for (const section of sections) {
        // Support both formats:
        // 1) Legacy: { section_id, section_label, institutions: [] }
        // 2) Nested: { id, label, institutions?: [], children?: [{ id, label, institutions: [] }] }
        const sectionKey = section.section_id ?? section.id;
        const collegeType =
          (sectionKey && SECTION_ID_TO_COLLEGE_TYPE[sectionKey]) ||
          (sectionKey && String(sectionKey).includes("nit") ? "NIT" : null) ||
          (sectionKey && String(sectionKey).includes("central") ? "Central University" : null) ||
          "Other";

        const topLabel = section.section_label || section.sectionName || section.label || null;

        const isPlaceholderName = (name, label) => {
          if (!name || !label) return false;
          const norm = (v) => String(v).toLowerCase().replace(/[^a-z0-9]/g, "");
          const n = norm(name);
          const l = norm(label);
          if (!n || !l) return false;
          // Treat alias variants as equivalent placeholders
          const alias = new Map([
            ["govtaided", "governmentaided"],
            ["governmentaided", "governmentaided"],
          ]);
          const nn = alias.get(n) || n;
          const ll = alias.get(l) || l;
          return nn === ll;
        };

        const pushInstitution = (inst, label) => {
          if (!inst || !inst.id) return;
          const displayName = isPlaceholderName(inst.name, label)
            ? [label, inst.external_code || inst.city || inst.id].filter(Boolean).join(" - ")
            : (inst.name ?? "");
          out.push({
            id: inst.id,
            name: displayName,
            discipline: [disciplineName],
            college_type: collegeType,
            group_label: label ?? null,
            funding: inst.funding ?? null,
            city: inst.city ?? null,
            state: inst.state ?? null,
            address: inst.address ?? null,
            zip: inst.zip ?? null,
            official_website: inst.official_website ?? null,
            source: inst.source ?? "Other",
            status: inst.status ?? "active",
          });
        };

        // Nested children (e.g. TN Government -> University/Constituent/Govt Colleges/...)
        if (Array.isArray(section.children) && section.children.length > 0) {
          for (const child of section.children) {
            const childLabel = child?.label || child?.section_label || child?.sectionName || null;
            const list = Array.isArray(child?.institutions) ? child.institutions : [];
            for (const inst of list) {
              const instLabel = inst?.sub_category ?? childLabel ?? topLabel;
              pushInstitution(inst, instLabel);
            }
          }
          continue;
        }

        // Flat list at section level
        const list = Array.isArray(section.institutions) ? section.institutions : [];
        for (const inst of list) {
          const instLabel = inst?.sub_category ?? topLabel;
          pushInstitution(inst, instLabel);
        }
      }
    }
    return out;
  }

  return raw;
}

/**
 * Normalize Agriculture_institutions.json format: { discipline, sections: [{ type, institutions }] }.
 * Institutions use "University" or "Institute/University" as name.
 *
 * @param {unknown} raw - parsed Agriculture_institutions.json
 * @returns {Array<Institution>}
 */
function slugFromName(name) {
  if (!name || typeof name !== "string") return "institution";
  const s = name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-").trim();
  return s.slice(0, 80) || "institution";
}

export function normalizeAgricultureData(raw) {
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.sections)) return [];
  const disciplineName = raw.discipline || "Agriculture";
  const out = [];
  const seenIds = new Set();
  for (const section of raw.sections) {
    const collegeType = section.type === "State" ? "State University" : "Other";
    const sectionName = section.sectionName || "";
    const groupLabel = sectionName.includes("State") ? "State" : sectionName.includes("Private") ? "Private" : section.type || null;
    const list = Array.isArray(section.institutions) ? section.institutions : [];
    for (const inst of list) {
      const name = inst["University"] || inst["Institute/University"] || inst.University || inst["Institute/University"];
      if (!name) continue;
      let id = slugFromName(name);
      let c = 0;
      while (seenIds.has(id)) {
        c += 1;
        id = slugFromName(name) + "-" + c;
      }
      seenIds.add(id);
      out.push({
        id,
        name: String(name),
        discipline: [disciplineName],
        college_type: collegeType,
        group_label: groupLabel,
        funding: inst.Funding ?? null,
        city: inst.City ?? null,
        state: inst.State ?? null,
        address: inst.Address ?? null,
        zip: inst.Code ?? null,
        official_website: null,
        source: inst.Source ?? "Other",
        status: "active",
      });
    }
  }
  return out;
}

/**
 * Group institutions by discipline, then by college_type.
 * Use for Engineering page: Engineering -> IIT -> [list], NIT -> [list], ...
 * Extensible: same shape works for Medical (AIIMS, etc.), Law (NLUs), etc.
 *
 * @param {Array<Institution>} institutions - full list from Eng-institutions.json
 * @param {string} [discipline] - optional filter e.g. "Engineering"
 * @returns {{ byDiscipline: Record<string, Record<string, Institution[]>>, byCollegeType: Record<string, Institution[]> }}
 */
export function groupByDisciplineAndCollegeType(institutions, discipline) {
  const filtered = discipline
    ? institutions.filter((inst) => inst.discipline && inst.discipline.includes(discipline))
    : institutions;

  const byCollegeType = {};
  for (const type of COLLEGE_TYPES) {
    byCollegeType[type] = filtered.filter((inst) => inst.college_type === type);
  }

  const byDiscipline = {};
  const disciplines = [...new Set(filtered.flatMap((i) => i.discipline || []))];
  for (const d of disciplines) {
    byDiscipline[d] = {};
    for (const type of COLLEGE_TYPES) {
      byDiscipline[d][type] = filtered.filter(
        (inst) => (inst.discipline || []).includes(d) && inst.college_type === type
      );
    }
  }

  return { byDiscipline, byCollegeType };
}

/**
 * When a college_type bucket has multiple section labels (e.g. TN Govt vs TN University under State University),
 * split into subgroups for clearer UI. Single label or no labels → flat list (subgroups null).
 */
function engineeringSubgroupsForBucket(institutions) {
  const normalizeSubgroupLabel = (label) => {
    if (!label) return label;
    const s = String(label).trim();
    if (/^govt\s+colleges?$/i.test(s)) return "Government Colleges";
    return s;
  };
  const TN_GOVT_SUBGROUP_ORDER = [
    "University",
    "Constituent",
    "Government Colleges",
    "Government Aided",
    "Central",
  ];
  const subgroupRank = new Map(TN_GOVT_SUBGROUP_ORDER.map((name, idx) => [name, idx]));

  const labels = [...new Set((institutions || []).map((i) => normalizeSubgroupLabel(i.group_label)).filter(Boolean))];
  if (labels.length <= 1) return null;
  labels.sort((a, b) => {
    const rankA = subgroupRank.has(a) ? subgroupRank.get(a) : Number.MAX_SAFE_INTEGER;
    const rankB = subgroupRank.has(b) ? subgroupRank.get(b) : Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;
    return String(a).localeCompare(String(b));
  });
  return labels.map((groupLabel) => ({
    groupLabel,
    institutions: institutions.filter((i) => normalizeSubgroupLabel(i.group_label) === groupLabel),
  }));
}

/**
 * Group Engineering institutions by college_type for the Engineering page.
 * Hierarchy: Engineering -> IIT -> [list], NIT -> [list], Central University -> [list], ...
 * Derived from DATA only; no hardcoded college names.
 * Optional subgroups when multiple section labels share one college_type (e.g. State University).
 *
 * @param {Array<Institution>} data - full institutions array
 * @returns {{ groups: Array<{ collegeType: string, institutions: Institution[], subgroups: Array<{ groupLabel: string, institutions: Institution[] }>|null }>, total: number }}
 */
export function groupEngineering(data) {
  const engineering = (data || []).filter(
    (inst) => inst.discipline && inst.discipline.includes("Engineering")
  );
  const groups = COLLEGE_TYPE_ORDER.map((collegeType) => {
    const list = engineering.filter((inst) => inst.college_type === collegeType);
    if (list.length === 0) return null;
    const subgroups = engineeringSubgroupsForBucket(list);
    return { collegeType, institutions: list, subgroups };
  }).filter(Boolean);
  return { groups, total: engineering.length };
}

/**
 * Group institutions by group_label (section labels) for disciplines like Medical, Arts & Science, Agriculture.
 * Hierarchy: Discipline -> State -> [list], Private -> [list], ...
 *
 * @param {Array<Institution>} data - full institutions array
 * @param {string} discipline - discipline name e.g. "Medical", "Arts & Science", "Agriculture"
 * @returns {{ groups: Array<{ groupLabel: string, institutions: Institution[] }>, total: number }}
 */
export function groupBySectionLabel(data, discipline) {
  const filtered = (data || []).filter(
    (inst) => inst.discipline && inst.discipline.includes(discipline)
  );
  const groupLabels = [...new Set(filtered.map((inst) => inst.group_label).filter(Boolean))];
  groupLabels.sort();
  const groups = groupLabels.map((label) => ({
    groupLabel: label,
    institutions: filtered.filter((inst) => inst.group_label === label),
  })).filter((g) => g.institutions.length > 0);
  return { groups, total: filtered.length };
}

/**
 * Get a single institution by id (for detail pages).
 * @param {Array} data - full institutions array
 * @param {string} id - institution id (url-safe)
 */
export function getInstitutionById(data, id) {
  return (data || []).find((inst) => inst.id === id) ?? null;
}

/** Discipline display name → URL category slug (shared by search and Colleges). */
export const DISCIPLINE_TO_CATEGORY_SLUG = {
  Engineering: "engineering",
  "Engineering & Technology": "engineering",
  Medical: "medical",
  "Arts & Science": "arts-science",
  Law: "law",
  Pharma: "pharma",
  Agriculture: "agriculture",
};

/**
 * Get category slug for an institution (for building /colleges/:category/:id links).
 * @param {Institution} inst
 * @returns {string}
 */
export function getCategorySlugForInstitution(inst) {
  const first = inst.discipline && inst.discipline[0];
  return (first && DISCIPLINE_TO_CATEGORY_SLUG[first]) || "engineering";
}

const DEFAULT_SEARCH_LIMIT = 25;

/**
 * Search institutions by name, discipline (course), or college_type (institute/university type).
 * Case-insensitive substring match. Results include categorySlug for linking.
 *
 * @param {string} query - search term
 * @param {Array<Institution>} institutions - full list from institutionsLoader
 * @param {{ limit?: number }} [opts] - optional limit (default 25)
 * @returns {Array<Institution & { categorySlug: string }>}
 */
export function searchInstitutions(query, institutions, opts = {}) {
  const limit = opts.limit ?? DEFAULT_SEARCH_LIMIT;
  const noLimit = opts.noLimit === true;
  if (!query || typeof query !== "string") return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const list = Array.isArray(institutions) ? institutions : [];
  const out = [];
  for (const inst of list) {
    if (!inst || !inst.name) continue;
    const nameMatch = (inst.name || "").toLowerCase().includes(q);
    const disciplineMatch = Array.isArray(inst.discipline) && inst.discipline.some(
      (d) => (d || "").toLowerCase().includes(q)
    );
    const typeMatch = (inst.college_type || "").toLowerCase().includes(q);
    if (nameMatch || disciplineMatch || typeMatch) {
      out.push({
        ...inst,
        categorySlug: getCategorySlugForInstitution(inst),
      });
      if (!noLimit && out.length >= limit) break;
    }
  }
  return out;
}

/**
 * Validation: ensure each institution matches canonical schema.
 * Use in CI or before writing Eng-institutions.json to prevent schema drift.
 *
 * @param {unknown} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateInstitutionsSchema(data) {
  const errors = [];
  if (!Array.isArray(data)) {
    return { valid: false, errors: ["institutions must be an array"] };
  }

  const required = ["id", "name", "discipline", "college_type", "source", "status"];
  const allowedCollegeTypes = new Set(COLLEGE_TYPES);

  data.forEach((item, index) => {
    if (!item || typeof item !== "object") {
      errors.push(`[${index}] not an object`);
      return;
    }
    for (const key of required) {
      if (!(key in item)) {
        errors.push(`[${index}] missing required field: ${key}`);
      }
    }
    if (item.college_type != null && !allowedCollegeTypes.has(item.college_type)) {
      errors.push(`[${index}] invalid college_type: ${item.college_type}`);
    }
    if (item.discipline != null && !Array.isArray(item.discipline)) {
      errors.push(`[${index}] discipline must be an array`);
    }
    if (item.id != null && typeof item.id !== "string") {
      errors.push(`[${index}] id must be a string`);
    }
    if (item.id != null && !/^[a-z0-9_-]+$/.test(item.id)) {
      errors.push(`[${index}] id must be url-safe (lowercase, hyphens, underscores): ${item.id}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
