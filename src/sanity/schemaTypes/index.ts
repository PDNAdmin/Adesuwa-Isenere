import { objectTypes } from "./objects";
import { siteSettings } from "./settings";
import { pageTypes } from "./pages";
import { collectionTypes } from "./collections";

export const schemaTypes = [...objectTypes, siteSettings, ...pageTypes, ...collectionTypes];

// One-of-a-kind documents: they can be edited but never created twice or deleted.
export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "mediaPage",
  "contactPage",
  "galleryPage",
]);
