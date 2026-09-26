import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ButtonLink } from "../ui/Button";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ perspective: 1000 }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="label text-ash-dim"
      >
        Webcomic — In Progress
      </motion.p>

      <motion.h1
        style={reducedMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-6 select-none whitespace-nowrap font-display text-[15vw] leading-[0.9] text-fg sm:text-9xl"
      >
        BRANDON
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ash sm:text-lg"
      >
        Comics. Drawings.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <ButtonLink to="/comics" variant="primary">
          Read the comic
        </ButtonLink>
        <ButtonLink to="/about" variant="ghost">
          About Brandon
        </ButtonLink>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-transparent via-ash-dim to-transparent"
        />
      </motion.div>
    </section>
  );
}
