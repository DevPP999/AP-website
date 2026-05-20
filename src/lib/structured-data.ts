// Structured Data Generator for better SEO

export interface OrganizationData {
  name: string;
  description: string;
  url: string;
  logo: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface ProductData {
  name: string;
  description: string;
  image: string;
  category: string;
  brand: string;
  sku?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export interface ArticleData {
  headline: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  publisher: string;
}

// Organization Schema
export function generateOrganizationSchema(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    ...(data.address && {
      address: {
        "@type": "PostalAddress",
        ...data.address,
      },
    }),
    ...(data.contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...data.contactPoint,
      },
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  };
}

// Product Schema
export function generateProductSchema(data: ProductData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    image: data.image,
    category: data.category,
    brand: {
      "@type": "Brand",
      name: data.brand,
    },
    ...(data.sku && { sku: data.sku }),
    ...(data.offers && {
      offers: {
        "@type": "Offer",
        ...data.offers,
      },
    }),
  };
}

// Article Schema
export function generateArticleSchema(data: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    image: data.image,
    author: {
      "@type": "Person",
      name: data.author,
    },
    publisher: {
      "@type": "Organization",
      name: data.publisher,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ Schema
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Local Business Schema
export function generateLocalBusinessSchema(data: {
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  openingHours?: string[];
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    address: {
      "@type": "PostalAddress",
      ...data.address,
    },
    ...(data.openingHours && { openingHours: data.openingHours }),
    ...(data.priceRange && { priceRange: data.priceRange }),
  };
}
