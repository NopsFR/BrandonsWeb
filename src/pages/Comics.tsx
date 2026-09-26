import { motion } from "framer-motion";
import { getPublishedComics, sortByNewest } from "../data/comics";
import { ChapterRow } from "../components/comics/ChapterRow";
import { EmptyState } from "../components/ui/EmptyState";

export function Comics() {
  const comics = sortByNewest(getPublishedComics());

  return (
    <div className="px-6 pb-32 pt-8 sm:pt-16">
      <div className="mx-auto max-w-4xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="label text-ash-dim">Archive</p>
          <h1 className="mt-2 font-display text-5xl text-fg sm:text-7xl">Comics</h1>
        </motion.header>

        {comics.length > 0 ? (
          <div>
            {comics.map((comic, i) => (
              <ChapterRow key={comic.id} comic={comic} index={i} size="large" />
            ))}
          </div>
        ) : (
          <div className="border-t border-line">
            <EmptyState
              title="The archive is quiet."
              message="The first chapter will appear here when it's ready."
            />
          </div>
        )}
      </div>
    </div>
  );
}
