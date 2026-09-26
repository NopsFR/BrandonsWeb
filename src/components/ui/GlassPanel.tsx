import type { ComponentPropsWithoutRef } from "react";

interface GlassPanelProps extends ComponentPropsWithoutRef<"div"> {
  as?: "div" | "nav" | "section" | "article";
}

/** A translucent, blurred surface. Used sparingly — nav, small metadata
 *  chips, reader controls — never as the default treatment for every box. */
export function GlassPanel({ as: Tag = "div", className = "", ...props }: GlassPanelProps) {
  return <Tag className={`glass border border-line ${className}`} {...props} />;
}
