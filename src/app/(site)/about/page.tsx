import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants";
import { getAboutPage, getSiteSettings } from "@/lib/content";
import { DynamicIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "About Adesuwa Isenérè | Marriage & Family Counselor",
  description:
    "Meet Adesuwa Isenérè, Marriage & Family Counselor and founder of Merry Hearts Counselling. Learn about her clinical mission to help individuals and couples heal, break patterns, and build healthy relationships.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About Adesuwa Isenérè | Marriage & Family Counselor",
    description:
      "Marriage & Family Counselor, Author, Speaker, and Podcast Host. Helping people break generational patterns, heal emotional wounds, and build healthy relationships.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.practiceName,
    type: "profile",
    locale: "en_NG",
    images: [
      {
        url: "/images/adesuwa-about.jpg",
        width: 1200,
        height: 630,
        alt: `Adesuwa Isenérè - Marriage & Family Counselor`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Adesuwa Isenérè | Marriage & Family Counselor",
    description:
      "Meet Adesuwa Isenérè - Marriage & Family Counselor of Merry Hearts Counselling. Healing wounds and breaking patterns.",
    images: ["/images/adesuwa-about.jpg"],
  },
};

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow={page.banner.smallHeading}
        title={page.banner.heading}
        description={page.banner.intro}
      />

      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
          <AnimatedReveal className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-foreground/5">
              <Image
                src={page.photo}
                alt={settings.counsellorName}
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 24rem, 85vw"
                className="object-cover"
                priority
              />
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1} className="flex flex-col justify-center">
            <span className="font-heading text-sm font-medium tracking-[0.2em] text-primary uppercase">
              {page.story.smallHeading}
            </span>
            <h2 className="mt-2.5 font-heading text-2xl font-medium leading-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
              {page.story.heading}
            </h2>
            <div className="mt-5 space-y-4 text-base sm:text-lg leading-relaxed text-foreground/80">
              {page.story.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </AnimatedReveal>
        </div>
      </Section>

      <Section background="blush">
        <SectionHeading
          eyebrow={page.missionVisionSection.smallHeading}
          title={page.missionVisionSection.heading}
          description={page.missionVisionSection.intro}
          align="center"
        />
        <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
          <AnimatedReveal delay={0.08} className="h-full">
            <Card className="h-full border-border/60 bg-card/90 shadow-xs backdrop-blur-xs transition-all duration-300 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 items-center justify-center rounded-full bg-blush text-primary">
                    <Compass className="size-5" />
                  </span>
                  <h3 className="font-heading text-xl font-medium text-foreground">Mission</h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground/75">{page.mission}</p>
              </CardContent>
            </Card>
          </AnimatedReveal>

          <AnimatedReveal delay={0.16} className="h-full">
            <Card className="h-full border-border/60 bg-card/90 shadow-xs backdrop-blur-xs transition-all duration-300 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 items-center justify-center rounded-full bg-blush text-primary">
                    <Sparkles className="size-5" />
                  </span>
                  <h3 className="font-heading text-xl font-medium text-foreground">Vision</h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground/75">{page.vision}</p>
              </CardContent>
            </Card>
          </AnimatedReveal>
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading
          eyebrow={page.valuesSection.smallHeading}
          title={page.valuesSection.heading}
          description={page.valuesSection.intro}
          align="center"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {page.values.map((value, i) => {
            return (
              <AnimatedReveal key={value.title} delay={i * 0.1}>
                <Card className="h-full text-center">
                  <CardContent className="flex h-full flex-col items-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-blush text-primary">
                      <DynamicIcon name={value.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-lg">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedReveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
