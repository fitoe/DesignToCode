---
name: design-to-code
description: Convert approved implementation blueprints or segmented design inputs into UnoCSS page code for the current Vue/Astro project stack, prioritizing blueprint-driven foundation, full page coverage, staged refinement, and targeted visual fidelity verification.
license: MIT
---

# DesignToCode

## Purpose
Use this skill when the user wants an approved implementation blueprint, visual contract package, screenshots, cropped sections, or Figma-derived context turned into production-style Vue/Astro page code with UnoCSS.

Default to blueprint-driven implementation when `implementation-blueprint.json` exists. Treat images and page briefs as traceability inputs for targeted fidelity work, not as the default reasoning source for every page.

## Standalone Rule
This skill is standalone by default. It accepts approved design inputs from any source, including direct screenshots, Figma context, section images, or equivalent briefs. `PlanToDelivery` may route work into this skill, but `PlanToDelivery` is not required.

## Default Blueprint-driven Workflow

When `implementation-blueprint.json` exists and the implementation gate is open or user-waived, use it as the execution source of truth. Do not re-analyze design images, rewrite page briefs, or ask for routine confirmations.

Run implementation like a frontend engineer, from broad coverage to detail:

1. `blueprint-intake`: read `implementation-blueprint.json`, then only files listed for the current pass.
2. `foundation-pass`: implement global tokens, app shell, layout containers, navigation shell, and foundation components.
3. `coverage-pass`: create every route/page, fill approved section order, realistic content/mock data, and visible states across the whole surface.
4. `refinement-pass`: extract repeated components after patterns appear 2-3 times, normalize content/assets/fallbacks, and close medium debt.
5. `fidelity-pass`: compare and repair only core pages, first screens, key components, or user-requested high-fidelity regions.
6. `handoff`: report page maturity, global system status, core first-screen fidelity, verification, and debt.

Target: use roughly 20% of effort to complete 80% of visible coverage, then invest fidelity work where it changes user perception most.

Use page maturity levels:
- `L0 route-ready`: route/page exists and is reachable.
- `L1 skeleton-ready`: major sections exist in approved order.
- `L2 content-ready`: realistic content/mock data fills sections.
- `L3 system-styled`: global tokens/components/layout rules applied consistently.
- `L4 core-fidelity`: priority first screen or core region matches binding source within accepted deviations.
- `L5 functional-ready`: real interactions/API/state for the current implementation scope work.

## Input Gate
Before code generation, verify:
- when `implementation-blueprint.json` exists: blueprint mode is `blueprint-driven`, routes/pages are listed, current pass is clear, page matrix exists, component blueprint exists, debt ledger exists, and required current-pass file refs are available
- when no blueprint exists: approved persisted design source exists
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
