---
name: design-to-code
description: Convert approved implementation blueprints or segmented design inputs into UnoCSS page code for the current Vue/Astro project stack, prioritizing blueprint-driven foundation, full page coverage, staged refinement, and targeted visual fidelity verification.
license: MIT
---

# DesignToCode

## Purpose
Use this skill when the user wants an approved implementation blueprint, visual contract package, screenshots, cropped sections, or Figma-derived context turned into production-style Vue/Astro page code with UnoCSS.

Default to blueprint-driven implementation when `implementation-blueprint.json` exists. Treat images and page briefs as traceability inputs during Foundation/Coverage, but treat approved mockup images, persisted crops, and Visual IR files as binding visual-anatomy sources during Fidelity Pass, section repair, or any user-reported parity problem. Prefer structured Visual IR over prose whenever both exist.

When `technical-decisions.json`, `feature-recipes.json`, or `verification-matrix.json` exist, treat them as the source of truth for dependencies, services, stores, composables, API seams, mock-to-real transitions, and functional verification.

## Standalone Rule
This skill is standalone by default. It accepts approved design inputs from any source, including direct screenshots, Figma context, section images, or equivalent briefs. `PlanToDelivery` may route work into this skill, but `PlanToDelivery` is not required.

Ownership boundary: after a visual source is approved and the preparation owner has completed Visual Freeze, Post-Visual Extraction, and an implementation-ready handoff package or equivalent binding inputs, `design-to-code` owns implementation, visual extraction-for-code, fidelity repair, screenshot-to-source verification, and deviation reporting. Do not route routine implementation back to `idea-to-design` just to re-explain an approved mockup; only route back when the approved source is missing/stale, the handoff package predates approval, product scope changed, or a design change/new visual source is required.

## Default Blueprint-driven Workflow

When `implementation-blueprint.json` exists and the implementation gate is open or user-waived, use it as the execution source of truth for scope, routes, pass order, and file refs. Do not re-analyze every design image during Foundation/Coverage. During Fidelity Pass, section repair, or any user-reported parity problem, reopen the bound mockup/crop and compare the implementation against Visual IR and image-derived anatomy instead of relying on brief text alone.

Run implementation like a frontend engineer, from broad coverage to detail:

1. `blueprint-intake`: read `implementation-blueprint.json`, then current-scope technical files (`technical-decisions.json`, `feature-recipes.json`, `verification-matrix.json`) when present, then only files listed for the current pass.
2. `foundation-pass`: implement global tokens, app shell, layout containers, navigation shell, and foundation components.
3. `coverage-pass`: create every route/page, fill approved section order, realistic content/mock data, and visible states across the whole surface.
4. `refinement-pass`: extract repeated components after patterns appear 2-3 times, normalize content/assets/fallbacks, and close medium debt.
5. `fidelity-pass`: compare and repair only core pages, first screens, key components, or user-requested high-fidelity regions.
6. `handoff`: report page maturity, global system status, core first-screen fidelity, verification, and debt.

Target: use roughly 20% of effort to complete 80% of visible coverage, then invest fidelity work where it changes user perception most.

Use trust-first, checkpoint-based verification during implementation. Do not run full lint, full type-check, full build, or broad regression after every small edit. Preserve coding flow during Foundation, Coverage, and Refinement passes; verify at pass completion, core fidelity checkpoints, handoff, merge readiness, or when a high-risk foundation changes.

High-risk foundation changes that justify earlier verification:
- dependency manifests or lockfiles
- build, bundler, lint, test, or TypeScript configuration
- shared types, public APIs, routing foundations, or cross-module contracts
- auth, permissions, payment, security, privacy, data mutation, schema, migration, or persistence code
- broad refactors with cross-module blast radius

Use page maturity levels:
- `L0 route-ready`: route/page exists and is reachable.
- `L1 skeleton-ready`: major sections exist in approved order.
- `L2 content-ready`: realistic content/mock data fills sections.
- `L3 system-styled`: global tokens/components/layout rules applied consistently.
- `L4 core-fidelity`: priority first screen or core region matches binding source within accepted deviations.
- `L5 functional-ready`: real interactions/API/state for the current implementation scope work.

