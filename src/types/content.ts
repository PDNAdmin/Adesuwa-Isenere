import type { IconKey } from "@/lib/icon-options";

export type SocialPlatform = "instagram" | "youtube" | "spotify" | "facebook" | "tiktok" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type SectionText = {
  smallHeading?: string;
  heading: string;
  intro?: string;
};

export type SiteSettings = {
  counsellorName: string;
  practiceName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  socialLinks: SocialLink[];
  selarStoreUrl: string;
  clientIntakeFormUrl: string;
  headerButtonLabel: string;
  footerNewsletterText: string;
  newsletterHeading: string;
  newsletterText: string;
};

export type HomePageContent = {
  hero: {
    smallHeading: string;
    headline: string;
    intro: string;
    mainButtonLabel: string;
    secondButtonLabel: string;
    photo: string;
    photoCaption: string;
  };
  aboutPreview: {
    smallHeading: string;
    heading: string;
    paragraphs: string[];
    linkLabel: string;
  };
  servicesSection: SectionText & { buttonLabel: string };
  testimonialsSection: SectionText;
  featuredBook: {
    smallHeading: string;
    secondButtonLabel: string;
  };
};

export type AboutValue = {
  icon: IconKey;
  title: string;
  description: string;
};

export type AboutPageContent = {
  banner: SectionText;
  photo: string;
  story: {
    smallHeading: string;
    heading: string;
    paragraphs: string[];
  };
  missionVisionSection: SectionText;
  mission: string;
  vision: string;
  valuesSection: SectionText;
  values: AboutValue[];
};

export type ServicesPageContent = {
  banner: SectionText;
  servicesSection: SectionText;
  pricingSection: SectionText;
  pricingFootnote: string;
  faqSection: SectionText;
};

export type MediaPageContent = {
  banner: SectionText;
  resourcesSection: SectionText;
  podcastSection: SectionText;
};

export type Highlight = {
  title: string;
  text: string;
};

export type ContactPageContent = {
  banner: SectionText;
  directContact: {
    badge: string;
    sideLabel: string;
    heading: string;
    intro: string;
    whatsappLinkLabel: string;
    virtualSessions: string;
    inPersonSessions: string;
    followHeading: string;
    followText: string;
  };
  intakeForm: {
    badge: string;
    sideLabel: string;
    heading: string;
    intro: string;
    highlights: Highlight[];
    buttonLabel: string;
    buttonNote: string;
  };
};

export type GalleryPageContent = {
  banner: SectionText;
  emptyAlbumMessage: string;
};

export type GalleryPhoto = {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  blur?: string;
};

export type GalleryAlbum = {
  name: string;
  description?: string;
  photos: GalleryPhoto[];
};

export type Service = {
  icon: IconKey;
  title: string;
  audience?: string;
  description: string;
  features: string[];
};

export type PricingTier = {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  note?: string;
  ctaHref: string;
  ctaLabel?: string;
  highlighted?: boolean;
  badge?: string;
};

export type Testimonial = {
  name: string;
  quote: string;
  role?: string;
  rating?: number;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Product = {
  kind: "book" | "course";
  title: string;
  description: string;
  price?: string;
  href: string;
  ctaLabel: string;
  badge?: string;
  image?: string;
  featured?: boolean;
};
