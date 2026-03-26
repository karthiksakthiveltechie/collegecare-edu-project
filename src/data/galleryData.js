/**
 * Curated copyright-free gallery images for Campus, Events, Students, Achievements.
 * Uses direct Unsplash URLs; no API key required. Attribution shown in lightbox.
 */

const GALLERY_IMAGES = [
  // Campus
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1580582932707-2d4c4a1f5b8a?w=600&q=80',
    category: 'campus',
    title: 'College Library',
    attribution: {
      name: 'Annie Spratt',
      profileUrl: 'https://unsplash.com/@anniespratt',
      sourceUrl: 'https://unsplash.com/s/photos/library',
      source: 'Unsplash',
    },
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
    category: 'campus',
    title: 'Campus Building',
    attribution: {
      name: 'Jeswin Thomas',
      profileUrl: 'https://unsplash.com/@jeswinthomas',
      sourceUrl: 'https://unsplash.com/s/photos/campus',
      source: 'Unsplash',
    },
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
    category: 'campus',
    title: 'University Hall',
    attribution: {
      name: 'Mario Gogh',
      profileUrl: 'https://unsplash.com/@mariogogh',
      sourceUrl: 'https://unsplash.com/s/photos/university',
      source: 'Unsplash',
    },
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1541339907198-e891535b2c6c?w=600&q=80',
    category: 'campus',
    title: 'Campus Grounds',
    attribution: {
      name: 'Mufid Majnun',
      profileUrl: 'https://unsplash.com/@mufidmajnun',
      sourceUrl: 'https://unsplash.com/s/photos/university-building',
      source: 'Unsplash',
    },
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    category: 'campus',
    title: 'Graduation Day',
    attribution: {
      name: 'Good Free Photos',
      profileUrl: 'https://unsplash.com/@goodfreephotos',
      sourceUrl: 'https://unsplash.com/s/photos/graduation',
      source: 'Unsplash',
    },
  },
  // Events
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    category: 'events',
    title: 'Graduation Ceremony',
    attribution: {
      name: 'Hannah Olinger',
      profileUrl: 'https://unsplash.com/@hannaholingerr',
      sourceUrl: 'https://unsplash.com/s/photos/graduation-ceremony',
      source: 'Unsplash',
    },
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
    category: 'events',
    title: 'Seminar',
    attribution: {
      name: 'Headway',
      profileUrl: 'https://unsplash.com/@headwayio',
      sourceUrl: 'https://unsplash.com/s/photos/seminar',
      source: 'Unsplash',
    },
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
    category: 'events',
    title: 'Annual Event',
    attribution: {
      name: 'Hannah Olinger',
      profileUrl: 'https://unsplash.com/@hannaholingerr',
      sourceUrl: 'https://unsplash.com/s/photos/event',
      source: 'Unsplash',
    },
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
    category: 'events',
    title: 'Workshop',
    attribution: {
      name: 'Christina @ wocintechchat.com',
      profileUrl: 'https://unsplash.com/@wocintechchat',
      sourceUrl: 'https://unsplash.com/s/photos/workshop',
      source: 'Unsplash',
    },
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
    category: 'events',
    title: 'Conference',
    attribution: {
      name: 'Jason Goodman',
      profileUrl: 'https://unsplash.com/@jasongoodman_youxventures',
      sourceUrl: 'https://unsplash.com/s/photos/conference',
      source: 'Unsplash',
    },
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
    category: 'events',
    title: 'Campus Event',
    attribution: {
      name: 'Product School',
      profileUrl: 'https://unsplash.com/@productschool',
      sourceUrl: 'https://unsplash.com/s/photos/campus-event',
      source: 'Unsplash',
    },
  },
  // Students
  {
    id: 17,
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    category: 'students',
    title: 'Campus Life',
    attribution: {
      name: 'Jeswin Thomas',
      profileUrl: 'https://unsplash.com/@jeswinthomas',
      sourceUrl: 'https://unsplash.com/s/photos/student-life',
      source: 'Unsplash',
    },
  },
  {
    id: 18,
    url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80',
    category: 'students',
    title: 'Learning Together',
    attribution: {
      name: 'Jeswin Thomas',
      profileUrl: 'https://unsplash.com/@jeswinthomas',
      sourceUrl: 'https://unsplash.com/s/photos/learning',
      source: 'Unsplash',
    },
  },
  // Achievements
  {
    id: 19,
    url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80',
    category: 'achievements',
    title: 'Award Ceremony',
    attribution: {
      name: 'Austin Distel',
      profileUrl: 'https://unsplash.com/@austindistel',
      sourceUrl: 'https://unsplash.com/s/photos/award',
      source: 'Unsplash',
    },
  },
  {
    id: 20,
    url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80',
    category: 'achievements',
    title: 'Trophy',
    attribution: {
      name: 'Michał Parzuchowski',
      profileUrl: 'https://unsplash.com/@mparzuchowski',
      sourceUrl: 'https://unsplash.com/s/photos/trophy',
      source: 'Unsplash',
    },
  },
  {
    id: 21,
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
    category: 'achievements',
    title: 'Recognition',
    attribution: {
      name: 'Austin Distel',
      profileUrl: 'https://unsplash.com/@austindistel',
      sourceUrl: 'https://unsplash.com/s/photos/recognition',
      source: 'Unsplash',
    },
  },
  {
    id: 22,
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
    category: 'achievements',
    title: 'Excellence Award',
    attribution: {
      name: 'Christina @ wocintechchat.com',
      profileUrl: 'https://unsplash.com/@wocintechchat',
      sourceUrl: 'https://unsplash.com/s/photos/award-ceremony',
      source: 'Unsplash',
    },
  },
  {
    id: 23,
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    category: 'achievements',
    title: 'Team Achievement',
    attribution: {
      name: 'Christina @ wocintechchat.com',
      profileUrl: 'https://unsplash.com/@wocintechchat',
      sourceUrl: 'https://unsplash.com/s/photos/achievement',
      source: 'Unsplash',
    },
  },
  {
    id: 24,
    url: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80',
    category: 'achievements',
    title: 'Success Celebration',
    attribution: {
      name: 'Product School',
      profileUrl: 'https://unsplash.com/@productschool',
      sourceUrl: 'https://unsplash.com/s/photos/success',
      source: 'Unsplash',
    },
  },
]

export default GALLERY_IMAGES
