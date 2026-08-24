---
version: "alpha"
name: "Xan Torres Scandinavian System"
description: "A calm, monochrome portfolio for a senior product engineer."
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  secondary: "#F2F2F2"
  on-secondary: "#000000"
  tertiary: "#F5F5F5"
  on-tertiary: "#000000"
  neutral: "#F5F5F5"
  background: "#FFFFFF"
  foreground: "#000000"
  muted: "#5C5C5C"
  border: "#E6E6E6"
  border-strong: "#D1D1D1"
  paper: "#FFFFFF"
  ink: "#000000"
  ink-tertiary: "#707070"
  canvas-dark: "#0A0A0A"
  on-canvas-dark: "#FFFFFF"
  destructive: "#C4281B"
  on-destructive: "#FFFFFF"
  signal: "#B0391C"
  on-signal: "#FFFFFF"
typography:
  display-xl:
    fontFamily: "Archivo"
    fontSize: "4rem"
    fontWeight: "600"
    lineHeight: "1.06"
    letterSpacing: "-0.022em"
  display-lg:
    fontFamily: "Archivo"
    fontSize: "2.5rem"
    fontWeight: "600"
    lineHeight: "1.12"
    letterSpacing: "-0.018em"
  title-md:
    fontFamily: "Archivo"
    fontSize: "1.375rem"
    fontWeight: "500"
    lineHeight: "1.2"
    letterSpacing: "-0.012em"
  body-md:
    fontFamily: "Archivo"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Archivo"
    fontSize: "0.8125rem"
    fontWeight: "500"
    lineHeight: "1.5"
    letterSpacing: "0px"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  xxl: "72px"
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xs}"
    padding: "0px"
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-signal}"
    rounded: "{rounded.md}"
    padding: "16px"
  badge-solid:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "8px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.md}"
    padding: "16px"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "16px"
  badge:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "8px"
  panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "24px"
  meta-label:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: "4px"
  figure-panel:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "32px"
  form-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px"
  chip-outline:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: "8px"
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xs}"
    padding: "0px"
  control-outline:
    backgroundColor: "{colors.border-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0px"
  page-dark:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-canvas-dark}"
    rounded: "{rounded.xs}"
    padding: "0px"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.on-destructive}"
    rounded: "{rounded.md}"
    padding: "16px"
---

## Overview

The site is a quiet instrument for judging one engineer's work. Nothing decorates: a white canvas, an alpha-black ink ladder, one sans family, and chapters separated by space rather than boxes. The reader should be able to scan six case studies, three products, and a contact form without the interface asking for attention anywhere.

The design must communicate three qualities quickly: senior judgment, frontend craft, and end-to-end product ownership. It does that with evidence and hierarchy, not with color.

## Colors

Implementation uses alpha-black over white in `src/app/globals.css`; the hex tokens above are the flattened equivalents for the DESIGN.md linter and agent portability.

- **Canvas:** pure white in light, `#0A0A0A` in dark. No warm or cool cast in either.
- **Ink ladder:** primary at full ink, secondary at 64% (light) / 56% (dark), tertiary at 58% (light) / 48% (dark). Metadata on this site carries real reading and also lands on the section washes, so the tertiary rung sits above the 44% editorial default and clears 4.5:1 on the tint as well.
- **Structure:** borders at 10-11%, strong borders and control outlines at 18-20%.
- **Interaction:** hover fill 5% light / 9% dark, pressed 9% light / 14% dark. The dark values are not the light values reused; equal alpha buys more contrast on a dark canvas.
- **Semantic:** destructive keeps a real red in both themes.

Hierarchy comes from size, weight, and the ink ladder, never from hue. There is exactly one accent, signal vermilion, and it has three jobs: the primary action, the availability indicator, and the focus ring. It never appears as decoration, never tints a surface, and never distinguishes one case study from another. Channel inks and per-case color are gone.

## Typography

One family: `Archivo` variable, loaded through `next/font`. No second family, no mono, no serif display. Archivo is kept at normal width throughout; the expanded display axis is not used.

Rules:

- Display type is 600 weight with negative tracking, capped near 64px on desktop.
- Section headlines share the display treatment one step down.
- Item titles are 500 weight at 20-22px.
- Body is 400 at 16-18px with 1.6 line height, measure held near 64 characters.
- Metadata is 500 at 13px on the tertiary rung. Sentence case, neutral tracking.
- Never use all-caps, forced uppercase, or all-lowercase chrome. Labels read as sentences.

## Layout

Chapters, not cards. The page is a sequence of full-width chapters separated by 144px on desktop and 96px on mobile, with tighter spacing inside each group.

Home-page rhythm:

- Hero: left-weighted masthead with a two-tone headline, primary and secondary action, one figure panel carrying the delivery loop, then a proof strip.
- Work: case index as divider-separated rows, three columns of company, claim, and readouts. No boxes, no per-case color.
- AI-native work: lead paragraph, then three feature summaries in one row.
- Products: three columns of real tooling with quiet tag chips.
- Strengths and Approach: four numbered columns each, grouped by proximity alone.
- Stack: capability groups with quiet chips.
- Contact: prose and direct links on the left, the form on the right with no container around it.

Alternating 4% washes mark the Products and Approach chapters so a long page has rhythm without borders.

## Motion

Motion is feedback, not atmosphere:

- Scroll entrance is opacity only, 260ms, ease-out, one shot per section.
- Buttons press to `scale(0.97)` for 150ms. Rows and links transition their fill or color under 200ms.
- Hover-only motion is gated behind `(hover: hover) and (pointer: fine)`.
- No boot choreography, no trace drawing, no scan sweeps, no pulsing indicators.
- `prefers-reduced-motion` removes transitions entirely and shows every section at rest.

## Elevation & Depth

There is no elevation. Depth comes from the ink ladder and from space. Shadows are not used. Quiet washes stand in for panels where a surface genuinely needs to separate from the page, such as the hero figure.

## Shapes

Radius scale: 4px, 6px, 8px. Controls and panels use 8px, chips use 6px. No pills for ordinary controls, no clip-path notches, no corner ticks, no large rounded cards.

## Components

Buttons share one radius, height, and weight across the page; the primary action is filled ink and appears at most once per chapter. Badges are quiet label chips, not colored capsules. Form controls carry the only visible boundaries in the contact chapter, and the form itself has none.

Icons are a single family at one stroke weight, monochrome on the ink ladder, and only where they replace a label rather than repeat it.

## Do's and Don'ts

Do:

- Use real portfolio facts as the visual material; the figure is the actual delivery loop.
- Let space, not rules, carry grouping. Add a hairline only when its absence would be ambiguous.
- Keep roughly one structural rule per viewport.
- Preserve accessibility, contrast, keyboard flow, and responsive fit.
- Keep contact behavior unchanged.

Don't:

- Spend the accent on anything beyond the primary action, the availability dot, and focus.
- Introduce a second accent, channel inks, or per-item color.
- Introduce tinted neutrals; judge by channel spread, not by eye.
- Use all-caps, mono metadata, or a second typeface.
- Add gradients, textures, glows, shadows, or grid backgrounds.
- Box things that were quiet before.
