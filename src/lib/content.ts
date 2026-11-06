import { cache } from "react";
import { sanityFetch } from "@/sanity/client";
import {
  aboutPageQuery,
  contactPageQuery,
  faqsQuery,
  galleryAlbumsQuery,
  galleryPageQuery,
  homePageQuery,
  mediaPageQuery,
  packagesQuery,
  productsQuery,
  servicesPageQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/queries";
import { defaultSiteSettings } from "@/content/settings";
import {
  defaultAboutPage,
  defaultContactPage,
  defaultGalleryPage,
  defaultHomePage,
  defaultMediaPage,
  defaultServicesPage,
} from "@/content/pages";
import { services as defaultServices } from "@/content/services";
import { pricingTiers as defaultPackages } from "@/content/pricing";
import { testimonials as defaultTestimonials } from "@/content/testimonials";
import { faqs as defaultFaqs } from "@/content/faqs";
import { products as defaultProducts } from "@/content/media";
import { galleryAlbums as defaultGalleryAlbums } from "@/content/gallery";
import type {
  AboutPageContent,
  ContactPageContent,
  Faq,
  GalleryAlbum,
  GalleryPageContent,
  HomePageContent,
  MediaPageContent,
  PricingTier,
  Product,
  Service,
  ServicesPageContent,
  SiteSettings,
  Testimonial,
} from "@/types/content";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBlank(value: unknown) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  );
}

/** Fills any field left empty in Sanity with the built-in copy, so a blank field never breaks a page. */
export function withDefaults<T>(defaults: T, data: unknown): T {
  if (isBlank(data)) return defaults;
  if (!isPlainObject(defaults) || !isPlainObject(data)) return data as T;

  const merged: Record<string, unknown> = { ...defaults };
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith("_") || isBlank(value)) continue;
    merged[key] = key in defaults ? withDefaults(defaults[key as keyof typeof defaults], value) : value;
  }
  return merged as T;
}

/** Lists come from Sanity as a whole; the built-in list is only used until the first entries exist. */
async function getList<T>(query: string, defaults: T[]): Promise<T[]> {
  const items = await sanityFetch<T[]>(query);
  return items && items.length > 0 ? items : defaults;
}

async function getSingleton<T>(query: string, defaults: T): Promise<T> {
  return withDefaults(defaults, await sanityFetch<unknown>(query));
}

export const getSiteSettings = cache(() => getSingleton<SiteSettings>(siteSettingsQuery, defaultSiteSettings));
export const getHomePage = cache(() => getSingleton<HomePageContent>(homePageQuery, defaultHomePage));
export const getAboutPage = cache(() => getSingleton<AboutPageContent>(aboutPageQuery, defaultAboutPage));
export const getServicesPage = cache(() =>
  getSingleton<ServicesPageContent>(servicesPageQuery, defaultServicesPage)
);
export const getMediaPage = cache(() => getSingleton<MediaPageContent>(mediaPageQuery, defaultMediaPage));
export const getContactPage = cache(() =>
  getSingleton<ContactPageContent>(contactPageQuery, defaultContactPage)
);
export const getGalleryPage = cache(() =>
  getSingleton<GalleryPageContent>(galleryPageQuery, defaultGalleryPage)
);

export const getServices = cache(() => getList<Service>(servicesQuery, defaultServices));
export const getPackages = cache(() => getList<PricingTier>(packagesQuery, defaultPackages));
export const getTestimonials = cache(() => getList<Testimonial>(testimonialsQuery, defaultTestimonials));
export const getFaqs = cache(() => getList<Faq>(faqsQuery, defaultFaqs));
export const getProducts = cache(() => getList<Product>(productsQuery, defaultProducts));
export const getGalleryAlbums = cache(() => getList<GalleryAlbum>(galleryAlbumsQuery, defaultGalleryAlbums));

export async function getFeaturedBook(): Promise<Product | undefined> {
  const products = await getProducts();
  const books = products.filter((p) => p.kind === "book");
  return books.find((p) => p.featured) ?? books[0];
}
