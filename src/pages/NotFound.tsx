import { motion } from "framer-motion";
import { ButtonLink } from "../components/ui/Button";

export function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="label text-ash-dim">404</p>
      <h1 className="mt-2 font-display text-5xl text-fg sm:text-6xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-sm text-sm text-ash">
        Whatever you were looking for isn't at this address.
      </p>
      <ButtonLink to="/" className="mt-8" variant="ghost">
        Back home
      </ButtonLink>
    </motion.div>
  );
}
