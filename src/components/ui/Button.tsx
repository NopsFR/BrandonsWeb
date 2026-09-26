import { Link } from "react-router-dom";
import type { ComponentPropsWithoutRef } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost";

const base =
  "label relative inline-flex items-center gap-2 border px-6 py-3.5 transition-colors duration-300 focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary: "border-blood bg-blood text-fg hover:bg-[#d12a3a] hover:border-[#d12a3a]",
  ghost: "border-line text-fg hover:border-line-strong hover:bg-white/[0.03]",
};

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
}

export function ButtonLink({ variant = "primary", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Magnetic className="inline-block">
      <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </Link>
    </Magnetic>
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <Magnetic className="inline-block">
      <button className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    </Magnetic>
  );
}
