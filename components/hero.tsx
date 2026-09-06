import Link from "next/link"
import { site } from "@/lib/site"
import { Pipeline } from "./pipeline"

export function Hero() {
  return (
    <section
      data-section-theme="light"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* technical grid backdrop */}
      <div
        aria-hidden
        className="grid-lines-light pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 30% 0%, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 30% 0%, black, transparent 78%)",
        }}
      />
      {/* faint accent lighting, kept very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <div>
          <span className="label-mono inline-flex items-center gap-2.5 text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for work
            <span className="h-px w-6 bg-border" />
            {site.location}
          </span>

          <h1 className="display mt-6 text-pretty text-[3.5rem] leading-[0.9] sm:text-7xl lg:text-[6.25rem]">
            Joshua
            <br />
            <span className="text-muted-foreground">Romero</span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-xl font-medium leading-tight text-foreground sm:text-2xl">
            AI &amp; Automation Specialist building tools that turn{" "}
            <em className="not-italic text-accent">repetitive work</em> into one-click operations.
          </p>

          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            {site.positioning}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-base bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-accent"
            >
              View Selected Work
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-base border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Let&apos;s Work Together
            </Link>
          </div>
        </div>

        <div className="lg:pl-2">
          <Pipeline />
        </div>
      </div>

      {/* baseline stat strip anchoring the hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 hidden border-t border-border lg:block"
      >
        <div className="mx-auto flex max-w-6xl divide-x divide-border px-5 sm:px-8">
          {[
            ["15→1 min", "review handling time"],
            ["1-click", "operations from manual routines"],
            ["3", "shipped internal systems"],
            ["100%", "built to fit existing tools"],
          ].map(([stat, label]) => (
            <div key={label} className="flex-1 px-4 py-5 first:pl-0">
              <div className="text-lg font-semibold tracking-tight text-foreground">{stat}</div>
              <div className="mt-1 text-xs leading-snug text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
