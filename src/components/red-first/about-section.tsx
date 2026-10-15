import { about } from "@/lib/red-first";

export function AboutSection() {
  return (
    <section id="about" className="section-pad">
      <div className="container-editorial grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
        <h2 className="meta-label">{about.headline}</h2>
        <p className="body-measure text-base sm:text-lg">
          <strong>{about.name}</strong>. {about.body}
        </p>
      </div>
    </section>
  );
}
