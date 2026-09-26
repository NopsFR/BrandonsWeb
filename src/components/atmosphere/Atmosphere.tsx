import { SmokeCanvas } from "./SmokeCanvas";
import { CursorGlow } from "./CursorGlow";

/** The environment every page sits inside: fog, ambient light, grain. */
export function Atmosphere() {
  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-20 bg-void" />
      <SmokeCanvas />
      <CursorGlow />
      <div aria-hidden className="grain-layer" />
    </>
  );
}
