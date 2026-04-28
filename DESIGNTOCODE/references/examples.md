# Examples

Use these as regression-style prompts and sanity checks.

## 1. Marketing Landing Page

- 4-5 sections
- clear hero background
- feature grid
- CTA band
- footer

Checks:
- width inference
- text wrapping
- CTA prominence

## 2. Dashboard Cards Page

- cards
- stat blocks
- chart-like visuals
- sidebar or header shell

Checks:
- grid regularity
- chart visuals treated correctly
- hierarchy holds under real text

## 3. Listing/Features Page

- repeated card/list structure
- content images inside cards

Checks:
- repeated structure only lightly abstracted
- content images remain semantic

## 4. Ambiguous Media Case

- hero visual could be backdrop or semantic product render

Checks:
- stop and ask instead of guessing

## 5. Width-Inference Failure

- repo gives no clear container width
- user omitted `pageWidth`

Checks:
- stop and ask

## 6. Shared Background Across Sections

- gradient or field spans two adjacent sections

Checks:
- cross-section continuity considered

## 7. Decorative Text Effect Case

- glow or underline around heading

Checks:
- effect not emitted as fake content image
