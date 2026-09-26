import { useCallback, useEffect, useRef } from "react";
import type { Comic } from "../../data/comics";
import { ComicMetadata } from "./ComicMetadata";
import { ComicPage } from "./ComicPage";
import { ComicNavigation } from "./ComicNavigation";
import { EmptyState } from "../ui/EmptyState";
import { ButtonLink } from "../ui/Button";

interface ComicReaderProps {
  comic: Comic;
  prev?: Comic;
  next?: Comic;
}

/**
 * Vertical scroll reader: page 1 above page 2 above page 3, the way a
 * webcomic is meant to be read. Arrow/j/k keys jump between page tops.
 */
export function ComicReader({ comic, prev, next }: ComicReaderProps) {
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentIndex = useRef(0);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, comic.pages.length - 1));
    currentIndex.current = clamped;
    pageRefs.current[clamped]?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [comic.pages.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (comic.pages.length === 0) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      if (event.key === "ArrowDown" || event.key.toLowerCase() === "j") {
        event.preventDefault();
        scrollToIndex(currentIndex.current + 1);
      } else if (event.key === "ArrowUp" || event.key.toLowerCase() === "k") {
        event.preventDefault();
        scrollToIndex(currentIndex.current - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [comic.pages.length, scrollToIndex]);

  return (
    <article>
      <ComicMetadata comic={comic} />

      {comic.pages.length > 0 ? (
        <div className="flex flex-col gap-2 bg-void-soft py-2 sm:gap-4 sm:py-4">
          {comic.pages.map((page, index) => (
            <ComicPage
              key={page.id}
              page={page}
              totalPages={comic.pages.length}
              ref={(el) => {
                pageRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      ) : (
        <div className="px-6 py-16">
          <EmptyState
            title="No pages yet"
            message="This chapter is announced but the pages haven't been uploaded. Check back once they're ready."
          >
            <ButtonLink to="/comics" variant="ghost">
              Return to archive
            </ButtonLink>
          </EmptyState>
        </div>
      )}

      <ComicNavigation prev={prev} next={next} />
    </article>
  );
}
