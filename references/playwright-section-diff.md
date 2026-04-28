# Playwright Section Diff

Use Playwright for section-level screenshot verification.

## DOM Anchors

Every major section should have:
- `data-section="section-name"`

Optional debug aids:
- `data-media-role="background|content"`
- `data-diff-target="true"`

## Diff Targeting

- capture by `data-section`
- compare to corresponding scaled section reference image
- section diff is primary gate
- full-page screenshot is optional debug aid only

## Tolerated Differences

- font anti-aliasing noise
- tiny rendering variance from font engine

## Non-Tolerated Differences

- wrong section width or alignment
- broken hierarchy
- visible text overlap
- missing primary CTA
- distorted image aspect ratio
- obvious background/content-image role mismatch

## Failure Categories

- width normalization error
- hierarchy/layout error
- text wrap/typography error
- wrong media role
- missing decorative layer
- harmless font noise

## After Failure

Default first action:
- report failed sections
- report likely categories
- do not silently regenerate whole page
