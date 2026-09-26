import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Comic } from "../../data/comics";
import { formatDate, STATUS_LABEL } from "../../lib/format";

export function ComicMetadata({ comic }: { comic: Comic }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-line px-6 py-14 text-center sm:py-20"
    >
      <Link to="/comics" className="label link-underline text-ash-dim hover:text-fg">
        &larr; Back to archive
      </Link>

      <p className="label mt-8 text-ash-dim">
        {comic.series} — Chapter {comic.chapter}
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg sm:text-5xl">{comic.title}</h1>

      <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-xs text-ash">
        <span>{formatDate(comic.date)}</span>
        <span aria-hidden>&middot;</span>
        <span>{STATUS_LABEL[comic.status]}</span>
        <span aria-hidden>&middot;</span>
        <span>{comic.pages.length} page{comic.pages.length === 1 ? "" : "s"}</span>
      </div>

      {comic.description ? (
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ash">{comic.description}</p>
      ) : null}
    </motion.div>
  );
}
