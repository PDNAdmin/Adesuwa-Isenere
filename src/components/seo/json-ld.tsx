import { siteConfig } from "@/lib/constants";
import type { Faq, PricingTier, Product, Service, SiteSettings } from "@/types/content";

function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${siteConfig.url}${path}`;
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Global WebSite schema establishing identity and indexing parameters
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.practiceName} | ${siteConfig.name}`,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-US",
  };
}

/**
 * Verified LocalBusiness & CounselingService schema
 * Captures Lagos physical appointment presence and nationwide/worldwide virtual channels
 */
export function getOrganizationSchema(settings: SiteSettings) {
  const sameAsLinks = [...settings.socialLinks.map((s) => s.url), settings.selarStoreUrl];

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: settings.practiceName,
    alternateName: `${settings.counsellorName} - Marriage & Family Counselor`,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: settings.phone,
    email: settings.email,
    priceRange: "₦₦ - ₦₦₦",
    image: `${siteConfig.url}/images/logo-mark-light.png`,
    logo: `${siteConfig.url}/images/logo-mark-light.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "6.5244",
      longitude: "3.3792",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Lagos",
      },
      {
        "@type": "Country",
        name: "Nigeria",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide (Virtual Consultations)",
      },
    ],
    availableService: [
      {
        "@type": "MedicalTherapy",
        name: "Marriage & Family Counseling",
        serviceType: "Counseling",
      },
      {
        "@type": "MedicalTherapy",
        name: "Individual Relationship Counseling",
        serviceType: "Counseling",
      },
      {
        "@type": "MedicalTherapy",
        name: "Pre-Marital Counseling",
        serviceType: "Counseling",
      },
    ],
    sameAs: sameAsLinks,
  };
}

/**
 * Practitioner Person schema for Adesuwa Isenérè
 * Strict E-E-A-T attribution without inventing unverified credentials
 */
export function getPersonSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#practitioner`,
    name: settings.counsellorName,
    jobTitle: "Marriage & Family Counselor",
    description:
      "Marriage & Family Counselor, Author of Before You Say Yes, Speaker, and Podcast Host of Heartdrops with Suess.",
    image: `${siteConfig.url}/images/adesuwa-about.jpg`,
    url: `${siteConfig.url}/about`,
    worksFor: {
      "@id": `${siteConfig.url}/#organization`,
    },
    sameAs: settings.socialLinks.map((s) => s.url),
    knowsAbout: [
      "Relationship Counseling",
      "Marriage Counseling",
      "Pre-Marital Counseling",
      "Family Dynamics",
      "Emotional Healing",
      "Conflict Resolution",
    ],
  };
}

/**
 * BreadcrumbList schema matching visible hierarchy
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${siteConfig.url}${item.path}`,
      })),
    ],
  };
}

/**
 * Schema representing the practice's counseling services and structured packages
 */
export function getServicesSchema(services: Service[], pricingTiers: PricingTier[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      ...services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@id": `${siteConfig.url}/#organization`,
          },
          serviceType: service.title,
          areaServed: {
            "@type": "Country",
            name: "Nigeria",
          },
        },
      })),
      ...pricingTiers.map((tier, index) => ({
        "@type": "ListItem",
        position: services.length + index + 1,
        item: {
          "@type": "Service",
          name: tier.name,
          description: tier.description,
          provider: {
            "@id": `${siteConfig.url}/#organization`,
          },
          offers: {
            "@type": "Offer",
            price: tier.price,
            priceCurrency: "NGN",
            url: absoluteUrl(tier.ctaHref),
            availability: "https://schema.org/InStock",
          },
        },
      })),
    ],
  };
}

/**
 * FAQPage schema built from the questions shown on the Services page
 */
export function getFaqSchema(faqs: Faq[]) {
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

/**
 * Media & Books schema for Before You Say Yes and Online Courses
 */
export function getMediaSchema(products: Product[]) {
  const books = products.filter((p) => p.kind === "book");
  const courses = products.filter((p) => p.kind === "course");

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      ...books.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: book.title,
          description: book.description,
          author: {
            "@id": `${siteConfig.url}/#practitioner`,
          },
          url: book.href,
          ...(book.image && { image: absoluteUrl(book.image) }),
        },
      })),
      ...courses.map((course, index) => ({
        "@type": "ListItem",
        position: books.length + index + 1,
        item: {
          "@type": "Course",
          name: course.title,
          description: course.description,
          provider: {
            "@id": `${siteConfig.url}/#organization`,
          },
          url: course.href,
          ...(course.image && { image: absoluteUrl(course.image) }),
        },
      })),
    ],
  };
}
