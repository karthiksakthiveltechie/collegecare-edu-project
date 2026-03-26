# College Care - Higher Education Consulting Website

A modern, responsive website for College Care built with React, Tailwind CSS, and featuring a Cyberpunk Glassmorphism design aesthetic.

## Features

- **Cyberpunk Glassmorphism Design**: Modern UI with glassmorphism effects, neon accents, and smooth animations
- **Responsive Design**: Fully responsive across all device sizes
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels, keyboard navigation, and focus indicators
- **Authentication**: Complete login/signup system with protected routes
- **Comprehensive Navigation**: All main sections including Colleges, Study Abroad, Services, Entrance Exams, Gallery, and About Us
- **Dynamic Content**: Filterable grids, carousels, and interactive components

## Tech Stack

- React 18+
- React Router DOM 6+
- Tailwind CSS 3+
- React Icons
- Vite
- Axios

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, Navigation
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── sections/     # Page sections
├── pages/            # Page components
├── context/          # React Context (Auth)
├── hooks/            # Custom hooks
├── utils/            # Utility functions
└── styles/           # Global styles
```

## Design Philosophy

### Cyberpunk Glassmorphism

- **Color Palette**: Neon cyan, electric blue, hot pink with dark backgrounds
- **Glass Effects**: Semi-transparent backgrounds with backdrop blur
- **Neon Accents**: Glowing borders and hover effects
- **Typography**: Futuristic fonts for headings, modern sans-serif for body

## Pages

- **Home**: Hero section, trending updates, testimonials, contact form
- **Colleges**: Filterable grid of colleges by category (Engineering, Medical, Allied Healthcare, Law, Arts & Science, Master's)
- **Study Abroad**: Country-wise university listings (USA, UK, Australia, Russia, Germany)
- **Services**: Free counseling and management quota booking
- **Entrance Exams**: GATE, NEET, JEE information
- **Gallery**: Image gallery with lightbox
- **About Us**: Company information, mission, vision, why choose us
- **Login/Signup**: Authentication pages

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Required for counselling form:** Set `VITE_FORMSPREE_COUNSELLING_URL` to your Formspree form URL (e.g. `https://formspree.io/f/xxxxxxxx`). Create a form at [formspree.io](https://formspree.io) with recipient info@collegecare.in. For production (Vercel, Netlify, etc.), add this variable in the hosting platform's environment settings and redeploy.

**Optional – Gallery auto-update:** Set `VITE_PEXELS_API_KEY` to a [free Pexels API key](https://www.pexels.com/api) to load gallery images from Pexels by category (Campus, Events, Students, Achievements). If unset, the gallery uses the built-in curated image list.

## License

This project is proprietary and confidential.
