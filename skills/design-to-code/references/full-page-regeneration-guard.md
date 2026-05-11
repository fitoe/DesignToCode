# Full-page Regeneration Guard

Use before a complete page rewrite from approved mockups. Do not start coding until the brief has these four artifacts.

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

## 4. Asset grouping map

For generated imagery, record whether it is an independent UI geometry or part of a background asset group.

| section | visual group | bbox | strategy | include together | exclude |
|---|---|---|---|---|---|
| hero/card | right-lower background | | GPT Image 2 asset | grid/platform/glow/base shadow/3D objects | text, metric values, full card background |

Rules:
- Do not split attached grid/platform/glow/base shadows from their generated illustration group.
- Temporary CSS/SVG placeholders must stay low-emphasis and be reported as debt.
- Do not claim parity complete while asset-required groups are pending.

## Pre-generation checklist

All must be true before coding a full-page rewrite:

- [ ] Visual token table filled
- [ ] Text inventory filled
- [ ] Icon anatomy inventory filled
- [ ] Asset grouping map/backlog updated
- [ ] Must-not-add effects listed
- [ ] Known accepted deviations listed

If any box is empty, update the brief first instead of guessing in code.
