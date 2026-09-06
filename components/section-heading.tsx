import { Reveal } from "./reveal"

export function SectionHeading({
  index,
  title,
  intro,
  dark = false,
}: {
  index: string
  title: string
  intro?: string
  dark?: boolean
}) {
  return (
    <Reveal className="max-w-2xl">
      <span
        className={`label-mono flex items-center gap-2 ${dark ? "text-accent" : "text-accent"}`}
      >
        <span className="h-px w-6 bg-accent" />
        {index}
      </span>
      <h2
        className={`mt-4 text-pretty text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-ink-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-pretty text-base leading-relaxed ${
            dark ? "text-ink-muted" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  )
}
