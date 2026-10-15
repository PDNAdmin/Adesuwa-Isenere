import { defineArrayMember, defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const service = defineType({
  name: "service",
  title: "Counselling Service",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "service" }),
    defineField({
      name: "title",
      title: "Service name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "audience",
      title: "Who it's for",
      description: "The small tag on the card, e.g. 'Couples & Intending'.",
      type: "string",
    }),
    defineField({ name: "icon", title: "Icon", type: "iconPicker" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      title: "Key focus areas",
      description: "Short phrases shown as little tags. Two to four work best.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "audience" } },
});

export const counsellingPackage = defineType({
  name: "counsellingPackage",
  title: "Counselling Package",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "counsellingPackage" }),
    defineField({
      name: "name",
      title: "Package name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "Write it exactly as it should appear, e.g. ₦150,000 / $150 or Custom Pricing.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Number of sessions",
      description: "e.g. 3 Sessions, or 8 Sessions (4 Individual, 4 Joint).",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Who this package is for",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "features",
      title: "What's included",
      description: "Each line gets a tick on the card.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "note",
      title: "Small note under the button (optional)",
      description: "e.g. Additional sessions billed at ₦50,000/session.",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "Booking link",
      description: "Usually the Selar product link for this package.",
      type: "url",
      validation: (rule) => rule.required().uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "ctaLabel",
      title: "Button text (optional)",
      description: "Leave empty to show 'Get This Package'.",
      type: "string",
    }),
    defineField({
      name: "highlighted",
      title: "Make this package stand out",
      description: "Shows the card in the dark colour. Best used on just one package.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "badge",
      title: "Tag at the top of the card (optional)",
      description: "e.g. Most Booked.",
      type: "string",
    }),
  ],
  preview: { select: { title: "name", subtitle: "price" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Client Testimonial",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "testimonial" }),
    defineField({
      name: "name",
      title: "Client's name",
      description: "Only use a name the client has agreed to share.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Short description of the client",
      description: "e.g. Counselling Client.",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Star rating",
      type: "number",
      options: { list: [5, 4, 3, 2, 1], layout: "radio", direction: "horizontal" },
      initialValue: 5,
    }),
    defineField({
      name: "quote",
      title: "What they said",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});

export const faq = defineType({
  name: "faq",
  title: "Frequently Asked Question",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "faq" }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const product = defineType({
  name: "product",
  title: "Book or Course",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "product" }),
    defineField({
      name: "kind",
      title: "Is this a book or a course?",
      type: "string",
      options: {
        list: [
          { value: "book", title: "Book" },
          { value: "course", title: "Course" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "book",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "price",
      title: "Price (optional)",
      type: "string",
    }),
    defineField({
      name: "href",
      title: "Link to buy or join",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "Button text",
      description: "e.g. Buy the Book.",
      type: "string",
    }),
    defineField({
      name: "badge",
      title: "Small tag (optional)",
      description: "e.g. Featured, New, Masterclass.",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Feature on the Home page",
      description: "Only one book is featured. If several are switched on, the first one in the list wins.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", kind: "kind", media: "image" },
    prepare: ({ title, kind, media }) => ({
      title,
      subtitle: kind === "course" ? "Course" : "Book",
      media,
    }),
  },
});

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Gallery Photo Album",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "galleryAlbum" }),
    defineField({
      name: "name",
      title: "Album name",
      description: "Shown as the heading of this row on the Gallery page, e.g. Conferences.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description (optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "photos",
      title: "Photos",
      description:
        "Drag and drop several photos at once from your computer. Drag photos around to change their order.",
      type: "array",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption (optional)",
              description: "e.g. Speaking at the Lagos Marriage Summit, 2026.",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Describe the photo (optional)",
              description: "Helps visitors who use screen readers, and helps Google find the photo.",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", photos: "photos" },
    prepare: ({ title, photos }) => {
      const count = Array.isArray(photos) ? photos.length : 0;
      return {
        title,
        subtitle: count === 1 ? "1 photo" : `${count} photos`,
        media: Array.isArray(photos) && photos[0] ? photos[0] : undefined,
      };
    },
  },
});

export const collectionTypes = [service, counsellingPackage, testimonial, faq, product, galleryAlbum];
