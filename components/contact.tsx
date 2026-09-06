import Link from "next/link"
import { site } from "@/lib/site"
import { Reveal } from "./reveal"

export function Contact() {
  return (
    <section
      id="contact"
      data-section-theme="dark"
      className="relative scroll-mt-16 overflow-hidden bg-ink py-24 text-ink-foreground sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ink-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ink-border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 80% at 50% 100%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 100%, black, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="label-mono flex items-center justify-center gap-2 text-accent">
            <span className="h-px w-6 bg-accent" />
            Let&apos;s work together
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink-foreground sm:text-5xl">
            Have a repetitive problem worth automating?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-muted">
            If something in your workflow is slow, manual, and repeated too often, there&apos;s a
            good chance it can be turned into a one-click operation. Let&apos;s talk about it.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-base bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              {site.email}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={site.resume}
              className="inline-flex items-center gap-2 rounded-base border border-ink-border px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Download resume ↓
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