## Input Gate
Before code generation, verify:
- when `implementation-blueprint.json` exists: blueprint mode is `blueprint-driven`, routes/pages are listed, current pass is clear, page matrix exists, component blueprint exists, and debt ledger exists
- if Visual IR files exist, they are the primary implementation constraint for page type, section order, normalized section bounds, first-screen density, card/list anatomy, action hierarchy, must-not-do rules, and section anchors; prose briefs explain intent but do not override Visual IR
- blueprint must be post-visual: `visual_freeze_ref.status = "approved"`, `visual_freeze_ref.post_visual_extraction_status = "complete"`, and the blueprint source version matches the approved visual source version when state/contract metadata is available
- if the blueprint was generated before visual freeze, lacks `visual_freeze_ref`, or conflicts with approved image metadata, stop and route back to `idea-to-design` for Post-Visual Extraction refresh; do not reconcile stale text and images inside `design-to-code`
- if current-scope technical blueprint files exist, dependency choices, feature recipes, mock-to-real seams, and verification expectations are followed; do not pick competing libraries or state architecture during coding unless the technical plan is blocked or user-waived
- if approved image and blueprint disagree on visual style, component anatomy, or layout proportions, treat the blueprint as stale unless the difference is recorded as an accepted deviation
- if no blueprint exists, approved persisted design source exists
- target framework is resolved
- page or section target is clear
- required assets are available, or an `Asset Fulfillment Plan` is confirmed
- high-fidelity work has page/section crops or equivalent processed inputs
- `Pre-Implementation Brief` exists and is confirmed when confirmation is required
- the brief declares visual source mode as `binding` or `directional`; default approved UI mockups are `binding` unless the user explicitly chose directional-only implementation
- binding sources include visual-parity constraints: layout order, major proportions, card anatomy, color blocks, navigation labels/count, first-screen composition, spacing rhythm, and action hierarchy
- binding briefs include a Non-negotiables / Must Not Do list before code generation
- if a visual contract exists, obey its drift budget, reference viewport, project constraints, accepted deviations, and parity waiver fields

If any item is missing, block code generation and ask for the missing artifact or approval.
When a critical image asset is missing, do not improvise a messy page. Plan the asset source first: existing/crop, CSS/SVG substitute, single generation, atlas generation, or formal fallback.

## Output Gate
Before handoff, provide:
- code changes
- mapped blueprint/design source path
- page maturity matrix summary: routes, skeleton, content, system-styled, core-fidelity, functional-ready
- global foundation status: tokens, shell, base components, layout rules
- section anchors when applicable
- verification evidence or a clear reason verification could not run
- layered parity notes: coverage, system consistency, targeted fidelity
- screenshot-to-source comparison for binding visual sources only where fidelity verification is required
- mismatch, debt, accepted deviation, and repair notes when visual diff was used

When orchestrated, these may be summarized in an implementation handoff manifest.

Verification evidence may be layered by pass. Before final handoff, report which checks were intentionally deferred during active coding, which stage-gate checks were run, and whether any failures are current-scope blockers, baseline debt, environment issues, third-party issues, or deferred work.

For binding sources under fidelity verification, do not accept "required regions exist" as success. The report must compare the implemented priority surface against the approved source on layout order, major proportions, card anatomy, color blocks, navigation labels/count, first-screen visible content, spacing rhythm, and primary/secondary action hierarchy.

For non-core pages or passes before fidelity, success means coverage and system consistency: route exists, approved section order is present, content is realistic or mock-labeled, global tokens/components are used, and any missing asset/detail is recorded in the debt ledger.

If screenshot comparison is explicitly waived by the user, report the waiver and still verify all non-negotiables that can be checked from code and local build output. A screenshot waiver is not permission to change layout, navigation, module order, dominant cards, or major color blocks.

## Keep It Light
The main skill should stay short. Use references for the details.

