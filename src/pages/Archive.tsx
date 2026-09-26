import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  getPublishedComics,
  groupBySeries,
  sortByChapter,
  sortByNewest,
  sortByOldest,
} from "../data/comics";
import { EmptyState } from "../components/ui/EmptyState";
import { ChapterRow } from "../components/comics/ChapterRow";

type SortMode = "newest" | "oldest" | "chapter" | "series";

const SORT_OPTIONS: { id: SortMode; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "chapter", label: "By chapter" },
  { id: "series", label: "By series" },
];

export function Archive() {
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const comics = getPublishedComics();

  const sorted = useMemo(() => {
    switch (sortMode) {
      case "oldest":
        return sortByOldest(comics);
      case "chapter":
        return sortByChapter(comics);
      default:
        return sortByNewest(comics);
    }
  }, [comics, sortMode]);

  const grouped = useMemo(() => groupBySeries(sortByNewest(comics)), [comics]);

  return (
    <div className="px-6 pb-32 pt-8 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <p className="label text-ash-dim">Full history</p>
          <h1 className="mt-2 font-display text-5xl text-fg sm:text-6xl">Archive</h1>
        </motion.header>

        <div role="group" aria-label="Sort comics" className="glass mb-12 flex flex-wrap justify-center gap-1 rounded-full border border-line p-1">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortMode(option.id)}
              aria-pressed={sortMode === option.id}
              className={`label rounded-full px-4 py-2 transition-colors duration-300 ${
                sortMode === option.id ? "bg-blood text-fg" : "text-ash hover:text-fg"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {comics.length === 0 ? (
          <div className="border-t border-line">
            <EmptyState
              title="Nothing archived yet."
              message="Once chapters are published, they'll be indexed here — sortable by date, chapter, and series."
            />
          </div>
        ) : sortMode === "series" ? (
          <div className="space-y-12">
            {Array.from(grouped.entries()).map(([series, entries]) => (
              <div key={series}>
                <p className="label mb-3 text-ash-dim">{series}</p>
                <div className="border-t border-line">
                  {entries.map((comic, i) => (
                    <ChapterRow key={comic.id} comic={comic} index={i} size="compact" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-t border-line">
            {sorted.map((comic, i) => (
              <ChapterRow key={comic.id} comic={comic} index={i} size="compact" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
