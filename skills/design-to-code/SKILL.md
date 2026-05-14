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
- `responsive-basic`: small changes, admin/backoffice, or non-core pages; ensure no overflow and usable controls, but do not claim strong mobile conversion quality.
- `mobile-recomposition` (default when only a PC/desktop design exists but mobile quality matters): first preserve desktop design intent, then recompose mobile layout by section type, content density, scroll rhythm, and touch usability.
- `mobile-strict`: homepage, core landing page, mobile-heavy page, complex responsive composition, or repeated mobile failure; create or update Mobile IR before claiming mobile quality.
- `mobile-repair`: existing mobile implementation is too long, too single-column, overflowing, or mechanically adapted; fix the largest 1-3 mobile experience issues first.

- `font-basic`: small/non-core pages where typography is not a main parity target; use project/system stack, record obvious deviations, and do not claim font fidelity.
- `font-fidelity` (default when design sources contain multiple fonts or typography affects visual parity): inventory fonts, choose exact/free substitute/project-stack/asset/css/deviation decisions, consolidate, self-host, and record a manifest.
- `font-strict`: homepage, core landing page, brand-heavy page, or explicit typography fidelity; require font manifest, screenshot evidence, and reason/waiver for over-budget choices.
- `font-pipeline`: multilingual, CJK-specific, many-weight, or performance-sensitive typography; use subsetting, preload, budget, fallback metrics, and LCP/CLS checks where needed.

In `standard-fidelity`, prefer cached Visual IR and source/screenshot paths over long vision prose. Load heavier references only when the mode or a failed parity check requires them.

When the source is desktop-only, do not treat mobile as a pixel-shrunk desktop. Use `mobile-recomposition` unless the task is clearly `responsive-basic`; escalate to `mobile-strict` when a core page needs a recoverable Mobile IR or repeated mobile repair fails.

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
- design-source fonts must be restored by role, licensing, and performance budget; do not blindly load every source font or collapse all typography to generic sans
- do not use commercial or unknown-license fonts without project authorization; choose close free/open-source substitutes when unavailable or not free
- production font files must be self-hosted in the project; do not rely on Google Fonts CDN, unofficial mirrors, or user-local fonts as the implementation
- multi-font designs must be consolidated before adding assets; first-screen font budget defaults to <=2 families and <=3 files unless waived
- homepage-first typography creates provisional role slots and open questions, not a final locked site-wide font system
- atlas generation is for creation efficiency only; crop atlas outputs into independent files before implementation
- fix the largest 1-3 visual gaps per pass and record remaining debt

## Mobile Recomposition Pass

When only a PC/desktop design exists, PC high fidelity does not mean mobile mechanical replication. Preserve design intent, hierarchy, brand language, critical content, CTA priority, and trust signals; recompose layout for mobile scroll rhythm and touch usability.

Default to `mobile-recomposition` for desktop-only websites, B2B pages, marketing pages, product pages, and landing sections that need good mobile output. Use `responsive-basic` only for small changes, admin/backoffice, or non-core pages. Escalate to `mobile-strict` and create Mobile IR for homepage/core landing pages, mobile-heavy pages, complex mobile composition, or repeated mobile failure.

Hard rules:
- do not preserve desktop coordinates, large gaps, side-by-side layout, or image ratios blindly on mobile;
- do not convert desktop 4×1, 4×2, or 3×2 grids into long one-column lists by default;
- classify repeated items by content density before choosing 2-column grid, 2-3 column stats/logo layout, compact one-column card, horizontal scroller, featured carousel, grouping, or show-more;
- preserve critical content, CTA, trust proof, legal/pricing/risk details, and required form information;
- summarize/fold/hide only secondary or decorative content, and record accepted mobile deviations;
- validate mobile with scroll rhythm, touch usability, no horizontal overflow, and section-level evidence, not just CSS breakpoints.

For detailed density rules, content compression rules, and Mobile IR schema, load `references/mobile-recomposition.md`.