Minimal enhancement set:
- prefer `implementation-blueprint.json` over repeated image interpretation
- implement global design system first: tokens, shell, containers, base components, navigation, page backgrounds
- sweep horizontally across all pages: routes -> skeleton -> content -> system styling -> core fidelity
- extract components after repetition appears; do not let architecture polish block visible coverage
- use page maturity levels and debt ledger instead of binary complete/incomplete claims
- use asset fallback levels: A source required, B crop/reuse allowed, C CSS/SVG/gradient allowed, D placeholder allowed with debt
- use targeted visual anchors for fidelity: headline, main visual, CTA, boundaries, spacing rhythm
- use Visual IR when available to avoid prose-only implementation: page type, section order, section bbox, first-screen density, card/list anatomy, action hierarchy, must-not-do rules, and section anchors
- for approved UI mockups, preserve binding anchors: screen order, dominant card shapes, first-screen composition, navigation labels/count, color blocks, density, and action hierarchy
- write explicit Non-negotiables only for core fidelity surfaces or when no blueprint exists
- use the visual contract drift budget when present; treat layout, module order, and navigation drift as zero-budget unless the contract says otherwise
- use a fixed reference viewport for implementation and verification when provided, such as 390x844 for mobile H5
- judge output with three layers: coverage, system consistency, targeted fidelity
- after diff, repair only the top 1-3 mismatches first

Core loop:
1. inspect the project essentials and locate blueprint/handoff files
2. if `implementation-blueprint.json` exists, use blueprint-driven workflow and do not regenerate briefs or re-analyze images
3. if no blueprint exists, choose the input mode and fidelity mode, then prepare/verify page or section inputs
4. run Foundation Pass before page detail: tokens, app shell, layout, foundation components
5. run Coverage Pass across all pages/routes to reach the target maturity as broadly as possible
6. run Refinement Pass for component extraction, content normalization, asset fallback cleanup, and debt closure
7. run Fidelity Pass only for core pages, first screens, key components, or explicit high-fidelity targets
8. verify by layer: coverage check, system check, targeted fidelity check
9. update page matrix/debt ledger or report the equivalent state before handoff
10. for high-fidelity targets, run at least one repair loop unless blocked or waived

If the task is mostly about design style, structure, or assets, keep the reasoning in the brief instead of expanding the main skill.

## Visual IR and Section Diff Loop

Do not depend on prose precision when structured visual data can be produced. Prefer this chain for binding PNG/mockup workflows:

`approved mockup/crop -> Visual IR -> implementation mapping -> code with section anchors -> Playwright section screenshots -> parity report -> targeted repair`.

Visual IR is a compact, machine-readable design intermediate representation. Keep v1 small and high-signal; it should prevent the common failures, not describe every pixel. Recommended fields:
- `page_id`, `route`, `viewport`, `page_type`, and visual source refs
- ordered `sections` with `name`, `bbox` or normalized bounds, expected anatomy, visible labels/counts, dominant color/card shape, and first-screen density
- `section_anchors`: required `data-section` names that implementation must emit
- `must_not_do`: concrete drift rules such as “do not replace list with dashboard” or “do not show empty state for populated mockup”
- `asset_strategy`: A source/crop required, B SVG/vector, C CSS/gradient, D icon-library substitute, E optional/deferred

Implementation rules:
- read Visual IR before prose briefs when both exist
- add stable `data-section="..."` anchors for each major section in implemented pages/components
- if a section from Visual IR cannot be represented, record a visual debt or accepted deviation before claiming parity
- use native screenshots/DOM only to support the diff loop; they do not replace the bound visual source

Verification rules:
- capture full viewport and the 2-5 most important `data-section` screenshots for core/fidelity pages
- compare section order, normalized top/height/margins, first-screen density, card/list anatomy, color blocks, and action hierarchy
- report PASS/WARN/FAIL per page and per major section
- after a FAIL, repair only the biggest 1-3 mismatches first instead of rewriting the whole page

## Binding Section Parity Guard

For binding mockups, brief text is not the visual source of truth. The source hierarchy is: user-approved mockup/crop > page visual contract/section contract > page brief > existing implementation > DOM text/unit/smoke tests. Lower levels cannot justify drift from higher levels.

Before coding or claiming `L4 core-fidelity` for a high-fidelity page/section, extract or read a section-level contract for each priority region:
- section name and source image/crop path
- exact layout pattern such as 4-row list, 2x4 grid, hero + metrics, bottom action bar
- required counts, labels, row/card order, and visible first-screen content
- dominant card anatomy, color blocks, density, spacing rhythm, icon/image role, and action hierarchy
- allowed approximations and accepted deviations
- forbidden substitutions, especially replacing bespoke mockup anatomy with a generic card/list/dashboard component

