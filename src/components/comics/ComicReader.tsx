import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import type { Comic } from "../../data/comics";
import { ComicMetadata } from "./ComicMetadata";
import { ComicPage } from "./ComicPage";
import { ComicNavigation } from "./ComicNavigation";
import { EmptyState } from "../ui/EmptyState";
import { ButtonLink } from "../ui/Button";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface ComicReaderProps {
  comic: Comic;
  prev?: Comic;
  next?: Comic;
}

/**
 * Vertical scroll reader: page 1 above page 2 above page 3, the way a
 * webcomic is meant to be read. Arrow/j/k keys jump between page tops. A
 * thin progress line and a page counter surface only while scrolling, so
 * nothing sits on top of the artwork while you read.
 */
export function ComicReader({ comic, prev, next }: ComicReaderProps) {
  const articleRef = useRef<HTMLElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentIndex = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  const [visiblePage, setVisiblePage] = useState(1);
  const [pillVisible, setPillVisible] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start start", "end end"] });

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, comic.pages.length - 1));
      currentIndex.current = clamped;
      pageRefs.current[clamped]?.scrollIntoView({ behavior: "auto", block: "start" });
    },
    [comic.pages.length],
  );

  useEffect(() => {
    if (comic.pages.length === 0) return;

    function onKeyDown(event: KeyboardEvent) {
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

  useEffect(() => {
    if (comic.pages.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const pageNumber = Number((entry.target as HTMLElement).dataset.pageNumber);
            setVisiblePage(pageNumber);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const el of pageRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [comic.pages.length]);

  useEffect(() => {
    if (comic.pages.length === 0) return;

    function onScroll() {
      setPillVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setPillVisible(false), 1400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [comic.pages.length]);

  return (
    <article ref={articleRef}>
      {comic.pages.length > 0 && !reducedMotion ? (
        <motion.div
          aria-hidden
          className="fixed left-0 top-0 z-30 h-0.5 w-full origin-left bg-blood"
          style={{ scaleX: scrollYProgress }}
        />
      ) : null}

      <ComicMetadata comic={comic} />

      {comic.pages.length > 0 ? (
        <>
          <div className="flex flex-col gap-3 bg-void-deep py-3 sm:gap-6 sm:py-6">
            {comic.pages.map((page, index) => (
              <ComicPage
                key={page.id}
                page={page}
                ref={(el) => {
                  pageRefs.current[index] = el;
                }}
              />
            ))}
          </div>

          <div
            className={`glass fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-line px-4 py-2 font-mono text-xs text-ash transition-opacity duration-500 ${
              pillVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {String(visiblePage).padStart(2, "0")} / {String(comic.pages.length).padStart(2, "0")}
          </div>
        </>
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
