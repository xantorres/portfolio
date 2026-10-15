import { Button } from "@/components/ui/button";
import { contactEmail, ctaHref, finalCta } from "@/lib/red-first";

export function FinalCta() {
  return (
    <section id="contact" className="section-wash section-pad">
      <div className="container-editorial flex flex-col items-center text-center">
        <h2 className="headline-type max-w-[24ch] text-balance">{finalCta.headline}</h2>
        <Button asChild size="lg" className="mt-8">
          <a href={ctaHref}>{finalCta.cta}</a>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          {finalCta.secondaryLead}{" "}
          <a href={`mailto:${contactEmail}`} className="text-foreground underline underline-offset-4">
            {contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
