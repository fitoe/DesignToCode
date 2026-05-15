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

## Mobile H5 Visual Audit Pack

For mobile H5/homepage repair, do not rely on one full-page screenshot plus eyeballing. One verification run should produce an audit pack:

1. full viewport screenshot at the real mobile viewport;
2. screenshots for all major `data-section` anchors visible in or near the first screen;
3. DOM metrics JSON: viewport, document/body scroll width, key section bounding boxes, grid column sizes, fixed/sticky overlays;
4. a prioritized repair list: `P0 structure`, `P1 obvious visual/overflow`, `P2 polish/debt`.

Use one audit pack to collect all obvious issues before editing. Then batch-fix P0/P1 together and run one follow-up audit. Avoid the slow loop of screenshot → fix one padding/font issue → screenshot again.

### Priority Rules

| Priority | Meaning | Action |
|---|---|---|
| P0 structure | wrong section order, missing content, approved layout changed, key grid/card anatomy wrong | block handoff; fix first |
| P1 obvious visual | overflow/cropping, severe misalignment, unreadable text, CTA hidden, density far off | fix in same batch as P0 when possible |
| P2 polish/debt | small spacing/color/radius/font mismatch, non-critical decoration variance | record as debt unless strict fidelity is required |

### Batch Repair Rule

After an audit pack, change code only after naming the top P0/P1 issues and the likely root layers (container, section, grid, typography, asset, overlay). A good repair pass fixes the largest 1-3 root causes, not isolated pixels.

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
