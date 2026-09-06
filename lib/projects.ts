export type ProjectImage = {
  src: string
  alt: string
}

export type Project = {
  slug: string
  name: string
  category: string
  tagline: string
  summary: string
  tech: string[]
  cover: ProjectImage
  images: ProjectImage[]
  problem: string
  approach: string
  solution: string
  howItWorks: string[]
  outcome: string
  takeaway: string
}

export const projects: Project[] = [
  {
    slug: "review-hunter",
    name: "Review Hunter System",
    category: "Workflow Automation",
    tagline:
      "A spreadsheet sidebar that turns low-rated review follow-up into a one-click workflow.",
    summary:
      "A Google Sheets sidebar that pulls in low-rated reviews, generates a ready-to-use call script for each one, and tracks resolutions in a single place.",
    tech: ["Google Apps Script", "HTML", "CSS", "JavaScript"],
    cover: { src: "/review-hunter.jpg", alt: "Review Hunter System sidebar interface" },
    images: [{ src: "/review-hunter.jpg", alt: "Review Hunter System sidebar interface" }],
    problem:
      "Handling low-rated customer reviews was slow and manual. Each review meant switching between tabs, copying details, drafting a call script by hand, and logging the outcome separately. At roughly 15 minutes per review, the routine did not scale.",
    approach:
      "Treat the review-handling routine as a repeatable system rather than a series of manual steps. Map every action a person actually took, then move the repetitive parts into a custom sidebar living directly inside the spreadsheet the team already used.",
    solution:
      "A Google Apps Script sidebar that surfaces the reviews that need attention, generates a tailored phone script for each one, and keeps resolution status organized without ever leaving the sheet.",
    howItWorks: [
      "Pull the reviews that need follow-up into a structured view.",
      "Generate a ready-to-use call script for each review.",
      "Log the outcome and status inline as the work happens.",
      "Keep everything inside one familiar spreadsheet interface.",
    ],
    outcome:
      "Cut review processing time from about 15 minutes to roughly 1 minute per review, while keeping every follow-up consistent and traceable.",
    takeaway:
      "Shows the ability to spot a repetitive operational bottleneck and collapse it into a fast, self-contained tool people will actually use.",
  },
  {
    slug: "sourcing-system",
    name: "Sourcing & Pre-Canvassing System",
    category: "Workflow Automation",
    tagline:
      "A sidebar tool that organizes sourcing details, budgets, and CRM-ready notes in one place.",
    summary:
      "A Google Apps Script sidebar that stores seller details by reference number, tracks budget, produces copy-ready CRM notes, and marks purchase status with color coding.",
    tech: ["Google Apps Script", "Sidebar UI", "JavaScript", "HTML / CSS"],
    cover: { src: "/sourcing-system.jpg", alt: "Sourcing System sidebar interface" },
    images: [{ src: "/sourcing-system.jpg", alt: "Sourcing System sidebar interface" }],
    problem:
      "Sourcing work meant juggling seller details, budgets, purchasing status, and CRM notes across scattered places. Records were easy to lose track of, and preparing notes for the CRM was slow and inconsistent.",
    approach:
      "Consolidate every piece of sourcing information into a single structured interface with consistent fields, so records could be saved, retrieved, and acted on without leaving the spreadsheet.",
    solution:
      "A sidebar that saves seller details under a reference number, tracks budget against each record, generates ready-to-paste CRM notes, and uses color coding to make purchase status readable at a glance.",
    howItWorks: [
      "Save seller details under a consistent reference number.",
      "Track budget against each sourcing record.",
      "Generate copy-ready notes formatted for the CRM.",
      "Color-code purchase status for quick scanning.",
    ],
    outcome:
      "Centralized scattered sourcing information and removed manual note formatting, keeping records consistent and ready for the CRM.",
    takeaway:
      "Demonstrates systems thinking — turning fragmented manual record-keeping into one organized, reusable interface.",
  },
  {
    slug: "resale-cert-helper",
    name: "Resale Cert CRM Helper",
    category: "Browser Automation",
    tagline:
      "A lightweight Chrome extension that removes repetitive data entry from a CRM.",
    summary:
      "A Chrome extension that auto-fills a recurring field and copies the mailing ZIP with a single action directly on a CRM's customer pages.",
    tech: ["Chrome Extension", "JavaScript", "DOM Manipulation"],
    cover: { src: "/resale-helper-shopname.jpg", alt: "Resale Cert Helper auto-filling a field" },
    images: [
      { src: "/resale-helper-shopname.jpg", alt: "Resale Cert Helper auto-filling the shop name field" },
      { src: "/resale-helper-zip.jpg", alt: "Resale Cert Helper confirming the mailing ZIP was copied" },
    ],
    problem:
      "Working through customer pages in a CRM meant retyping the same fields and manually copying values over and over. A few seconds each time compounded into hours across a full campaign.",
    approach:
      "Build a lightweight browser extension that reacts to the CRM page itself, automating the small repetitive actions without changing how the team already worked.",
    solution:
      "A Chrome extension that detects the relevant customer page, auto-fills a recurring field, and copies the mailing ZIP on demand, confirming each action with a subtle indicator.",
    howItWorks: [
      "Detect when the relevant CRM customer page is open.",
      "Auto-fill the recurring field with the correct value.",
      "Copy the mailing ZIP with a single action.",
      "Confirm the action with a subtle on-page indicator.",
    ],
    outcome:
      "Saved roughly 5–10 seconds per customer page — time that adds up to hours over a full campaign.",
    takeaway:
      "Shows comfort working directly with the DOM to remove friction from tools that can't otherwise be changed.",
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
