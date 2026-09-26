interface PlaceholderPanelProps {
  label?: string;
  className?: string;
}

let patternId = 0;

/**
 * A deliberately abstract stand-in for artwork that doesn't exist yet
 * (covers, portraits). Hatching pattern, not a generated illustration.
 */
export function PlaceholderPanel({ label, className = "" }: PlaceholderPanelProps) {
  const id = `hatch-${patternId++}`;
  return (
    <div className={`relative overflow-hidden bg-void-soft ${className}`}>
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="var(--color-line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      {label ? (
        <span className="label absolute bottom-3 left-3 text-ash-dim">{label}</span>
      ) : null}
    </div>
  );
}
