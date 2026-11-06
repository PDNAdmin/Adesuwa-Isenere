import { cn } from "@/lib/utils";
import type { SocialLink, SocialPlatform } from "@/types/content";

// lucide-react dropped brand/trademarked glyphs - minimal inline marks keep the icon set consistent.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.2V8.8L15.8 12Z" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.44a.62.62 0 0 1-.86.21c-2.36-1.44-5.33-1.77-8.83-.97a.63.63 0 0 1-.28-1.22c3.83-.88 7.12-.5 9.76 1.12.3.18.4.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.7-1.66-6.82-2.14-10.02-1.17a.78.78 0 1 1-.45-1.5c3.65-1.1 8.19-.57 11.28 1.33.37.23.49.71.26 1.08Zm.11-2.83c-3.24-1.92-8.59-2.1-11.68-1.16a.94.94 0 1 1-.55-1.8c3.55-1.08 9.44-.87 13.16 1.35a.94.94 0 0 1-.93 1.61Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21Z" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 3h-3.1v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.4a5.8 5.8 0 1 0 5 5.8V9a7.4 7.4 0 0 0 4.4 1.4V7.3A4.4 4.4 0 0 1 16.6 3Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.9 8.8H3.6V20h3.3ZM5.2 3.5a1.9 1.9 0 1 0 0 3.9 1.9 1.9 0 0 0 0-3.9ZM20.4 13.6c0-3-.6-5.1-4.1-5.1a3.6 3.6 0 0 0-3.2 1.8V8.8H9.9V20h3.3v-5.5c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.3Z" />
    </svg>
  );
}

const icons: Record<SocialPlatform, (props: { className?: string }) => React.JSX.Element> = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  spotify: SpotifyIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  linkedin: LinkedinIcon,
};

const labels: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
  facebook: "Facebook",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
};

export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map((social) => {
        const Icon = icons[social.platform];
        if (!Icon) return null;
        return (
          <li key={social.platform + social.url}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels[social.platform]}
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
