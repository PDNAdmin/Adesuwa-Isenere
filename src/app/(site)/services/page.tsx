import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { ServiceCard } from "@/components/shared/service-card";
import { PricingCard } from "@/components/shared/pricing-card";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import {
  JsonLd,
  getBreadcrumbSchema,
  getServicesSchema,
  getFaqSchema,
} from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants";
import { getFaqs, getPackages, getServices, getServicesPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Relationship & Marriage Counseling Services | Lagos & Online Nigeria",
  description:
    "Professional relationship counseling, pre-marital therapy, family systems, and emotional healing packages with Adesuwa Isenérè in Lagos & online across Nigeria.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Relationship & Marriage Counseling Services | Merry Hearts Counselling",
    description:
      "Individual, pre-marital, couples and family counseling, plus specialized emotional healing packages. In-person in Lagos and virtual worldwide.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.practiceName,
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/images/adesuwa-hero.jpg",
        width: 1200,
        height: 630,
        alt: `Counseling Services - ${siteConfig.practiceName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Relationship & Marriage Counseling Services | Merry Hearts Counselling",
    description:
      "Individual, couples, pre-marital and family counseling in Lagos and virtual worldwide.",
    images: ["/images/adesuwa-hero.jpg"],
  },
};

export default async function ServicesPage() {
  const [page, services, pricingTiers, faqs] = await Promise.all([
    getServicesPage(),
    getServices(),
    getPackages(),
    getFaqs(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([{ name: "Services", path: "/services" }]),
          getServicesSchema(services, pricingTiers),
          getFaqSchema(faqs),
        ]}
      />
      <PageHero
        eyebrow={page.banner.smallHeading}
        title={page.banner.heading}
        description={page.banner.intro}
      />

      <Section>
        <SectionHeading
          eyebrow={page.servicesSection.smallHeading}
          title={page.servicesSection.heading}
          description={page.servicesSection.intro}
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
          {services.map((service, i) => (
            <AnimatedReveal key={service.title} delay={i * 0.08} className="h-full">
              <ServiceCard service={service} />
            </AnimatedReveal>
          ))}
        </div>
      </Section>

      <Section id="booking" background="blush">
        <SectionHeading
          eyebrow={page.pricingSection.smallHeading}
          title={page.pricingSection.heading}
          description={page.pricingSection.intro}
          align="center"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pricingTiers.map((tier, i) => (
            <AnimatedReveal key={tier.name} delay={i * 0.06} className="h-full">
              <PricingCard tier={tier} />
            </AnimatedReveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-foreground/60">
          {page.pricingFootnote}
        </p>
      </Section>

      <FaqAccordion faqs={faqs} content={page.faqSection} />
    </>
  );
}
