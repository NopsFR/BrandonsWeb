import { forwardRef, useState } from "react";
import type { ComicPage as ComicPageData } from "../../data/comics";

interface ComicPageProps {
  page: ComicPageData;
}

export const ComicPage = forwardRef<HTMLDivElement, ComicPageProps>(function ComicPage({ page }, ref) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} data-page-number={page.pageNumber} className="relative mx-auto w-full max-w-3xl">
      <img
        src={page.image}
        alt={page.alt}
        width={page.width}
        height={page.height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`block h-auto w-full transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
});
