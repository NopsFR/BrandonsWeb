import { getPublishedComics, sortByNewest } from "../data/comics";
import { ComicGrid } from "../components/comics/ComicGrid";
import { EmptyState } from "../components/ui/EmptyState";

export function Comics() {
  const comics = sortByNewest(getPublishedComics());

  return (
    <div className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <p className="label text-ash-dim">Archive</p>
          <h1 className="mt-2 text-4xl text-paper sm:text-5xl">Comics</h1>
        </header>

        {comics.length > 0 ? (
          <ComicGrid comics={comics} />
        ) : (
          <EmptyState
            title="Nothing here yet."
            message="New pages will appear here when they're ready. Come back soon."
          />
        )}
      </div>
    </div>
  );
}
