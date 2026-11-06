export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID ?? "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET ?? "production";
export const apiVersion = "2026-10-01";

// Until a real project ID is set, the website quietly uses the built-in copy in src/content.
export const isSanityConfigured = /^[a-z0-9][a-z0-9-]*$/.test(projectId);
