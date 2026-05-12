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

## Fidelity Modes

Keep high-fidelity capability, but activate heavy rules only around the current page/section.

- `quick`: non-visual or minor UI changes; use project conventions and do not claim design parity.
- `standard-fidelity` (default for GPT Image 2/mockup UI): preserve approved source, page type, section order, density, and top visual gaps while keeping context small.
- `strict-fidelity`: core screens, final visual acceptance, or user asks for exact/按图还原; load high-fidelity references and run screenshot repair loops.
- `repair`: existing implementation drifted; compare current screenshot to source and fix the largest 1-3 gaps per pass.
- `regenerate`: complete page rewrite; load full-page regeneration guard before coding.
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
- fix the largest 1-3 visual gaps per pass and record remaining debt

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
- Do not invent visual effects or decorative assets beyond the approved source; when strict detail is needed, load `references/high-fidelity-rules.md`.
- Functional controls must follow existing project/UI-library patterns first; load `IdeaToTech` only when API/state/permission/cross-platform/verification risk is non-trivial.

## Progressive Loading

Load only when needed:
- `references/high-fidelity-rules.md` — strict visual details: exactness, text/icon/shape inventory, asset/layer rules, functional-control escalation
- `references/full-page-regeneration-guard.md` — required before complete page rewrites from approved mockups; token table, text inventory, icon anatomy, and asset grouping map
- `references/functional-component-handoff-guard.md` — required when mockups include tabs, search, filters, dropdowns, pickers, pagination, forms, or other controls with non-trivial API/state/platform semantics
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
