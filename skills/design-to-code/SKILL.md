---
name: design-to-code
description: Use when converting approved design sources, handoff packages, mockups, visual contracts, or UI blueprints into implementation code and visual parity evidence; also when visual implementation feels rough, stretched, under-specified, or needs section-level high-fidelity repair.
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

## Fidelity Modes

Keep high-fidelity capability, but activate heavy rules only around the current page/section.

- `quick`: non-visual or minor UI changes; use project conventions and do not claim design parity.
- `standard-fidelity` (default for GPT Image 2/mockup UI): preserve approved source, page type, section order, density, and top visual gaps while keeping context small.
- `strict-fidelity`: core screens, final visual acceptance, or user asks for exact/按图还原; load high-fidelity references and run screenshot repair loops.
- `repair`: existing implementation drifted; compare current screenshot to source and fix the largest 1-3 gaps per pass.
- `regenerate`: complete page rewrite; load full-page regeneration guard before coding.
- `section-strict`: rough, stretched, or only half-accurate visual implementation; load section-driven high-fidelity plus atlas rules before coding.
- `asset`: complex illustration/icon/background work; use asset fulfillment references and record asset debt.

In `standard-fidelity`, prefer cached Visual IR and source/screenshot paths over long vision prose. Load heavier references only when the mode or a failed parity check requires them.

## Fidelity Kernel

These rules are always active for GPT Image 2/mockup work:
- approved visual source is the source of truth; prose only supports it
- preserve page type, section order, first-screen density, card/list/form anatomy, and action hierarchy
- do not convert list/detail/form/product pages into generic dashboards
- do not replace populated designs with empty states unless the source says so
- do not claim parity from DOM/text smoke alone; use screenshot or section evidence
- maintain or create lightweight Visual IR for the active page/section
- for high-fidelity page rewrites, enrich Visual IR to section-level layout/asset contracts before coding
- generated media must match its final display role and aspect ratio; do not hide asset mismatch with `object-fit` or background-position tricks
- atlas generation is for creation efficiency only; crop atlas outputs into independent files before implementation
- fix the largest 1-3 visual gaps per pass and record remaining debt

## Default Workflow

1. **Intake**: identify source of truth, target routes/files, framework constraints, current maturity target.
2. **Foundation**: map tokens/shell/base components before page-specific polish.
3. **Coverage**: make every in-scope route/page visibly present before deep fidelity work.
4. **Section Anchors**: add stable `data-section` markers for key sections.
5. **Fidelity Loop**: compare source vs implementation by section; fix the largest 1-3 gaps per pass.
6. **Handoff**: report page maturity, evidence, debt, and deviations.

## Section-Strict Trigger

When the user says the implementation is rough, only half done, stretched, not precise enough, needs richer IR, or should be restored section-by-section, switch to section-strict/regenerate mode. Before coding, load:

- `references/full-page-regeneration-guard.md`
- `references/section-driven-high-fidelity.md`
- `references/asset-atlas-generation.md` when multiple related images are missing

Section-strict requires a richer IR than the lightweight minimum: each major section needs layout ratios, final media role/aspect, crop/asset strategy, text safe areas, section screenshot target, pass criteria, and must-not-do rules.

## Asset Strategy Kernel

Use generated media by role:

| role | strategy |
|---|---|
| hero main visual | generate as an independent asset |
| CTA/banner background | generate as an independent asset |
| repeated card thumbnails | atlas generation allowed, then crop to independent files |
| application/factory scene groups | atlas generation allowed, then crop to independent files |
| certificates, logos, nav, buttons, labels | render with HTML/CSS/SVG/Iconify; do not bake into images |

Hard rule: an atlas is never a production UI asset. Final code must reference the cropped output files, not use CSS `background-position` against the atlas to fake separate images.

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
- Do not invent visual effects or decorative assets beyond the approved source; when strict detail is needed, load `references/high-fidelity-rules.md`.
- Functional controls must follow existing project/UI-library patterns first; load `IdeaToTech` only when API/state/permission/cross-platform/verification risk is non-trivial.

## Progressive Loading

Load only when needed:
- `references/high-fidelity-rules.md` — strict visual details: exactness, text/icon/shape inventory, asset/layer rules, functional-control escalation
- `references/full-page-regeneration-guard.md` — required before complete page rewrites from approved mockups; token table, text inventory, icon anatomy, asset grouping map, and section-level asset plan
- `references/section-driven-high-fidelity.md` — required for rough/half-accurate/stretched pages, section-by-section restoration, and strict visual repair
- `references/asset-atlas-generation.md` — required when generating multiple related bitmap assets; atlas must be cropped before implementation
- `references/functional-component-handoff-guard.md` — required when mockups include tabs, search, filters, dropdowns, pickers, pagination, forms, or other controls with non-trivial API/state/platform semantics
- `references/blueprint-driven-implementation.md` — blueprint-first implementation details
- `references/visual-measurements.md` — extracting sizes, colors, density
- `references/width-normalization.md` — canonical page width, responsive/H5 viewport metrics, and real mobile screenshot evidence
- `references/mobile-recomposition.md` — mobile layout adaptation, mobile grids, and approved mobile structure preservation
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
| IR only names sections | Add section layout ratios, media role/aspect, crop strategy, text safe area, screenshot targets |
| Using one generated atlas as many CSS backgrounds | Crop atlas into independent files and reference cropped assets only |
| Hero/banner mixed into thumbnail atlas | Generate hero/CTA as independent assets with final safe areas |
