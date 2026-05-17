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

## Fidelity Path

D2C has one default path: **highest-fidelity-regeneration**.

Use D2C only when converting or repairing against an approved visual source and the expected result is the highest practical design-source fidelity. Do not downgrade to `quick`, `standard`, or "structure-first" modes unless the user explicitly waives fidelity for that specific task.

For every visual D2C page/section:
- approved visual source is the source of truth; prose only supports it
- load the highest-fidelity references before coding, not after a mismatch appears
- extract executable section-level IR before implementation
- inventory visible text, icons, shapes, tokens, assets, and controls before coding
- implement from the inventory/IR, then generate left-design/right-live evidence
- any shortcut, placeholder, missing icon, or simplified asset is debt and must be named before showing the result

Required references for visual D2C work:
- `references/design-extraction-analysis-gate.md`
- `references/full-page-regeneration-guard.md`
- `references/high-fidelity-rules.md`
- `references/section-driven-high-fidelity.md`
- `references/executable-visual-ir.md`
- `references/asset-atlas-generation.md` when multiple related bitmap assets are needed
- `references/functional-component-handoff-guard.md` when controls/forms/tabs/pickers affect behavior

Non-visual or minor project-convention edits should not use D2C and must not claim design parity.

## Fidelity Kernel

These rules are always active for GPT Image 2/mockup work:
- approved visual source is the source of truth; prose only supports it
- preserve page type, section order, first-screen density, card/list/form anatomy, and action hierarchy
- do not convert list/detail/form/product pages into generic dashboards
- do not replace populated designs with empty states unless the source says so
- do not claim parity from DOM/text smoke alone; use screenshot or section evidence
- maintain or create lightweight Visual IR for the active page/section
- before strict visual repair, perform design extraction and analysis from the approved source; load `references/design-extraction-analysis-gate.md` when fidelity depends on a screenshot/mockup
- for high-fidelity page rewrites, enrich Visual IR to executable section-level layout/asset/anatomy/token contracts before coding
- if visual repair keeps producing "similar but not restored", treat under-specified IR as the blocker and load `references/executable-visual-ir.md` before more CSS
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

## Highest-Fidelity Gate

Before coding any visual D2C page/section, the required references above must be loaded and applied. Section-level executable IR is mandatory: each major section needs bbox/height or density, component anatomy, text/icon/shape inventory, token targets, media/asset role, crop strategy, text safe areas, screenshot target, pass criteria, and must-not-substitute rules.

If any required field is missing, stop and enrich the IR/brief before changing code.

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

## Mandatory Reference Loading

For visual D2C work, load these before coding; they are not optional or deferred:
- `references/high-fidelity-rules.md` — exactness, text/icon/shape inventory, asset/layer rules, functional-control escalation
- `references/design-extraction-analysis-gate.md` — design extraction from screenshots/mockups into section IR, component anatomy, asset roles, token targets, must-not-substitute rules, and pass criteria
- `references/full-page-regeneration-guard.md` — complete-page token table, text inventory, icon anatomy, asset grouping map, and section-level asset plan
- `references/section-driven-high-fidelity.md` — section-by-section restoration and strict visual repair
- `references/executable-visual-ir.md` — executable section-level layout/asset/anatomy/token contracts
- `references/asset-atlas-generation.md` — when multiple related bitmap assets are present or may be needed
- `references/functional-component-handoff-guard.md` — when controls/forms/tabs/pickers affect behavior
- `references/blueprint-driven-implementation.md` — when project blueprint files exist
- `references/visual-measurements.md` — extracting sizes, colors, density
- `references/width-normalization.md` — canonical page width, responsive/H5 viewport metrics, and real mobile screenshot evidence
- `references/mobile-recomposition.md` — when desktop/PC-only sources must become mobile
- `references/playwright-section-diff.md` — screenshot comparison and Mobile H5 visual audit pack
- `references/main-skill-full-reference.md` — if the compact guide is insufficient

## Common Pitfalls

| Pitfall | Fix |
|---|---|
| Implementing from prose only | Build/read Visual IR and source crops |
| Broad route smoke treated as visual pass | Require section screenshots for parity claims |
| Reusing a dashboard template everywhere | Preserve page type and first-screen anatomy |
| Pixel-chasing before coverage | Cover routes first, then L4/L5 selected pages |
| Coding starts before extracting design | Stop; run design extraction and analysis, then write executable IR before implementation |
| IR only names sections | Add executable IR: bbox/height, density, component anatomy, asset role, token targets, pass criteria, and must-not-substitute rules |
| Repeated CSS tuning still feels unlike source | Stop coding; classify mismatch as asset/structure/anatomy/token/verification and enrich `references/executable-visual-ir.md` fields first |
| Using one generated atlas as many CSS backgrounds | Crop atlas into independent files and reference cropped assets only |
| Hero/banner mixed into thumbnail atlas | Generate hero/CTA as independent assets with final safe areas |
