import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface Blob {
  baseX: number;
  baseY: number;
  radius: number;
  speedX: number;
  speedY: number;
  phaseX: number;
  phaseY: number;
  drift: number;
  hue: "void" | "blood";
}

function makeBlobs(count: number, width: number, height: number): Blob[] {
  const blobs: Blob[] = [];
  for (let i = 0; i < count; i++) {
    blobs.push({
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      radius: Math.min(width, height) * (0.35 + Math.random() * 0.35),
      speedX: 0.00006 + Math.random() * 0.00008,
      speedY: 0.00005 + Math.random() * 0.00007,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      drift: width * (0.12 + Math.random() * 0.1),
      hue: i === count - 1 ? "blood" : "void",
    });
  }
  return blobs;
}

/**
 * A slow, monochrome fog — a handful of soft radial gradients drifting on
 * sine/cosine paths, blurred via CSS (cheap, GPU-composited) rather than in
 * canvas. No particles, no geometry: just atmosphere breathing in the dark.
 */
export function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isSmallScreen = window.innerWidth < 768;
    const blobCount = isSmallScreen ? 3 : 5;
    const dpr = Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1 : 1.5);

    let width = 0;
    let height = 0;
    let blobs: Blob[] = [];
    let rafId = 0;

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      blobs = makeBlobs(blobCount, width, height);
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);
      for (const blob of blobs) {
        const x = blob.baseX + Math.sin(time * blob.speedX + blob.phaseX) * blob.drift;
        const y = blob.baseY + Math.cos(time * blob.speedY + blob.phaseY) * blob.drift * 0.7;

        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, blob.radius);
        if (blob.hue === "blood") {
          gradient.addColorStop(0, "rgba(120, 20, 30, 0.10)");
          gradient.addColorStop(1, "rgba(120, 20, 30, 0)");
        } else {
          gradient.addColorStop(0, "rgba(120, 122, 132, 0.10)");
          gradient.addColorStop(1, "rgba(120, 122, 132, 0)");
        }
        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, width, height);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      draw(0);
      return () => window.removeEventListener("resize", resize);
    }

    function loop(time: number) {
      if (!document.hidden) draw(time);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ filter: "blur(60px)" }}
    />
  );
}
