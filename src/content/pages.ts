import type {
  AboutPageContent,
  ContactPageContent,
  GalleryPageContent,
  HomePageContent,
  MediaPageContent,
  ServicesPageContent,
} from "@/types/content";

// Fallback copy for each page, used until the matching Sanity document is filled in, and the seed for it.

export const defaultHomePage: HomePageContent = {
  hero: {
    smallHeading: "Marriage & Family Counselor",
    headline: "Because healthy relationships begin with a healthy you.",
    intro:
      "Helping you heal, choose better, and love well - counseling, trainings, and resources for singles and newly married couples building relationships that last.",
    mainButtonLabel: "Book a Counselling Session",
    secondButtonLabel: "Meet Adesuwa",
    photo: "/images/adesuwa-hero.jpg",
    photoCaption: "Marriage & Family Counselor",
  },
  aboutPreview: {
    smallHeading: "About Adesuwa",
    heading: "My mission is to help you heal, choose better, and love well.",
    paragraphs: [
      "I became a counselor because I believe that most of the pain people carry in their relationships did not begin there - it began long before, in their first homes, in childhoods, in the patterns they watched and inherited and never had the right language for.",
      "My work is to help you find that language; to name what has been driving the patterns; to heal what needs healing, and to build a life and relationships that actually feel like yours.",
    ],
    linkLabel: "Read my full story",
  },
  servicesSection: {
    smallHeading: "What I Offer",
    heading: "Counseling, trainings & resources",
    intro:
      "Support for singles, couples, and families, whatever stage of the relationship journey you're in.",
    buttonLabel: "View all services",
  },
  testimonialsSection: {
    smallHeading: "Client Stories",
    heading: "Words from those I've walked with",
    intro: "Real feedback from the counselling client survey, shared with permission.",
  },
  featuredBook: {
    smallHeading: "Featured Book",
    secondButtonLabel: "Explore books & courses",
  },
};

export const defaultAboutPage: AboutPageContent = {
  banner: {
    smallHeading: "About Adesuwa",
    heading: "Break the pattern. Heal the wound. Build the life.",
  },
  photo: "/images/adesuwa-about.jpg",
  story: {
    smallHeading: "My Story & Approach",
    heading: "Helping you heal, choose better, and love well.",
    paragraphs: [
      "I became a counselor because I believe that most of the pain people carry in their relationships did not begin there. It began long before, in their first homes, in childhoods, in the patterns they watched and inherited and never had the right language for.",
      "My work is to help you find that language; to name what has been driving the patterns; to heal what needs healing and to build, on the other side of that work, a life and relationships that actually feel like yours.",
      "Whether you are navigating a relationship decision, healing from a painful past, or learning to love and be loved well, you are in the right place.",
    ],
  },
  missionVisionSection: {
    smallHeading: "Mission & Vision",
    heading: "Why I do this work",
    intro:
      "Every session, conversation, and resource is grounded in helping individuals and families build lasting emotional health.",
  },
  mission:
    "To help individuals, couples, and families break unhealthy emotional patterns, heal from the inside out, and build relationships that reflect their fullest potential through counseling, education, and honest conversation.",
  vision:
    "A world where emotional health is not a luxury, where healing is not a sign of weakness, and where every person has access to the tools, support, and truth they need to live and love well.",
  valuesSection: {
    smallHeading: "How I Work",
    heading: "What guides every session",
  },
  values: [
    {
      icon: "heart",
      title: "Compassion Without Compromise",
      description:
        "I lead with warmth in every interaction, while holding professional boundaries and clinical rigour with equal commitment.",
    },
    {
      icon: "shield-check",
      title: "Confidentiality as Sacred Trust",
      description:
        "What happens in the counseling room stays there. Every client's trust is the foundation of the work we do together.",
    },
    {
      icon: "sparkles",
      title: "Hope as a Clinical Commitment",
      description:
        "I believe people can change and healing is possible - no one is beyond help, growth, or the life they're hoping for.",
    },
  ],
};

export const defaultServicesPage: ServicesPageContent = {
  banner: {
    smallHeading: "Services",
    heading: "Counseling & Trainings",
    intro:
      "Offered through Merry Hearts Counselling, support for wherever you are in your relationship journey.",
  },
  servicesSection: {
    smallHeading: "Merry Hearts Counselling",
    heading: "How we can work together",
    intro:
      "Every service is rooted in compassion, confidentiality, and clinical excellence, practical support for singles, couples, and families.",
  },
  pricingSection: {
    smallHeading: "Pricing",
    heading: "Counseling packages",
    intro: "Every package is booked and paid for securely through Selar.",
  },
  pricingFootnote:
    "Each package is structured to deliver results within its stated sessions. If more support is needed, additional sessions are billed separately at the standard rate. Full booking, payment, and rescheduling terms are shared at checkout.",
  faqSection: {
    smallHeading: "FAQs",
    heading: "Common questions",
  },
};

export const defaultMediaPage: MediaPageContent = {
  banner: {
    smallHeading: "Media & Resources",
    heading: "Books, courses & conversations",
    intro:
      "Author, Speaker, Podcast Host - resources to support your journey beyond the counseling room.",
  },
  resourcesSection: {
    smallHeading: "Books & Materials",
    heading: "Resources to guide your journey",
    intro:
      "Practical, honest resources on relationships and wellness, starting with the book.",
  },
  podcastSection: {
    smallHeading: "Podcast & Speaking",
    heading: "Listen & connect",
    intro:
      "Catch episodes and conversations on healing, relationships, and everyday wisdom - follow along on YouTube and social media.",
  },
};

export const defaultContactPage: ContactPageContent = {
  banner: {
    smallHeading: "Contact",
    heading: "Let's start the conversation",
    intro: "Have a question, or ready to book? Reach out, I'd love to hear from you.",
  },
  directContact: {
    badge: "Direct Inquiries",
    sideLabel: "Lagos & Online",
    heading: "Get in Touch Directly",
    intro:
      "Have an urgent question, want to say hello, or prefer reaching out directly? Connect with Adesuwa through any of the channels below.",
    whatsappLinkLabel: "Chat on WhatsApp",
    virtualSessions: "worldwide (Zoom / Google Meet)",
    inPersonSessions: "in Lagos by appointment",
    followHeading: "Follow along",
    followText: "Episodes, reflections & updates",
  },
  intakeForm: {
    badge: "Confidential & Direct",
    sideLabel: "Google Form",
    heading: "Client Inquiry & Intake",
    intro:
      "Whether you are inquiring about individual counseling, marriage support, or booking a speaking engagement, please share a few details below so I can understand how best to support you.",
    highlights: [
      {
        title: "Confidential",
        text: "Your information is private and handled strictly by Adesuwa.",
      },
      {
        title: "Quick & Thoughtful",
        text: "Takes about 2-3 minutes to describe your background and goals.",
      },
      {
        title: "Prompt Follow-Up",
        text: "Expect a personal reply with session availability within 24-48 hours.",
      },
    ],
    buttonLabel: "Open Client Intake Form",
    buttonNote: "Opens securely in a new tab via Google Forms",
  },
};

export const defaultGalleryPage: GalleryPageContent = {
  banner: {
    smallHeading: "Gallery",
    heading: "Moments from the journey",
    intro:
      "Conferences, speaking engagements, trainings and the people along the way - a look inside the work.",
  },
  emptyAlbumMessage: "Photos coming soon",
};
