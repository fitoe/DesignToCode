# Full-page Regeneration Guard

Use before a complete page rewrite from approved mockups. Do not start coding until the brief has the artifacts below.

## 0. Approved visual source gate

Before full-page regeneration, confirm the target page has an approved/bindable visual source, such as a persisted page mockup, Figma frame, board crop, or equivalent screenshot/design image.

If the page has only prose briefs, route lists, product notes, or a generic board that does not show the target page clearly, do **not** implement from prose. First generate or obtain a page-level effect image/mockup (for this workflow, GPT Image 2 is the default), persist it under the project design artifacts, and treat that approved image as the visual source for the rest of DesignToCode.

Rules:
- No approved/bindable effect image = no full-page coding, unless the user explicitly waives visual-source generation for that page.
- A page brief can guide prompt content, but it is not a substitute for a visual source.
- When generating a missing effect image, include real product copy, mobile viewport, design-system constraints, and the page's required information order in the prompt.
- Record the generated image path in Visual IR/source refs before implementation.

## 1. Visual token table

Record source-derived values for the whole page and each major section:

| token | source observation | implementation value | deviation? |
|---|---|---|---|
| page background | | | |
| panel/card background | | | |
| border visibility/color | | | |
| radius | | | |
| shadow strength | | | |
| horizontal padding | | | |
| vertical padding | | | |
| section gap | | | |
| grid gap | | | |
| list row height | | | |
| primary content font floor | | | |
| secondary/meta font floor | | | |

For component-specific shapes, add rows instead of relying on one global radius:

| section | element | source shape | width/height | radius model | padding | implementation value | deviation? |
|---|---|---|---|---|---|---|---|
| list | priority chip | capsule / rounded-rect / square-ish / circle | | | | | |
| tabs | active tab pill | | | | | | |
| card | hero panel | | | | | | |

For complex hero/status cards, add a layer-stack table before coding:

| section | layer | source observation | implementation strategy | DOM/SVG/asset | debt? |
|---|---|---|---|---|---|
| hero/status | base gradient | | | | |
| hero/status | ring/chart geometry | | | | |
| hero/status | metric columns/separators | | | | |
| hero/status | decoration/background media | | | | |
| hero/status | inner glow/shadow | | | | |

For icon grids/action modules, add cell-alignment rows:

| section | element | icon relation | cell alignment model | icon box | label alignment | implementation value | deviation? |
|---|---|---|---|---|---|---|---|
| module grid | module item | icon above label / left of label / badge | centered icon + centered label / left row | | | | |
| quick action | action item | | | | | | |

Rules:
- Do not use generic dashboard defaults without filling this table.
- If exact color cannot be sampled, describe it and choose the closest token deliberately.
- Prefer fixing proportion/spacing before decorative effects.
- Preserve the design hierarchy, but do not copy unreadably small typography for main content. On mobile/H5, primary readable text should generally stay at or above 12px, section/card titles at or above 13-14px, and 10-11px should be reserved for dense metadata, badges, timestamps, or units only when the source and available space require it.
- If increasing tiny source text affects density, compensate with spacing/line-height/layout rather than shrinking important content below readability floors.
- Do not infer small control shapes from page/card radius. Chips, priority labels, tab pills, and badges must keep their own source shape model and dimensions.
- Do not convert centered module/action icon grids into left-aligned flex rows. Record and preserve the alignment model for the whole cell, not only the icon asset.
- Complex hero/status/cockpit cards are not a single background rectangle. Map layers and decide which layers are DOM, SVG, or asset-backed before writing CSS.

## 2. Text inventory

Every visible string in the source must be mapped before coding.

| section | text | role | approximate position | must keep? |
|---|---|---|---|---|
| header | | page-title / badge / tenant / role / status | | yes |
| hero/card | | title / source / value / label | | yes |
| KPI | | title / value / unit / status | | yes |
| list | | label / title / time / link | | yes |

Rules:
- A visible label may not be omitted because a value already implies it.
- Do not merge separate roles into one text node if that changes hierarchy.
- Generation is incomplete if title/label/value/unit/status/link placement differs from the source without a recorded deviation.

## 3. Icon anatomy inventory

Every icon-like mark must be mapped before coding.

| section | source role | Iconify/local class | size | color | container? | alignment | notes |
|---|---|---|---|---|---|---|---|
| header | dropdown | | | | no | inline after role | |
| header | refresh | | | | no | inline | |
| KPI | primary icon | | | | yes/no from source | left of value / above value / badge / centered | |
| grid | module icon | | | | yes/no from source | centered in cell / left row / other | |
| action | action icon | | | | yes/no from source | centered in cell / left row / other | |

Rules:
- Resolve from Iconify first; search existing project icon sets before drawing.
- Source bare icon = no colored tile/background wrapper.
- Inline dropdown/arrow/refresh icons must use icon classes, not glyph text (`⌄`, `›`, `↻`) unless the source is typographic.
- Record icon color and stroke/fill style; do not infer color only from semantic meaning.
- Record icon-to-text relation and cell alignment. If the source has centered module/action icons, implementation must center both icon and label within the cell unless an accepted deviation is recorded.

## 4. Section-level regeneration contract

For high-fidelity page rewrites, every major section must have an implementation contract before coding:

| section | bbox/height | shell/background | inner container | grid/layout | media role/aspect | text safe area | screenshot target | pass criteria |
|---|---|---|---|---|---|---|---|---|
| hero | | | | | independent hero asset / final ratio | | | |
| categories | | | | | atlas crops / card ratio | | | |

Rules:
- A section name is not enough. Record proportions, media role, and verification target.
- If the current page looks only half-accurate, stretched, or rough, enrich the IR here before more CSS.
- Treat adjacent sections jointly when a background field, decoration, or rhythm crosses their boundary.
- Each section must have a stable `data-section` anchor for screenshots.

## 5. Asset role and atlas plan

For generated imagery, record whether each asset is independent, atlas-generated then cropped, CSS/SVG, or HTML text.

| section | visual group | bbox | strategy | include together | exclude | final files |
|---|---|---|---|---|---|---|
| hero | main product visual | | independent image | product composition, shadows, safe area | text, logos, buttons | |
| categories | card thumbnails | | atlas -> cropped files | same family category photos | text, logos, UI labels | |

Rules:
- Hero/CTA/banner assets are independent files, not atlas cells.
- Repeated card/application/factory images may use an atlas, but the atlas must be cropped into independent files before implementation.
- Final code must not use one atlas with CSS `background-position` as separate UI images.
- Images must match final display aspect ratio closely; do not rely on heavy object-fit cropping to hide a wrong source ratio.
- Text, labels, nav, buttons, certificates, logos, and partner names are rendered in HTML/CSS/SVG/Iconify, not baked into AI images.
- Temporary CSS/SVG placeholders must stay low-emphasis and be reported as debt.
- Do not claim parity complete while asset-required groups are pending.

## Pre-generation checklist

All must be true before coding a full-page rewrite:

- [ ] Visual token table filled
- [ ] Text inventory filled
- [ ] Icon anatomy inventory filled
- [ ] Section-level regeneration contract filled for each major section
- [ ] Asset role/atlas plan filled; atlas crops have final output paths
- [ ] Must-not-add effects listed
- [ ] Known accepted deviations listed

If any box is empty, update the brief first instead of guessing in code.
