# Visual Checklist

Use this after code generation and screenshot comparison.

## Core Fidelity

- full-bleed shells stay full-bleed when intended
- inner content containers stay centered and aligned
- section order correct
- shared container widths consistent
- dominant hierarchy matches design
- spacing rhythm feels consistent
- key alignments hold

## Proportion

- target viewport and page width are recorded
- important section tops/heights match normalized measurements closely enough
- overlapping elements overlap by the intended amount
- first-screen density matches the reference intent
- fixed footer/safe-area does not cover required content

## Text

- heading wraps plausibly
- button labels fit
- body text does not collide or clip
- real text did not break card heights unexpectedly

## Media and Assets

- background vs content-image choices still look correct
- images are not stretched
- visually important assets are fulfilled or explicitly marked as accepted fallback
- decorative layers are not missing where visually critical
- optimized assets preserve acceptable visual fidelity
- new bitmap assets use local project files

## Interaction

- explicit buttons/links visible
- focusable controls exist for explicit interactions
- route/API behavior needed by the page still works

## Layered Score

Assign rough scores:
- structure
- proportion
- style
- detail
- overall

Do not call an output high-fidelity when only structure passes.

## Structural Smoke Checks

- no horizontal overflow
- no catastrophic overlap
- no empty critical section
- no invisible primary CTA
- shell/background field not accidentally boxed in

## Mobile Floor

- layout does not explode at narrow width
- text remains readable
- images remain proportionate
