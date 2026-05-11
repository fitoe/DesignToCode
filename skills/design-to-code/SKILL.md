---
name: design-to-code
description: Use when converting approved design sources, handoff packages, mockups, visual contracts, or UI blueprints into implementation code and visual parity evidence.
---

# Design to Code

## Purpose

Turn an approved visual source into maintainable code without relying on prose precision. Prefer structured inputs, small implementation passes, and screenshot-backed parity evidence.

## Ownership Boundary

`design-to-code` owns work after design approval/handoff:
- implementation mapping and code changes
- extracting implementation details from approved visual sources
- `data-section` anchors and section-level parity evidence
- visual repair, mismatch/debt notes, accepted deviations

Return to `idea-to-design` only when the approved source is missing/stale, scope changed, the handoff predates approval, or the user asks for a design change.

## Input Priority

1. `implementation-blueprint.json` + `page-matrix.json` + `component-blueprint.json` + `debt-ledger.json`
2. Visual IR / section contract (`visual-ir/<page-id>.json`, `visual-contracts/*`, section crops)
3. Approved design images / Figma context / persisted mockups
4. Page briefs and prose notes

Prose briefs are supporting context, not the source of truth.

## Default Workflow

1. **Intake**: identify source of truth, target routes/files, framework constraints, current maturity target.
2. **Foundation**: map tokens/shell/base components before page-specific polish.
3. **Coverage**: make every in-scope route/page visibly present before deep fidelity work.
4. **Section Anchors**: add stable `data-section` markers for key sections.
5. **Fidelity Loop**: compare source vs implementation by section; fix the largest 1-3 gaps per pass.
6. **Handoff**: report page maturity, evidence, debt, and deviations.

## Visual IR Minimum

Use or create a lightweight Visual IR for PNG/GPT Image 2/mockup sources when fidelity matters:

```json
{
  "page_id": "application-list",
  "route": "/pages/applications/index",
  "viewport": [390, 844],
  "page_type": "list",
  "source_refs": ["design-to-code-inputs/mockup.png"],
  "sections": [
    {"name": "topbar", "order": 1, "bbox": [0,0,390,72]},
    {"name": "card-list", "order": 4, "density": "2.5 cards visible"}
  ],
  "section_anchors": ["topbar", "card-list"],
  "must_not_do": ["do not replace list with dashboard"]
}
```

Do not over-model every pixel. Capture page type, section order, bbox, first-screen density, card/list anatomy, action hierarchy, must-not-do, and asset strategy.

## Required Output Evidence

For each meaningful checkpoint, report:
- route/page coverage
- maturity level: L0 route-ready, L1 skeleton, L2 content, L3 system-styled, L4 core-fidelity, L5 functional
- section parity: PASS/WARN/FAIL for major sections when fidelity is claimed
- largest remaining visual gaps and whether they are debt or accepted deviation
- verification actually run; do not claim checks that were skipped

## Hard Rules

- Do not claim design parity from DOM/text smoke alone.
- Do not replace populated designs with empty states unless the design/source says so.
- Do not convert list/detail/form pages into generic dashboards.
- Do not run broad lint/type/build repeatedly during active visual editing unless a failure signal or gate requires it.
- Do not handwave “close enough”; record section-level debt.

- Exactness beats style intuition: implement only effects visible in the binding source. Do not add glow, blur, glass, shadow, gradient intensity, decorations, or micro-effects because they feel consistent with the style. If the source ring has no outer glow, keep it clean; additive effects are visual drift unless recorded as an accepted enhancement.
- Count repeated separators explicitly. Metric groups, segmented controls, tabs, lists, and grids must map every visible divider/separator before coding. Do not collapse two internal separators into one parent divider, and do not move group dividers to the section edge.
- Resolve page icons from Iconify first. Search existing project Iconify sets for the closest semantic/visual match before drawing anything. If no suitable installed icon exists, install the smallest appropriate Iconify package/set rather than inventing a custom icon. For simple multicolor icons, recreate a small inline/local SVG only when Iconify cannot match the source. For complex colorful icons, group them with other generated visual assets in the GPT Image 2/image-asset pass and record prompt notes, bbox, transparent-background requirement, export size, and layer placement.
- Do not hand-draw final substitutes for asset-required GPT Image 2 decorations. If a rich background/3D/resource-pool illustration is not feasible as CSS/SVG with high fidelity, add it to an asset backlog for a later GPT Image 2/image-asset pass with bbox, prompt notes, transparent-background requirement, export size, and layer placement. Treat attached grids, platforms, glow fields, and base shadows that visually belong to that illustration as part of the same asset unless the source clearly separates them as independent UI geometry. Temporary CSS/SVG placeholders must be low-emphasis and reported as debt, not parity-complete.
- Extract visual tokens before full-page regeneration. For each page/section, record source-derived background color, border visibility/color, radius, shadow strength, horizontal/vertical padding, grid gaps, row heights, section spacing, and readable typography floors for primary content. Do not replace these with generic dashboard defaults unless explicitly accepted as a deviation; however, do not copy source text sizes below platform readability floors for main content just because the mockup uses tiny text.
- Maintain a text inventory before coding. Every visible text fragment in the binding source must be mapped to a role (`title`, `label`, `value`, `unit`, `caption`, `status`, `link`) and an approximate position. Generation is incomplete if a visible label is omitted, merged into another role, or moved to a different hierarchy level.
- Maintain an icon anatomy map before coding. For every icon-like mark, record source role, chosen library class, size, color, container/background yes/no, stroke/fill style, and inline alignment. If the source shows a bare icon, do not wrap it in a colored tile. If an inline dropdown/arrow/refresh is visible, use an icon library class instead of text glyphs like `⌄`, `›`, or `↻` unless the source is explicitly typographic.
- Before full-page rewrites, run a pre-generation checklist: `tokens covered`, `text inventory covered`, `icon anatomy covered`, `asset backlog updated`, and `must-not-add effects listed`. If any is missing, create/update the brief first instead of guessing in code.

## Progressive Loading

Load only when needed:
- `references/full-page-regeneration-guard.md` — required before complete page rewrites from approved mockups; token table, text inventory, icon anatomy, and asset grouping map
- `references/blueprint-driven-implementation.md` — blueprint-first implementation details
- `references/visual-measurements.md` — extracting sizes, colors, density
- `references/playwright-section-diff.md` — section screenshot comparison
- `references/high-fidelity-mode.md` — strict visual repair loops
- `references/main-skill-full-reference.md` — full legacy detail if this compact guide is insufficient

## Common Pitfalls

| Pitfall | Fix |
|---|---|
| Implementing from prose only | Build/read Visual IR and source crops |
| Broad route smoke treated as visual pass | Require section screenshots for parity claims |
| Reusing a dashboard template everywhere | Preserve page type and first-screen anatomy |
| Pixel-chasing before coverage | Cover routes first, then L4/L5 selected pages |
