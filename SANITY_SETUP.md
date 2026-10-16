# Sanity CMS setup

The website reads its words, photos, prices, testimonials, FAQs, books and gallery from Sanity.
Until Sanity is connected, it falls back to the built-in copy in `src/content/`, so nothing breaks.

The editor (Sanity Studio) lives inside the website at **`/studio`**.

## 1. Create the Sanity project (once)

1. Sign in at <https://www.sanity.io/manage> (use the client's Google account so they own it).
2. **Create project** → name it "Merry Hearts Website" → dataset **production** (public).
3. Copy the **Project ID**.
4. **API → CORS origins** → add, each with **Allow credentials** ticked:
   - `http://localhost:3000`
   - `https://adesuwaisenere.com` (and the Vercel preview domain if used)
5. **Members** → invite the client as **Editor**.

## 2. Connect the website

Add to `.env.local` (and to the hosting provider's environment variables):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<project id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=<any long random string>
```

Restart `npm run dev`, then open <http://localhost:3000/studio>.

## 3. Load the current content into Sanity (once)

```
npx sanity login
npm run seed:sanity
```

This copies every page's current text, the services, packages, testimonials, FAQs, books, the
existing photos and the starter gallery albums into Sanity. It only creates what's missing, so it's
safe to run again. To overwrite everything with the built-in copy: `npm run seed:sanity -- --replace`.

## 4. Instant updates on the live site (recommended)

Without this, published changes appear within about a minute. With it, they appear immediately.

<https://www.sanity.io/manage> → project → **API → Webhooks → Create webhook**:

| Setting      | Value                                              |
| ------------ | -------------------------------------------------- |
| URL          | `https://adesuwaisenere.com/api/revalidate`        |
| Dataset      | `production`                                       |
| Trigger on   | Create, Update, Delete                             |
| Filter       | *(leave empty)*                                    |
| HTTP method  | POST                                               |
| Secret       | the same value as `SANITY_REVALIDATE_SECRET`       |

## What the client can edit

| In the Studio                       | Controls                                                         |
| ----------------------------------- | ---------------------------------------------------------------- |
| Website Settings & Contact Details  | Name, tagline, phone, email, WhatsApp, social links, Selar & form links, newsletter text |
| Home / About / Services / Media / Gallery / Contact Page | Every heading, paragraph, button label and photo on that page |
| Gallery Photo Albums                | Albums (rows) on the Gallery page and their photos — drag to reorder |
| Counselling Services                | Service cards (first three show on the Home page)                |
| Counselling Packages & Prices       | Pricing cards and booking links                                  |
| Client Testimonials                 | The moving testimonial rows                                      |
| Frequently Asked Questions          | The FAQ list on the Services page                                |
| Books & Courses                     | Media page cards; the one marked "Feature on the Home page" is the Home page book |

Still in code: the menu, page layouts and colours, SEO titles/descriptions, and the logo.
