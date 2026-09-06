import Link from "next/link"
import { site } from "@/lib/site"
import { Pipeline } from "./pipeline"

export function Hero() {
  return (
    <section
      data-section-theme="light"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* subtle technical grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <span className="label-mono inline-flex items-center gap-2 text-muted-foreground">
            <span className="h-px w-6 bg-accent" />
            {site.location}
          </span>

          <h1 className="mt-5 text-pretty text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Joshua
            <br />
            Romero
          </h1>

          <p className="mt-5 flex items-center gap-3 text-lg font-medium sm:text-xl">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {site.title}
          </p>

          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            {site.positioning}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-base bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              View My Work
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-base border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Let&apos;s Work Together
            </Link>
          </div>
        </div>

        <div className="lg:pl-4">
          <Pipeline />
        </div>
      </div>
    </section>
  )
}
