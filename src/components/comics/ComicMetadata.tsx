import { Link } from "react-router-dom";
import type { Comic } from "../../data/comics";
import { formatDate, STATUS_LABEL } from "../../lib/format";

export function ComicMetadata({ comic }: { comic: Comic }) {
  return (
    <div className="border-b border-line px-6 py-10 text-center sm:py-14">
      <Link to="/comics" className="label text-ash-dim hover:text-paper">
        &larr; Back to archive
      </Link>

      <p className="label mt-6 text-ash-dim">
        {comic.series} — Chapter {comic.chapter}
      </p>
      <h1 className="mt-2 text-3xl text-paper sm:text-4xl">{comic.title}</h1>

      <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ash">
        <span>{formatDate(comic.date)}</span>
        <span aria-hidden>&middot;</span>
        <span>{STATUS_LABEL[comic.status]}</span>
        <span aria-hidden>&middot;</span>
        <span>{comic.pages.length} page{comic.pages.length === 1 ? "" : "s"}</span>
      </div>

      {comic.description ? (
        <p className="mx-auto mt-6 max-w-xl font-body text-sm normal-case leading-relaxed text-ash">
          {comic.description}
        </p>
      ) : null}
    </div>
  );
}
