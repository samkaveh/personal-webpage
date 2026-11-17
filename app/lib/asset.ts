/**
 * Prefix a public asset path with the deployment's base path (GitHub Pages).
 * `NEXT_PUBLIC_BASE_PATH` is injected by next.config.js at build time.
 */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
