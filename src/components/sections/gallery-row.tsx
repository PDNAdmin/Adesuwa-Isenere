"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryAlbum } from "@/types/content";

const placeholderTints = [
  "from-blush to-muted",
  "from-muted to-blush",
  "from-primary/10 to-blush",
  "from-blush to-gold/10",
];

function PlaceholderTile({ index, message }: { index: number; message: string }) {
  return (
    <div
      className={cn(
        "flex aspect-4/5 w-[70vw] max-w-72 shrink-0 snap-start flex-col items-center justify-center rounded-2xl bg-linear-to-br p-6 text-center ring-1 ring-foreground/5 sm:w-64",
        placeholderTints[index % placeholderTints.length]
      )}
      aria-hidden={index > 0}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-background/80 text-primary shadow-sm">
        <ImageIcon className="size-5" />
      </span>
      {index === 0 && <span className="mt-3 font-heading text-sm text-foreground/70">{message}</span>}
    </div>
  );
}

function Lightbox({
  album,
  index,
  onClose,
  onMove,
}: {
  album: GalleryAlbum;
  index: number;
  onClose: () => void;
  onMove: (step: number) => void;
}) {
  const photo = album.photos[index];
  const many = album.photos.length > 1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onMove]);

  // Portal out of the animated row: a transformed ancestor would otherwise trap the fixed overlay.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${album.name} photo ${index + 1} of ${album.photos.length}`}
      className="fixed inset-0 z-60 flex flex-col bg-[#1a070e]/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80 sm:px-6">
        <span className="font-heading">
          {album.name} <span className="text-white/50">· {index + 1} / {album.photos.length}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image
          key={photo.url}
          src={photo.url}
          alt={photo.alt || photo.caption || album.name}
          fill
          sizes="100vw"
          className="object-contain px-2 sm:px-16"
          placeholder={photo.blur ? "blur" : "empty"}
          blurDataURL={photo.blur}
        />
        {many && (
          <>
            <button
              type="button"
              onClick={() => onMove(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => onMove(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <p className="min-h-14 px-6 py-4 text-center text-sm text-white/80">{photo.caption}</p>
    </div>,
    document.body
  );
}

export function GalleryRow({ album, emptyMessage }: { album: GalleryAlbum; emptyMessage: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hasPhotos = album.photos.length > 0;

  const scrollBy = (direction: number) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const close = useCallback(() => setOpenIndex(null), []);
  const move = useCallback(
    (step: number) =>
      setOpenIndex((i) => (i === null ? i : (i + step + album.photos.length) % album.photos.length)),
    [album.photos.length]
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-2xl font-medium sm:text-3xl">{album.name}</h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary/20 dark:text-pink-200">
              {hasPhotos ? `${album.photos.length} ${album.photos.length === 1 ? "photo" : "photos"}` : "Coming soon"}
            </span>
          </div>
          {album.description && (
            <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
              {album.description}
            </p>
          )}
        </div>
        {album.photos.length > 2 && (
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={`Scroll ${album.name} left`}
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={`Scroll ${album.name} right`}
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="-mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-3 scrollbar-thin sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
      >
        {hasPhotos
          ? album.photos.map((photo, i) => (
              <button
                key={photo.url}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative aspect-4/5 w-[70vw] max-w-72 shrink-0 snap-start overflow-hidden rounded-2xl bg-muted ring-1 ring-foreground/5 sm:w-64"
                aria-label={`Open ${photo.caption || photo.alt || `${album.name} photo ${i + 1}`}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt || photo.caption || `${album.name} photo ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 16rem, 70vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder={photo.blur ? "blur" : "empty"}
                  blurDataURL={photo.blur}
                />
                {photo.caption && (
                  <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-3 pt-8 pb-3 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {photo.caption}
                  </span>
                )}
              </button>
            ))
          : placeholderTints.map((_, i) => <PlaceholderTile key={i} index={i} message={emptyMessage} />)}
      </div>

      {openIndex !== null && album.photos[openIndex] && (
        <Lightbox album={album} index={openIndex} onClose={close} onMove={move} />
      )}
    </div>
  );
}
