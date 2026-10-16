import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HomePageContent, Service } from "@/types/content";

export function ServicesGrid({
  services,
  content,
  showAll = true,
  showCta = false,
  background = "default",
}: {
  services: Service[];
  content: HomePageContent["servicesSection"];
  showAll?: boolean;
  showCta?: boolean;
  background?: "default" | "muted" | "blush";
}) {
  const items = showAll ? services : services.slice(0, 3);
  const isThree = items.length === 3;

  return (
    <Section background={background}>
      <SectionHeading eyebrow={content.smallHeading} title={content.heading} description={content.intro} />
      <div
        className={cn(
          "mt-8 grid gap-6 lg:gap-8",
          isThree
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto"
        )}
      >
        {items.map((service, i) => {
          const isSpanningItem = isThree && i === 2;
          return (
            <AnimatedReveal
              key={service.title}
              delay={i * 0.08}
              className={cn("h-full", isSpanningItem && "sm:col-span-2 lg:col-span-1")}
            >
              <ServiceCard service={service} isSpan={isSpanningItem} />
            </AnimatedReveal>
          );
        })}
      </div>
      {showCta && (
        <div className="mt-8 text-center">
          <Button render={<Link href="/services" prefetch={true} />}>
            {content.buttonLabel}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </Section>
  );
}
