import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const VALUES = [
  {
    title: "Reliability first",
    description:
      "We design every model and workflow to be trusted in the field, with clear, explainable outputs.",
  },
  {
    title: "Infrastructure focus",
    description:
      "Our datasets and models are tuned for concrete and structural defects at scale.",
  },
  {
    title: "Actionable insights",
    description:
      "We deliver the right data at the right time so crews can prioritize repairs.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <Container className="space-y-10">
        <div className="space-y-3">
          <Badge>About DefectSense</Badge>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Vision intelligence for safer cities.
          </h1>
          <p className="text-sm text-slate-500">
            DefectSense AI is a production-grade platform that brings high
            fidelity defect detection to infrastructure teams, from inspection
            to remediation.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Mission-driven platform
            </h2>
            <p className="text-sm text-slate-500">
              We believe civil infrastructure teams deserve AI tools that are
              as dependable as their expertise. DefectSense AI combines
              fine-tuned computer vision models, transparent severity scoring,
              and clean API integrations to help agencies move faster.
            </p>
            <p className="text-sm text-slate-500">
              Our architecture is built for real-world inspection workflows,
              integrating directly with the FastAPI inference backend to
              deliver annotated imagery and inspection-ready reports.
            </p>
          </Card>
          <Card className="space-y-4 bg-slate-900 text-white">
            <h2 className="text-xl font-semibold">What you get</h2>
            <ul className="space-y-3 text-sm text-slate-100">
              <li>• Secure and reliable inference endpoints</li>
              <li>• Real-time defect dashboards</li>
              <li>• Severity-based prioritization insights</li>
              <li>• CSV and annotated image exports</li>
            </ul>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <Card key={value.title} className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {value.title}
              </h3>
              <p className="text-sm text-slate-500">{value.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
