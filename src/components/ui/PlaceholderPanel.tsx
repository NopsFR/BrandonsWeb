interface PlaceholderPanelProps {
  label?: string;
  className?: string;
}

let patternId = 0;

/**
 * A deliberately abstract stand-in for artwork that doesn't exist yet
 * (covers, portraits) — a dead-signal panel, not a generated illustration.
 */
export function PlaceholderPanel({ label, className = "" }: PlaceholderPanelProps) {
  const id = `hatch-${patternId++}`;
  return (
    <div className={`relative overflow-hidden bg-void-raised ${className}`}>
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, white 0px, white 1px, transparent 1px, transparent 3px)",
        }}
      />
      {label ? (
        <span className="label absolute bottom-3 left-3 text-ash-dim">{label}</span>
      ) : null}
    </div>
  );
}
