import DemoClient from "@/components/demo/demo-client";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export default function DemoPage() {
  return (
    <div className="py-12">
      <Container className="space-y-8">
        <div className="space-y-3">
          <Badge>Live Demo</Badge>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Upload an inspection image and analyze defects.
          </h1>
          <p className="text-sm text-slate-500">
            The demo uses the same FastAPI backend that powers production
            deployments. Results appear instantly with annotated overlays.
          </p>
        </div>
        <DemoClient />
      </Container>
    </div>
  );
}
