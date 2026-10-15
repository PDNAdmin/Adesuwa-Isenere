import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

export function Logo({
  name,
  className,
  withName = true,
}: {
  name: string;
  className?: string;
  withName?: boolean;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/images/logo-mark-light.png"
        alt={`${siteConfig.practiceName} logo`}
        width={233}
        height={240}
        className="h-9 w-auto dark:hidden"
        priority
      />
      <Image
        src="/images/logo-mark-dark.png"
        alt={`${siteConfig.practiceName} logo`}
        width={232}
        height={240}
        className="hidden h-9 w-auto dark:block"
        priority
      />
      {withName && (
        <span className="font-heading text-lg leading-none tracking-wide">
          {name}
        </span>
      )}
    </Link>
  );
}
