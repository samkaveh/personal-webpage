"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline at the top of the viewport that fills as the reader moves
 * through the element matching `target`. Purely decorative.
 */
export default function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el || !bar.current) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress =
        total <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / total));
      bar.current?.style.setProperty("--progress", String(progress));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  return <div className="reading-progress" ref={bar} aria-hidden="true" />;
}
