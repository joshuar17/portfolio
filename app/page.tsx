import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Capabilities } from "@/components/capabilities"
import { FeaturedProjects } from "@/components/featured-projects"
import { Impact } from "@/components/impact"
import { Experience } from "@/components/experience"
import { CredentialsSection } from "@/components/credentials-section"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Capabilities />
        <FeaturedProjects />
        <Impact />
        <Experience />
        <CredentialsSection />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
