# Institutions Data Architecture

## Single source of truth: `src/data/Eng-institutions.json`

- **Manually maintained:** The file is parsed/curated externally and uploaded by replacing the file. No project scripts (e.g. ingest or parse scripts) write to or modify `Eng-institutions.json`.
- **One canonical file** for all institutions (MoE, UGC, IIT Council, etc.).
- **One canonical record per institution**; duplicates from multiple source files are merged during ingestion.
- **No hardcoded college lists in UI**; menus and pages are derived from this data.

---

## Schema (mandatory)

Each institution must follow:

```json
{
  "id": "string (url-safe, unique)",
  "name": "string (official name)",
  "discipline": ["Engineering"],
  "college_type": "IIT | NIT | Central University | Deemed University | State University | Other",
  "funding": "Central | State | Private | null",
  "city": "string | null",
  "state": "string | null",
  "official_website": "string | null",
  "source": "MoE | UGC | IIT Council | Other",
  "status": "active"
}
```

- **Discipline** = primary grouping (e.g. Engineering, Medical, Law).
- **college_type** = secondary grouping (IIT, NIT, Central University, etc.). Only the allowed values above.
- Use `null` for unknown fields; do not invent data.

---

## Engineering page grouping (data-driven)

Hierarchy is **derived from data**, not hardcoded:

```
Engineering
 ├── IIT     → [list from data]
 ├── NIT     → [list from data]
 ├── Central University
 ├── Deemed University
 └── State University
```

- Implemented by `groupEngineering(data)` in `src/data/institutionUtils.js`.
- Engineering page: `src/pages/Engineering.jsx` (route: `/colleges/engineering`).

---

## Extensibility (no UI refactor)

The same model supports future disciplines with **only data append**:

| Discipline | Example college_type | Source |
|------------|----------------------|--------|
| Medical    | AIIMS, Other         | MoE    |
| Law        | NLU, Other           | Other  |
| Pharma     | NIPER, Other         | Other  |
| Management | IIM, Other           | Other  |

- Add new institutions to `Eng-institutions.json` with the appropriate `discipline` and `college_type`.
- Add the discipline slug/label in `institutionsLoader.js` → `disciplineSlugMap` / `slugToLabel` (and in Colleges.jsx `slugToLabel` / `labelToSlug` if needed).
- **No change** to Engineering logic or to the grouping utilities; they already filter by `discipline` and `college_type`.

---

## Source file processing (automation)

1. **Parse** each uploaded `.docx` / `.xlsx` (MoE, UGC, IIT list, etc.).
2. **Extract** institution names (and any metadata: city, state, website).
3. **Normalize** naming; assign correct `college_type` and `source` per file.
4. **Deduplicate** by normalized name key; merge into one canonical record per institution.
5. **Append** to `Eng-institutions.json` (or regenerate the file from all sources).

Script: `scripts/parse_institutions.py`  
Dependencies: `python-docx`, `openpyxl` (see `scripts/requirements-parser.txt`).

```bash
pip install -r scripts/requirements-parser.txt
python scripts/parse_institutions.py
```

Output: `src/data/Eng-institutions.json` (overwritten). Source dir is set inside the script (e.g. `k:\CollegeCare-Doc\listofcollegespart1`).

---

## Validation (prevent schema drift)

- **Runtime:** `institutionsLoader.js` runs `validateInstitutionsSchema()` in development and logs warnings.
- **CI / manual:** Run `node scripts/validate_institutions.js` (Node must resolve ES modules; project uses `"type": "module"` or run with `node --experimental-vm-modules` if needed).

Validation rules (see `institutionUtils.js`):

- `institutions` is an array; each item is an object.
- Required: `id`, `name`, `discipline`, `college_type`, `source`, `status`.
- `college_type` must be one of: IIT, NIT, Central University, Deemed University, State University, Other.
- `discipline` must be an array.
- `id` must be a url-safe string (lowercase, hyphens).

---

## Anti-patterns to avoid

- Do not hardcode institution names or lists in UI components.
- Do not create separate data files per discipline; keep one `Eng-institutions.json`.
- Do not duplicate the same institution; merge on ingest.
- Do not tie UI logic to a single source (e.g. MoE) or to a fixed list of colleges.

---

## Cursor-friendly automation steps

1. **Add new institutions:** Edit `Eng-institutions.json` (or run the parser after adding new source files).
2. **Add new discipline:** Add entries to `disciplineSlugMap` / `slugToLabel` in `institutionsLoader.js` and to `slugToLabel` / `labelToSlug` in `Colleges.jsx`; add institutions with that `discipline`.
3. **Validate:** Run `node scripts/validate_institutions.js` before committing.
4. **Re-ingest from docs:** Update `parse_institutions.py` if new file types or columns; run script and then validate.

This keeps the model scalable and avoids UI refactors when new disciplines or institutions are added.
