// SEO defaults (page titles, share previews). Everything visitors read on the page comes from Sanity - see src/lib/content.ts.
export const siteConfig = {
  name: "Adesuwa Isenérè",
  practiceName: "Merry Hearts Counselling",
  title: "Adesuwa Isenérè | Marriage & Family Counselor",
  description:
    "Because healthy relationships begin with a healthy you. Marriage & family counseling, trainings, books and resources with Adesuwa Isenérè of Merry Hearts Counselling.",
  url: "https://adesuwaisenere.com",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Media & Resources", href: "/media" },
  { label: "Gallery", href: "/gallery" },
];

// TODO: replace with the real Calendly (or Cal.com) scheduling link before launch.
export const calendlyUrl = "https://calendly.com/your-calendly-handle";

// TODO: replace with real EmailJS credentials before launch (see .env.local.example).
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "REPLACE_SERVICE_ID",
  newsletterTemplateId:
    process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID ?? "REPLACE_NEWSLETTER_TEMPLATE_ID",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "REPLACE_PUBLIC_KEY",
};
