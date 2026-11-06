import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function NewsletterCTA({
  heading,
  text,
  signupUrl,
  buttonLabel,
}: {
  heading: string;
  text: string;
  signupUrl: string;
  buttonLabel: string;
}) {
  return (
    <Section
      id="newsletter"
      className="relative overflow-hidden border-t border-border/80 bg-secondary text-secondary-foreground dark:border-border/40 dark:bg-linear-to-b dark:from-[#2a0e18] dark:to-[#1a070e]"
    >
      {/* Ambient background glow for dark mode luminosity */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-gold/20 blur-3xl dark:bg-gold/25" />

      <AnimatedReveal className="relative mx-auto max-w-2xl text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30 shadow-sm backdrop-blur-xs">
          <Mail className="size-5 text-gold" />
        </span>
        <h2 className="mt-4 font-heading text-3xl font-medium text-balance sm:text-4xl text-secondary-foreground">
          {heading}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-base leading-relaxed text-secondary-foreground/80 sm:text-lg">
          {text}
        </p>

        <Button
          size="lg"
          className="mt-6 h-12 rounded-xl px-7 text-sm font-semibold shadow-md transition-all bg-gold text-[#2a1015] hover:bg-gold/90 dark:shadow-gold/20"
          render={<a href={signupUrl} target="_blank" rel="noopener noreferrer" />}
        >
          {buttonLabel}
          <ArrowUpRight className="size-4" />
        </Button>
        <p className="mt-3 text-xs text-secondary-foreground/60">
          Opens a secure sign-up form in a new tab. No spam, unsubscribe anytime.
        </p>
      </AnimatedReveal>
    </Section>
  );
}
