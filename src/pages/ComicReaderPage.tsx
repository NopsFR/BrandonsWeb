import { Navigate, useParams } from "react-router-dom";
import { getComicBySlug, getPublishedComics, sortByNewest } from "../data/comics";
import { ComicReader } from "../components/comics/ComicReader";

export function ComicReaderPage() {
  const { slug } = useParams<{ slug: string }>();
  const comic = slug ? getComicBySlug(slug) : undefined;

  if (!comic) {
    return <Navigate to="/comics" replace />;
  }

  const ordered = sortByNewest(getPublishedComics());
  const index = ordered.findIndex((c) => c.id === comic.id);
  const next = index > 0 ? ordered[index - 1] : undefined;
  const prev = index < ordered.length - 1 ? ordered[index + 1] : undefined;

  return <ComicReader comic={comic} prev={prev} next={next} />;
}
