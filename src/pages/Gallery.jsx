import React, { useState, useEffect } from 'react'
import GlassCard from '../components/ui/GlassCard'
import SEO from '../components/SEO'
import JsonLd, { buildBreadcrumbSchema } from '../components/JsonLd'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import GALLERY_IMAGES from '../data/galleryData'
import { fetchGalleryFromPexels } from '../utils/galleryApi'

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [images, setImages] = useState(GALLERY_IMAGES)
  const [loading, setLoading] = useState(!!PEXELS_API_KEY)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (!PEXELS_API_KEY) return
    fetchGalleryFromPexels(PEXELS_API_KEY)
      .then((fetched) => {
        setImages(fetched)
        setApiError(null)
      })
      .catch(() => {
        setApiError('Could not load gallery; showing default images.')
        setImages(GALLERY_IMAGES)
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'campus', label: 'Campus' },
    { id: 'events', label: 'Events' },
    { id: 'students', label: 'Students' },
    { id: 'achievements', label: 'Achievements' },
  ]

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory)

  const currentIndex = selectedImage 
    ? filteredImages.findIndex(img => img.id === selectedImage.id)
    : -1

  const nextImage = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1])
    }
  }

  const prevImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1])
    }
  }

  return (
    <main className="py-12 md:py-20 px-4">
      <SEO
        title="Gallery - Campus Photos & Student Life"
        description="Browse our gallery of college campuses, student life, events, and success stories. See what life looks like at India's top colleges and universities."
        path="/gallery"
        keywords="college gallery, campus photos, student life India, college events, university campus"
      />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: 'https://collegecare.in/' },
        { name: 'Gallery', url: 'https://collegecare.in/gallery' },
      ])} />
      <div className="container mx-auto">
        <h1 className="section-title mb-8">Gallery</h1>

        {apiError && (
          <p className="mb-4 text-amber-400/90 text-sm" role="status">
            {apiError}
          </p>
        )}

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'glass-card-hover border-2 border-cyberpunk-cyan text-cyberpunk-cyan'
                    : 'glass-card text-gray-300 hover:text-cyberpunk-cyan hover:border-cyberpunk-cyan'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <GlassCard key={i} className="overflow-hidden">
                <div className="w-full h-64 bg-dark-card/50 animate-pulse rounded" />
              </GlassCard>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <GlassCard
              hover
              key={image.id}
              className="overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium">{image.title}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-cyberpunk-cyan transition-colors p-2"
                aria-label="Close lightbox"
              >
                <FiX className="text-3xl" aria-hidden="true" />
              </button>
              
              {currentIndex > 0 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-cyberpunk-cyan transition-colors p-3 glass-card rounded-lg"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="text-2xl" aria-hidden="true" />
                </button>
              )}
              
              {currentIndex < filteredImages.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-cyberpunk-cyan transition-colors p-3 glass-card rounded-lg"
                  aria-label="Next image"
                >
                  <FiChevronRight className="text-2xl" aria-hidden="true" />
                </button>
              )}
              
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg">{selectedImage.title}</p>
              {selectedImage.attribution && (
                <p className="text-white/70 text-center mt-2 text-sm">
                  Photo by{' '}
                  <a
                    href={selectedImage.attribution.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyberpunk-cyan hover:underline"
                  >
                    {selectedImage.attribution.name}
                  </a>
                  {' on '}
                  <a
                    href={selectedImage.attribution.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyberpunk-cyan hover:underline"
                  >
                    {selectedImage.attribution.source}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Gallery
