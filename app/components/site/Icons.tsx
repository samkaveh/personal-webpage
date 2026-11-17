export function PomegranateMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Botanical calyx (crown) */}
      <path
        d="M12.2 9.8 L11 5.4 C11 5.4 12.8 6.9 14 7.6 L15.6 3.8 L16.8 7.8 C17.9 7 19.8 5.6 19.8 5.6 L18.8 9.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Calyx base collar */}
      <path
        d="M12.8 10.2 C14.2 11 17 11 18.4 10.1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Pomegranate fruit body */}
      <path
        d="M16 10.2 C10.8 10.2 7.2 14.1 7.2 19 C7.2 24.3 11 28.2 16 28.2 C21 28.2 24.8 24.3 24.8 19 C24.8 14.1 21.2 10.2 16 10.2 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Subtle inner botanical section arc */}
      <path
        d="M16 13.5 C12.6 14.2 10.5 17 10.5 20.4 C10.5 23.5 12.8 25.8 16 26"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="1.5 2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Stylized internal aril/seed dots */}
      <circle cx="14" cy="18" r="1" fill="currentColor" opacity="0.65" />
      <circle cx="17.2" cy="17" r="1.1" fill="currentColor" opacity="0.75" />
      <circle cx="15.8" cy="20.5" r="1" fill="currentColor" opacity="0.65" />
      <circle cx="18.5" cy="19.8" r="0.9" fill="currentColor" opacity="0.55" />
      <circle cx="13.2" cy="21.5" r="0.8" fill="currentColor" opacity="0.45" />
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
