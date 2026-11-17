"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2 uRes;
  uniform float uTime;
  uniform vec2 uPointer;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 turn = mat2(0.82, 0.57, -0.57, 0.82);
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = turn * p * 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);
    p += (uPointer - 0.5) * 0.16;

    float t = uTime * 0.028;

    vec2 warp = vec2(
      fbm(p * 1.25 + vec2(t, -t * 0.6)),
      fbm(p * 1.25 + vec2(4.7 - t * 0.8, 1.9))
    );

    float field = fbm(p * 2.2 + warp * 1.7 + vec2(t * 0.4, 0.0));
    float bloomA = smoothstep(0.46, 0.92, field);
    float bloomB = smoothstep(0.44, 0.9, fbm(p * 1.05 - warp * 1.35 + vec2(6.3, 1.7)));
    float bloomC = smoothstep(0.58, 1.0, fbm(p * 3.0 + warp * 2.1 + vec2(-3.1, 9.2) + t * 0.3));

    vec3 ink = vec3(0.40, 0.13, 0.15);
    vec3 sage = vec3(0.35, 0.38, 0.25);
    vec3 adobe = vec3(0.66, 0.47, 0.29);

    vec3 colour = mix(sage, ink, bloomA);
    colour = mix(colour, adobe, bloomB * 0.55);

    float alpha = bloomA * 0.18 + bloomB * 0.11 + bloomC * 0.06;

    float vignette = smoothstep(1.25, 0.18, length(p * vec2(0.82, 1.18)));
    alpha *= vignette * 0.95;

    float grain = (hash(gl_FragCoord.xy + fract(uTime) * 31.0) - 0.5) * 0.022;
    colour += grain;

    gl_FragColor = vec4(colour, alpha);
  }
`;

export default function InkBackdrop() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));

    const canvas = renderer.domElement;
    canvas.className = "ink-canvas";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: reduced ? 14 : 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frame = 0;
    let running = true;
    let elapsed = reduced ? 14 : 0;
    let last = performance.now();
    let inView = true;

    const resize = () => {
      const { clientWidth, clientHeight } = host;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      uniforms.uRes.value.set(clientWidth, clientHeight);
      renderer.render(scene, camera);
    };

    const draw = () => {
      if (!running) return;
      frame = requestAnimationFrame(draw);
      if (!inView) return;

      const now = performance.now();
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!reduced) {
        elapsed += delta;
        uniforms.uTime.value = elapsed;
        renderer.render(scene, camera);
      }
    };

    const onPointer = (event: PointerEvent) => {
      uniforms.uPointer.value.set(
        event.clientX / Math.max(window.innerWidth, 1),
        1 - event.clientY / Math.max(window.innerHeight, 1)
      );
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        if (!reduced) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(draw);
        }
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
          frame = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(host);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(host);

    resize();
    renderer.render(scene, camera);

    if (!reduced) {
      frame = requestAnimationFrame(draw);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, []);

  return <div className="ink-backdrop" ref={hostRef} aria-hidden="true" />;
}
