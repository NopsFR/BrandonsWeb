import { Link } from "react-router-dom";
import { getActiveSocials } from "../../data/socials";

export function Footer() {
  const activeSocials = getActiveSocials();
  const year = new Date().getFullYear();

  return (
    <footer className="hairline mt-24 bg-void">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-lg tracking-wide text-paper">BRANDON</p>
            <p className="mt-2 max-w-xs text-sm text-ash">An independent webcomic.</p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <div>
              <p className="label mb-3 text-ash-dim">Site</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/comics" className="text-ash hover:text-paper">Comics</Link></li>
                <li><Link to="/archive" className="text-ash hover:text-paper">Archive</Link></li>
                <li><Link to="/about" className="text-ash hover:text-paper">About</Link></li>
              </ul>
            </div>

            {activeSocials.length > 0 ? (
              <div>
                <p className="label mb-3 text-ash-dim">Elsewhere</p>
                <ul className="space-y-2 text-sm">
                  {activeSocials.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-ash hover:text-paper"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse justify-between gap-4 border-t border-line pt-6 text-xs text-ash-dim sm:flex-row">
          <p>&copy; {year} Brandon. All rights reserved.</p>
          <p className="font-hand text-base text-ash-dim">— drawn late at night —</p>
        </div>
      </div>
    </footer>
  );
}
