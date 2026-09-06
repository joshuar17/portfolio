import Link from "next/link"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

type Capability = {
  title: string
  description: string
  proof: { label: string; href: string }[]
}

const capabilities: Capability[] = [
  {
    title: "Workflow Automation",
    description:
      "I turn repetitive, manual workflows into practical tools that live inside the software a team already uses.",
    proof: [
      { label: "Review Hunter System", href: "/projects/review-hunter" },
      { label: "Sourcing System", href: "/projects/sourcing-system" },
    ],
  },
  {
    title: "Browser Automation",
    description:
      "I build lightweight browser tools that quietly remove the repetitive manual actions from web apps that can't otherwise be changed.",
    proof: [{ label: "Resale Cert CRM Helper", href: "/projects/resale-cert-helper" }],
  },
  {
    title: "AI-Assisted Development",
    description:
      "I use modern AI tools as part of how I design, build, and problem-solve — moving faster from idea to working system.",
    proof: [{ label: "See how I work", href: "/#about" }],
  },
  {
    title: "Technical Problem Solving",
    description:
      "I treat repetitive operational problems as systems that can be mapped, simplified, automated, and improved.",
    proof: [{ label: "Explore the work", href: "/#work" }],
  },
]

export function Capabilities() {
  return (
    <section data-section-theme="light" className="scroll-mt-16 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="What I do"
          title="Capabilities, proven by what I've built"
          intro="Each capability points to something real. The projects are the proof."
        />

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {capabilities.map((cap, i) => (
            <Reveal as="li" key={cap.title} delay={i * 60}>
              <div className="group grid gap-4 py-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {cap.title}
                </h3>
                <div>
                  <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                    {cap.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {cap.proof.map((p) => (
                      <Link
                        key={p.label}
                        href={p.href}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                      >
                        <span className="text-accent">→</span>
                        <span className="border-b border-transparent transition-colors group-hover/link:border-accent">
                          {p.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
