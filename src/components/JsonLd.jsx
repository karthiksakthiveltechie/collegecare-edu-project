import { Helmet } from 'react-helmet-async'

const JsonLd = ({ data }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
)

export default JsonLd

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'College Care',
  alternateName: 'CollegeCare',
  url: 'https://collegecare.in',
  logo: 'https://collegecare.in/college-care-logo.png',
  description:
    "India's trusted higher education consulting platform with 12+ years of excellence helping 1000+ students with college admissions, entrance exams, study abroad guidance, and free counselling.",
  foundingDate: '2014',
  email: 'info@collegecare.in',
  telephone: '+917871002025',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '696, Outer-Byepass road (Avalurpet Road Junction)',
    addressLocality: 'Thiruvannamalai',
    addressRegion: 'Tamil Nadu',
    postalCode: '606604',
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  sameAs: [],
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10 },
  slogan: 'Defining your way to Education',
}

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'College Care',
  image: 'https://collegecare.in/college-care-logo.png',
  url: 'https://collegecare.in',
  telephone: '+917871002025',
  email: 'info@collegecare.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '696, Outer-Byepass road (Avalurpet Road Junction)',
    addressLocality: 'Thiruvannamalai',
    addressRegion: 'Tamil Nadu',
    postalCode: '606604',
    addressCountry: 'IN',
  },
  priceRange: 'Free Counselling',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1000',
    bestRating: '5',
  },
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildWebPageSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'College Care',
      url: 'https://collegecare.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'College Care',
      logo: {
        '@type': 'ImageObject',
        url: 'https://collegecare.in/college-care-logo.png',
      },
    },
  }
}
