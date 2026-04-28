# Layer Stack Model

Model each section as stacked layers before coding.

## Layers

- `base-background`
- `decorative-overlay`
- `content-media`
- `text-content`
- `floating-accent`

## Purpose

This prevents confusion between:
- background vs semantic media
- decoration vs content
- overlay vs independent block

## Common Patterns

### Hero
- base background: gradient/photo/texture
- decorative overlay: mask/noise/glow
- content media: product shot or illustration
- text content: heading, copy, CTA

### Card Grid
- base background: page/card field
- content media: icon or illustration
- text content: card copy

### Split Section
- one side text
- one side content media
- optional floating accent on top

## Rule

If missing one layer makes section visually wrong, capture it in brief and verification plan.
