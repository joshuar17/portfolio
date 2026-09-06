import Link from "next/link"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">{site.name}</span>
          <span className="text-muted-foreground">— {site.title}</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href={`mailto:${site.email}`}
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            Email
          </Link>
          <Link
            href={site.resume}
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            Resume
          </Link>
          <span className="text-muted-foreground">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
