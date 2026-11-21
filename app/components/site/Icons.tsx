/**
 * The site mark: a pomegranate with its crown of sepals, one leaf, a glint of
 * gloss and three arils. Drawn in `currentColor`, so it takes the colour of
 * wherever it sits. Set `--mark-weight` in CSS to thin the strokes when the
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
      {/* leaf */}
      <path
        d="M19.6 9.4C20.9 6.9 23.4 5.6 26.4 5.8C25.3 8.4 22.8 9.9 19.6 9.4Z"
        fill="currentColor"
        fillOpacity=".3"
        style={w(1)}
      />
      <path d="M20.2 9.1C21.9 8 23.6 7.1 25.4 6.4" opacity=".6" style={w(0.6)} />
      {/* fruit */}
      <path
        d="M16 11.4C21.8 11.4 26.1 15.3 26.1 20.3C26.1 25.5 21.7 29.1 16 29.1C10.3 29.1 5.9 25.5 5.9 20.3C5.9 15.3 10.2 11.4 16 11.4Z"
        fill="currentColor"
        fillOpacity=".1"
        style={w(1.4)}
      />
      {/* crown: a short neck with flared sepals */}
      <path
        d="M13.3 11.9C13.6 10.7 13.7 9.6 13.5 8.6L11.2 6.1L14.3 7.3L15.1 4.9L16 6.9L16.9 4.9L17.7 7.3L20.8 6.1L18.5 8.6C18.3 9.6 18.4 10.7 18.7 11.9"
        fill="currentColor"
        fillOpacity=".1"
        style={w(1.3)}
      />
      {/* gloss */}
      <path d="M9.4 18.6C9.9 16.4 11.4 14.8 13.4 14.1" opacity=".5" style={w(1.2)} />
      {/* arils */}
      <g fill="currentColor" stroke="none">
        <path d="M18.3 19.4c1.2.3 1.6 1.6.9 2.6c-.6.9-1.9.8-2.3-.2c-.4-.9.2-2.6 1.4-2.4Z" />
        <path
          d="M21.5 18.2c1 .4 1.3 1.5.7 2.3c-.6.7-1.7.6-2-.2c-.3-.8.3-2.3 1.3-2.1Z"
          opacity=".75"
        />
        <path
          d="M20.9 22.1c1.1.3 1.4 1.5.8 2.3c-.6.8-1.8.7-2.1-.2c-.4-.9.2-2.3 1.3-2.1Z"
          opacity=".88"
        />
      </g>
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
