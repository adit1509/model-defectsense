import { cn } from "@/lib/utils";

type SeverityPillProps = {
  label: string;
};

const COLORS: Record<string, string> = {
  HIGH: "bg-rose-100 text-rose-700 border-rose-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export function SeverityPill({ label }: SeverityPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        COLORS[label] ?? "bg-slate-100 text-slate-600 border-slate-200",
      )}
    >
      {label}
    </span>
  );
}
