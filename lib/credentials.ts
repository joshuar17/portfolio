export type Credential = {
  stage: string
  name: string
  issuer: string
  description: string
  capability: string
  // Placeholder path — drop the real PDF at this location to enable the link.
  asset: string
  available: boolean
}

export const credentials: Credential[] = [
  {
    stage: "Foundations",
    name: "Jumpstart by Zapier",
    issuer: "Zapier",
    description:
      "An introduction to thinking in automations — how triggers, actions, and connected apps fit together.",
    capability: "Automation fundamentals",
    asset: "/credentials/jumpstart-by-zapier.pdf",
    available: false,
  },
  {
    stage: "Basic Automation",
    name: "Building Basic Zaps by Zapier",
    issuer: "Zapier",
    description:
      "Building working automations that move information between apps and remove manual handoffs.",
    capability: "Single-step & multi-step Zaps",
    asset: "/credentials/building-basic-zaps.pdf",
    available: false,
  },
  {
    stage: "Intermediate Automation",
    name: "Building Intermediate Zaps by Zapier",
    issuer: "Zapier",
    description:
      "More capable workflows with filters, paths, and logic that handle real-world edge cases.",
    capability: "Conditional logic & branching",
    asset: "/credentials/building-intermediate-zaps.pdf",
    available: false,
  },
  {
    stage: "AI Agents",
    name: "Building AI Agents by Zapier",
    issuer: "Zapier",
    description:
      "Designing AI-driven agents that reason over tasks and act across connected tools.",
    capability: "AI agents & orchestration",
    asset: "/credentials/building-ai-agents.pdf",
    available: false,
  },
]
