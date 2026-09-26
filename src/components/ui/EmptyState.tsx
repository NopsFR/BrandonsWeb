interface EmptyStateProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

/**
 * The "nothing here yet" state used across Comics/Archive/Reader. Designed
 * to read as intentional — a marked-off panel, not an error message.
 */
export function EmptyState({ title, message, children }: EmptyStateProps) {
  return (
    <div className="relative border border-line px-8 py-16 text-center sm:px-16">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="mx-auto mb-6 h-8 w-8 text-ash-dim"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M4 4 L20 20 M20 4 L4 20" strokeLinecap="round" />
      </svg>
      <h3 className="text-xl text-paper sm:text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md font-body text-sm normal-case leading-relaxed text-ash">
        {message}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}
