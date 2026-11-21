/**
 * The site mark: a pomegranate in two fine lines — one continuous stroke for
 * the fruit and its crown, and a faint rib for volume. Drawn in
 * `currentColor`; set `--mark-weight` in CSS to thin the strokes when the
 * mark is shown large (default 1).
 */
export function PomegranateMark({ className = "" }: { className?: string }) {
  const w = (px: number) => ({ strokeWidth: `calc(${px}px * var(--mark-weight, 1))` });
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13.8 10.3C14.1 9.2 14 8.1 12.7 6.2C14.1 6.6 15 7.2 15.4 7.9C15.6 6.8 15.8 5.9 16 4.9C16.2 5.9 16.4 6.8 16.6 7.9C17 7.2 17.9 6.6 19.3 6.2C18 8.1 17.9 9.2 18.2 10.3A9.5 9.5 0 1 1 13.8 10.3Z"
        style={w(1.2)}
      />
      <path d="M15 12.2C12.3 14.6 11.6 21.8 14.6 27.4" opacity=".4" style={w(1)} />
    </svg>
  );
}

export function ArrowUpRight({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 11.5 L11.5 4.5" />
      <path d="M5.8 4.5 H11.5 V10.2" />
    </svg>
  );
}

export function ArrowRight({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.8 8 H13.2" />
      <path d="M9 3.8 L13.2 8 L9 12.2" />
    </svg>
  );
}
