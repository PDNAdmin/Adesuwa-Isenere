/**
 * Copies the website's current content into Sanity so the Studio starts filled in.
 *
 *   npx sanity exec scripts/seed-sanity.ts --with-user-token
 *
 * Safe to re-run: documents that already exist are left alone, so the client's edits are never
 * overwritten. Add `-- --replace` to the command to overwrite everything with the built-in copy.
 */
import { createReadStream } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { LexoRank } from "lexorank";
import { defaultSiteSettings } from "../src/content/settings";
import {
  defaultAboutPage,
  defaultContactPage,
  defaultGalleryPage,
  defaultHomePage,
  defaultMediaPage,
  defaultServicesPage,
} from "../src/content/pages";
import { services } from "../src/content/services";
import { pricingTiers } from "../src/content/pricing";
import { testimonials } from "../src/content/testimonials";
import { faqs } from "../src/content/faqs";
import { products } from "../src/content/media";
import { galleryAlbums } from "../src/content/gallery";

const replace = process.argv.includes("--replace");
const client = getCliClient({ apiVersion: "2026-10-01" });

const uploaded = new Map<string, string>();
async function image(publicPath: string | undefined) {
  if (!publicPath) return undefined;
  let assetId = uploaded.get(publicPath);
  if (!assetId) {
    const file = path.join(process.cwd(), "public", publicPath);
    const asset = await client.assets.upload("image", createReadStream(file), {
      filename: path.basename(file),
    });
    assetId = asset._id;
    uploaded.set(publicPath, assetId);
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

function withKeys<T extends object>(items: T[], type: string) {
  return items.map((item, i) => ({ _key: `${type}-${i}`, _type: type, ...item }));
}

function slug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function ranked<T>(items: T[]) {
  let rank = LexoRank.min();
  return items.map((item) => {
    rank = rank.genNext().genNext();
    return { item, orderRank: rank.toString() };
  });
}

type Doc = { _id: string; _type: string; [key: string]: unknown };

async function main() {
  const { projectId, dataset } = client.config();
  console.log(`Seeding project ${projectId}, dataset "${dataset}"${replace ? " (replacing existing)" : ""}…`);

  const docs: Doc[] = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      ...defaultSiteSettings,
      socialLinks: withKeys(defaultSiteSettings.socialLinks, "socialLink"),
    },
    {
      _id: "homePage",
      _type: "homePage",
      ...defaultHomePage,
      hero: { ...defaultHomePage.hero, photo: await image(defaultHomePage.hero.photo) },
    },
    {
      _id: "aboutPage",
      _type: "aboutPage",
      ...defaultAboutPage,
      photo: await image(defaultAboutPage.photo),
      values: withKeys(defaultAboutPage.values, "aboutValue"),
    },
    { _id: "servicesPage", _type: "servicesPage", ...defaultServicesPage },
    { _id: "mediaPage", _type: "mediaPage", ...defaultMediaPage },
    {
      _id: "contactPage",
      _type: "contactPage",
      ...defaultContactPage,
      intakeForm: {
        ...defaultContactPage.intakeForm,
        highlights: withKeys(defaultContactPage.intakeForm.highlights, "highlight"),
      },
    },
    { _id: "galleryPage", _type: "galleryPage", ...defaultGalleryPage },

    ...ranked(services).map(({ item, orderRank }) => ({
      _id: `service-${slug(item.title)}`,
      _type: "service",
      orderRank,
      ...item,
    })),
    ...ranked(pricingTiers).map(({ item, orderRank }) => ({
      _id: `package-${slug(item.name)}`,
      _type: "counsellingPackage",
      orderRank,
      ...item,
    })),
    ...ranked(testimonials).map(({ item, orderRank }, i) => ({
      _id: `testimonial-${i + 1}-${slug(item.name)}`,
      _type: "testimonial",
      orderRank,
      ...item,
    })),
    ...ranked(faqs).map(({ item, orderRank }) => ({
      _id: `faq-${slug(item.question)}`,
      _type: "faq",
      orderRank,
      ...item,
    })),
    ...(await Promise.all(
      ranked(products).map(async ({ item, orderRank }) => ({
        _id: `product-${slug(item.title)}`,
        _type: "product",
        orderRank,
        ...item,
        image: await image(item.image),
      }))
    )),
    ...ranked(galleryAlbums).map(({ item, orderRank }) => ({
      _id: `album-${slug(item.name)}`,
      _type: "galleryAlbum",
      orderRank,
      name: item.name,
      description: item.description,
      photos: [],
    })),
  ];

  const tx = client.transaction();
  for (const doc of docs) {
    // Drop empty values so Sanity doesn't store "undefined" fields.
    const clean = JSON.parse(JSON.stringify(doc)) as Doc;
    if (replace) tx.createOrReplace(clean);
    else tx.createIfNotExists(clean);
  }
  await tx.commit();

  console.log(`Done: ${docs.length} documents ${replace ? "written" : "checked (missing ones created)"}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
