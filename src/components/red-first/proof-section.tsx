import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { proof } from "@/lib/red-first";

const inlineLink =
  "text-foreground underline underline-offset-4 [overflow-wrap:anywhere] hover:text-muted-foreground";

const cellBase = "border-b border-border py-3 pr-4 align-top last:pr-0";
const numeric = `${cellBase} whitespace-nowrap tabular-nums`;

function ProofTable() {
  const [metric, ...values] = proof.table.columns;
  return (
    <div
      role="region"
      aria-label={proof.tableLabel}
      tabIndex={0}
      className="overflow-x-auto rounded-[var(--radius-sm)]"
    >
      <table className="w-full border-collapse text-left text-sm sm:text-base">
        <thead>
          <tr>
            <th scope="col" className="border-b border-border-strong py-3 pr-4 font-medium text-muted-foreground">
              {metric}
            </th>
            {values.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-border-strong py-3 pr-4 font-medium text-muted-foreground last:pr-0"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {proof.table.rows.map(([label, before, after, change]) => (
            <tr key={label}>
              <th scope="row" className={`${cellBase} min-w-[10rem] font-normal`}>
                {label}
              </th>
              <td className={numeric}>{before}</td>
              <td className={numeric}>{after}</td>
              <td className={`${cellBase} font-medium tabular-nums`}>{change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProofSection() {
  return (
    <section id="proof" className="section-wash section-pad">
      <div className="container-editorial">
        <div className="min-w-0">
          <h2 className="headline-type max-w-[24ch] text-balance">{proof.headline}</h2>
          <p className="body-measure mt-6 max-w-[64ch] text-base leading-relaxed">
            {proof.body.map((segment) => {
              if (segment.kind === "text") return segment.text;
              if (segment.external) {
                return (
                  <a
                    key={segment.href}
                    href={segment.href}
                    target="_blank"
                    rel="noopener"
                    className={inlineLink}
                  >
                    {segment.text}
                  </a>
                );
              }
              return (
                <Link key={segment.href} href={segment.href} className={inlineLink}>
                  {segment.text}
                </Link>
              );
            })}
          </p>
        </div>

        <video
          controls
          playsInline
          preload="none"
          poster={proof.video.poster}
          aria-label={proof.video.label}
          className="mt-10 aspect-video w-full rounded-[var(--radius-md)] border border-border bg-background lg:mt-12"
        >
          <source src={proof.video.src} type="video/mp4" />
          {/* Captions are burned into the video; the track stays off by default to avoid doubling them. */}
          <track kind="captions" src={proof.video.captions} srcLang="en" label="English" />
        </video>

        <div className="mt-10 min-w-0 lg:mt-12">
          <div className="rounded-[var(--radius-md)] border border-border bg-background p-4 sm:p-6">
            <ProofTable />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{proof.footnote}</p>
        </div>

        <div className="mt-10 flex gap-4 rounded-[var(--radius-md)] border border-border-strong bg-background p-6 sm:gap-5 sm:p-8 lg:mt-14">
          <ShieldCheck aria-hidden className="mt-1 size-6 shrink-0" />
          <p className="max-w-[75ch] text-lg leading-relaxed sm:text-xl">{proof.callout}</p>
        </div>
      </div>
    </section>
  );
}
