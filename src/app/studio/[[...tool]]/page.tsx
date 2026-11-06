import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "15vh auto", padding: 24 }}>
        <h1 style={{ fontSize: 22 }}>The content editor isn&apos;t connected yet</h1>
        <p style={{ lineHeight: 1.6, color: "#555" }}>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> to{" "}
          <code>.env.local</code> (see <code>.env.local.example</code>), then restart the dev server.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