## Font Fidelity Pass

When a source design uses multiple fonts or typography affects parity, restore fonts through role-based decisions instead of copying every font or falling back to generic sans. Default to `font-fidelity`; use `font-basic` only when typography is not a main visual target, and escalate to `font-strict` or `font-pipeline` for brand-heavy, multilingual, CJK, or performance-sensitive work.

Hard rules:
- inventory visible font roles: brand/logo, hero/display, heading, body, UI/nav/button/form, numeric/stat/price, decorative, and CJK/multilingual;
- commercial, unavailable, or unknown-license source fonts must use close free/open-source substitutes unless project authorization and files are provided;
- all production font files must live in the project and be self-hosted; do not depend on Google Fonts CDN or user-local fonts for production;
- consolidate multi-font designs before adding assets; avoid turning 5-8 source fonts into 5-8 webfonts;
- homepage-first work creates Font System v0.1 with provisional role slots, confidence, future page policy, and open questions;
- later pages introducing new fonts must pass Font Governance Gate before adding global or page-specific font assets.

For detailed matching criteria, manifest shape, homepage-first governance, and subsetting/pipeline escalation, load `references/font-fidelity.md`.

## Default Workflow

1. **Intake**: identify source of truth, target routes/files, framework constraints, current maturity target, and mobile mode.
2. **Foundation**: map tokens/shell/base components before page-specific polish.
3. **Coverage**: make every in-scope route/page visibly present before deep fidelity work.
4. **Desktop Fidelity Pass**: preserve the approved desktop/source design, section order, visible content inventory, typography roles, and major visual hierarchy.
5. **Section Anchors**: add stable `data-section` markers for key sections.
6. **Mobile Recomposition Pass**: when mobile is in scope and the source is PC/desktop-first, recompose sections by type and content density instead of mechanically stacking desktop grids.
7. **Fidelity Loop**: compare source vs implementation by section; fix the largest 1-3 gaps per pass.
8. **Mobile Acceptance Pass**: check no horizontal overflow, mobile scroll rhythm, touch usability, non-mechanical repeated grids, and accepted deviations for 390/414/768 or relevant project viewports.
9. **Font Fidelity Pass**: when typography is in scope, inventory font roles, choose exact/free substitute/project-stack/asset/css/deviation decisions, consolidate, self-host project font files, and record manifest/debt.
10. **Handoff**: report page maturity, mobile mode, font mode, evidence, debt, and deviations.

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


## PlanToDelivery Project-State Collaboration

When routed by `PlanToDelivery`, consume the active task from `project-state/execution-progress.json` and required inputs from `project-state/artifact-manifest.json`. `routing.input_artifact_refs` and manifest paths outrank prose summaries.

Implementation inputs should normally include approved design artifacts and any technical blueprint artifacts:
- `implementation_blueprint`, `page_matrix`, `component_blueprint`, `visual_ir`, and design debt
- `technical_decisions`, `feature_recipes`, `verification_matrix`, API/state/mock plans when referenced

Produce implementation artifacts, usually under `project-state/implementation/` or project-approved paths:
- code changes in the application source tree
- `parity-report.md`
- `screenshot-evidence/*` when visual parity is claimed
- `accepted-deviations.json`
- `implementation-handoff.md`

Return compact suggestions to `PlanToDelivery`:
- `suggested_manifest_entries` for parity reports, screenshots, accepted deviations, and implementation handoff
- `suggested_progress_updates` for task state, verification state, and remaining debt
- evidence entries for commands, files, browser checks, screenshots, commits, or notes
- blockers when approved design sources are missing/stale, technical assumptions are wrong, auth/API access is unavailable, or required assets are not available

Do not pass global gates yourself. Do not claim design parity from DOM/text smoke alone. If the approved design source is missing, stale, or conflicts with requirements, recommend routing back to `idea-to-design`; if the technical plan is wrong or incomplete, recommend routing back to `IdeaToTech`.

