import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Comic } from "../../data/comics";
import { PlaceholderPanel } from "../ui/PlaceholderPanel";
import { formatDate, STATUS_LABEL } from "../../lib/format";

interface ChapterRowProps {
  comic: Comic;
  index: number;
  size?: "compact" | "large";
}

/** One entry in the archive — a wide row, not a card. The index number and
 *  title carry the weight; the cover is a supporting detail that reveals
 *  itself on hover. */
export function ChapterRow({ comic, index, size = "large" }: ChapterRowProps) {
  const isLarge = size === "large";

  return (
    <Link to={`/comics/${comic.slug}`} className="group relative block border-b border-line">
      <div
        className={`flex items-center gap-6 transition-colors duration-500 group-hover:bg-white/[0.02] ${
          isLarge ? "px-2 py-8 sm:gap-10 sm:px-4 sm:py-12" : "px-2 py-5 sm:gap-6 sm:px-3 sm:py-6"
        }`}
      >
        <span
          className={`shrink-0 font-mono text-ash-dim/60 transition-colors duration-500 group-hover:text-blood ${
            isLarge ? "text-3xl sm:text-5xl" : "text-lg sm:text-2xl"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <p className="label text-ash-dim">
            {comic.series} — Ch. {comic.chapter} — {STATUS_LABEL[comic.status]}
          </p>
          <h3
            className={`mt-1 truncate font-display text-fg transition-colors duration-500 group-hover:text-fg ${
              isLarge ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl"
            }`}
          >
            {comic.title}
          </h3>
          {isLarge && comic.description ? (
            <p className="mt-2 hidden max-w-lg truncate text-sm text-ash sm:block">{comic.description}</p>
          ) : null}
        </div>

        <p className="hidden shrink-0 font-mono text-xs text-ash-dim sm:block">{formatDate(comic.date)}</p>

        <motion.div
          className={`hidden shrink-0 overflow-hidden sm:block ${isLarge ? "h-24 w-18" : "h-14 w-10"}`}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {comic.cover ? (
            <img src={comic.cover} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <PlaceholderPanel className="h-full w-full" />
          )}
        </motion.div>

        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="hidden h-4 w-4 shrink-0 -translate-x-1 text-ash opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-blood group-hover:opacity-100 sm:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
