interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`label flex items-center gap-3 text-ash ${className}`}>
      <span aria-hidden className="h-px w-6 bg-line" />
      {children}
    </div>
  );
}