Generic component drift guard: reuse existing shell/card/list/button primitives only when they preserve the approved section anatomy. If a generic component changes padding, title treatment, grid density, icon style, row count, dominant color block, or action hierarchy, build the first fidelity pass as a bespoke page-local section. Extract components only after visual parity is accepted and extraction does not change structure or spacing.

Icon and interactive primitive guard: for icon-bearing UI, first inspect the target project's existing icon system and dependencies, such as Iconify/UnoCSS `presetIcons`, `i-mdi-*`, `i-carbon-*`, component-library icons, or local icon assets. Use semantically matched icons from that existing system instead of CSS-drawn pseudo-icons, text glyphs, emoji, Chinese-character placeholders, or improvised shapes. Only create CSS/SVG icons when the project has no usable icon source or the visual contract explicitly requires a custom mark, and record that as an asset fallback.

Do not use native `<button>` elements for visual cards, KPI tiles, module-grid cells, or dashboard entry cards unless the approved design shows button behavior or the platform requires it. In uni-app/H5, native button defaults can change width, margin, border, padding, line-height, and pseudo-element borders, causing parity drift. Prefer the project's card/link/navigation primitive or a clickable `view`/router element that preserves the visual anatomy.

UnoCSS/Iconify static-discovery rule: icon utility classes must be statically discoverable by the build. Do not rely on dynamic concatenation like ``:class="`i-mdi-${name}`"`` unless the full `i-mdi-*` classes also appear as literals or are safelisted. Prefer storing complete class names such as `i-mdi-server-network` in data, or add a safelist, then verify the icon visibly renders in dev.

Evidence rule: text presence, route reachability, unit tests, smoke tests, or DOM audits are functional/coverage evidence, not visual-parity evidence. A parity PASS needs screenshot-to-source or section-by-section mismatch notes against the approved mockup/crop.

User correction trigger: when the user says a page is not like the design, has low fidelity, shows no visible change, or differs greatly from the mockup, stop normal implementation. First verify dev freshness and viewport, reopen the bound mockup/crop, identify the top 1-3 section mismatches, explain the root cause without defending the current code, then repair those mismatches before continuing. Do not use "brief matches", "text exists", or "tests pass" as a rebuttal to visual feedback.

Section-first repair loop: for L4/high-fidelity regions, do not jump directly from crop to Vue/CSS. First write a short implementation mapping for the target section: visual anchor -> DOM structure -> CSS/asset strategy. Repair one section at a time and keep a mismatch note with source observation, current deviation, and repair action. If the user says the same section is still unlike the source, update the mapping before editing more code.

Asset strategy guard: complex GPT Image 2 decorations are not automatically CSS tasks. Before implementing a visually rich section, classify each visual element as: A source/crop asset required, B SVG/local vector, C CSS/gradient feasible, D Iconify/library icon, or E optional/deferred. Use CSS for geometry, rings, glass panels, grids, and light glows; prefer crop/SVG/asset for complex 3D, illustration, device, character, or photorealistic elements. Record visible deviations instead of silently replacing an asset-required element with generic div art.

## Multi-page Design Parity Guard

Route coverage is not design parity. Creating a route, showing realistic content, or passing smoke tests does not permit changing the approved page type.

When implementing multiple pages from binding visual sources:
- bind every route to its `page_id`, visual source, crop/brief/contract, and expected page type before claiming design compliance
- preserve page type at every maturity level: a list mockup remains a list, a detail mockup renders a populated detail state, a form mockup remains a form, and a placeholder mockup remains a placeholder
- do not reuse a workbench/dashboard template to replace list, detail, form, approval, editor, or placeholder anatomy unless an accepted deviation or refreshed visual contract explicitly allows it
- do not use empty, not-found, fallback, or demo-only states as proof that a populated binding mockup was implemented; record them as blocked, debt, or FAIL until the populated state renders
- do not expose debug/version/fallback/demo badges in a visual parity surface unless the approved source or accepted deviation includes them
- if implementation upgrades product state, such as turning a placeholder into an active demo dashboard, stop the fidelity claim and record a design change request, accepted deviation, or route back to `idea-to-design` for a refreshed visual source
- checkpoint parity with screenshot-to-source PASS/WARN/FAIL per page; smoke/navigation success only proves reachability, not fidelity

