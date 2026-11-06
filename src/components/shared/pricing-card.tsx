import { Check, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/types/content";

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <Card
      className={cn(
        "relative h-full transition-all duration-300 hover:shadow-xl",
        tier.highlighted
          ? "bg-secondary text-secondary-foreground ring-2 ring-primary/60 shadow-xl shadow-secondary/15"
          : "ring-1 ring-foreground/10 hover:ring-primary/40 hover:-translate-y-0.5"
      )}
    >
      <CardContent className="flex h-full flex-1 flex-col justify-between">
        <div>
          {tier.badge && (
            <Badge
              className={cn(
                "w-fit px-3 py-1 text-xs font-semibold tracking-wider uppercase shadow-sm",
                tier.highlighted ? "bg-gold text-secondary" : "bg-primary/15 text-primary"
              )}
            >
              {tier.badge}
            </Badge>
          )}
          <h3 className={cn("font-heading text-2xl font-medium", tier.badge ? "mt-4" : "mt-1")}>
            {tier.name}
          </h3>
          <p
            className={cn(
              "mt-1.5 text-xs font-semibold tracking-wider uppercase",
              tier.highlighted ? "text-secondary-foreground/75" : "text-foreground/60"
            )}
          >
            {tier.duration}
          </p>
          <p
            className={cn(
              "mt-4 text-3xl font-medium tracking-tight",
              tier.highlighted ? "text-gold" : "text-primary"
            )}
          >
            {tier.price}
          </p>
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed",
              tier.highlighted ? "text-secondary-foreground/80" : "text-foreground/70"
            )}
          >
            {tier.description}
          </p>
        </div>

        <ul className="my-4.5 flex-1 space-y-2 text-sm">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  tier.highlighted ? "text-gold" : "text-primary"
                )}
              />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <Button
            render={<a href={tier.ctaHref} target="_blank" rel="noopener noreferrer" />}
            variant={tier.highlighted ? "default" : "outline"}
            size="lg"
            className={cn(
              "w-full font-semibold shadow-sm transition-all",
              tier.highlighted
                ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25 dark:bg-primary dark:text-white dark:hover:bg-primary/85"
                : "border-border text-foreground hover:bg-primary hover:text-white hover:border-primary dark:border-border dark:text-foreground dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary"
            )}
          >
            {tier.ctaLabel ?? "Get This Package"}
            <ArrowUpRight className="size-4.5" />
          </Button>
          {tier.note && (
            <p
              className={cn(
                "mt-2.5 flex min-h-[2.5rem] items-center justify-center text-center text-xs leading-snug",
                tier.highlighted ? "text-secondary-foreground/70" : "text-foreground/60"
              )}
            >
              {tier.note}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
