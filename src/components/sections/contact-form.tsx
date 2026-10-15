import { ArrowUpRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ContactPageContent } from "@/types/content";

// Icons follow the order of the highlights entered in the Studio.
const highlightIcons = [ShieldCheck, Clock, CheckCircle2];

export function ContactForm({
  content,
  formUrl,
}: {
  content: ContactPageContent["intakeForm"];
  formUrl: string;
}) {
  return (
    <section id="client-inquiry" aria-label={content.heading} className="h-full scroll-mt-24">
      <Card className="h-full border-border/80 shadow-sm flex flex-col justify-between">
      <CardContent className="flex h-full flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
              {content.badge}
            </Badge>
            <span className="text-xs text-foreground/50">{content.sideLabel}</span>
          </div>

          <h2 className="mt-4 font-heading text-2xl sm:text-3xl font-medium text-balance">
            {content.heading}
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/70">
            {content.intro}
          </p>

          <div className="mt-6 space-y-4 border-t border-border/60 pt-6 text-sm">
            {content.highlights.map((highlight, i) => {
              const Icon = highlightIcons[i % highlightIcons.length];
              return (
                <div key={i} className="flex items-start gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blush text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="font-heading text-xs text-foreground/60 uppercase tracking-wider">
                      {highlight.title}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/80">{highlight.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 border-t border-border/60 pt-5">
          <Button
            size="lg"
            className="w-full font-semibold shadow-sm"
            render={<a href={formUrl} target="_blank" rel="noopener noreferrer" />}
          >
            {content.buttonLabel}
            <ArrowUpRight className="size-4.5" />
          </Button>
          <p className="mt-2 text-center text-xs text-foreground/50">{content.buttonNote}</p>
        </div>
      </CardContent>
      </Card>
    </section>
  );
}
