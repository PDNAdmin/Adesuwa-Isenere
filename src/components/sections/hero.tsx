import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import type { HomePageContent } from "@/types/content";

export function Hero({ hero, name }: { hero: HomePageContent["hero"]; name: string }) {
  return (
    <section className="relative overflow-hidden bg-blush">
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative grid items-center gap-8 py-12 sm:py-8 lg:grid-cols-2 lg:gap-12 lg:py-10">
        <div className="flex flex-col justify-center animate-hero-fade-in">
          <span className="font-heading text-sm font-medium tracking-[0.2em] text-primary uppercase">
            {hero.smallHeading}
          </span>
          <h1 className="mt-3 text-4xl leading-[1.15] font-medium text-balance sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground/70 sm:text-lg">
            {hero.intro}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              variant="pill"
              className="px-6"
              render={<Link href="/contact#client-inquiry" prefetch={true} />}
            >
              {hero.mainButtonLabel}
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/about" prefetch={true} />}>
              {hero.secondButtonLabel}
            </Button>
          </div>
        </div>

        <div
          className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-foreground/5 sm:max-w-sm lg:mx-0 lg:ml-auto lg:max-w-[390px] xl:max-w-[430px] lg:aspect-[4/4.3] xl:aspect-[4/4.4] transition-all duration-700 ease-out"
        >
          <Image
            src={hero.photo}
            alt={name}
            fill
            sizes="(min-width: 1280px) 430px, (min-width: 1024px) 390px, (min-width: 640px) 24rem, 85vw"
            className="object-cover object-[center_20%]"
            priority
          />
          <div className="absolute inset-x-4 bottom-3 rounded-2xl bg-background/90 px-4 py-2.5 text-center backdrop-blur-sm sm:inset-x-6 sm:bottom-4">
            <p className="font-heading text-sm text-foreground sm:text-base">{name}</p>
            <p className="text-xs text-foreground/60">{hero.photoCaption}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
