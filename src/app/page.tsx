import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { CoreStrengths } from "@/components/core-strengths";
import { SelectedWork } from "@/components/selected-work";
import { Approach } from "@/components/approach";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/footer";

// Daily ISR so the dynamic year-count and quarter strings stay current without a redeploy.
export const revalidate = 86_400;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

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
