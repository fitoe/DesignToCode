---
name: design-to-code
description: Convert segmented design images into high-fidelity UnoCSS page code for the current project stack, resolving Vue vs Astro from the repo, requiring a pre-implementation brief before code generation, and verifying output with Playwright section screenshot diffs.
license: MIT
---

# DesignToCode

## Purpose
Use this skill when the user wants image-based design sections turned into production-style page code with UnoCSS.

## Standalone Rule
This skill is standalone by default. It accepts approved design inputs from any source, including direct screenshots, Figma context, section images, or equivalent briefs. `PlanToDelivery` may route work into this skill, but `PlanToDelivery` is not required.

## Input Gate
Before code generation, verify:
- approved persisted design source exists
- target framework is resolved
- page or section target is clear
- required assets are available, or an `Asset Fulfillment Plan` is confirmed
- high-fidelity work has page/section crops or equivalent processed inputs
- `Pre-Implementation Brief` exists and is confirmed when confirmation is required
- the brief declares visual source mode as `binding` or `directional`; default approved UI mockups are `binding` unless the user explicitly chose directional-only implementation
- binding sources include visual-parity constraints: layout order, major proportions, card anatomy, color blocks, navigation labels/count, first-screen composition, spacing rhythm, and action hierarchy

If any item is missing, block code generation and ask for the missing artifact or approval.
When a critical image asset is missing, do not improvise a messy page. Plan the asset source first: existing/crop, CSS/SVG substitute, single generation, atlas generation, or formal fallback.

## Output Gate
Before handoff, provide:
- code changes
- mapped source design path
- section anchors when applicable
- verification evidence or a clear reason verification could not run
- layered parity notes: structure, proportion, style, detail
- screenshot-to-source comparison for binding visual sources
- mismatch and repair notes when visual diff was used

When orchestrated, these may be summarized in an implementation handoff manifest.

For binding sources, do not accept "required regions exist" as success. The report must compare the implementation screenshot against the approved source on layout order, major proportions, card anatomy, color blocks, navigation labels/count, first-screen visible content, spacing rhythm, and primary/secondary action hierarchy.

## Keep It Light
The main skill should stay short. Use references for the details.

Minimal enhancement set:
- extract visual anchors first: headline, main visual, CTA, boundaries, spacing rhythm
- for approved UI mockups, extract binding visual anchors before code: screen order, dominant card shapes, first-screen composition, navigation labels/count, color blocks, density, and action hierarchy
- build in two layers: skeleton first, details second
- state relative position constraints explicitly: above / below / left / right / aligned / centered / fixed gap
- judge output with four layers: structure, proportion, style, detail
- after diff, repair only the top 1-3 mismatches first

Core loop:
1. inspect the project
2. choose the input mode and fidelity mode
3. prepare or verify page/section inputs
4. write a brief
5. wait for confirmation when required
6. generate code
7. verify with Playwright section diffs
8. for binding visual sources, capture the implemented page screenshot and compare it directly to the approved source before accepting the checkpoint
9. run at least one repair loop for high-fidelity mode

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
- reusable components/tokens worth keeping

### 2) Pick an input mode and fidelity mode
Choose one input mode:
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

### 7) Generate code
After confirmation:
- Vue repo -> Vue page/component
- Astro repo -> Astro page/component

Rules:
- UnoCSS first
- use local assets only
- reference final independent asset files, not atlas source images
- keep scoped CSS minimal
- use `data-section="..."` anchors on major sections
- reuse existing tokens/components when they fit
- avoid unnecessary abstractions

### 8) Verify and repair
Use Playwright section screenshot diffs.
If it fails, repair only the biggest mismatch first.
Do not rewrite the whole page unless the error is structural.
In high-fidelity mode, produce layered parity notes and run at least one repair loop unless blocked or waived.
For binding visual sources, verification must include a direct screenshot-to-source comparison. If the implementation changes the source layout, navigation count/labels, first-screen composition, dominant card anatomy, or major color blocks without a recorded accepted deviation, stop and repair instead of committing.

## What to Pay Attention To
- structure and proportions before decoration
- typography and spacing before tiny polish
- section boundaries and shell/container split
- background vs content-image role
- asset provenance and whether a crop fallback is needed
- whether missing assets need fulfillment before code

## Stop Conditions
Stop and ask when:
- framework is unclear
- width is unclear
- critical text is missing
- a key media role is ambiguous
- a required asset is unavailable
- a critical missing image has no confirmed fulfillment strategy
- the user has not confirmed the brief

## References
Load details only when needed:
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
