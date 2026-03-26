/**
 * Validate Eng-institutions.json against canonical schema.
 * Run: node scripts/validate_institutions.js
 * Use in CI to prevent schema drift.
 * Reports: missing required/optional fields, empty strings, invalid values, extra keys.
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { validateInstitutionsSchema, normalizeEngInstitutionsData } from "../src/data/institutionUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, "..", "src", "data", "Eng-institutions.json");

const REQUIRED_KEYS = ["id", "name", "discipline", "college_type", "source", "status"];
const OPTIONAL_KEYS = ["funding", "city", "state", "address", "zip", "official_website", "group_label"];
const SCHEMA_KEYS = [...REQUIRED_KEYS, ...OPTIONAL_KEYS];
const ALLOWED_SOURCES = new Set(["MoE", "UGC", "IIT Council", "Other"]);
const ALLOWED_FUNDING = new Set(["Central", "State", "Private", null]);

const raw = readFileSync(path, "utf-8");
let parsed;
try {
  parsed = JSON.parse(raw);
} catch (e) {
  console.error("Invalid JSON:", e.message);
  process.exit(1);
}

const data = normalizeEngInstitutionsData(parsed);
const { valid, errors } = validateInstitutionsSchema(data);
if (!valid) {
  console.error("Schema validation failed:");
  errors.forEach((e) => console.error("  ", e));
  process.exit(1);
}

const issues = [];
data.forEach((item, index) => {
  const keys = Object.keys(item);
  REQUIRED_KEYS.forEach((k) => {
    if (!keys.includes(k)) {
      issues.push(`[${index}] ${item.name || item.id}: missing required field "${k}"`);
    }
  });
  keys.forEach((k) => {
    if (!SCHEMA_KEYS.includes(k)) {
      issues.push(`[${index}] ${item.name || item.id}: extra key "${k}" (not in schema)`);
    }
  });
  ["funding", "city", "state", "address", "zip", "official_website"].forEach((k) => {
    if (item[k] === "") {
      issues.push(`[${index}] ${item.name || item.id}: "${k}" is empty string (use null)`);
    }
  });
  if (item.source != null && !ALLOWED_SOURCES.has(item.source)) {
    issues.push(`[${index}] ${item.name || item.id}: source "${item.source}" not in [MoE, UGC, IIT Council, Other]`);
  }
  if (item.funding != null && !ALLOWED_FUNDING.has(item.funding)) {
    issues.push(`[${index}] ${item.name || item.id}: funding "${item.funding}" not in [Central, State, Private, null]`);
  }
});

if (issues.length > 0) {
  console.error("Consistency / schema issues:");
  issues.forEach((e) => console.error("  ", e));
  process.exit(1);
}
console.log("OK: Eng-institutions.json is valid (" + data.length + " institutions). No missing or inconsistent fields.");
