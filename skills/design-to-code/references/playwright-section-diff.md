# Playwright Section Diff

Use Playwright for section-level screenshot verification.

## Anchors
Every major section should have `data-section="section-name"`.

Optional debug aids:
- `data-media-role="background|content"`
- `data-diff-target="true"`

## What to Verify
- section order
- section width / alignment
- shell vs inner container split
- text wrap and typography
- no overlap
- no distorted images
- no missing primary CTA

## Tolerated Differences
- tiny font anti-aliasing noise
- small font engine variance

## Not Tolerated
- wrong section width or alignment
- collapsed full-bleed shell
- broken hierarchy
- visible overlap
- missing main CTA
- wrong media role

## After Failure
1. report the failed sections
2. name the likely failure category
3. repair the biggest mismatch first
4. do not silently regenerate the whole page
