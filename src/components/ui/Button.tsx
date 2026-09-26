import { Link } from "react-router-dom";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "ghost";

const base =
  "label inline-flex items-center gap-2 border px-5 py-3 transition-colors duration-200 focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary:
    "border-crimson bg-crimson text-paper hover:bg-crimson-bright hover:border-crimson-bright",
  ghost: "border-line text-paper hover:border-paper",
};

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
}

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
