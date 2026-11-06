import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  counsellorName, practiceName, tagline, phone, email, whatsappNumber,
  socialLinks[]{ platform, url },
  selarStoreUrl, clientIntakeFormUrl, headerButtonLabel,
  footerNewsletterText, newsletterHeading, newsletterText, newsletterUrl, newsletterButtonLabel
}`);

export const homePageQuery = defineQuery(`*[_id == "homePage"][0]{
  hero{ ..., "photo": photo.asset->url },
  aboutPreview, servicesSection, testimonialsSection, featuredBook
}`);

export const aboutPageQuery = defineQuery(`*[_id == "aboutPage"][0]{
  ..., "photo": photo.asset->url
}`);

export const servicesPageQuery = defineQuery(`*[_id == "servicesPage"][0]`);
export const mediaPageQuery = defineQuery(`*[_id == "mediaPage"][0]`);
export const contactPageQuery = defineQuery(`*[_id == "contactPage"][0]`);
export const galleryPageQuery = defineQuery(`*[_id == "galleryPage"][0]`);

export const servicesQuery = defineQuery(`*[_type == "service"] | order(orderRank){
  title, audience, icon, description, features
}`);

export const packagesQuery = defineQuery(`*[_type == "counsellingPackage"] | order(orderRank){
  name, price, duration, description, features, note, ctaHref, ctaLabel, highlighted, badge
}`);

export const testimonialsQuery = defineQuery(`*[_type == "testimonial"] | order(orderRank){
  name, role, rating, quote
}`);

export const faqsQuery = defineQuery(`*[_type == "faq"] | order(orderRank){ question, answer }`);

export const productsQuery = defineQuery(`*[_type == "product"] | order(orderRank){
  kind, title, description, price, href, ctaLabel, badge, featured,
  "image": image.asset->url
}`);

export const galleryAlbumsQuery = defineQuery(`*[_type == "galleryAlbum"] | order(orderRank){
  name, description,
  "photos": photos[defined(asset)]{
    caption, alt,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "blur": asset->metadata.lqip
  }
}`);
