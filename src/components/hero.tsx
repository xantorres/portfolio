import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-28"
    >
      <div
        className="mb-6 inline-flex sm:hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
        title={profile.availability.long}
      >
        <span className="relative inline-block size-1.5 rounded-full bg-blue-500 pulse-ring" />
        {profile.availability.short}
      </div>

      <h1 className="max-w-[18ch] text-balance font-sans text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        {profile.tagline} <span className="text-blue-500">{profile.accentWord}</span>.
      </h1>

      <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:mt-8 sm:text-lg md:text-xl">
        <span className="font-medium text-foreground">{profile.name}.</span> {profile.subhead}
      </p>

      <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="hidden sm:inline-block h-px w-10 bg-border" aria-hidden />
          {profile.location}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="lg">
            <Link href="#work">
              Selected work
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="#contact">
              Work together
              <Mail className="size-4" />
            </Link>
          </Button>
          <div className="ml-1 flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <GithubIcon className="size-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
