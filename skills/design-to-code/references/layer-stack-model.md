# Layer Stack Model

Model each section as stacked layers before coding.

## Layers

- `section-shell`
- `inner-container`
- `base-background`
- `decorative-overlay`
- `content-media`
- `text-content`
- `floating-accent`

## Purpose

This prevents confusion between:
- shell vs inner container
- background vs semantic media
- decoration vs content
- overlay vs independent block

## Common Patterns

### Section Shell
- shell: full-bleed background, texture, or bleed field
- inner container: centered content width with readable rhythm
- content stack: text, CTA, and semantic media

### Hero
- shell base background: gradient/photo/texture
- shell decorative overlay: mask/noise/glow
- inner container content media: product shot or illustration
- inner container text content: heading, copy, CTA

### Card Grid
- shell base background: page/card field
- inner container content media: icon or illustration
- inner container text content: card copy

### Split Section
- shell can be full-bleed when the background spans the viewport
- inner container can hold one side text and one side content media
- optional floating accent on top

## Rule

If missing one layer makes section visually wrong, capture it in brief and verification plan.
