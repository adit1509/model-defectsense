import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
