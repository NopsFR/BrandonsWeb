import { forwardRef } from "react";
import type { ComicPage as ComicPageData } from "../../data/comics";

interface ComicPageProps {
  page: ComicPageData;
  totalPages: number;
}

export const ComicPage = forwardRef<HTMLDivElement, ComicPageProps>(function ComicPage(
  { page, totalPages },
  ref,
) {
  return (
    <div ref={ref} data-page-number={page.pageNumber} className="relative mx-auto w-full max-w-3xl">
      <img
        src={page.image}
        alt={page.alt}
        width={page.width}
        height={page.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
      <span className="label absolute bottom-3 right-3 bg-void/70 px-2 py-1 text-ash">
        {page.pageNumber} / {totalPages}
      </span>
    </div>
  );
});
