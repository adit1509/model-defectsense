import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const FEATURES = [
  {
    title: "Real-time defect scoring",
    description:
      "Detect surface cracks, spalling, and corrosion within seconds using fine-tuned YOLOv8 weights.",
  },
  {
    title: "Severity intelligence",
    description:
      "Automated severity scoring helps prioritize field crews with confidence and area weighting.",
  },
  {
    title: "Deployment-ready API",
    description:
      "FastAPI-powered inference with annotated imagery, counts, and CSV export support.",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Upload imagery",
    description: "Drag and drop an image from drones, inspections, or mobile.",
  },
  {
    step: "02",
    title: "Run inference",
    description: "YOLOv8 analyzes and labels every defect with confidence.",
  },
  {
    step: "03",
    title: "Act instantly",
    description: "Export detection tables and schedule the right response.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <Container className="relative grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge>DefectSense AI</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Production-ready defect detection for safer infrastructure.
            </h1>
            <p className="text-lg text-slate-600">
              Monitor bridges, tunnels, and concrete assets with AI vision that
              highlights defects, severity, and priority zones in one pass.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/demo" className={buttonClasses({ size: "lg" })}>
                Run live demo
              </Link>
              <Link
                href="/about"
                className={buttonClasses({
                  variant: "secondary",
                  size: "lg",
                })}
              >
                Meet the platform
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <div>
                <p className="text-2xl font-semibold text-slate-900">98%</p>
                <p>Detection recall in pilot runs</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">2.4s</p>
                <p>Average inference latency</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">120+</p>
                <p>Assets monitored weekly</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <Card className="glow animate-float space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  Live defect dashboard
                </p>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  Online
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Active inspections</p>
                  <p className="text-2xl font-semibold text-slate-900">28</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">High severity</p>
                  <p className="text-2xl font-semibold text-rose-600">6</p>
                </div>
              </div>
              <div className="h-40 rounded-2xl bg-gradient-to-br from-primary-100 via-white to-primary-50" />
              <p className="text-sm text-slate-500">
                Annotated imagery and scores flow into your maintenance systems.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge>Capabilities</Badge>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                AI vision built for civil infrastructure teams
              </h2>
            </div>
            <Link
              href="/stats"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View performance stats →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="animate-fade-up space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Badge>Workflow</Badge>
            <h2 className="text-3xl font-semibold text-slate-900">
              From inspection to action in three steps
            </h2>
            <p className="text-sm text-slate-500">
              DefectSense AI streamlines the inspection pipeline from field
              capture to actionable work orders.
            </p>
          </div>
          <div className="space-y-4">
            {WORKFLOW.map((item) => (
              <Card key={item.step} className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-sm font-semibold text-primary-700">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <Card className="flex flex-col items-start justify-between gap-6 bg-gradient-to-br from-primary-600 via-primary-700 to-slate-900 text-white md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold">
                Ready to monitor defects at scale?
              </h2>
              <p className="mt-2 text-sm text-primary-100">
                Deploy DefectSense AI today and start prioritizing maintenance
                with clarity.
              </p>
            </div>
            <Link
              href="/demo"
              className={buttonClasses({
                variant: "secondary",
                size: "lg",
                className: "bg-white text-slate-900",
              })}
            >
              Launch the demo
            </Link>
          </Card>
        </Container>
      </section>
    </div>
  );
}
