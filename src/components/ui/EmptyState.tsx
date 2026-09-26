import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

/**
 * The "nothing here yet" state used across Comics/Archive/Reader. A quiet
 * moment in the atmosphere, not a boxed error message.
 */
export function EmptyState({ title, message, children }: EmptyStateProps) {
  return (
    <div className="relative py-24 text-center sm:py-32">
      <motion.div
        aria-hidden
        className="mx-auto mb-8 h-px w-16 bg-line-strong"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0.3, 0.9, 0.3] }}
        transition={{ scaleX: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      />
      <h3 className="font-display text-2xl text-fg sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ash">{message}</p>
      {children ? <div className="mt-10">{children}</div> : null}
    </div>
  );
}
