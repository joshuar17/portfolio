import { Reveal } from "./reveal"

const metrics = [
  {
    value: "15 → 1",
    unit: "min / review",
    label: "Review Hunter cut review handling from ~15 minutes to ~1.",
  },
  {
    value: "1",
    unit: "spreadsheet",
    label: "Sourcing details, budgets, and CRM notes consolidated into one interface.",
  },
  {
    value: "5–10s",
    unit: "saved / page",
    label: "Per-page friction removed across an entire CRM campaign.",
  },
]

export function Impact() {
  return (
    <section
      data-section-theme="dark"
      className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ink-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ink-border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent 80%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="label-mono flex items-center gap-2 text-accent">
            <span className="h-px w-6 bg-accent" />
            The point of it all
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-bold tracking-tight text-ink-foreground sm:text-4xl">
            Automation is only useful when it gives time back
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">
            Every tool I build is measured the same way: does it turn something slow and manual
            into something fast and effortless?
          </p>
        </Reveal>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-border bg-ink-border sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal
              as="div"
              key={m.label}
              delay={i * 100}
              className="bg-ink p-7"
            >
              <dt className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                  {m.value}
                </span>
                <span className="label-mono text-ink-muted">{m.unit}</span>
              </dt>
              <dd className="mt-4 text-pretty text-sm leading-relaxed text-ink-muted">
                {m.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
