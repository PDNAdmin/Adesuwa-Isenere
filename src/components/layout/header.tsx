"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header({ name, buttonLabel }: { name: string; buttonLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo name={name} />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                  isActive ? "text-primary font-semibold" : "text-foreground/75"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="pill"
            render={<Link href="/contact" prefetch={true} />}
            className="hidden sm:inline-flex px-5 text-sm font-medium shadow-xs"
          >
            {buttonLabel}
          </Button>
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "lg:hidden cursor-pointer touch-manipulation"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-6 sm:w-96 flex flex-col justify-between">
              <div>
                <SheetHeader className="p-0 pb-5 border-b border-border/60">
                  <SheetTitle>
                    <Logo name={name} />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        prefetch={true}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-xl px-4 py-3 text-base font-medium transition-colors cursor-pointer touch-manipulation",
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/80 hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="pt-6 border-t border-border/60">
                <Button
                  variant="pill"
                  size="lg"
                  render={<Link href="/contact" prefetch={true} onClick={() => setOpen(false)} />}
                  className="w-full shadow-md font-semibold text-sm"
                >
                  {buttonLabel}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
