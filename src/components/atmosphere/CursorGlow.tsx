import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * A faint ambient light that eases toward the pointer. Desktop-only (no
 * fine pointer, no glow) and off entirely under reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [enabled] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  useEffect(() => {
    if (reducedMotion || !enabled) return;
    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let rafId = 0;

    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      if (el) el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, enabled]);

  if (reducedMotion || !enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] rounded-full transition-opacity duration-1000"
      style={{
        background: "radial-gradient(circle, rgba(179,33,47,0.07) 0%, rgba(179,33,47,0) 70%)",
      }}
    />
  );
}
