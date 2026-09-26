import { ButtonLink } from "../components/ui/Button";
import { SectionLabel } from "../components/ui/SectionLabel";
import { getPublishedComics, sortByNewest } from "../data/comics";
import { ComicGrid } from "../components/comics/ComicGrid";

export function Home() {
  const latest = sortByNewest(getPublishedComics()).slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line px-6 py-24 sm:py-32">
        <p aria-hidden className="font-hand pointer-events-none absolute -left-2 top-10 -rotate-6 text-2xl text-ash-dim/40 sm:top-16 sm:text-3xl">
          untitled, for now
        </p>

        <div className="mx-auto max-w-3xl text-center">
          <p className="label text-ash-dim">Comics &amp; drawings</p>
          <h1 className="mt-4 text-6xl leading-[0.95] text-paper sm:text-8xl">BRANDON</h1>
          <p className="mx-auto mt-6 max-w-md font-body text-base normal-case leading-relaxed text-ash sm:text-lg">
            Comics, drawings &amp; things I probably shouldn't have made.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink to="/comics" variant="primary">
              Read the comic
            </ButtonLink>
            <ButtonLink to="/about" variant="ghost">
              About Brandon
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <SectionLabel>Latest</SectionLabel>
          </div>

          {latest.length > 0 ? (
            <ComicGrid comics={latest} />
          ) : (
            <div className="border border-line px-8 py-14 text-center">
              <p className="text-lg text-paper">Nothing posted yet.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ash">
                New pages will appear here the moment they're ready.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
