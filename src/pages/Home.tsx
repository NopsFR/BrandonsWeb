import { SectionLabel } from "../components/ui/SectionLabel";
import { EmptyState } from "../components/ui/EmptyState";
import { getPublishedComics, sortByNewest } from "../data/comics";
import { ChapterRow } from "../components/comics/ChapterRow";
import { Hero } from "../components/home/Hero";

export function Home() {
  const latest = sortByNewest(getPublishedComics()).slice(0, 4);

  return (
    <div>
      <Hero />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <SectionLabel>Latest</SectionLabel>
          </div>

          {latest.length > 0 ? (
            <div>
              {latest.map((comic, i) => (
                <ChapterRow key={comic.id} comic={comic} index={i} size="compact" />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nothing posted yet."
              message="New pages will appear here the moment they're ready."
            />
          )}
        </div>
      </section>
    </div>
  );
}
