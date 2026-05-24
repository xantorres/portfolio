---
version: "alpha"
name: "Xan Torres Editorial Systems"
description: "A dark-first technical editorial portfolio for a senior frontend architect."
colors:
  primary: "#EEE7DB"
  on-primary: "#070B0F"
  secondary: "#191F24"
  on-secondary: "#EEE7DB"
  tertiary: "#61AFDA"
  on-tertiary: "#070B0F"
  neutral: "#0F141A"
  background: "#070B0F"
  foreground: "#EEE7DB"
  muted: "#939CA6"
  border: "#293139"
  blueprint: "#5AA9CE"
  on-blueprint: "#070B0F"
  oxide: "#D08C63"
  on-oxide: "#070B0F"
  circuit: "#65B6A4"
  on-circuit: "#070B0F"
  paper: "#F9F5EC"
  ink: "#0C1218"
typography:
  display-xl:
    fontFamily: "Geologica"
    fontSize: "4.45rem"
    fontWeight: "700"
    lineHeight: "1"
    letterSpacing: "0px"
  display-lg:
    fontFamily: "Geologica"
    fontSize: "3.4rem"
    fontWeight: "700"
    lineHeight: "1.03"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Spline Sans"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.65"
    letterSpacing: "0px"
  label-caps:
    fontFamily: "Spline Sans Mono"
    fontSize: "0.75rem"
    fontWeight: "500"
    lineHeight: "1.35"
    letterSpacing: "0.08em"
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

The site is an editorial portfolio for a senior frontend engineer and product architect. It should feel authored, structured, and technical: closer to a clear engineering case file than a SaaS landing page. The surface is dark-first, typographic, asymmetrical, and proof-led.

The design must communicate three qualities quickly: senior judgment, frontend craft, and end-to-end product ownership. The visual memory is a trusted technical brief: almost-black ink with a blue credibility signal, warm paper type, restrained proof plates, and low-saturation accent notes.

## Colors

Implementation uses OKLCH in `src/app/globals.css`; these hex tokens exist for the current DESIGN.md alpha linter and agent portability.

- **Ink / background:** near-black foundation with a slight institutional-blue undertone, not a saturated blue theme.
- **Paper / foreground:** warm off-white for editorial contrast.
- **Graphite / muted / border:** restrained structure for grids, rules, and metadata.
- **Signal blue:** primary interaction and credibility signal, tuned for competence and trust.
- **Blueprint:** technical emphasis for diagrams and selected work details.
- **Oxide:** migration, risk, and operational change, used sparingly.
- **Circuit teal:** systems, state machines, data flow, and correctness, used sparingly.

Never let one hue dominate. Blue is the recruiter-trust signal, but it must remain an annotation inside a mostly ink-and-paper composition. Avoid high saturation because it can reduce trust and make the page feel less serious.

## Typography

Use `Geologica` for display, `Spline Sans` for body/UI, and `Spline Sans Mono` for metadata. The pairing is fully sans, technical, and more idiosyncratic than the default Inter/Geist/Roboto agent stack.

Rules:

- Headlines should feel editorial, never billboard-sized. Home display type caps below 86px on desktop, and case-study titles cap below 64px.
- Letter spacing is `0` for prose and display.
- Metadata may use modest positive tracking.
- Do not use Inter, Geist, Roboto, Space Grotesk, Arial, or system fonts as brand defaults.

## Layout

Use asymmetry, offset columns, editorial gutters, and proof-led composition. Sections should feel like distinct bands in one publication, not repeated centered cards.

Home-page rhythm:

- Hero: left-weighted masthead, proof ledger, availability, and a visible hint of the next section.
- Strengths: evidence-backed capabilities, not decorative icon cards.
- Work: case-study index with bespoke proof plates.
- Approach: operating principles with numbered editorial rhythm.
- Skills: compact systems matrix.
- Contact: direct engagement console.

Case-study rhythm:

- Sticky context rail on desktop.
- Outcome-led metrics near the top.
- Long-form narrative with evidence-led proof plates.
- Compact stack footer.

## Elevation & Depth

Depth comes from rules, overlays, ink density, and annotated surfaces rather than floating cards. Shadows should be rare. Avoid generic glassmorphism, blurred panels, bokeh, gradient orbs, and layered purple/blue hero gradients.

## Shapes

Radius scale is intentionally tight: 2px, 4px, 8px. Use true circles only for status dots or data points. Do not use large rounded cards or pill-shaped marketing CTAs.

## Components

Buttons are compact editorial controls. Badges are labels, not colorful capsules. Forms should feel precise and calm, with clear focus states and no decorative chrome.

Icons are allowed for utility controls, but Lucide-style decorative grids should not carry the design. Prefer custom proof plates, typographic marks, rules, metrics, and small data glyphs.

## Do's and Don'ts

Do:

- Use real portfolio facts as visual material.
- Make each case study feel structurally related but visually distinct.
- Preserve accessibility, contrast, keyboard flow, and responsive fit.
- Keep contact behavior unchanged.

Don't:

- Invent client screenshots or confidential product UI.
- Use generic centered SaaS hero composition.
- Use purple gradients, glass panels, or decorative orbs.
- Let future pages drift from this contract.
