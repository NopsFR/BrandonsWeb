import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { Atmosphere } from "../atmosphere/Atmosphere";

export function Layout() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Atmosphere />
      <Header />
      <main className="relative z-10 flex-1 pt-24 sm:pt-28">
        <PageTransition />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
