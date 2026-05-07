# Media Role Classification

Classify each important visual as either `background` or `content image`.

## Decision Order
1. explicit user note
2. visual + semantic inference
3. stop and ask if critical ambiguity remains

## Background Signals
- fills a hero/card/section area
- acts as atmosphere or backdrop
- text/CTA overlays it
- wants cover/crop treatment
- has little standalone meaning

## Content Image Signals
- product image, illustration, avatar, logo, chart, gallery asset, article media
- belongs in content flow
- carries meaning on its own
- should behave like semantic media

## Output Mapping
- `background` -> CSS background layers
- `content image` -> `<img>` or `<picture>`

## Ambiguous Cases
Stop and ask when:
- the same visual could be backdrop or content image
- crop hides whether the media sits in flow
- the choice would remove important information