For broad Coverage Pass, pages may be L1/L2 and not pixel-perfect, but their primary anatomy, module order, dominant cards, action hierarchy, and density must still follow the bound source. If a page intentionally uses a common dashboard shell, the visual contract must say so.

## Use When
- user provides screenshots, cropped sections, or Figma-derived context
- target output is Vue or Astro page code
- fidelity to the reference matters
- a verification pass is expected

## Do Not Use When
- the user only wants inspiration or pseudo-code
- the task is backend/routing/data work
- the framework target is unrelated to the current repo

## Input Priority
Prefer stronger input first:
1. Figma node / frame
2. explicit metadata / layer map
3. full-page screenshot
4. ordered section screenshots
5. cropped fragments

If input quality is weak, state the limits clearly and keep assumptions explicit.

## Lightweight Workflow
### 1) Inspect the project
Resolve only the essentials:
- framework: Vue or Astro
- page/container width
- reference viewport for visual parity when supplied
- reusable components/tokens worth keeping, but only if they do not change the approved visual structure

### 2) Pick an input mode and fidelity mode
If `implementation-blueprint.json` exists, input mode is `blueprint-driven mode` and fidelity is controlled by each page's maturity target and verification policy. Do not ask the user to reconfirm the brief unless the blueprint is missing, contradictory, or user-waived.

Fallback input modes when no blueprint exists:
- `image-only mode`
- `metadata-assisted mode`
- `figma-direct mode`
- `figma-assisted mode`

Choose one fidelity mode:
- `structural`: section anatomy only
- `balanced`: structure + proportion + basic style
- `high-fidelity`: structure + proportion + style + key details, with repair loop

Name both modes in the brief.

### 3) Make a short reuse map
Before code, map the page to existing primitives:
- section -> shell / wrapper / component / token
- mark any bespoke part explicitly
- if several mappings are plausible, note the ambiguity instead of guessing

Do not let existing component libraries override an approved mockup. For strong visual pages, first reproduce the approved layout even if the initial implementation is a single-file or repetitive. Extract reusable components only after visual parity is accepted, and only if the extraction does not change structure, spacing, or hierarchy.

### 4) Classify media
For each important visual, decide:
- `background`
- `content image`

Use the media-role reference. If a critical media role is ambiguous, stop and ask.

### 5) Plan missing assets
If required images are missing, include an `Asset Fulfillment Plan` in the brief.
Use atlas generation only for 2-8 same-family bitmap assets; keep hero, product, people, icon, and CSS-reproducible visuals out of atlas.

### 6) Emit a concise Pre-Implementation Brief
Use the required brief format. Keep each section short and actionable.
No code before the user confirms the brief.

For approved UI mockups, the brief must explicitly state `visual_source_mode: binding` unless the user explicitly chose directional-only implementation. Binding briefs must list the visual anchors that code must preserve; do not reduce them to generic required regions.

Binding briefs must include:
- Non-negotiables: source layout, navigation count/labels, module order, dominant cards, and major color blocks that must match
- Must Not Do: concrete drift examples such as changing a 2x2 grid into a list, adding an extra tab, or replacing a gradient hero card with white metric tiles
- Drift Budget: default layout/module order/navigation `0%`; copy, spacing, and icons may vary only within the recorded budget
- Accepted Deviations: route, component, or asset constraints already approved before coding
- Reference Viewport: fixed viewport used for implementation and verification when available

### 7) Generate code
After confirmation:
- Vue repo -> Vue page/component
- Astro repo -> Astro page/component

Rules:
- UnoCSS first
- global design system first; do not start by polishing a single page when multiple routes are in scope
- create all planned route/page shells before deep detail unless a route is blocked
- use local assets only
- reference final independent asset files, not atlas source images
- use fallback asset levels from the blueprint; record D-level placeholders in debt ledger and continue
- keep scoped CSS minimal unless fidelity requires page-local detail
- use `data-section="..."` anchors on major sections
- reuse existing tokens/components when they fit and do not alter the approved source structure
- avoid unnecessary abstractions
- allow first-pass repetition for speed; extract reusable components in Refinement Pass after patterns repeat
- for first-pass high-fidelity reproduction, prefer straightforward code over premature component extraction; refactor only after the visual match is accepted

