import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/stats", label: "Stats" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-600 text-white">
            DS
          </span>
          <span className="text-lg">DefectSense AI</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="hidden text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 md:inline-flex"
          >
            Live Demo
          </Link>
          <Link href="/demo" className={buttonClasses({ size: "sm" })}>
            Request Review
          </Link>
        </div>
      </Container>
    </header>
  );
}
