import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const principles = [
  {
    title: "Start from the real workflow",
    body: "I watch how work actually happens before writing a line of code — the tool has to fit the person, not the other way around.",
  },
  {
    title: "Build where people already are",
    body: "The best tool is one nobody has to be convinced to open. I put automation inside the spreadsheet, the browser, the CRM they already use.",
  },
  {
    title: "Measure in time returned",
    body: "A tool is successful when a task that took minutes takes seconds. That's the number that matters.",
  },
]

export function About() {
  return (
    <section
      id="about"
      data-section-theme="light"
      className="scroll-mt-16 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            index="About"
            title="I make repetitive work disappear"
            intro="I'm an AI & Automation Specialist focused on the unglamorous, repetitive tasks that slow teams down. I find them, understand them, and turn them into simple tools and automated workflows that quietly do the work in the background."
          />

          <div className="space-y-px overflow-hidden rounded-xl border border-border bg-border">
            {principles.map((p, i) => (
              <Reveal as="div" key={p.title} delay={i * 80} className="bg-surface p-7">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
