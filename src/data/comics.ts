// Comic content lives here, not in JSX. Add a new comic by pushing an entry
// onto `comics` below — Home, Comics, Archive, and the reader all read from
// this one array, so nothing else needs to change.
//
// Expected assets for a comic with slug "some-slug":
//   public/comics/some-slug/cover.webp
//   public/comics/some-slug/001.webp
//   public/comics/some-slug/002.webp
//   ...

export type ComicStatus = "ongoing" | "completed" | "hiatus" | "coming-soon";

export interface ComicPage {
  id: string;
  image: string;
  alt: string;
  pageNumber: number;
  /** Intrinsic pixel dimensions of the source image, so the browser can
   *  reserve the correct space before it loads (no layout shift, no
   *  collapsed height while lazy-loaded pages are off-screen). */
  width: number;
  height: number;
}

export interface Comic {
  id: string;
  slug: string;
  title: string;
  chapter: number;
  series: string;
  description: string;
  /** ISO date string, e.g. "2026-01-15" */
  date: string;
  /** Path under /public, or null while no cover art exists yet. */
  cover: string | null;
  pages: ComicPage[];
  status: ComicStatus;
  published: boolean;
}

export const comics: Comic[] = [];

export function getPublishedComics(): Comic[] {
  return comics.filter((comic) => comic.published);
}

export function getComicBySlug(slug: string): Comic | undefined {
  return comics.find((comic) => comic.slug === slug && comic.published);
}

export function sortByNewest(list: Comic[]): Comic[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export function sortByOldest(list: Comic[]): Comic[] {
  return [...list].sort((a, b) => a.date.localeCompare(b.date));
}

export function sortByChapter(list: Comic[]): Comic[] {
  return [...list].sort((a, b) => a.chapter - b.chapter);
}

export function groupBySeries(list: Comic[]): Map<string, Comic[]> {
  const groups = new Map<string, Comic[]>();
  for (const comic of list) {
    const existing = groups.get(comic.series) ?? [];
    existing.push(comic);
    groups.set(comic.series, existing);
  }
  return groups;
}
