/*
 * The delivery loop I run on every engagement: map the system, build, verify
 * against real behavior, ship. Failures route back to build instead of forward
 * to users.
 */
const NODES = [
  { x: 24, label: "Map" },
  { x: 181, label: "Build" },
  { x: 338, label: "Verify" },
  { x: 495, label: "Ship" },
];

const NODE = 22;

export function InstrumentSchematic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 200" fill="none" aria-hidden="true" className={className}>
      <g className="fill-current text-[15px] font-medium">
        {NODES.map((node) => (
          <text key={node.label} x={node.x - NODE} y={22}>
            {node.label}
          </text>
        ))}
      </g>

      <g className="stroke-tertiary" strokeWidth="1">
        <path d="M 46 60 H 159" />
        <path d="M 203 60 H 316" />
        <path d="M 360 60 H 473" />
      </g>

      {NODES.map((node) => (
        <rect
          key={node.label}
          x={node.x - NODE}
          y={60 - NODE}
          width={NODE * 2}
          height={NODE * 2}
          rx="6"
          className="stroke-foreground"
          strokeWidth="1.25"
        />
      ))}

      {/* Failure path: back to build, never forward. */}
      <g className="stroke-tertiary" strokeWidth="1">
        <path d="M 338 82 V 146 H 181 V 90" strokeDasharray="4 5" />
        <path d="M 176 100 L 181 90 L 186 100" />
      </g>

      <g className="fill-current text-[13px] text-muted-foreground">
        <text x="392" y="54">
          Pass
        </text>
        <text x="200" y="170">
          Fail: route back, never forward
        </text>
      </g>

      <text x="2" y="194" className="fill-current text-[13px] text-tertiary">
        Fig. 01 · Delivery loop · Every engagement
      </text>
    </svg>
  );
}
