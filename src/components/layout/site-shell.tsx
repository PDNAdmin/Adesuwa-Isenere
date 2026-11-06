import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoveBubbles } from "@/components/shared/love-bubbles";
import {
  JsonLd,
  getWebSiteSchema,
  getOrganizationSchema,
  getPersonSchema,
} from "@/components/seo/json-ld";
import { getSiteSettings } from "@/lib/content";

// Header, footer and theme for every public page (the Studio at /studio sits outside this).
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={[getWebSiteSchema(), getOrganizationSchema(settings), getPersonSchema(settings)]}
      />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <LoveBubbles />
        <Header name={settings.counsellorName} buttonLabel={settings.headerButtonLabel} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <Toaster richColors position="top-center" closeButton />
      </ThemeProvider>
    </>
  );
}
