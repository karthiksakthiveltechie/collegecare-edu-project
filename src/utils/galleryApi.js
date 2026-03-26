/**
 * Fetches gallery images from Pexels API by category. Results are cached in
 * sessionStorage (1 hour TTL) to stay within rate limits (200 req/hour).
 * Maps Pexels photo objects to the same shape as static galleryData.
 */

const PEXELS_API_BASE = 'https://api.pexels.com/v1'
const CACHE_KEY = 'collegecare_gallery_cache'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

const CATEGORY_QUERIES = {
  events: ['graduation ceremony', 'seminar workshop'],
  students: ['graduation students'],
  achievements: ['award ceremony', 'trophy achievement'],
}

/**
 * Map a Pexels photo to gallery image shape.
 * @param {Object} photo - Pexels API photo object
 * @param {string} category - gallery category
 * @param {number} index - index for unique id
 */
function mapPexelsPhotoToGallery(photo, category, index) {
  return {
    id: `pexels-${category}-${photo.id}-${index}`,
    url: photo.src?.medium || photo.src?.large || photo.src?.original,
    category,
    title: photo.alt || photo.photographer || 'Photo',
    attribution: {
      name: photo.photographer,
      profileUrl: photo.photographer_url,
      sourceUrl: photo.url,
      source: 'Pexels',
    },
  }
}

/**
 * Fetch photos for one category (one query). Uses first query only to limit API calls.
 */
async function fetchCategory(apiKey, category, perPage = 6) {
  const query = CATEGORY_QUERIES[category][0]
  const url = `${PEXELS_API_BASE}/search?query=${encodeURIComponent(query)}&per_page=${perPage}`
  const res = await fetch(url, {
    headers: { Authorization: apiKey },
  })
  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status}`)
  }
  const data = await res.json()
  const photos = data.photos || []
  return photos.map((p, i) => mapPexelsPhotoToGallery(p, category, i))
}

/**
 * Get cached gallery from sessionStorage if valid.
 * @returns {Array|null} Cached images or null if expired/missing
 */
function getCachedGallery() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { images, expiresAt } = JSON.parse(raw)
    if (Date.now() > expiresAt) return null
    return images
  } catch {
    return null
  }
}

/**
 * Store gallery in sessionStorage with TTL.
 */
function setCachedGallery(images) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        images,
        expiresAt: Date.now() + CACHE_TTL_MS,
      })
    )
  } catch {
    // ignore storage errors
  }
}

/**
 * Fetch all gallery images from Pexels (one request per category), merge and cache.
 * @param {string} apiKey - Pexels API key
 * @returns {Promise<Array>} Gallery images in same shape as galleryData.js
 */
export async function fetchGalleryFromPexels(apiKey) {
  const cached = getCachedGallery()
  if (cached && cached.length > 0) return cached

  const categories = Object.keys(CATEGORY_QUERIES)
  const results = await Promise.all(
    categories.map((cat) => fetchCategory(apiKey, cat))
  )
  const images = results.flat()
  setCachedGallery(images)
  return images
}
