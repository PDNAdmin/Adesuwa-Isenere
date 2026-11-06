import { cn } from "@/lib/utils";
import { Container } from "./container";

const backgrounds = {
  default: "bg-background",
  muted: "bg-muted",
  blush: "bg-blush",
  accent: "bg-accent",
  secondary: "bg-secondary text-secondary-foreground",
} as const;

export function Section({
  className,
  containerClassName,
  background = "default",
  id,
  children,
}: {
  className?: string;
  containerClassName?: string;
  background?: keyof typeof backgrounds;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-10 md:py-16 lg:py-18", backgrounds[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
