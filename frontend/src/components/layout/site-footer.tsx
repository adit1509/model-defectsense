import Link from "next/link";

import { Container } from "@/components/ui/container";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/stats", label: "Stats" },
  { href: "/demo", label: "Demo" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div>
          <p className="text-lg font-semibold text-slate-900">DefectSense AI</p>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Modern computer vision for infrastructure teams. Detect defects in
            seconds with reliable, explainable AI insights.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-slate-400">© 2026 DefectSense AI</span>
        </div>
      </Container>
    </footer>
  );
}
