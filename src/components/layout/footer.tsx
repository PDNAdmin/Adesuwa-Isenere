import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
import { Container } from "@/components/layout/container";
import { navLinks, contactInfo, siteConfig } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo className="[&_span]:text-secondary-foreground" />
          <p className="mt-4 max-w-xs text-sm text-secondary-foreground/70">
            {siteConfig.tagline}
          </p>
          <SocialLinks className="mt-6 [&_a]:border-secondary-foreground/20 [&_a]:text-secondary-foreground/70 [&_a:hover]:border-gold [&_a:hover]:text-gold" />
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
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm tracking-wide text-secondary-foreground/60 uppercase">
            {siteConfig.practiceName}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-secondary-foreground/80">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={contactInfo.phoneHref} className="hover:text-gold">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={contactInfo.emailHref} className="hover:text-gold">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm tracking-wide text-secondary-foreground/60 uppercase">
            Stay Connected
          </h3>
          <p className="mt-4 text-sm text-secondary-foreground/80">
            Get relationship insights and updates in your inbox.
          </p>
          <Link
            href="/contact#newsletter"
            className="mt-3 inline-block text-sm font-medium text-gold underline underline-offset-4"
          >
            Subscribe to the newsletter
          </Link>
        </div>
      </Container>

      <div className="border-t border-secondary-foreground/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-secondary-foreground/60 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.practiceName}</p>
          <Link href="/https://www.precioustola.com" className="hover:text-gold  underline underline-offset-4">
            Designed and Developed by PDN
          </Link>
        </Container>
      </div>
    </footer>
  );
}
