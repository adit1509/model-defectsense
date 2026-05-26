import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const KPI = [
  { label: "Assets monitored", value: "120+" },
  { label: "Average inference", value: "2.4s" },
  { label: "Weekly detections", value: "4,320" },
  { label: "Response improvement", value: "38%" },
];

const DEFECT_DISTRIBUTION = [
  { label: "Cracks", value: 46, color: "#2563eb" },
  { label: "Spalling", value: 28, color: "#38bdf8" },
  { label: "Corrosion", value: 16, color: "#0ea5e9" },
  { label: "Other", value: 10, color: "#94a3b8" },
];

const SEVERITY_SPLIT = [
  { label: "High", value: 18, color: "#f43f5e" },
  { label: "Medium", value: 44, color: "#f59e0b" },
  { label: "Low", value: 38, color: "#10b981" },
];

export default function StatsPage() {
  return (
    <div className="py-12">
      <Container className="space-y-10">
        <div className="space-y-3">
          <Badge>Performance</Badge>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Operational statistics and model impact.
          </h1>
          <p className="text-sm text-slate-500">
            Track defect volumes, severity ratios, and inference cadence across
            all monitored assets.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {KPI.map((item) => (
            <Card key={item.label} className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                {item.label}
              </p>
              <p className="text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Defect distribution
              </p>
              <p className="text-xs text-slate-500">
                Weekly detection volume by class.
              </p>
            </div>
            <BarChart data={DEFECT_DISTRIBUTION} />
          </Card>
          <Card className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Severity mix
              </p>
              <p className="text-xs text-slate-500">
                Portion of detections by severity level.
              </p>
            </div>
            <DonutChart data={SEVERITY_SPLIT} />
          </Card>
        </div>

        <Card className="space-y-4">
          <p className="text-sm font-semibold text-slate-700">
            Performance insights
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Model accuracy</p>
              <p className="text-xl font-semibold text-slate-900">96.4%</p>
              <p className="text-xs text-slate-500">
                Validated on MBBD 2025 dataset.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Priority turnaround</p>
              <p className="text-xl font-semibold text-slate-900">-52%</p>
              <p className="text-xs text-slate-500">
                Faster dispatch for critical defects.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">False positives</p>
              <p className="text-xl font-semibold text-slate-900">1.8%</p>
              <p className="text-xs text-slate-500">
                Confidence thresholds tuned weekly.
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
