"use client";

import { useEffect, useRef } from "react";

type Leaf = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  rotation: number;
  spin: number;
  alpha: number;
  colour: string;
  flip: number;
};

const colours = [
  "rgba(109, 122, 87, ALPHA)",
  "rgba(93, 105, 70, ALPHA)",
  "rgba(140, 31, 44, ALPHA)",
  "rgba(176, 138, 74, ALPHA)",
  "rgba(126, 137, 100, ALPHA)",
];

function makeLeaf(width: number, height: number, atTop = false): Leaf {
  const colour = colours[Math.floor(Math.random() * colours.length)];
  return {
    x: Math.random() * width,
    y: atTop ? -30 - Math.random() * height * 0.45 : Math.random() * height,
    size: 8 + Math.random() * 12,
    speed: 9 + Math.random() * 16,
    drift: 14 + Math.random() * 26,
    phase: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.42,
    alpha: 0.28 + Math.random() * 0.34,
    colour: colour.replace("ALPHA", "1"),
    flip: Math.random() > 0.5 ? 1 : -1,
  };
}

export default function LeafDrift() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    canvas.className = "leaf-canvas";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let leaves: Leaf[] = [];
    let frame = 0;
    let running = true;
    let inView = true;
    let last = performance.now();
    let elapsed = 0;

    const drawLeaf = (leaf: Leaf) => {
      const size = leaf.size;
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.scale(leaf.flip, 1);
      ctx.globalAlpha = leaf.alpha;
      ctx.fillStyle = leaf.colour;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size * 0.3, -size * 0.34, size * 0.76, -size * 0.3, size, 0);
      ctx.bezierCurveTo(size * 0.74, size * 0.32, size * 0.3, size * 0.3, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = leaf.alpha * 0.5;
      ctx.strokeStyle = "rgba(52, 60, 40, 0.55)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(size * 0.06, 0);
      ctx.quadraticCurveTo(size * 0.5, -size * 0.05, size * 0.9, 0);
      ctx.stroke();

      ctx.restore();
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 10 : width < 1100 ? 16 : 22;
      leaves = Array.from({ length: count }, () => makeLeaf(width, height));
      render(true);
    };

    const render = (staticFrame = false) => {
      ctx.clearRect(0, 0, width, height);
      for (const leaf of leaves) drawLeaf(leaf);
      if (staticFrame) return;
    };

    const step = () => {
      if (!running) return;
      frame = requestAnimationFrame(step);
      if (!inView) return;

      const now = performance.now();
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += delta;

      ctx.clearRect(0, 0, width, height);

      for (const leaf of leaves) {
        leaf.y += leaf.speed * delta;
        leaf.x += Math.sin(elapsed * 0.42 + leaf.phase) * leaf.drift * delta;
        leaf.rotation += leaf.spin * delta;

        if (leaf.y > height + 40) {
          const next = makeLeaf(width, height, true);
          leaf.x = next.x;
          leaf.y = -30;
          leaf.size = next.size;
          leaf.speed = next.speed;
          leaf.alpha = next.alpha;
          leaf.colour = next.colour;
          leaf.phase = next.phase;
        }
        if (leaf.x < -40) leaf.x = width + 30;
        if (leaf.x > width + 40) leaf.x = -30;

        drawLeaf(leaf);
      }
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) {
        last = performance.now();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(frame);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !reduced) {
          last = performance.now();
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(host);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    resize();

    if (!reduced) {
      frame = requestAnimationFrame(step);
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, []);

  return <div className="leaf-layer" ref={hostRef} aria-hidden="true" />;
}
