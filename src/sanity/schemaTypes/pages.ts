import { defineField, defineType } from "sanity";

const bannerField = defineField({
  name: "banner",
  title: "Top banner of the page",
  description: "The coloured strip with the page title, right under the menu.",
  type: "sectionText",
});

function photoField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    description: `${description} Click the crop icon to choose which part of the photo stays in view.`,
    type: "image",
    options: { hotspot: true },
  });
}

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Top of the page", default: true },
    { name: "about", title: "About preview" },
    { name: "sections", title: "Other sections" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Top of the page (first thing visitors see)",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "smallHeading", title: "Small label above the headline", type: "string" }),
        defineField({ name: "headline", title: "Main headline", type: "string" }),
        defineField({ name: "intro", title: "Introduction sentence", type: "text", rows: 3 }),
        defineField({ name: "mainButtonLabel", title: "Main button text (goes to the intake form)", type: "string" }),
        defineField({ name: "secondButtonLabel", title: "Second button text (goes to the About page)", type: "string" }),
        photoField("photo", "Your photo", "The large portrait on the right."),
        defineField({
          name: "photoCaption",
          title: "Title under your name on the photo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "aboutPreview",
      title: "Short 'About' section",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "smallHeading", title: "Small label above the heading", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "paragraphs", title: "Paragraphs", type: "paragraphList" }),
        defineField({ name: "linkLabel", title: "Link text (goes to the About page)", type: "string" }),
      ],
    }),
    defineField({
      name: "servicesSection",
      title: "Services section",
      description: "The first three services from 'Counselling Services' are shown here.",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "smallHeading", title: "Small label above the heading", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "intro", title: "Short introduction", type: "text", rows: 2 }),
        defineField({ name: "buttonLabel", title: "Button text (goes to the Services page)", type: "string" }),
      ],
    }),
    defineField({
      name: "testimonialsSection",
      title: "Client stories section",
      type: "sectionText",
      group: "sections",
    }),
    defineField({
      name: "featuredBook",
      title: "Featured book section",
      description:
        "Shows the book marked 'Feature on the Home page' in 'Books & Courses'.",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "smallHeading", title: "Small label above the book title", type: "string" }),
        defineField({
          name: "secondButtonLabel",
          title: "Second button text (goes to Media & Resources)",
          type: "string",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "story", title: "Your story", default: true },
    { name: "mission", title: "Mission & vision" },
    { name: "values", title: "Guiding values" },
  ],
  fields: [
    { ...bannerField, group: "story" },
    { ...photoField("photo", "Your photo", "The portrait beside your story."), group: "story" },
    defineField({
      name: "story",
      title: "Your story",
      type: "object",
      group: "story",
      fields: [
        defineField({ name: "smallHeading", title: "Small label above the heading", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "paragraphs", title: "Paragraphs", type: "paragraphList" }),
      ],
    }),
    defineField({
      name: "missionVisionSection",
      title: "Mission & vision heading",
      type: "sectionText",
      group: "mission",
    }),
    defineField({ name: "mission", title: "Your mission", type: "text", rows: 4, group: "mission" }),
    defineField({ name: "vision", title: "Your vision", type: "text", rows: 4, group: "mission" }),
    defineField({
      name: "valuesSection",
      title: "Guiding values heading",
      type: "sectionText",
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Guiding values",
      description: "Three works best. Drag to reorder.",
      type: "array",
      of: [{ type: "aboutValue" }],
      group: "values",
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    bannerField,
    defineField({
      name: "servicesSection",
      title: "Services section heading",
      description: "The services themselves are edited in 'Counselling Services'.",
      type: "sectionText",
    }),
    defineField({
      name: "pricingSection",
      title: "Packages & prices heading",
      description: "The packages themselves are edited in 'Counselling Packages & Prices'.",
      type: "sectionText",
    }),
    defineField({
      name: "pricingFootnote",
      title: "Small print under the packages",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "faqSection",
      title: "Questions section heading",
      description: "The questions themselves are edited in 'Frequently Asked Questions'.",
      type: "sectionText",
    }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});

export const mediaPage = defineType({
  name: "mediaPage",
  title: "Media & Resources Page",
  type: "document",
  fields: [
    bannerField,
    defineField({
      name: "resourcesSection",
      title: "Books & courses heading",
      description: "The books and courses themselves are edited in 'Books & Courses'.",
      type: "sectionText",
    }),
    defineField({
      name: "podcastSection",
      title: "Podcast & speaking section",
      description: "Your social media icons are shown under this text.",
      type: "sectionText",
    }),
  ],
  preview: { prepare: () => ({ title: "Media & Resources Page" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    bannerField,
    defineField({
      name: "directContact",
      title: "Left box: 'Get in touch directly'",
      description: "Your phone, email and WhatsApp come from 'Website Settings & Contact Details'.",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Small tag at the top", type: "string" }),
        defineField({ name: "sideLabel", title: "Small text at the top right", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
        defineField({ name: "whatsappLinkLabel", title: "WhatsApp link text", type: "string" }),
        defineField({ name: "virtualSessions", title: "Virtual sessions: where / how", type: "string" }),
        defineField({ name: "inPersonSessions", title: "In-person sessions: where / how", type: "string" }),
        defineField({ name: "followHeading", title: "'Follow along' heading", type: "string" }),
        defineField({ name: "followText", title: "'Follow along' small text", type: "string" }),
      ],
    }),
    defineField({
      name: "intakeForm",
      title: "Right box: client intake form",
      description: "The form link itself is set in 'Website Settings & Contact Details'.",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Small tag at the top", type: "string" }),
        defineField({ name: "sideLabel", title: "Small text at the top right", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
        defineField({
          name: "highlights",
          title: "Three reassurance points",
          description: "Shown with a shield, clock and tick icon, in that order.",
          type: "array",
          of: [{ type: "highlight" }],
          validation: (rule) => rule.max(3),
        }),
        defineField({ name: "buttonLabel", title: "Button text", type: "string" }),
        defineField({ name: "buttonNote", title: "Small note under the button", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    {
      ...bannerField,
      description: "The photos are added in 'Gallery Photo Albums'.",
    },
    defineField({
      name: "emptyAlbumMessage",
      title: "Message shown on an album with no photos yet",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "Gallery Page" }) },
});

export const pageTypes = [homePage, aboutPage, servicesPage, mediaPage, contactPage, galleryPage];
