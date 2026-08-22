---
version: "alpha"
name: "Xan Torres Instrument Systems"
description: "A lit-bench instrument portfolio for a senior product engineer."
colors:
  primary: "#E85E33"
  on-primary: "#1D1914"
  secondary: "#332E28"
  on-secondary: "#F2ECE1"
  tertiary: "#F2ECE1"
  on-tertiary: "#211D18"
  neutral: "#2A2621"
  background: "#211D18"
  foreground: "#F2ECE1"
  muted: "#A89F92"
  border: "#453E36"
  blueprint: "#7FC4DE"
  on-blueprint: "#211D18"
  oxide: "#E0B368"
  on-oxide: "#211D18"
  circuit: "#7ECFA2"
  on-circuit: "#211D18"
  paper: "#F4EEE2"
  ink: "#1D1914"
typography:
  display-xl:
    fontFamily: "Archivo"
    fontSize: "4.55rem"
    fontWeight: "800"
    lineHeight: "0.98"
    letterSpacing: "-0.01em"
  display-lg:
    fontFamily: "Archivo"
    fontSize: "3.3rem"
    fontWeight: "750"
    lineHeight: "1.02"
    letterSpacing: "-0.008em"
  body-md:
    fontFamily: "Archivo"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.65"
    letterSpacing: "0px"
  label-caps:
    fontFamily: "Martian Mono"
    fontSize: "0.62rem"
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: "0.1em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "72px"
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xs}"
    padding: "0px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "12px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.sm}"
    padding: "12px"
  button-accent:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: "12px"
  badge:
    backgroundColor: "{colors.border}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xs}"
    padding: "6px"
  panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "24px"
  meta-label:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.xs}"
    padding: "4px"
  blueprint-proof:
    backgroundColor: "{colors.blueprint}"
    textColor: "{colors.on-blueprint}"
    rounded: "{rounded.sm}"
    padding: "16px"
  oxide-proof:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.on-oxide}"
    rounded: "{rounded.sm}"
    padding: "16px"
  circuit-proof:
    backgroundColor: "{colors.circuit}"
    textColor: "{colors.on-circuit}"
    rounded: "{rounded.sm}"
    padding: "16px"
  paper-proof:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "16px"
---

## Overview

The site is a calibrated instrument built by its owner: a senior product engineer whose portfolio demonstrates the engineering it claims. The surface is a lit workbench, not a magazine spread: warm milled charcoal, bone type, one vermilion signal, and schematic traces drawn from real delivery practice.

The design must communicate three qualities quickly: senior judgment, frontend craft, and end-to-end product ownership. The visual memory is a precision instrument at night: an engraved bezel headline, calibration ticks, channel-colored traces, and one red index dot that means "this one is live."

## Colors

Implementation uses OKLCH in `src/app/globals.css`; these hex tokens exist for the DESIGN.md alpha linter and agent portability.

- **Ink / background:** warm milled charcoal (hue near 70), never blue-black. The dev-portfolio blue-on-black reflex is banned.
- **Paper / foreground:** bone, a warm off-white tuned for long reading on the dark ground.
- **Graphite / muted / border:** quiet structure for grids, rules, and metadata.
- **Signal vermilion:** the one committed color. Primary actions, availability, calibration ticks, and the credibility accents. Reference: the red index dot on a precision instrument.
- **Blueprint cyan, circuit green, oxide amber:** the remaining scope-channel inks. Each case study renders on one channel (signal vermilion may also serve as a case channel); channels never mix inside a surface, and adjacent cases in the index never share one.

Vermilion is load-bearing: it appears on every fold, always meaning "act here" or "this is live." Channel inks stay inside their case surfaces. No hue soup, no gradients-as-decoration.

## Typography

Single committed family plus one readout mono. `Archivo` variable (width axis) carries everything from engraved display to body prose; `Martian Mono` carries metadata and readouts.

Rules:

- Display type is expanded (width 125%) and heavy (800): instrument-bezel engraving, not billboard marketing. Home display caps below 86px on desktop; case-study titles below 64px.
- Section headlines use width 118% at weight 750.
- Body is normal width at 400. Letter spacing is slightly negative for display, `0` for prose.
- Metadata uses Martian Mono, small caps-style tracking (0.1em), 0.62rem.
- Do not use Inter, Geist, Roboto, Space Grotesk, Geologica, Spline Sans, or system fonts as brand defaults.

## Layout

Strict engineered structure over decorative asymmetry: a visible fine grid on the body ground, panel modules with calibration corner ticks, bezel-notched chips for section indices, and schematic figures where decoration would otherwise go.

Home-page rhythm:

- Hero: boot choreography (staggered one-shot reveal), left-weighted masthead, delivery-loop schematic as Figure 01, calibration proof strip.
- Work: case-study index as instrument modules, one channel ink per case, placed first as the primary evidence.
- AI-native work: focus areas backed by shipped proof lines, never hype.
- Products: personal tooling presented as working software.
- Strengths: evidence-backed capabilities, not decorative icon cards.
- Stack: compact systems matrix grouped by capability.
- Approach: operating principles with numbered rhythm, closing into the contact ask.
- Contact: direct engagement console.

Case-study rhythm:

- Sticky context rail on desktop.
- Outcome-led metrics near the top.
- Long-form narrative with evidence-led proof plates.
- Compact stack footer.

## Motion

Motion is the instrument coming to life, and it must read as calibrated:

- Hero boot sequence: staggered `boot-rise` entrances and `trace-draw` schematic strokes, one-shot on load.
- Scroll entrances: sections reveal once via IntersectionObserver (`.reveal` / `.is-visible`), transform and opacity only.
- Hover systems on work cards: scan sweep, index rail, proof-plate lift.
- Easing is exponential out (`--ease-editorial`, cubic-bezier(0.16, 1, 0.3, 1)). No bounce, no elastic, no layout-property animation.
- `prefers-reduced-motion` gets the complete static page: traces pre-drawn, reveals visible, no sweeps.

## Elevation & Depth

Depth comes from rules, corner ticks, ink density, and drawn traces rather than floating cards. Shadows are rare and only appear inside interaction states. Avoid glassmorphism, blurred panels, bokeh, gradient orbs, and layered purple/blue hero gradients.

## Shapes

Radius scale stays tight: 2px, 4px, 8px. Bezel-notched chips (clip-path corner cuts) mark indices and labels. True circles only for status dots and data points. No pill CTAs, no large rounded cards.

## Components

Buttons are compact instrument controls; the primary action is always vermilion. Badges are labels, not colorful capsules. Forms feel precise and calm, with clear focus states and no decorative chrome.

Icons are allowed for utility controls, but decorative icon grids must not carry the design. Prefer schematic figures, proof plates, typographic marks, calibration ticks, and small data glyphs.

## Do's and Don'ts

Do:

- Use real portfolio facts and real delivery practice as visual material (Figure 01 is the actual loop).
- Make each case study feel structurally related but visually distinct through its channel ink.
- Preserve accessibility, contrast, keyboard flow, and responsive fit.
- Keep contact behavior unchanged.

Don't:

- Invent client screenshots or confidential product UI.
- Use generic centered SaaS hero composition.
- Use purple gradients, glass panels, or decorative orbs.
- Drift back to the editorial-magazine lane: mono-labels-plus-ruled-columns restraint is the saturated AI default this system replaced.
- Let future pages drift from this contract.
