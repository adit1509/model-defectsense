import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-lg",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

const SIZES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<ButtonProps, "variant" | "size" | "className">) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}
