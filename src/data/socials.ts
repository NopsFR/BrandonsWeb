// Social / contact links. Leave `url` empty until a real link exists —
// components filter these out and never render a placeholder href.

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export const socials: SocialLink[] = [
  { id: "instagram", label: "Instagram", url: "" },
  { id: "bluesky", label: "Bluesky", url: "" },
  { id: "x", label: "X", url: "" },
  { id: "tumblr", label: "Tumblr", url: "" },
  { id: "comicfury", label: "ComicFury", url: "" },
  { id: "github", label: "GitHub", url: "" },
  { id: "email", label: "Email", url: "" },
];

export function getActiveSocials(): SocialLink[] {
  return socials.filter((s) => s.url.trim().length > 0);
}
