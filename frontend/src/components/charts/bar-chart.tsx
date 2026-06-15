import { cn } from "@/lib/utils";

type BarDatum = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  data: BarDatum[];
  className?: string;
};

export function BarChart({ data, className }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("space-y-3", className)}>
      {data.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>{item.label}</span>
            <span className="font-semibold text-slate-900">{item.value}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-primary-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color ?? undefined,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
