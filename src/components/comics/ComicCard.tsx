import { Link } from "react-router-dom";
import type { Comic } from "../../data/comics";
import { PlaceholderPanel } from "../ui/PlaceholderPanel";
import { formatDate, STATUS_LABEL } from "../../lib/format";

export function ComicCard({ comic }: { comic: Comic }) {
  return (
    <Link
      to={`/comics/${comic.slug}`}
      className="group block border border-line transition-colors duration-200 hover:border-ash"
    >
      <div className="aspect-[3/4] w-full">
        {comic.cover ? (
          <img
            src={comic.cover}
            alt={`Cover for ${comic.title}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderPanel label="No cover yet" className="h-full w-full" />
        )}
      </div>
      <div className="border-t border-line p-4">
        <p className="label text-ash-dim">Ch. {comic.chapter} — {STATUS_LABEL[comic.status]}</p>
        <h3 className="mt-1 truncate font-display text-lg text-paper group-hover:text-crimson-bright">
          {comic.title}
        </h3>
        <p className="mt-1 text-xs text-ash">{formatDate(comic.date)}</p>
      </div>
    </Link>
  );
}
