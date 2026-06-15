import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
