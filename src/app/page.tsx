import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { CoreStrengths } from "@/components/core-strengths";
import { SelectedWork } from "@/components/selected-work";
import { Approach } from "@/components/approach";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <CoreStrengths />
        <SelectedWork />
        <Approach />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
