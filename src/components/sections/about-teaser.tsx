import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/content";

export function AboutTeaser({ content }: { content: HomePageContent["aboutPreview"] }) {
  return (
    <Section className="border-b border-border/70">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <SectionHeading eyebrow={content.smallHeading} title={content.heading} />
        <AnimatedReveal delay={0.1} className="space-y-4 text-base leading-relaxed text-foreground/70">
          {content.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <Button variant="link" className="px-0 text-primary" render={<Link href="/about" prefetch={true} />}>
            {content.linkLabel}
            <ArrowRight className="size-4" />
          </Button>
        </AnimatedReveal>
      </div>
    </Section>
  );
}
