import type { Metadata } from "next";
import { AboutSection } from "@/components/red-first/about-section";
import { AfterSprintSection } from "@/components/red-first/after-sprint-section";
import { AuditSection } from "@/components/red-first/audit-section";
import { FaqSection } from "@/components/red-first/faq-section";
import { FinalCta } from "@/components/red-first/final-cta";
import { RedFirstFooter } from "@/components/red-first/footer";
import { RedFirstHeader } from "@/components/red-first/header";
import { HeroSection } from "@/components/red-first/hero-section";
import { MeasuredSection } from "@/components/red-first/measured-section";
import { MethodSection } from "@/components/red-first/method-section";
import { ProblemSection } from "@/components/red-first/problem-section";
import { ProcessSection } from "@/components/red-first/process-section";
import { ProofSection } from "@/components/red-first/proof-section";
import { SprintSection } from "@/components/red-first/sprint-section";
import { StepsSection } from "@/components/red-first/steps-section";
import { meta } from "@/lib/red-first";
import { studioUrl } from "@/lib/site-url";

const { title, description } = meta;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${studioUrl}/` },
  openGraph: {
    title,
    description,
    url: `${studioUrl}/`,
    type: "website",
    siteName: "Red First",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ModernizePage() {
  return (
    <>
      <RedFirstHeader />
      <main id="main-content">
        <HeroSection />
        <StepsSection />
        <ProblemSection />
        <MethodSection />
        <ProofSection />
        <AuditSection />
        <SprintSection />
        <ProcessSection />
        <MeasuredSection />
        <AfterSprintSection />
        <AboutSection />
        <FaqSection />
        <FinalCta />
      </main>
      <RedFirstFooter />
    </>
  );
}