## Required Output Evidence

For each meaningful checkpoint, report:
- route/page coverage
- maturity level: L0 route-ready, L1 skeleton, L2 content, L3 system-styled, L4 core-fidelity, L5 functional
- section parity: PASS/WARN/FAIL for major sections when fidelity is claimed
- largest remaining visual gaps and whether they are debt or accepted deviation
- verification actually run; do not claim checks that were skipped

When mobile work is in scope, also report:
- mobile mode: `responsive-basic`, `mobile-recomposition`, `mobile-strict`, or `mobile-repair`;
- viewports checked, usually 390/414/768 plus 320 when narrow overflow risk exists;
- section mobile results: PASS/WARN/FAIL for hero, grids, cards, CTA, forms, or other major sections;
- grid decisions such as "8 feature cards -> 2-column compact grid" or "6 case cards -> horizontal scroller";
- accepted mobile deviations such as decorative layer removed, description line-clamped, or secondary tags folded;
- remaining mobile debt and evidence paths/screenshots.

When font work is in scope, also report:
- font mode: `font-basic`, `font-fidelity`, `font-strict`, or `font-pipeline`;
- font system status: provisional, active, or locked;
- role slots and font decision table or manifest path;
- chosen implementation per role: exact-self-hosted, substitute-self-hosted, project-stack, asset-rendered, css-feature, or deviation;
- font file paths, sizes, weights/styles, `font-display`, preload strategy, and fallback stack;
- budget result, open questions for future pages, accepted font deviations, and remaining font debt.


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
- `references/mobile-recomposition.md` — required when desktop/PC-only source must produce good mobile output, mobile feels mechanical/too long, repeated grids collapse to one column, or `mobile-strict` Mobile IR is needed
- `references/font-fidelity.md` — required when a design source has multiple fonts, typography is a parity concern, source fonts are commercial/unknown, homepage-first typography must govern later pages, CJK fonts are involved, or subsetting/budget decisions are needed
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
| IR only names sections | Add section layout ratios, media role/aspect, crop strategy, text safe area, screenshot targets |
| Using one generated atlas as many CSS backgrounds | Crop atlas into independent files and reference cropped assets only |
| Hero/banner mixed into thumbnail atlas | Generate hero/CTA as independent assets with final safe areas |
| Treating PC fidelity as fixed mobile coordinates | Preserve intent and hierarchy, but run Mobile Recomposition Pass for desktop-only sources |
| Converting every desktop repeated grid to one-column mobile | Classify item density; use 2-column compact grids, 2-3 column stats/logos, horizontal scrollers, grouping, or show-more where appropriate |
| Stacking all desktop content until mobile becomes too long | Preserve critical content; summarize, fold, or re-express secondary content with accepted deviations |
| Checking only for no horizontal overflow | Also verify scroll rhythm, touch usability, CTA visibility, and non-mechanical grid density |
| Letting decorative desktop layers dominate mobile first screen | Reduce or re-express decorative layers so headline, CTA, and trust signals stay prominent |
| Turning every design-source font into a production webfont | Run Font Consolidation Pass; preserve critical roles and map low-priority typography to project stack |
| Using commercial or unknown-license fonts without files/authorization | Use close free/open-source substitutes and record the deviation |
| Writing `font-family` names without self-hosted project files | Add authorized/free font files to the project or use project-stack explicitly |
| Loading full CJK font packages by default | Use system/project CJK fallback, subset, or record waiver |
| Treating homepage typography as final site-wide typography before other pages exist | Create Font System v0.1 with provisional role slots and open questions |
| Letting every later page add new fonts freely | Use Font Governance Gate and classify new fonts as existing slot, page-specific, substitute, or rejected |
| Genericizing logo/display typography | Check brand assets first and preserve display mood with role-weighted substitute matching |
| Omitting font substitute/deviation notes | Record exact/substitute/project-stack/asset/css/deviation in the font manifest or handoff |
