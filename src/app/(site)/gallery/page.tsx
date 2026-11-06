import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/layout/section";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { GalleryRow } from "@/components/sections/gallery-row";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants";
import { getGalleryAlbums, getGalleryPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery | Conferences, Speaking & Trainings",
  description:
    "Photos from conferences, speaking engagements, trainings and workshops with Adesuwa Isenérè of Merry Hearts Counselling.",
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
  },
  openGraph: {
    title: "Gallery | Adesuwa Isenérè",
    description:
      "Conferences, speaking engagements, trainings and moments from the work of Merry Hearts Counselling.",
    url: `${siteConfig.url}/gallery`,
    siteName: siteConfig.practiceName,
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/images/adesuwa-about.jpg",
        width: 1200,
        height: 630,
        alt: "Gallery - Adesuwa Isenérè",
      },
    ],
  },
};

export default async function GalleryPage() {
  const [page, albums] = await Promise.all([getGalleryPage(), getGalleryAlbums()]);

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Gallery", path: "/gallery" }])} />
      <PageHero
        eyebrow={page.banner.smallHeading}
        title={page.banner.heading}
        description={page.banner.intro}
      />

      <Section className="overflow-hidden">
        <div className="space-y-12 md:space-y-16">
          {albums.map((album, i) => (
            <AnimatedReveal key={album.name} delay={Math.min(i, 3) * 0.06}>
              <GalleryRow album={album} emptyMessage={page.emptyAlbumMessage} />
            </AnimatedReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
