import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/lib/constants";
import type { SiteSettings } from "@/types/content";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 md:py-12 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo name={settings.counsellorName} className="[&_span]:text-secondary-foreground" />
          <p className="mt-3 max-w-xs text-sm text-secondary-foreground/70">
            {settings.tagline}
          </p>
          <SocialLinks links={settings.socialLinks} className="mt-5 [&_a]:border-secondary-foreground/20 [&_a]:text-secondary-foreground/70 [&_a:hover]:border-gold [&_a:hover]:text-gold" />
        </div>

        <div>
          <h3 className="font-heading text-sm tracking-wide text-secondary-foreground/60 uppercase">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-secondary-foreground/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-sm text-secondary-foreground/80 transition-colors hover:text-gold"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm tracking-wide text-secondary-foreground/60 uppercase">
            {settings.practiceName}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-secondary-foreground/80">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${settings.email}`} className="hover:text-gold">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm tracking-wide text-secondary-foreground/60 uppercase">
            Stay Connected
          </h3>
          <p className="mt-4 text-sm text-secondary-foreground/80">
            {settings.footerNewsletterText}
          </p>
          <a
            href={settings.newsletterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-gold underline underline-offset-4"
          >
            Subscribe to the newsletter
          </a>
        </div>
      </Container>

      <div className="border-t border-secondary-foreground/10 py-4.5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-secondary-foreground/60 sm:flex-row">
          <p>
            © {year} {settings.counsellorName}. All rights reserved.
          </p>
          <p>{settings.practiceName}</p>
        </Container>
      </div>
    </footer>
  );
}
