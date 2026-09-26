import type { Comic } from "../../data/comics";
import { ComicCard } from "./ComicCard";

export function ComicGrid({ comics }: { comics: Comic[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}
