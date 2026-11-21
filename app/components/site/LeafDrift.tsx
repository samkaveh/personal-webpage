"use client";

import { useEffect, useRef } from "react";

/*
 * Pomegranate leaves (and the odd scarlet petal) drifting through the hero.
 *
 * Each particle falls like a real leaf: it rocks side to side like a
 * pendulum, tilting into each swing and slowing at the ends, while slowly
 * tumbling over so its paler underside catches the light. Nearer particles
 * are larger, faster and more opaque.
 */

type Kind = "leaf" | "petal";

type Particle = {
  kind: Kind;
  x: number;
  y: number;
  depth: number; // 0 far … 1 near
  size: number;
  fall: number;
  sway: number;
  swing: number;
  swingRate: number;
  tilt: number;
  tumble: number;
  tumbleRate: number;
  alpha: number;
  palette: Palette;
};

type Palette = { top: string; under: string; rib: string };

const LEAF_PALETTES: Palette[] = [
  { top: "#8e9a6c", under: "#b4bc95", rib: "#e9e7cf" }, // sage
  { top: "#77845a", under: "#a2ad84", rib: "#e2e3c8" }, // deep sage
  { top: "#9c9763", under: "#c3bd8b", rib: "#f0ead0" }, // olive
  { top: "#b8974f", under: "#d9bf86", rib: "#f6ead0" }, // turning gold
];

const PETAL_PALETTES: Palette[] = [
  { top: "#a8333b", under: "#d0675b", rib: "#5b1019" },
  { top: "#bb4a45", under: "#e08a74", rib: "#6e1822" },
];

/* Unit shapes, drawn along +x and centred on the origin (length 1). */
function leafPaths() {
  const upper = new Path2D();
  upper.moveTo(-0.5, 0);
  upper.bezierCurveTo(-0.4, -0.25, -0.06, -0.26, 0.2, -0.18);
  upper.bezierCurveTo(0.36, -0.12, 0.46, -0.04, 0.5, 0);
  upper.closePath();

  const lower = new Path2D();
  lower.moveTo(-0.5, 0);
  lower.bezierCurveTo(-0.4, 0.22, -0.06, 0.23, 0.2, 0.16);
  lower.bezierCurveTo(0.36, 0.1, 0.46, 0.035, 0.5, 0);
  lower.closePath();

  const rib = new Path2D();
  rib.moveTo(-0.62, 0.01);
  rib.quadraticCurveTo(0, -0.012, 0.47, 0);

  const veins = new Path2D();
  for (let i = 0; i < 5; i += 1) {
    const x = -0.32 + i * 0.16;
    veins.moveTo(x, 0);
    veins.quadraticCurveTo(x + 0.05, -0.07, x + 0.11, -0.12 + i * 0.012);
    veins.moveTo(x, 0);
    veins.quadraticCurveTo(x + 0.05, 0.06, x + 0.11, 0.1 - i * 0.01);
  }
  return { upper, lower, rib, veins };
}

function petalPath() {
  const p = new Path2D();
  const steps = 22;
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    // a rounded fan with a crinkled outer edge
    const ruffle = 1 + 0.08 * Math.sin(t * 7) + 0.04 * Math.sin(t * 13);
    const r = 0.42 * ruffle * (0.7 + 0.3 * Math.max(0, Math.cos(t)));
    const x = Math.cos(t) * r + 0.06;
    const y = Math.sin(t) * r * 0.86;
    if (i === 0) p.moveTo(x, y);
    else p.lineTo(x, y);
  }
  p.closePath();
  const crease = new Path2D();
  crease.moveTo(-0.28, 0);
  crease.quadraticCurveTo(0.05, -0.04, 0.32, 0.06);
  crease.moveTo(-0.24, 0.04);
  crease.quadraticCurveTo(0.02, 0.12, 0.24, 0.22);
  return { body: p, crease };
}

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

