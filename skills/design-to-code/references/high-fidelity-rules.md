# High-Fidelity Rules

Use this reference only when the current slice is in `strict-fidelity`, `regenerate`, `asset`, or repeated visual-repair mode. Do not load it for routine `standard-fidelity` work unless a specific rule below is needed.

## Exactness Rules

- Exactness beats style intuition: implement only effects visible in the binding source. Do not add glow, blur, glass, shadow, gradient intensity, decorations, or micro-effects because they feel consistent with the style. If the source ring has no outer glow, keep it clean; additive effects are visual drift unless recorded as an accepted enhancement.
- Count repeated separators explicitly. Metric groups, segmented controls, tabs, lists, and grids must map every visible divider/separator before coding. Do not collapse two internal separators into one parent divider, and do not move group dividers to the section edge.
- Extract visual tokens before full-page regeneration. For each page/section, record source-derived background color, border visibility/color, radius, shadow strength, horizontal/vertical padding, grid gaps, row heights, section spacing, and readable typography floors for primary content. Do not replace these with generic dashboard defaults unless explicitly accepted as a deviation; however, do not copy source text sizes below platform readability floors for main content just because the mockup uses tiny text.

## Mobile Typography Readability Floors

- For mobile H5 / mini-program / phone-width web, fidelity must include usability: do not copy or generate tiny text that falls below readable platform floors just to match density. Treat typography below the floor as a design-source issue or implementation debt, not as a parity target.
- **Scope (default): all mobile pages that carry business information.** This includes homepage, TabBar pages, lists, details, forms, pricing/spec/KPI/status cards, navigation, search, filters, CTAs, and any page where the user must read, decide, or act. Purely decorative splash/ornamental text may be an exception only if recorded as non-critical.
- **Unit convention: write rpx + px together.** Before coding mobile pages, convert `rpx`/design units to CSS pixels at the target viewport. For uni-app 750-design-width math, `font_px = rpx * viewport_width / 750`; examples: `28rpx ≈ 14px @375`, `26rpx ≈ 13px @375`, `24rpx ≈ 12px @375`, `22rpx ≈ 11px @375`, `20rpx ≈ 10px @375`.
- Default mobile floors unless the project explicitly defines stronger tokens:
  - primary body / card subtitle / form label: **>= 28rpx ≈ 14px @375** preferred, **>= 26rpx ≈ 13px @375** minimum;
  - secondary label / status chip / metadata: **>= 24-26rpx ≈ 12-13px @375**, avoid large-area use below 26rpx;
  - page/card titles: **30-34rpx+ ≈ 15-17px+ @375**; page hero titles usually **40-48rpx+ ≈ 20-24px+ @375**;
  - functional controls and inputs: text **>= 26-28rpx ≈ 13-14px @375**, touch target near **44px** when feasible.
- **Tiered gate:** decision-critical business text is a hard gate. Page/section titles, body/description, CTA, form labels/placeholders/errors, prices, specs, quantities, status, KPI labels/values, navigation, search, filters, and operation entries must not render below the floor. Decorative kicker text, sparse non-critical metadata, and tiny labels inside illustrations may be warning-only exceptions, but must be explicitly recorded in the debt/parity report.
- Text below **24rpx ≈ 12px @375** may only be decorative, non-critical, or extremely sparse. It must not carry decision-critical labels, prices, specs, form hints, status, CTA text, or long reading content.
- Implementation artifacts must include `typography_floor` in Visual IR or the parity report: target viewport(s), rpx-to-px examples, project overrides, hard-gate violations, warning exceptions, and post-implementation screenshot/DOM sampled font sizes.
- When increasing tiny text, rebalance the component instead of merely scaling fonts: adjust line-height, padding, grid columns, card density, label copy length, truncation, progressive disclosure, or horizontal scrolling. Do not solve readability by causing overflow.


## Mobile Icon Fidelity Gate

- Mobile high-fidelity work must not treat icons as decorative afterthoughts. Before coding or repairing a mobile page, extract an `icon_system` alongside typography: each icon-like mark needs role, source size, container size, glyph size, color, stroke/fill weight, alignment model, and whether it is a bare icon, icon tile, badge, illustration detail, or functional control.
- **Unit convention: write rpx + px together.** Example for uni-app 750-design-width math: `56rpx box ≈ 28px @375`, `32rpx glyph ≈ 16px @375`. Do not mix `font-size`, `width/height`, and visual glyph size without recording which one is the token.
- Establish project/page icon tokens before implementation instead of hand-tuning per selector. Typical mobile tokens should distinguish at least:
  - navigation/action icon: box + glyph, e.g. `48-56rpx box ≈ 24-28px @375`, `26-32rpx glyph ≈ 13-16px @375`;
  - quick-entry/grid icon: `52-64rpx box ≈ 26-32px`, `30-36rpx glyph ≈ 15-18px`;
  - card/function icon: `52-64rpx box`, `28-34rpx glyph`;
  - list/meta/status icon: `28-40rpx box`, `20-26rpx glyph`;
  - hero/illustration icon: section-specific, not shared with UI controls.
