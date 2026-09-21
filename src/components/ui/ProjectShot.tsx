"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** Preferred screenshot, e.g. /projects/foodly.png */
  src: string;
  /** Rendered instead if `src` is missing (an SVG mock of the same UI). */
  fallback: string;
  alt: string;
  /** Short label shown in the faux browser address bar. */
  label?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Large browser-chrome framed screenshot.
 *
 * A plain <img> is intentional here: the source swaps at runtime when the real
 * capture is absent, which next/image's static optimiser cannot express. The
 * aspect-ratio box reserves layout space so nothing shifts while loading.
 */
export default function ProjectShot({
  src,
  fallback,
  alt,
  label,
  className,
  priority = false,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [current, setCurrent] = useState(src);

  const swapToFallback = useCallback(() => {
    setCurrent((prev) => (prev === fallback ? prev : fallback));
  }, [fallback]);

  /**
   * An eagerly-loaded image can fail *before* React attaches onError during
   * hydration, so re-check the element once mounted: a finished load with zero
   * intrinsic width means the request failed.
   */
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) swapToFallback();
  }, [current, swapToFallback]);

  return (
    <figure
      className={`glass overflow-hidden rounded-3xl p-2 sm:p-2.5 ${
        className ?? ""
      }`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-2 pb-2 pt-1">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </span>
        <span className="ml-1 min-w-0 flex-1 truncate rounded-lg border border-pearl-400 bg-surface/80 px-2.5 py-1 font-mono text-[10.5px] text-ink-500">
          {label ?? alt}
        </span>
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-pearl-400 bg-pearl-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={current}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={swapToFallback}
          className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-expo-out group-hover:scale-[1.03]"
        />
      </div>
    </figure>
  );
}
