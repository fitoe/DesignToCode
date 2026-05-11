# Playwright Section Diff

Use Playwright for page and section-level screenshot verification.

## Anchors

Every major section should have `data-section="section-name"`.

Optional debug aids:
- `data-media-role="background|content"`
- `data-diff-target="true"`
- `data-visual-anchor="..."`

## Capture Set

For high-fidelity mode, capture:
- full viewport screenshot
- section screenshots for the 2-5 most important sections
- screenshots after each repair round when practical

## What to Verify

Layered checks:

### Structure
- section order
- DOM regions present
- primary actions visible

### Proportion
- section width / alignment
- shell vs inner container split
- normalized top/height/margins
- first-screen density

### Style
- typography hierarchy
- spacing rhythm
- color/radius/shadow
- button hierarchy and status colors

### Detail
- media-role correctness
- important illustration/icon fidelity
- badge/divider/wave/ornament details
- no distorted images
- complex card layer stack: base, chart/ring, metrics, dividers, decorations, shadows/glows
- chip/label shape class and dimensions, especially priority/status labels
- module/action grid icon alignment: centered cell vs left row, icon-label relation

## Tolerated Differences

- tiny font anti-aliasing noise
- small font engine variance
- documented accepted deviations

## Not Tolerated

- wrong section width or alignment
- collapsed full-bleed shell
- broken hierarchy
- missing primary CTA
- wrong media role
- treating structural similarity as high fidelity when proportion/style/detail fail

## After Failure

1. report failed section and layer
2. name the likely failure category
3. repair the biggest mismatch first
4. do not silently regenerate the whole page
5. update or create a parity report
