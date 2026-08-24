import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SectionHeader } from "@/components/section-header";
import { profile, stripProtocol } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="07"
          eyebrow="Contact"
          title="Tell me what you are building."
          aside="Booking now"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="grid content-start gap-10 lg:col-span-5">
            <p className="body-measure text-base text-muted-foreground sm:text-lg">
              Best fit: dev-tools, AI-product, and B2B teams that want one senior engineer owning a
              product surface end to end. Send the rough shape: a migration that cannot pause, an AI
              feature that has to survive review, a design system teams keep forking, or a product
              that outgrew its frontend. I am booking new engagements now and I scope on the first
              call.
            </p>

            <ul className="grid gap-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${profile.email}`}
                  className="border-b border-border pb-0.5 transition-colors hover:border-border-strong"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LinkedinIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-border pb-0.5 transition-colors hover:border-border-strong"
                >
                  {stripProtocol(profile.links.linkedin)}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <GithubIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-border pb-0.5 transition-colors hover:border-border-strong"
                >
                  {stripProtocol(profile.links.github)}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ArrowUpRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={profile.links.toptal}
                  target="_blank"
                  rel="noreferrer nofollow sponsored"
                  className="border-b border-border pb-0.5 transition-colors hover:border-border-strong"
                >
                  Toptal · Verified Expert since 2017
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
