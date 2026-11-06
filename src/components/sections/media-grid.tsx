import { Podcast } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { ProductCard } from "@/components/shared/product-card";
import { SocialLinks } from "@/components/shared/social-links";
import type { MediaPageContent, Product, SocialLink } from "@/types/content";

export function MediaGrid({
  products,
  content,
  socialLinks,
}: {
  products: Product[];
  content: MediaPageContent;
  socialLinks: SocialLink[];
}) {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow={content.resourcesSection.smallHeading}
          title={content.resourcesSection.heading}
          description={content.resourcesSection.intro}
        />
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {products.map((product, i) => (
            <AnimatedReveal key={product.title} delay={i * 0.08}>
              <ProductCard product={product} />
            </AnimatedReveal>
          ))}
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading
          eyebrow={content.podcastSection.smallHeading}
          title={content.podcastSection.heading}
          align="center"
        />
        <AnimatedReveal delay={0.1} className="mx-auto mt-6 max-w-lg text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-blush text-primary">
            <Podcast className="size-5" />
          </span>
          {content.podcastSection.intro && (
            <p className="mt-3 text-foreground/70">{content.podcastSection.intro}</p>
          )}
          <SocialLinks links={socialLinks} className="mt-5 justify-center" />
        </AnimatedReveal>
      </Section>
    </>
  );
}
