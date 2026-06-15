type DonutDatum = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  data: DonutDatum[];
};

export function DonutChart({ data }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let current = 0;

  const gradient = data
    .map((item) => {
      const start = (current / total) * 100;
      current += item.value;
      const end = (current / total) * 100;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative h-28 w-28 rounded-full"
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      >
        <div className="absolute inset-4 rounded-full bg-white" />
      </div>
      <div className="space-y-2 text-sm">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-600">{item.label}</span>
            <span className="font-semibold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
