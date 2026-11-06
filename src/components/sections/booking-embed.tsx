import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function BookingEmbed() {
  return (
    <Section id="booking">
      <SectionHeading
        eyebrow="Book a Session"
        title="Find a time that works for you"
        description="Pick a slot below and I'll confirm your session shortly after."
        align="center"
      />
    </Section>
  );
}
