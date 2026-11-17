"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-scan on every route change: the layout (and this component) persists
    // across client-side navigation, so nodes rendered by a new page would
    // otherwise stay at opacity 0 forever.
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!nodes.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }

    const reveal = (node: Element) => {
      node.classList.add("is-in");
      observer.unobserve(node);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));

    // Safety net: anything that has already entered the viewport should be
    // visible, even if the observer was skipped by a fast jump.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      const limit = window.innerHeight * 0.94;
      for (const node of nodes) {
        if (node.classList.contains("is-in")) continue;
        if (node.getBoundingClientRect().top < limit) reveal(node);
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(sweep);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
