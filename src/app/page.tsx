import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/hero";
import { CoreStrengths } from "@/components/core-strengths";
import { AiNativeWork } from "@/components/ai-native-work";
import { SelectedWork } from "@/components/selected-work";
import { PersonalProducts } from "@/components/personal-products";
import { Approach } from "@/components/approach";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/footer";
import { socialTitle, socialDescription } from "@/lib/data";

// Daily ISR so the dynamic year-count and quarter strings stay current without a redeploy.
export const revalidate = 86_400;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: socialTitle, description: socialDescription },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Reveal>
          <SelectedWork />
        </Reveal>
        <Reveal>
          <AiNativeWork />
        </Reveal>
        <Reveal>
          <PersonalProducts />
        </Reveal>
        <Reveal>
          <CoreStrengths />
        </Reveal>
        <Reveal>
          <Approach />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
