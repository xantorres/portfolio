import { Mail } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile, stripProtocol } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeader index="05" eyebrow="Contact" title="Work together." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <p className="max-w-prose text-base text-muted-foreground sm:text-lg">
              Fractional or embedded. EU/EMEA time zones, remote async-first. Open to short discovery
              sprints and longer product engagements.
            </p>

            <ul className="flex flex-col gap-4 font-mono text-sm">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground" />
                <a
                  href={`mailto:${profile.email}`}
                  className="border-b border-border pb-0.5 transition-colors hover:border-foreground hover:text-blue-500"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LinkedinIcon className="size-4 text-muted-foreground" />
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-border pb-0.5 transition-colors hover:border-foreground hover:text-blue-500"
                >
                  {stripProtocol(profile.links.linkedin)}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <GithubIcon className="size-4 text-muted-foreground" />
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-border pb-0.5 transition-colors hover:border-foreground hover:text-blue-500"
                >
                  {stripProtocol(profile.links.github)}
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
