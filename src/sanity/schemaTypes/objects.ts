import { defineArrayMember, defineField, defineType } from "sanity";
import { iconOptions } from "../../lib/icon-options";

export const sectionText = defineType({
  name: "sectionText",
  title: "Heading & introduction",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "smallHeading",
      title: "Small label above the heading",
      description: "The short line in small capital letters that sits above the big heading.",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description: "The big title for this part of the page.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Short introduction (optional)",
      description: "One or two sentences shown under the heading. Leave empty to hide.",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "smallHeading" },
  },
});

export const iconPicker = defineType({
  name: "iconPicker",
  title: "Icon",
  type: "string",
  options: {
    list: iconOptions.map(({ value, title }) => ({ value, title })),
    layout: "dropdown",
  },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social media link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Which platform?",
      type: "string",
      options: {
        list: [
          { value: "instagram", title: "Instagram" },
          { value: "youtube", title: "YouTube" },
          { value: "spotify", title: "Spotify" },
          { value: "facebook", title: "Facebook" },
          { value: "tiktok", title: "TikTok" },
          { value: "linkedin", title: "LinkedIn" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Link to your page",
      description: "Copy the full web address from your browser, e.g. https://www.instagram.com/yourname",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
    prepare: ({ title, subtitle }) => ({
      title: title ? title.charAt(0).toUpperCase() + title.slice(1) : "Social link",
      subtitle,
    }),
  },
});

export const aboutValue = defineType({
  name: "aboutValue",
  title: "Guiding value",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "iconPicker" }),
    defineField({
      name: "title",
      title: "Value name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "What it means",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const highlight = defineType({
  name: "highlight",
  title: "Highlight",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Short title", type: "string" }),
    defineField({ name: "text", title: "Sentence", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const paragraphList = defineType({
  name: "paragraphList",
  title: "Paragraphs",
  type: "array",
  of: [defineArrayMember({ type: "text", rows: 4 })],
});

export const objectTypes = [sectionText, iconPicker, socialLink, aboutValue, highlight, paragraphList];
