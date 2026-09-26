import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/comics", label: "Comics" },
  { to: "/about", label: "About" },
  { to: "/archive", label: "Archive" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-6">
      <div
        className={`glass flex w-full max-w-3xl items-center justify-between rounded-full border border-line px-5 py-2.5 transition-[background-color,box-shadow] duration-500 sm:px-6 ${
          scrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.35)]" : ""
        }`}
      >
        <NavLink to="/" className="font-display text-sm font-semibold tracking-wide text-fg sm:text-base">
          BRANDON
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="label relative px-4 py-2 text-ash transition-colors duration-300 aria-[current=page]:text-fg"
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M5 5 L19 19 M19 5 L5 19" strokeLinecap="round" />
            ) : (
              <path d="M4 7 H20 M4 12 H20 M4 17 H20" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed inset-x-4 top-20 z-40 flex flex-col overflow-hidden rounded-2xl border border-line p-2 sm:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className="label block rounded-xl px-4 py-4 text-ash transition-colors aria-[current=page]:bg-white/[0.06] aria-[current=page]:text-fg"
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
