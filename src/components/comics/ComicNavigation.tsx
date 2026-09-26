import { Link } from "react-router-dom";
import type { Comic } from "../../data/comics";

interface ComicNavigationProps {
  prev?: Comic;
  next?: Comic;
}

export function ComicNavigation({ prev, next }: ComicNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Chapter navigation" className="border-t border-line px-6 py-12">
      <div className="mx-auto flex max-w-3xl items-stretch justify-between gap-4">
        {prev ? (
          <Link
            to={`/comics/${prev.slug}`}
            className="group glass flex-1 rounded-2xl border border-line px-5 py-4 text-left transition-colors duration-300 hover:border-line-strong"
          >
            <span className="label text-ash-dim">&larr; Previous</span>
            <span className="mt-1 block truncate font-display text-fg transition-colors group-hover:text-blood">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}

        {next ? (
          <Link
            to={`/comics/${next.slug}`}
            className="group glass flex-1 rounded-2xl border border-line px-5 py-4 text-right transition-colors duration-300 hover:border-line-strong"
          >
            <span className="label text-ash-dim">Next &rarr;</span>
            <span className="mt-1 block truncate font-display text-fg transition-colors group-hover:text-blood">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </nav>
  );
}
