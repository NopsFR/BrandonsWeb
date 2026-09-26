import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Comics } from "./pages/Comics";
import { ComicReaderPage } from "./pages/ComicReaderPage";
import { Archive } from "./pages/Archive";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="comics" element={<Comics />} />
          <Route path="comics/:slug" element={<ComicReaderPage />} />
          <Route path="archive" element={<Archive />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
