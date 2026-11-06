import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import type { Faq, SectionText } from "@/types/content";

export function FaqAccordion({ faqs, content }: { faqs: Faq[]; content: SectionText }) {
  if (faqs.length === 0) return null;

  return (
    <Section background="muted">
      <SectionHeading
        eyebrow={content.smallHeading}
        title={content.heading}
        description={content.intro}
        align="center"
      />
      <AnimatedReveal className="mx-auto mt-8 max-w-2xl" delay={0.1}>
        <Accordion className="rounded-2xl border border-border bg-card px-6 py-2 ">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={String(i)} className="p-2">
              <AccordionTrigger className="font-heading text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedReveal>
    </Section>
  );
}
