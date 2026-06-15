import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>>;

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
