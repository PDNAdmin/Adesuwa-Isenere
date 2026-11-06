import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background py-20">
        <Container className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-blush text-primary">
            <Compass className="size-8" />
          </span>
          <span className="mt-6 block font-heading text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Page Not Found
          </span>
          <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
            The page you are looking for may have moved or no longer exists. Explore our counseling
            services or return to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" render={<Link href="/" />}>
              <ArrowLeft className="size-4" />
              Return Home
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/services" />}>
              View Counseling Services
            </Button>
            <Button size="lg" variant="ghost" render={<Link href="/contact" />}>
              Contact Us
            </Button>
          </div>
        </Container>
      </div>
    </SiteShell>
  );
}
