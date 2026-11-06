import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    kind: "book",
    title: "Before You Say Yes",
    description:
      "The conversations, questions, and truths that prepare you for marriage - a guide for every woman standing at a crossroad, helping you choose better before you commit.",
    href: "https://selar.com/375d867615",
    ctaLabel: "Buy the Book",
    badge: "Featured",
    image: "/images/BeforeYouSayYesEbook.jpeg",
    featured: true,
  },
  {
    kind: "course",
    title: "Online Courses",
    description:
      "Self-paced online courses on relationship wellness, healing, and building healthy relationships.",
    href: "https://selar.com/m/heartdropswithsuess",
    ctaLabel: "Explore Courses",
    image: "/images/online-courses.jpg",
    badge: "Masterclass",
  },
];
