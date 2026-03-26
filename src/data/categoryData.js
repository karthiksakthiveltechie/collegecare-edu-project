/**
 * @deprecated Prefer getCategoryMenuFromInstitutions() from institutionsLoader.js.
 * Category menu is now derived from Eng-institutions.json — no hardcoded college lists.
 * Kept for backward compatibility only.
 */
export const categoryData = [
  {
    name: "Engineering",
    slug: "engineering",
    colleges: [
      { name: "IIT Delhi", slug: "iit-delhi" },
      { name: "NIT Trichy", slug: "nit-trichy" },
      { name: "BITS Pilani", slug: "bits-pilani" },
      { name: "VIT Vellore", slug: "vit-vellore" },
      { name: "SRM University", slug: "srm-university" },
      { name: "Manipal Institute", slug: "manipal-institute" },
    ],
  },
  {
    name: "Medical",
    slug: "medical",
    colleges: [
      { name: "AIIMS Delhi", slug: "aiims-delhi" },
      { name: "CMC Vellore", slug: "cmc-vellore" },
      { name: "PGIMER Chandigarh", slug: "pgimer-chandigarh" },
      { name: "JIPMER Puducherry", slug: "jipmer-puducherry" },
      { name: "Lady Hardinge Medical College", slug: "lady-hardinge" },
      { name: "Grant Medical College", slug: "grant-medical-college" },
    ],
  },
  {
    name: "Arts & Science",
    slug: "arts-science",
    colleges: [
      { name: "St. Stephen's College", slug: "st-stephens" },
      { name: "Miranda House", slug: "miranda-house" },
      { name: "Loyola College Chennai", slug: "loyola-chennai" },
      { name: "Christ University", slug: "christ-university" },
      { name: "Presidency College", slug: "presidency-college" },
    ],
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    colleges: [
      { name: "IARI New Delhi", slug: "iari-delhi" },
      { name: "Punjab Agricultural University", slug: "pau-ludhiana" },
      { name: "TNAU Coimbatore", slug: "tnau-coimbatore" },
      { name: "G.B. Pant University", slug: "gb-pant-university" },
      { name: "NDRI Karnal", slug: "ndri-karnal" },
    ],
  },
  {
    name: "Law",
    slug: "law",
    colleges: [
      { name: "NLU Delhi", slug: "nlu-delhi" },
      { name: "NLSIU Bangalore", slug: "nlsiu-bangalore" },
      { name: "NALSAR Hyderabad", slug: "nalsar-hyderabad" },
      { name: "NLU Mumbai", slug: "nlu-mumbai" },
      { name: "Symbiosis Law School", slug: "symbiosis-law" },
    ],
  },
  {
    name: "Pharma",
    slug: "pharma",
    colleges: [
      { name: "NIPER Mohali", slug: "niper-mohali" },
      { name: "Manipal College of Pharmacy", slug: "manipal-pharmacy" },
      { name: "BITS Pilani Pharmacy", slug: "bits-pharmacy" },
      { name: "ICT Mumbai", slug: "ict-mumbai" },
      { name: "JSS College of Pharmacy", slug: "jss-pharmacy" },
    ],
  },
];
