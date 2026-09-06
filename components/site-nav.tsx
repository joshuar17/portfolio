"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { site } from "@/lib/site"

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

export function SiteNav() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]"),
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const t = entry.target.getAttribute("data-section-theme")
            setTheme(t === "dark" ? "dark" : "light")
          }
        }
      },
      { rootMargin: "-52px 0px -92% 0px", threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const dark = theme === "dark"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? dark
            ? "border-b border-ink-border bg-ink/80 backdrop-blur-md"
            : "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className={`text-sm font-semibold tracking-tight transition-colors ${
            dark ? "text-ink-foreground" : "text-foreground"
          }`}
        >
          <span className="tabular-nums">{site.name.toUpperCase()}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} dark={dark}>
              {l.label}
            </NavLink>
          ))}
          <Link
            href={site.resume}
            className={`group inline-flex items-center gap-1.5 rounded-base border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              dark
                ? "border-ink-border text-ink-foreground hover:border-accent hover:text-accent"
                : "border-border text-foreground hover:border-accent hover:text-accent"
            }`}
          >
            Resume
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className={`inline-flex h-9 w-9 items-center justify-center md:hidden ${
            dark ? "text-ink-foreground" : "text-foreground"
          }`}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-5 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {open ? (
        <div
          className={`md:hidden ${
            dark ? "border-t border-ink-border bg-ink" : "border-t border-border bg-background"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-2 text-base font-medium ${
                  dark ? "text-ink-foreground" : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={site.resume}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-base border border-accent px-3.5 py-1.5 text-base font-medium text-accent"
            >
              Resume ↓
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function NavLink({
  href,
  dark,
  children,
}: {
  href: string
  dark: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`group relative text-sm font-medium transition-colors ${
        dark ? "text-ink-muted hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}