function makeParticle(
  width: number,
  height: number,
  fromTop = false,
  depth = Math.random() ** 1.4
): Particle {
  const kind: Kind = Math.random() < 0.16 ? "petal" : "leaf";
  const base = kind === "leaf" ? 15 + depth * 19 : 8 + depth * 9;
  return {
    kind,
    x: Math.random() * width,
    y: fromTop ? -40 - Math.random() * height * 0.4 : Math.random() * height,
    depth,
    size: base * (0.85 + Math.random() * 0.3),
    fall: 9 + depth * 20 + Math.random() * 5,
    sway: 10 + depth * 22 + Math.random() * 10,
    swing: Math.random() * Math.PI * 2,
    swingRate: 0.55 + Math.random() * 0.55,
    tilt: (Math.random() - 0.5) * 1.2 + (kind === "leaf" ? 0.4 : 0),
    tumble: Math.random() * Math.PI * 2,
    tumbleRate: (0.25 + Math.random() * 0.6) * (Math.random() < 0.5 ? -1 : 1),
    alpha: 0.42 + depth * 0.45,
    palette: kind === "leaf" ? pick(LEAF_PALETTES) : pick(PETAL_PALETTES),
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

    const leaf = leafPaths();
    const petal = petalPath();

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = true;
    let inView = true;
    let last = performance.now();

    const draw = (p: Particle) => {
      // pendulum: tilt into the swing; tumble: flip across the midrib
      const rock = Math.sin(p.swing) * 0.5;
      const flip = Math.cos(p.tumble);
      // never fully edge-on: a real leaf is curved, so it always shows some face
      const squash = Math.sign(flip || 1) * (0.32 + 0.68 * Math.abs(flip));
      const showingUnder = flip < 0;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt + rock);
      ctx.scale(p.size, p.size * squash);
      ctx.globalAlpha = p.alpha;
      ctx.lineCap = "round";

      if (p.kind === "leaf") {
        const { top, under, rib } = p.palette;
        ctx.fillStyle = showingUnder ? under : top;
        ctx.fill(leaf.upper);
        ctx.fillStyle = showingUnder ? top : under;
        ctx.globalAlpha = p.alpha * 0.92;
        ctx.fill(leaf.lower);

        ctx.globalAlpha = p.alpha * 0.55;
        ctx.strokeStyle = "#3f3229";
        ctx.lineWidth = 0.022;
        ctx.stroke(leaf.upper);
        ctx.stroke(leaf.lower);

        ctx.globalAlpha = p.alpha * (showingUnder ? 0.45 : 0.7);
        ctx.strokeStyle = rib;
        ctx.lineWidth = 0.03;
        ctx.stroke(leaf.rib);
        if (p.size > 20) {
          ctx.lineWidth = 0.014;
          ctx.globalAlpha = p.alpha * 0.4;
          ctx.stroke(leaf.veins);
        }
        // petiole
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.strokeStyle = "#6a5443";
        ctx.lineWidth = 0.035;
        ctx.beginPath();
        ctx.moveTo(-0.5, 0);
        ctx.lineTo(-0.62, 0.01);
        ctx.stroke();
      } else {
        const { top, under, rib } = p.palette;
        ctx.fillStyle = showingUnder ? under : top;
        ctx.fill(petal.body);
        ctx.globalAlpha = p.alpha * 0.35;
        ctx.strokeStyle = rib;
        ctx.lineWidth = 0.03;
        ctx.stroke(petal.crease);
      }
      ctx.restore();
    };

    const renderAll = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) draw(p);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 9 : width < 1100 ? 14 : 19;
      particles = Array.from({ length: count }, () => makeParticle(width, height));
      // far particles first so near ones overlap them
      particles.sort((a, b) => a.depth - b.depth);
      renderAll();
    };

    const step = () => {
      if (!running) return;
      frame = requestAnimationFrame(step);
      if (!inView) return;

      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      for (const p of particles) {
        p.swing += p.swingRate * dt;
        p.tumble += p.tumbleRate * dt;
        // slower at the ends of each swing, faster through the middle
        const pace = 0.7 + 0.45 * Math.abs(Math.cos(p.swing));
        p.y += p.fall * pace * dt;
        p.x += Math.cos(p.swing) * p.sway * dt;

        if (p.y > height + 40) {
          Object.assign(p, makeParticle(width, height, true, p.depth));
        }
        if (p.x < -40) p.x = width + 30;
        if (p.x > width + 40) p.x = -30;
      }
      renderAll();
    };

    const start = () => {
      last = performance.now();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) start();
      else cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && running && !reduced) start();
      },
      { threshold: 0.02 }
    );
    observer.observe(host);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    if (!reduced) start();
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
