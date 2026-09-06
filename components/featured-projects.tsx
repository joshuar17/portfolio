import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/projects"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function FeaturedProjects() {
  return (
    <section
      id="work"
      data-section-theme="light"
      className="scroll-mt-16 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="Selected work"
          title="Systems I've designed and shipped"
          intro="Real tools built to solve real, repetitive problems — each one a full case study."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 80}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard slug={project.slug} wide={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ slug, wide }: { slug: string; wide: boolean }) {
  const project = projects.find((p) => p.slug === slug)!
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent/50 hover:shadow-[0_24px_60px_-32px_rgba(20,22,26,0.35)]"
    >
      <div
        className={`relative w-full overflow-hidden bg-muted ${
          wide ? "aspect-[16/8]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={project.cover.src || "/placeholder.svg"}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent">{project.category}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
            Case study
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
