// About-page content. Nothing here is invented — these arrays start empty
// and the About page renders an intentional placeholder until they're filled.

export interface AboutListItem {
  id: string;
  label: string;
  note?: string;
}

export const influences: AboutListItem[] = [];
export const tools: AboutListItem[] = [];
export const projects: AboutListItem[] = [];

/** Set once a real bio exists. Left empty rather than invented. */
export const biography: string[] = [];

/** Path under /public, or null while no portrait exists yet. */
export const portrait: string | null = null;