- Iconify caveat: `font-size` is not the same as visual glyph size. Different icon viewBoxes and stroke/fill weights have different perceived sizes. Apply recorded visual compensation (`+/-2rpx`, `transform: scale(...)`, or separate token) for thin, filled, or padded icons, and verify by rendered screenshot/DOM sampling rather than assuming equal `font-size` equals equal size.
- Preserve source anatomy: if the design shows a bare icon, do not wrap it in a colored tile; if it shows an icon tile, record tile radius/background/shadow and icon-to-text alignment. Do not change centered grid icons into left-row icons or vice versa unless recorded as a deliberate deviation.
- When a user reports “icons do not match the design,” do an Icon Fidelity Pass before more broad layout polish: inventory icon roles, normalize tokens, fix the largest inconsistent icon classes first, and record remaining icon debt.


## Text, Icon, And Shape Inventory

- Maintain a text inventory before coding. Every visible text fragment in the binding source must be mapped to a role (`title`, `label`, `value`, `unit`, `caption`, `status`, `link`) and an approximate position. Generation is incomplete if a visible label is omitted, merged into another role, or moved to a different hierarchy level.
- Maintain an icon anatomy map before coding. For every icon-like mark, record source role, chosen library class, size, color, container/background yes/no, stroke/fill style, and inline alignment. If the source shows a bare icon, do not wrap it in a colored tile. If an inline dropdown/arrow/refresh is visible, use an icon library class instead of text glyphs like `⌄`, `›`, or `↻` unless the source is explicitly typographic.
- Resolve page icons from Iconify first. Search existing project Iconify sets for the closest semantic/visual match before drawing anything. If no suitable installed icon exists, install the smallest appropriate Iconify package/set rather than inventing a custom icon. For simple multicolor icons, recreate a small inline/local SVG only when Iconify cannot match the source.
- Icon anatomy must include icon-to-text/value relation, not only icon identity. For metric tiles and summaries, record whether the icon is above, left of the number, right of the number, badge-like, or centered in a grid cell, and preserve that layout. Grid/action icons must record the alignment model for the whole cell (`centered icon + centered label`, `left icon + right text`, etc.); do not default to left alignment just because the implementation uses flex rows.
- Shape tokens must be component-specific, not only global. Status chips, priority labels, tabs, pills, cards, and hero panels each need their own radius/height/padding entry. A page-level radius token is insufficient for small labels; record whether the source chip is capsule, rounded-rect, square-ish, or circular, plus approximate width/height.
- Filter/tab labels must not wrap unless the source explicitly wraps them. Use component sizing, nowrap, horizontal scroll, or overflow strategy before allowing labels to break lines.

## Asset And Layer Rules

- Do not hand-draw final substitutes for asset-required GPT Image 2 decorations. If a rich background/3D/resource-pool illustration is not feasible as CSS/SVG with high fidelity, add it to an asset backlog for a later GPT Image 2/image-asset pass with bbox, prompt notes, transparent-background requirement, export size, and layer placement. Treat attached grids, platforms, glow fields, and base shadows that visually belong to that illustration as part of the same asset unless the source clearly separates them as independent UI geometry.
- Temporary CSS/SVG placeholders must be low-emphasis and reported as debt, not parity-complete.
- For complex colorful icons, group them with other generated visual assets in the GPT Image 2/image-asset pass and record prompt notes, bbox, transparent-background requirement, export size, and layer placement.
- Complex hero/status cards require a layer-stack contract before coding. For cockpit/resource/3D/illustration-heavy cards, record base gradient, inner shadows, glows, ring/chart geometry, separators, metric layout, decoration/media role, and which layers are dynamic DOM vs generated/static asset. If a decoration cannot be faithfully reproduced in CSS/SVG, use a low-emphasis placeholder and mark the section WARN/debt instead of presenting it as parity.

## Functional Control Rule

Before implementing visual elements that are functional controls, classify them with a project-pattern check first. Tabs, segmented controls, search bars, filters, dropdowns, pickers, date/calendar filters, pagination, form fields, toggles, upload controls, and action list rows must map to existing project patterns or UI-library components when available. Load `IdeaToTech` only when the control affects API, state, permissions, cross-platform behavior, complex forms, or verification strategy.

## Pre-Generation Checklist

Before complete page rewrites, confirm:
- tokens covered
- text inventory covered
- icon anatomy covered
- asset backlog updated
- must-not-add effects listed

If any item is missing, create/update the brief first instead of guessing in code.
