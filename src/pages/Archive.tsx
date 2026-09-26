import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPublishedComics,
  groupBySeries,
  sortByChapter,
  sortByNewest,
  sortByOldest,
  type Comic,
} from "../data/comics";
import { EmptyState } from "../components/ui/EmptyState";
import { formatDate, STATUS_LABEL } from "../lib/format";

type SortMode = "newest" | "oldest" | "chapter" | "series";

const SORT_OPTIONS: { id: SortMode; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "chapter", label: "By chapter" },
  { id: "series", label: "By series" },
];

function ArchiveRow({ comic }: { comic: Comic }) {
  return (
    <Link
      to={`/comics/${comic.slug}`}
      className="group flex items-baseline justify-between gap-4 border-b border-line py-4 transition-colors hover:border-ash"
    >
      <div className="min-w-0">
        <p className="label text-ash-dim">Ch. {comic.chapter}</p>
        <p className="mt-1 truncate text-lg text-paper group-hover:text-crimson-bright">{comic.title}</p>
      </div>
      <div className="shrink-0 text-right text-xs text-ash">
        <p>{formatDate(comic.date)}</p>
        <p className="mt-1">{STATUS_LABEL[comic.status]}</p>
      </div>
    </Link>
  );
}

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
    <div className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <p className="label text-ash-dim">Full history</p>
          <h1 className="mt-2 text-4xl text-paper sm:text-5xl">Archive</h1>
        </header>

        <div role="group" aria-label="Sort comics" className="mb-10 flex flex-wrap justify-center gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortMode(option.id)}
              aria-pressed={sortMode === option.id}
              className={`label border px-4 py-2 transition-colors ${
                sortMode === option.id
                  ? "border-crimson bg-crimson text-paper"
                  : "border-line text-ash hover:text-paper"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {comics.length === 0 ? (
          <EmptyState
            title="The archive is empty."
            message="Once chapters are published, they'll be indexed here — sortable by date, chapter, and series."
          />
        ) : sortMode === "series" ? (
          <div className="space-y-10">
            {Array.from(grouped.entries()).map(([series, entries]) => (
              <div key={series}>
                <p className="label mb-3 text-ash-dim">{series}</p>
                {entries.map((comic) => (
                  <ArchiveRow key={comic.id} comic={comic} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {sorted.map((comic) => (
              <ArchiveRow key={comic.id} comic={comic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
