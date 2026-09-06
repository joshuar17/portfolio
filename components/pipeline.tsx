"use client"

import { useEffect, useState } from "react"

type Stage = {
  key: string
  label: string
  detail: string
  status: string
}

const stages: Stage[] = [
  {
    key: "problem",
    label: "Problem",
    detail: "A repetitive, manual task that quietly eats hours.",
    status: "identified",
  },
  {
    key: "analyze",
    label: "Analyze",
    detail: "Map every step a person actually takes.",
    status: "mapping",
  },
  {
    key: "automate",
    label: "Automate",
    detail: "Move the repetitive parts into a purpose-built tool.",
    status: "building",
  },
  {
    key: "result",
    label: "Result",
    detail: "A one-click operation that just works.",
    status: "shipped",
  },
]

export function Pipeline() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced || !autoplay) return
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 2200)
    return () => clearInterval(id)
  }, [autoplay])

  const current = hovered ?? active

  return (
    <div
      className="rounded-xl border border-border bg-surface p-5 shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_40px_-24px_rgba(20,22,26,0.25)] sm:p-6"
      onMouseLeave={() => {
        setHovered(null)
        setAutoplay(true)
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="label-mono text-muted-foreground">system pipeline</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="label-mono text-accent">{stages[current].status}</span>
        </span>
      </div>

      <ol className="grid grid-cols-4 gap-2">
        {stages.map((stage, i) => {
          const isActive = i === current
          const isPast = i < current
          return (
            <li key={stage.key} className="relative">
              <button
                type="button"
                onMouseEnter={() => {
                  setHovered(i)
                  setAutoplay(false)
                }}
                onFocus={() => {
                  setHovered(i)
                  setAutoplay(false)
                }}
                onBlur={() => setHovered(null)}
                onClick={() => {
                  setActive(i)
                  setAutoplay(false)
                }}
                aria-pressed={isActive}
                className="group flex w-full flex-col items-start gap-2 text-left focus:outline-none"
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-base border text-xs font-semibold tabular-nums transition-all duration-300 ${
                    isActive
                      ? "border-accent bg-accent text-accent-foreground"
                      : isPast
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border bg-background text-muted-foreground group-hover:border-accent/50"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-[0.8125rem] font-semibold leading-tight transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {stage.label}
                </span>
              </button>

              {i < stages.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-[-0.25rem] top-3.5 hidden h-px w-2 bg-border sm:block"
                />
              ) : null}
            </li>
          )
        })}
      </ol>

      <div className="mt-5 h-px w-full overflow-hidden bg-border">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / stages.length) * 100}%` }}
        />
      </div>

      <p className="mt-4 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">{stages[current].label}. </span>
        {stages[current].detail}
      </p>
    </div>
  )
}