### 8) Verify and repair
Verify by layer:
- Coverage Check: all planned routes/pages exist, major sections exist in approved order, page matrix maturity is updated.
- System Check: global tokens, shell, base components, layout rhythm, and platform constraints are consistently applied.
- Fidelity Check: run Playwright screenshot comparison only for core pages, first screens, key components, or explicit high-fidelity targets.

Verification timing:
- active editing: default to no command-driven verification unless a concrete failure signal appears
- Foundation/Coverage/Refinement pass completion: run focused checks for touched or impacted routes/components
- Fidelity pass: run targeted screenshot/parity checks only for core pages, first screens, key components, or requested high-fidelity regions
- handoff, merge readiness, or release readiness: run full lint, full type-check, full build, and required regression unless explicitly waived with recorded risk

Treat full lint, full type-check, full build, broad regression, and broad E2E as stage-gate checks. If a stage-gate check fails, classify it before fixing:
- blocker: caused by current scope and prevents the current pass or handoff goal
- baseline: pre-existing or unrelated project debt
- environment: local setup, network, tool, or third-party issue
- third-party: external package, service, or upstream type issue outside the current scope
- deferred: real issue outside the current pass goal

If a fidelity check fails, repair only the biggest mismatch first.
Do not rewrite the whole page unless the error is structural.
In high-fidelity targets, produce layered parity notes and run at least one repair loop unless blocked or waived.
For binding visual sources in Fidelity Pass, verification must include a direct screenshot-to-source comparison unless explicitly waived. If the implementation changes the source layout, navigation count/labels, first-screen composition, dominant card anatomy, or major color blocks without a recorded accepted deviation, stop and repair instead of committing.

When screenshot comparison is waived, explicitly state that waiver and verify from code/build artifacts that Non-negotiables still hold: expected modules exist, forbidden modules/names do not appear, navigation count/labels match the accepted plan, and route/component deviations are recorded.

## What to Pay Attention To
- structure and proportions before decoration
- typography and spacing before tiny polish
- section boundaries and shell/container split
- background vs content-image role
- asset provenance and whether a crop fallback is needed
- whether missing assets need fulfillment before code

## Stop Conditions
Stop and ask when:
- blueprint is missing or contradictory for required routes/pages
- blueprint lacks approved visual freeze metadata, predates visual approval, or was not refreshed by Post-Visual Extraction
- framework is unclear
- width/reference viewport is unclear and no safe project default exists
- core visual direction conflicts with implementation constraints
- main navigation or core flow cannot be inferred
- critical text for a core first screen is missing
- a key media role is ambiguous for an A-level asset
- an A-level required asset is unavailable and no acceptable fallback is recorded
- the user explicitly requires pixel-level parity for the current surface
- the change affects real data, permissions, payments, deletion, or production safety
- the user has not confirmed the brief when no approved blueprint/gate exists

Do not stop for routine choices: minor icons, small spacing uncertainty, non-core image fallback, normal mock data, copy fill, component extraction timing, or ordinary page order. Use blueprint defaults, record debt, and continue.

## References
Load details only when needed:
- [references/blueprint-driven-implementation.md](references/blueprint-driven-implementation.md)
- [references/prompt-shape.md](references/prompt-shape.md)
- [references/framework-resolution.md](references/framework-resolution.md)
- [references/width-normalization.md](references/width-normalization.md)
- [references/visual-measurements.md](references/visual-measurements.md)
- [references/high-fidelity-mode.md](references/high-fidelity-mode.md)
- [references/media-role-classification.md](references/media-role-classification.md)
- [references/asset-fulfillment-pipeline.md](references/asset-fulfillment-pipeline.md)
- [references/asset-atlas-generation.md](references/asset-atlas-generation.md)
- [references/pre-implementation-brief.md](references/pre-implementation-brief.md)
- [references/vue-astro-unocss-output-rules.md](references/vue-astro-unocss-output-rules.md)
- [references/playwright-section-diff.md](references/playwright-section-diff.md)
- [references/parity-report.md](references/parity-report.md)
- [references/failure-handling.md](references/failure-handling.md)
- [references/visual-checklist.md](references/visual-checklist.md)
- [references/examples.md](references/examples.md)
