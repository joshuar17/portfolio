import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProject, projects } from "@/lib/projects"
import { site } from "@/lib/site"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Project not found" }
  return {
    title: project.name,
    description: project.summary,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <SiteNav />
      <main className="pt-14">
        {/* Header */}
        <header
          data-section-theme="light"
          className="border-b border-border py-14 sm:py-20"
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <span aria-hidden className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              All work
            </Link>

            <span className="label-mono mt-8 flex items-center gap-2 text-accent">
              <span className="h-px w-6 bg-accent" />
              {project.category}
            </span>
            <h1 className="mt-4 text-pretty text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Gallery */}
        <section data-section-theme="light" className="border-b border-border bg-muted py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="grid gap-6">
              {project.images.map((img, i) => (
                <Reveal key={img.src} delay={i * 80}>
                  <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_60px_-40px_rgba(20,22,26,0.4)]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-contain"
                        priority={i === 0}
                      />
                    </div>
                    <figcaption className="border-t border-border px-5 py-3 text-center text-xs text-muted-foreground">
                      {img.alt}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Case study body */}
        <section data-section-theme="light" className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            {/* At a glance rail */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-border bg-surface p-6">
                <span className="label-mono text-muted-foreground">At a glance</span>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">Category</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">
                      {project.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">Outcome</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-foreground">
                      {project.outcome}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">Built with</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-sm text-foreground">
                          {t}
                          {t !== project.tech[project.tech.length - 1] ? "," : ""}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>

            {/* Narrative */}
            <div className="space-y-12">
              <Block heading="The problem" body={project.problem} />
              <Block heading="My approach" body={project.approach} />
              <Block heading="The solution" body={project.solution} />

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  How it works
                </h2>
                <ol className="mt-5 space-y-3">
                  {project.howItWorks.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-base border border-accent/40 bg-accent/10 text-xs font-bold tabular-nums text-accent">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-base leading-relaxed text-muted-foreground">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <Block heading="The outcome" body={project.outcome} />

              <div className="rounded-xl border border-border bg-muted p-7">
                <span className="label-mono text-accent">Why it matters</span>
                <p className="mt-3 text-pretty text-lg font-medium leading-relaxed text-foreground">
                  {project.takeaway}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Next + CTA */}
        <section
          data-section-theme="dark"
          className="border-t border-ink-border bg-ink py-16 text-ink-foreground sm:py-20"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
            <div>
              <span className="label-mono text-ink-muted">Next case study</span>
              <Link
                href={`/projects/${next.slug}`}
                className="group mt-2 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink-foreground transition-colors hover:text-accent sm:text-3xl"
              >
                {next.name}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <Link
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-base bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Start a conversation →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">{heading}</h2>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {body}
      </p>
    </div>
  )
}
