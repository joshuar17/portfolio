import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { site } from "@/lib/site"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.positioning,
  keywords: [
    "Joshua Romero",
    "AI & Automation Specialist",
    "workflow automation",
    "Google Apps Script",
    "Chrome extensions",
    "process automation",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.positioning,
    type: "website",
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: "#fafafa",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
