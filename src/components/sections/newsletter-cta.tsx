"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/layout/section";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { sendNewsletterSignup } from "@/lib/emailjs";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterCTA({ heading, text }: { heading: string; text: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterValues) {
    try {
      await sendNewsletterSignup(values);
      setSubmitted(true);
      reset();
      toast.success("You're subscribed! Look out for our next update.");
    } catch {
      toast.error("Something went wrong. Please try again in a moment.");
    }
  }

  return (
    <Section
      id="newsletter"
      className="relative overflow-hidden border-t border-border/80 bg-secondary text-secondary-foreground dark:border-border/40 dark:bg-gradient-to-b dark:from-[#2a0e18] dark:to-[#1a070e]"
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

        {submitted ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-gold/30 bg-gold/15 px-6 py-3 font-medium text-gold backdrop-blur-xs">
            <Check className="size-5" />
            Thank you for subscribing! Look out for our next update.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-start sm:gap-3"
            noValidate
          >
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                aria-invalid={!!errors.email}
                className={cn(
                  "h-12 w-full rounded-xl border px-4.5 text-base shadow-sm transition-colors",
                  "bg-card text-foreground border-border placeholder:text-foreground/50 focus-visible:border-primary focus-visible:ring-primary/25",
                  "dark:bg-[#2c131d] dark:text-[#fbefe4] dark:border-gold/30 dark:placeholder:text-[#fbefe4]/45 dark:focus-visible:border-gold dark:focus-visible:ring-gold/30"
                )}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-left text-xs font-medium text-destructive-foreground/90">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 shrink-0 rounded-xl px-7 text-sm font-semibold shadow-md transition-all sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-gold dark:text-[#2a1015] dark:hover:bg-gold/90 dark:shadow-gold/20"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Subscribe
            </Button>
          </form>
        )}
      </AnimatedReveal>
    </Section>
  );
}
