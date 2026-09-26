import { motion } from "framer-motion";
import { biography, influences, portrait, projects, tools } from "../data/about";
import { getActiveSocials, socials } from "../data/socials";
import { PlaceholderPanel } from "../components/ui/PlaceholderPanel";
import { SectionLabel } from "../components/ui/SectionLabel";
import type { AboutListItem } from "../data/about";

function ListSection({ title, items }: { title: string; items: AboutListItem[] }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      {items.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm text-fg">
          {items.map((item) => (
            <li key={item.id}>
              {item.label}
              {item.note ? <span className="text-ash"> — {item.note}</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 font-mono text-xs text-ash-dim">— not listed yet —</p>
      )}
    </div>
  );
}

export function About() {
  const activeSocials = getActiveSocials();

  return (
    <div className="px-6 pb-32 pt-8 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="label text-ash-dim">About</p>
          <h1 className="mt-2 font-display text-5xl text-fg sm:text-6xl">Brandon</h1>
        </motion.header>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[240px_1fr] sm:gap-12">
          <PlaceholderPanel
            label="Signal lost"
            className="aspect-square w-full sm:aspect-auto sm:h-full sm:min-h-[240px]"
          />

          <div>
            {portrait === null && biography.length === 0 ? (
              <p className="font-mono text-sm leading-relaxed text-ash-dim">
                A biography hasn't been written yet — check back once Brandon adds one.
              </p>
            ) : (
              <div className="space-y-4 text-base leading-relaxed text-fg">
                {biography.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3">
          <ListSection title="Influences" items={influences} />
          <ListSection title="Tools" items={tools} />
          <ListSection title="Projects" items={projects} />
        </div>

        <div className="mt-10 border-t border-line pt-12">
          <SectionLabel>Links</SectionLabel>
          {activeSocials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {activeSocials.map((social) => (
                <li key={social.id}>
                  <a href={social.url} target="_blank" rel="noreferrer noopener" className="link-underline text-fg hover:text-blood">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 font-mono text-xs text-ash-dim">
              No links published yet — {socials.map((s) => s.label).join(", ")} may appear here in time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
