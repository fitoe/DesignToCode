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
- `Pre-Implementation Brief` is confirmed when confirmation is required

If any item is missing, block code generation and ask for the missing artifact or approval.
When a critical image asset is missing, do not improvise a messy page. Plan the asset source first: existing/crop, CSS/SVG substitute, single generation, atlas generation, or formal fallback.

## Output Gate
Before handoff, provide:
- code changes
- mapped source design path
- section anchors when applicable
- verification evidence or a clear reason verification could not run
- mismatch and repair notes when visual diff was used

When orchestrated, these may be summarized in an implementation handoff manifest.

## Keep It Light
The main skill should stay short. Use references for the details.

Minimal enhancement set:
- extract visual anchors first: headline, main visual, CTA, boundaries, spacing rhythm
- build in two layers: skeleton first, details second
- state relative position constraints explicitly: above / below / left / right / aligned / centered / fixed gap
- judge output with four layers: structure, proportion, style, detail
- after diff, repair only the top 1-3 mismatches first

Core loop:
1. inspect the project
2. choose the input mode
3. write a brief
4. wait for confirmation
5. generate code
6. verify with Playwright section diffs

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

### 2) Pick an input mode
Choose one:
- `image-only mode`
- `metadata-assisted mode`
- `figma-direct mode`
- `figma-assisted mode`

Name the mode in the brief.

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
- [references/media-role-classification.md](references/media-role-classification.md)
- [references/asset-fulfillment-pipeline.md](references/asset-fulfillment-pipeline.md)
- [references/asset-atlas-generation.md](references/asset-atlas-generation.md)
- [references/pre-implementation-brief.md](references/pre-implementation-brief.md)
- [references/vue-astro-unocss-output-rules.md](references/vue-astro-unocss-output-rules.md)
- [references/playwright-section-diff.md](references/playwright-section-diff.md)
- [references/failure-handling.md](references/failure-handling.md)
- [references/visual-checklist.md](references/visual-checklist.md)
- [references/examples.md](references/examples.md)
