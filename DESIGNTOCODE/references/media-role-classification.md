# Media Role Classification

Classify each visual media element as either `background` or `content image`.

## Decision Order

1. explicit user note
2. visual + semantic inference
3. stop and ask if critical ambiguity remains

## Background Signals

- fills hero/card/section area
- acts as texture, atmosphere, or backdrop
- text or CTA overlays it
- wants cover/crop/overlay treatment
- has little standalone semantic value

## Content Image Signals

- product image, illustration, avatar, logo, chart, gallery asset, article media
- should exist in content flow
- carries meaning on its own
- wants semantic media element behavior

## Decorative-vs-Content Separation

Do not misclassify these as content images:
- glow
- underline
- text backplate
- badge frame
- light flare
- noise texture

## Output Mapping

- `background` -> CSS background layers
- `content image` -> `<img>` or `<picture>`

## Ambiguous Cases

Stop and ask when:
- same visual could be hero backdrop or product hero image
- screenshot crop hides whether media sits in content flow
- important information would be lost if wrong mode chosen
