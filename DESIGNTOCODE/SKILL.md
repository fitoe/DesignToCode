---
name: design-to-code
description: Convert segmented design images into high-fidelity UnoCSS page code for the current project stack, resolving Vue vs Astro from the repo, requiring a pre-implementation brief before code generation, and verifying output with Playwright section screenshot diffs.
---

# DesignToCode

## Overview

Use this skill when user wants to turn image-based design sections into high-fidelity page code with UnoCSS.

Default behavior:
- inspect current project first
- resolve target framework from repo: Vue or Astro
- normalize section images to target page width before analysis
- classify media as `background` vs `content image`
- emit mandatory `Pre-Implementation Brief`
- wait for user confirmation before writing page code
- verify result with Playwright section screenshot diff

Do not use this skill for:
- Figma-node to code workflows
- generic “make something inspired by this” requests
- framework-agnostic pseudo-code output
- backend, routing, or data-layer generation

## Workflow

### 1. Gather Inputs

Expect ordered section images plus notes. Read [references/prompt-shape.md](references/prompt-shape.md) for input contract.

Resolve content sources in this order:
1. user-provided text
2. existing project text
3. OCR
4. stop and ask if still unclear

### 2. Inspect Project First

Inspect repo before deciding output shape. Read:
- [references/framework-resolution.md](references/framework-resolution.md)
- [references/width-normalization.md](references/width-normalization.md)
- [references/vue-astro-unocss-output-rules.md](references/vue-astro-unocss-output-rules.md)

Resolve, in order:
1. target framework
2. page/container width
3. typography
4. color/tokens
5. existing page/component conventions worth reusing

If framework cannot be resolved from project, stop and ask user to choose Vue or Astro.

### 3. Analyze Before Code

For each section:
- identify likely section type; see [references/section-taxonomy.md](references/section-taxonomy.md)
- identify layout system: `flex`, `grid`, or `overlay/absolute`
- build internal layer stack; see [references/layer-stack-model.md](references/layer-stack-model.md)
- classify visual media; see [references/media-role-classification.md](references/media-role-classification.md)
- detect cross-section continuity; see [references/section-boundary-and-cross-section-rules.md](references/section-boundary-and-cross-section-rules.md)
- identify assets that are original, crop-fallback, CSS-reproducible, or unresolved

Scale each section image to canonical page width before making layout judgments. Do not rely on raw image width if it differs from page width.

### 4. Emit Mandatory Pre-Implementation Brief

Before generating any page code, output a `Pre-Implementation Brief` using [references/pre-implementation-brief.md](references/pre-implementation-brief.md).

Required sections:
- `Page Understanding`
- `Section Breakdown`
- `Media Role Decisions`
- `Layout Implementation Plan`
- `Framework/Output Plan`
- `Known Ambiguities`
- `Verification Plan`

Rules:
- no code generation before user confirms brief
- if critical ambiguity remains, do not proceed
- user corrections override prior inference

### 5. Generate Page Code

After confirmation, generate one page file in project-matching framework:
- Vue project -> Vue page/component
- Astro project -> Astro page/component

Follow [references/vue-astro-unocss-output-rules.md](references/vue-astro-unocss-output-rules.md).

Hard rules:
- UnoCSS first
- minimal scoped style only when utilities are not enough
- use `data-section="..."` anchors for each major section
- content images get semantic `<img>` or `<picture>`
- background visuals become CSS background layers
- preserve minimum accessibility floor
- keep abstractions minimal; only factor repeated structure when same pattern repeats 3 or more times

### 6. Verify

Verify with Playwright section screenshot diff using [references/playwright-section-diff.md](references/playwright-section-diff.md).

Primary checks:
- section screenshot matches scaled reference
- no horizontal overflow
- no obvious text overlap
- no image distortion
- no invisible main CTA

Also run [references/visual-checklist.md](references/visual-checklist.md).

### 7. Report or Repair

If verification fails:
- first report failed sections, likely causes, assumptions, approximations, known mismatches
- optional local repair only; never silently regenerate whole page by default

See:
- [references/failure-handling.md](references/failure-handling.md)
- [references/repair-loop-policy.md](references/repair-loop-policy.md)
- [references/confidence-and-escalation.md](references/confidence-and-escalation.md)

## Hard Stop Conditions

Stop and ask when:
- target framework unresolved
- target width unresolved
- required text unresolved
- critical media role ambiguous
- critical asset unavailable and crop fallback unusable
- core layout relationship cannot be inferred safely
- user has not confirmed `Pre-Implementation Brief`

## Output Contract

Default final output should include:
- one page file in project-matching framework
- `data-section` anchors
- short `Assumptions`
- short `Approximations`
- short `Known mismatches`
- section diff summary if verification ran

## References

Load only what current step needs:
- input contract: [references/prompt-shape.md](references/prompt-shape.md)
- framework choice: [references/framework-resolution.md](references/framework-resolution.md)
- pre-code confirmation: [references/pre-implementation-brief.md](references/pre-implementation-brief.md)
- width scaling: [references/width-normalization.md](references/width-normalization.md)
- image-role decisions: [references/media-role-classification.md](references/media-role-classification.md)
- code generation rules: [references/vue-astro-unocss-output-rules.md](references/vue-astro-unocss-output-rules.md)
- verification: [references/playwright-section-diff.md](references/playwright-section-diff.md)
- failure handling: [references/failure-handling.md](references/failure-handling.md)
- visual acceptance: [references/visual-checklist.md](references/visual-checklist.md)
- examples: [references/examples.md](references/examples.md)
