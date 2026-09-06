import Link from "next/link"
import { credentials } from "@/lib/credentials"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function CredentialsSection() {
  return (
    <section
      data-section-theme="light"
      className="scroll-mt-16 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="Learning path"
          title="A deliberate progression into AI automation"
          intro="A structured Zapier learning track — from automation foundations to building AI agents. Certificate links can be attached as each PDF is added."
        />

        <ol className="relative mt-14">
          <span
            aria-hidden
            className="absolute left-[0.9375rem] top-2 bottom-2 hidden w-px bg-border sm:block"
          />
          {credentials.map((cred, i) => (
            <Reveal as="li" key={cred.name} delay={i * 70}>
              <div className="relative grid gap-4 pb-8 sm:grid-cols-[auto_1fr] sm:gap-6">
                <div className="relative flex items-center gap-3 sm:block">
                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold tabular-nums ${
                      i === credentials.length - 1
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-accent/40 bg-background text-accent"
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>

                <div className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="label-mono text-accent">{cred.stage}</span>
                    <span className="label-mono text-muted-foreground">· {cred.issuer}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                    {cred.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {cred.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {cred.capability}
                    </span>
                    {cred.available ? (
                      <Link
                        href={cred.asset}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                      >
                        View certificate →
                      </Link>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground">
                        Certificate available on request
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
