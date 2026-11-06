import { Quote, Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { cn } from "@/lib/utils";
import type { SectionText, Testimonial } from "@/types/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialTile({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="group/tile flex h-64 w-[320px] shrink-0 flex-col rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:w-[360px]">
      <div className="flex items-center justify-between">
        <Quote className="size-6 text-primary/25 transition-colors group-hover/tile:text-primary/50" />
        {testimonial.rating && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3",
                  i < testimonial.rating! ? "fill-gold text-gold" : "fill-transparent text-foreground/20"
                )}
              />
            ))}
          </div>
        )}
      </div>
      <blockquote className="mt-4 line-clamp-5 flex-1 text-sm leading-relaxed text-foreground/80 italic">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blush font-heading text-xs text-primary">
          {initials(testimonial.name)}
        </span>
        <div>
          <p className="font-heading text-sm">{testimonial.name}</p>
          {testimonial.role && <p className="text-xs text-foreground/60">{testimonial.role}</p>}
        </div>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: Testimonial[];
  duration: number;
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className="group/row overflow-hidden">
      <div
        className="animate-marquee flex w-max gap-6 group-hover/row:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((testimonial, i) => (
          <TestimonialTile key={testimonial.name + i} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialCarousel({
  testimonials,
  content,
}: {
  testimonials: Testimonial[];
  content: SectionText;
}) {
  if (testimonials.length === 0) return null;
  const rowOne = testimonials;
  const rowTwo = [...testimonials.slice(3), ...testimonials.slice(0, 3)];

  return (
    <Section background="muted" className="overflow-hidden">
      <SectionHeading
        eyebrow={content.smallHeading}
        title={content.heading}
        description={content.intro}
        align="center"
      />

      <AnimatedReveal delay={0.1} className="relative mt-8 -mx-4 space-y-6 sm:-mx-6 lg:-mx-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-muted to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-muted to-transparent sm:w-32" />

        <MarqueeRow items={rowOne} duration={46} />
        <MarqueeRow items={rowTwo} duration={52} reverse />
      </AnimatedReveal>
    </Section>
  );
}
