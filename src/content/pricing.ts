import type { PricingTier } from "@/types/content";

// Sourced from the official Counselling Packages Price List.
// Every package is sold and booked through the Selar storefront.
export const pricingTiers: PricingTier[] = [
  {
    name: "Emotional/Heart Wellness Check-Up",
    price: "₦150,000 / $150",
    duration: "3 Sessions",
    description:
      "For when you feel overwhelmed, drained, or emotionally “off” and need clarity and stability.",
    features: [
      "Assess your current emotional & mental state",
      "Identify key stressors and emotional triggers",
      "Organise what feels scattered internally",
      "Practical tools to regain control quickly",
    ],
    note: "Additional sessions billed at ₦50,000/session.",
    ctaHref: "https://selar.com/ho746r29p2",
  },
  {
    name: "Uncovering Emotional Wounds",
    price: "₦300,000 / $300",
    duration: "Minimum of 6 Sessions",
    description:
      "For heartbreak, grief, childhood trauma, betrayal, or repeating patterns you're ready to break.",
    features: [
      "Identify and uncover root emotional wounds",
      "Process unresolved pain, hurt, betrayal & loss",
      "Break destructive emotional patterns",
      "Build healthier emotional responses",
    ],
    note: "Additional sessions billed at ₦50,000/session.",
    ctaHref: "https://selar.com/954e9l8674",
    highlighted: true,
    badge: "Most Booked",
  },
  {
    name: "Clarity Counseling",
    price: "₦200,000 / $200",
    duration: "4 Sessions",
    description:
      "For when you feel stuck, confused, or unsure about a decision and need clear direction.",
    features: [
      "Break down your situation objectively",
      "Identify what's actually holding you back",
      "Cut through confusion and overthinking",
      "Guide you toward a clear, confident decision",
    ],
    note: "Additional sessions billed at ₦50,000/session.",
    ctaHref: "https://selar.com/42cm8t44w9",
  },
  {
    name: "Conflict Resolution",
    price: "₦520,000 / $520",
    duration: "8 Sessions (4 Individual, 4 Joint)",
    description:
      "For a friendship, partnership, or collaboration stuck in tension you want to preserve.",
    features: [
      "A safe space to be heard individually",
      "Identify the root of the conflict",
      "Facilitated, structured conversations",
      "Practical conflict-navigation skills",
    ],
    note: "₦50,000/individual session, ₦80,000/couple session.",
    ctaHref: "https://selar.com/9m0681548t",
  },
  {
    name: "Marriage Enrichment",
    price: "₦400,000 / $400",
    duration: "5 Couple Sessions",
    description:
      "For married couples who want to move from routine coexistence to intentional connection.",
    features: [
      "Improve communication & emotional understanding",
      "Resolve recurring conflict patterns",
      "Rebuild emotional & physical intimacy",
      "Strengthen trust, teamwork & shared vision",
    ],
    note: "₦50,000/individual session, ₦80,000/couple session.",
    ctaHref: "https://selar.com/4wzu498q49",
  },
  {
    name: "Infidelity Recovery",
    price: "₦680,000 / $680",
    duration: "10 Sessions (4 Individual, 6 Couples)",
    description:
      "For a relationship shaken by infidelity, to process pain and decide whether to rebuild or release.",
    features: [
      "Private space to process pain, shame & grief",
      "Honest, structured partner conversations",
      "Work through the deeper wounds involved",
      "Rebuild trust, intimacy & communication",
    ],
    note: "₦50,000/individual session, ₦80,000/couple session.",
    ctaHref: "https://selar.com/m/heartdropswithsuess",
  },
  {
    name: "Premarital Counseling",
    price: "₦1,040,000 / $1,040",
    duration: "16 Sessions (8 Individual, 8 Couple)",
    description:
      "For couples preparing for marriage who want to build intentionally, not by trial and error.",
    features: [
      "Communication and conflict resolution",
      "Expectations, roles & values alignment",
      "Emotional intelligence in your relationship",
      "Finances, intimacy, sex & long-term vision",
    ],
    note: "₦50,000/individual session, ₦80,000/couple session.",
    ctaHref: "https://docs.google.com/forms/d/e/1FAIpQLSfcM8H-u-u__iV1_VawQ7mzT3E_RLCUxdxChIRiY49PQ4Y4CA/viewform",
  },
  {
    name: "Platinum Package",
    price: "Custom Pricing",
    duration: "10-Hour Deep-Dive + 30 Days Support",
    description:
      "A discreet, white-glove experience with a personalised blueprint and direct 30-day access.",
    features: [
      "2-hour private, high-impact coaching session",
      "Personalised Relationship Blueprint & Curriculum",
      "Premium digital workbooks & guided journals",
      "WhatsApp/Email support for 30 days",
    ],
    note: "Pricing shared after a brief consultation & qualification process.",
    ctaHref: "/contact",
    ctaLabel: "Book a Consultation",
  },
];
