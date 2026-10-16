import type { Service } from "@/types/content";

// Draft copy - intake form left service descriptions blank (Q5).
// Replace with Adesuwa's own wording before launch.
export const services: Service[] = [
  {
    icon: "heart-handshake",
    title: "Individual Counseling",
    audience: "Singles & Personal Growth",
    description:
      "One-on-one sessions for singles navigating emotional patterns, past hurt, or decisions about relationships - a space to understand yourself before you build with someone else.",
    features: ["Emotional healing", "Relationship readiness", "Personal growth"],
  },
  {
    icon: "users",
    title: "Pre-Marital & Couples Counseling",
    audience: "Couples & Intending",
    description:
      "For couples preparing for marriage or working through challenges together - honest, guided conversations that build a healthier foundation.",
    features: ["Pre-marital preparation", "Communication & conflict", "Building trust"],
  },
  {
    icon: "home",
    title: "Family Counseling",
    audience: "Families & Systems",
    description:
      "Support for families navigating patterns that started long before this generation, breaking cycles and building healthier home dynamics.",
    features: ["Family systems", "Generational patterns", "Cultural & faith context"],
  },
  {
    icon: "graduation-cap",
    title: "Trainings & Workshops",
    audience: "Groups & Organizations",
    description:
      "Group trainings on wellness and relationships for singles and newly married couples, drawn from Adesuwa's books, courses, and counseling practice.",
    features: ["Group workshops", "Online courses", "Relationship education"],
  },
];
