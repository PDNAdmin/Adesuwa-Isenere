import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import { Hero } from "@/components/sections/hero";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { FeaturedBook } from "@/components/sections/featured-book";
import { NewsletterCTA } from "@/components/sections/newsletter-cta";
import {
  getFeaturedBook,
  getHomePage,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Marriage & Family Counselor in Lagos, Nigeria | Relationship Therapy",
  description:
    "Marriage & family counseling, emotional healing, and relationship therapy in Lagos, Nigeria and online worldwide with Adesuwa Isenérè of Merry Hearts Counselling.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Marriage & Family Counselor in Lagos, Nigeria | Adesuwa Isenérè",
    description:
      "Helping you heal, choose better, and love well. Marriage & family counseling, trainings, and relationship resources in Lagos, Nigeria and online worldwide.",
    url: siteConfig.url,
    siteName: siteConfig.practiceName,
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/images/adesuwa-hero.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Marriage & Family Counselor`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marriage & Family Counselor in Lagos, Nigeria | Adesuwa Isenérè",
    description:
      "Helping you heal, choose better, and love well. Relationship & marriage counseling in Lagos, Nigeria & online.",
    images: ["/images/adesuwa-hero.jpg"],
  },
};

export default async function HomePage() {
  const [page, settings, services, testimonials, featuredBook] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getServices(),
    getTestimonials(),
    getFeaturedBook(),
  ]);

  return (
    <>
      <Hero hero={page.hero} name={settings.counsellorName} />
      <AboutTeaser content={page.aboutPreview} />
      <ServicesGrid services={services} content={page.servicesSection} showAll={false} showCta />
      <TestimonialCarousel testimonials={testimonials} content={page.testimonialsSection} />
      <FeaturedBook book={featuredBook} content={page.featuredBook} />
      <NewsletterCTA heading={settings.newsletterHeading} text={settings.newsletterText} />
    </>
  );
}
