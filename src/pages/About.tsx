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
        <ul className="mt-4 space-y-2 text-sm text-paper">
          {items.map((item) => (
            <li key={item.id}>
              {item.label}
              {item.note ? <span className="text-ash"> — {item.note}</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm italic text-ash-dim">Not listed yet.</p>
      )}
    </div>
  );
}

export function About() {
  const activeSocials = getActiveSocials();

  return (
    <div className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="label text-ash-dim">About</p>
          <h1 className="mt-2 text-4xl text-paper sm:text-5xl">Brandon</h1>
        </header>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[220px_1fr] sm:gap-12">
          <PlaceholderPanel
            label="Portrait pending"
            className="aspect-square w-full sm:aspect-auto sm:h-full sm:min-h-[220px]"
          />

          <div>
            {portrait === null && biography.length === 0 ? (
              <p className="text-sm italic leading-relaxed text-ash-dim">
                A biography hasn't been written yet — check back once Brandon adds one.
              </p>
            ) : (
              <div className="space-y-4 font-body text-base normal-case leading-relaxed text-paper">
                {biography.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3">
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
                  <a href={social.url} target="_blank" rel="noreferrer noopener" className="text-paper hover:text-crimson-bright">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm italic text-ash-dim">
              No links published yet — {socials.map((s) => s.label).join(", ")} may appear here in time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
