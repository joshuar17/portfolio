import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

type Entry = {
  role: string
  context: string
  points: string[]
}

const entries: Entry[] = [
  {
    role: "Automation & Tooling",
    context: "Real estate operations support",
    points: [
      "Built internal tools that removed repetitive steps from daily operational workflows.",
      "Designed spreadsheet-based systems the team could adopt without changing how they work.",
      "Measured every tool by the time it gave back, not the code it took to build.",
    ],
  },
  {
    role: "Browser & CRM Automation",
    context: "Web tooling",
    points: [
      "Wrote lightweight Chrome extensions that automated repetitive data entry inside a CRM.",
      "Worked directly with the DOM to enhance tools that couldn't otherwise be modified.",
      "Focused on small, reliable wins that compound across a full campaign.",
    ],
  },
]

export function Experience() {
  return (
    <section
      data-section-theme="light"
      className="scroll-mt-16 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="How I've worked"
          title="A track record of removing manual work"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-8">
          {entries.map((entry, i) => (
            <Reveal key={entry.role} delay={i * 80}>
              <article className="relative h-full rounded-xl border border-border bg-surface p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {entry.role}
                  </h3>
                </div>
                <p className="label-mono mt-1 text-muted-foreground">{entry.context}</p>
                <ul className="mt-5 space-y-3">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
