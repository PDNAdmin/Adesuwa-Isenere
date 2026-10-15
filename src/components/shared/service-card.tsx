import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/lib/icons";
import type { Service } from "@/types/content";

export function ServiceCard({
  service,
  isSpan = false,
}: {
  service: Service;
  isSpan?: boolean;
}) {
  return (
    <Card className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6 sm:p-7 lg:p-8">
        {/* Header: Icon & Category/Audience Badge */}
        <div className="flex items-center justify-between gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blush text-primary ring-1 ring-primary/15 shadow-2xs transition-transform duration-300 group-hover:scale-105 dark:bg-primary/20 dark:text-pink-200 dark:ring-primary/30">
            <DynamicIcon name={service.icon} className="size-5.5" />
          </span>
          {service.audience && (
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium tracking-wide text-secondary ring-1 ring-secondary/20 dark:bg-gold/15 dark:text-gold dark:ring-gold/30">
              {service.audience}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-5 font-heading text-xl font-medium sm:text-2xl text-foreground transition-colors group-hover:text-primary text-balance">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/75 flex-1">
          {service.description}
        </p>

        {/* Focus Areas as Pill Badges */}
        <div className="mt-6 border-t border-border/60 pt-5">
          <span className="mb-2.5 block text-xs font-medium uppercase tracking-wider text-foreground/50">
            Key Focus Areas
          </span>
          <div className="flex flex-wrap gap-2">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center rounded-full bg-blush/70 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10 dark:bg-primary/20 dark:text-pink-200 dark:ring-primary/30"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-5 border-t border-border/50 pt-4">
          <Link
            href="/services#booking"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary dark:hover:text-gold group/link"
          >
            <span>Explore counseling packages</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

