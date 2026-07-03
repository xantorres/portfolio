import type { CSSProperties } from "react";

type TraceStyle = CSSProperties & {
  "--trace-len"?: string;
  "--trace-delay"?: string;
};

function trace(len: number, delay: number): TraceStyle {
  return { "--trace-len": `${len}`, "--trace-delay": `${delay}ms` };
}

/*
 * The delivery loop I run on every engagement, drawn as an instrument trace:
 * map the system, build, verify against real behavior, ship. Failures route
 * back to build instead of forward to users.
 */
export function InstrumentSchematic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 300"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="8"
        y="8"
        width="504"
        height="284"
        className="stroke-border"
        strokeDasharray="2 6"
        strokeWidth="1"
      />

      <path
        d="M 20 8 V 20 M 8 20 H 20"
        className="stroke-muted-foreground"
        strokeWidth="1"
      />
      <path
        d="M 500 292 V 280 M 512 280 H 500"
        className="stroke-muted-foreground"
        strokeWidth="1"
      />

      <path
        d="M 40 140 H 150 M 186 140 H 296 M 332 140 H 442"
        className="trace-path stroke-foreground/50"
        strokeWidth="1.5"
        style={trace(340, 480)}
      />

      <path
        d="M 314 158 V 226 H 168 V 158"
        className="trace-path stroke-oxide"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        style={trace(300, 1500)}
      />
      <path
        d="M 163 170 L 168 158 L 173 170"
        className="trace-node stroke-oxide"
        strokeWidth="1.5"
        style={trace(0, 1900)}
      />

      <g className="trace-node" style={trace(0, 600)}>
        <rect x="150" y="122" width="36" height="36" className="stroke-signal" strokeWidth="1.5" />
        <rect x="162" y="134" width="12" height="12" className="fill-signal" />
      </g>
      <g className="trace-node" style={trace(0, 900)}>
        <rect x="296" y="122" width="36" height="36" className="stroke-circuit" strokeWidth="1.5" />
        <circle cx="314" cy="140" r="7" className="fill-circuit" />
      </g>
      <g className="trace-node" style={trace(0, 400)}>
        <rect x="22" y="131" width="18" height="18" className="stroke-blueprint fill-none" strokeWidth="1.5" />
        <circle cx="31" cy="140" r="3" className="fill-blueprint" />
      </g>
      <g className="trace-node" style={trace(0, 1250)}>
        <path d="M 442 128 L 466 140 L 442 152 Z" className="fill-primary" />
      </g>

      <g className="font-mono uppercase" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
        <text x="12" y="176" className="trace-node fill-muted-foreground" style={trace(0, 500)}>
          Map
        </text>
        <text x="152" y="176" className="trace-node fill-muted-foreground" style={trace(0, 700)}>
          Build
        </text>
        <text x="296" y="176" className="trace-node fill-muted-foreground" style={trace(0, 1000)}>
          Verify
        </text>
        <text x="440" y="176" className="trace-node fill-muted-foreground" style={trace(0, 1350)}>
          Ship
        </text>
        <text x="204" y="244" className="trace-node fill-oxide" style={trace(0, 1750)}>
          Fail: route back, never forward
        </text>
        <text x="352" y="132" className="trace-node fill-muted-foreground" style={trace(0, 1150)}>
          Pass
        </text>
      </g>

      <g className="font-mono uppercase trace-node" style={{ fontSize: "10px", letterSpacing: "0.1em", ...trace(0, 2100) }}>
        <text x="20" y="278" className="fill-muted-foreground">
          Fig. 01 · Delivery loop · Every engagement
        </text>
      </g>
    </svg>
  );
}
