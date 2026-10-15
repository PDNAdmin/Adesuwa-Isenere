import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

const client = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  // Next.js caches the responses itself, and skipping the CDN means a publish shows up on the next refresh.
  useCdn: false,
  perspective: "published",
});

export const SANITY_CACHE_TAG = "sanity";

/** Returns null when Sanity isn't set up yet or can't be reached, so callers fall back to built-in copy. */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, {
      // Content refreshes within a minute on its own, or instantly via the /api/revalidate webhook.
      next: { revalidate: 60, tags: [SANITY_CACHE_TAG] },
    });
  } catch (error) {
    console.error("[sanity] fetch failed, using built-in content instead:", error);
    return null;
  }
}
