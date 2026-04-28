---
name: design-to-code
description: Convert segmented design images into high-fidelity UnoCSS page code for the current project stack, resolving Vue vs Astro from the repo, requiring a pre-implementation brief before code generation, and verifying output with Playwright section screenshot diffs.
license: MIT
---

# DesignToCode

Version: `v1.2.2`

## Changelog

### v1.2.2

- added mandatory local-asset rule for Figma-derived resources: download every remote image or svg to project files before use
- forbade direct remote asset URLs and inline svg markup in generated page output

### v1.2.1

- moved the skill package to `skills/design-to-code/` so the parent directory matches `name: design-to-code`
- updated repository documentation to point at the packaged skill location
- aligned the repository layout with the Agent Skills directory structure expected by skills.sh-style tooling

### v1.2.0

- added explicit `Input Modes` to distinguish image-only, metadata-assisted, and figma-assisted workflows
- added a mandatory `Design System Mapping Pass` before page code generation
- added `Deviation Policy` to prefer project tokens with explicit approximation reporting
- added `Asset Resolution Escalation` to formalize asset fallback order and stop conditions
- split verification into `Structure Checks`, `Visual Checks`, and `Reuse Checks`
- synchronized `Pre-Implementation Brief` requirements across the main skill and reference docs

### v1.1.0

- added `Input Precision Ladder` to distinguish node-aware, metadata-aware, and image-only inputs
- added `Design System Reuse Rules` to enforce component/token reuse before bespoke implementation
- added `Asset Provenance and Media Rules` to make asset sourcing explicit and auditable
- added `Scoped Fallback Strategy` to reduce scope when whole-page inference is unsafe
- expanded `Pre-Implementation Brief` with required `Reuse Mapping`
- expanded verification checks to cover token reuse, asset substitutions, cross-section continuity, and unnecessary one-off abstractions

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

## Input Precision Ladder

Not all design inputs have the same reliability. Resolve implementation confidence in this order:

1. Figma node or frame with structured context
2. High-level metadata / explicit layer map
3. Full-page screenshot
4. Ordered section screenshots
5. Cropped visual fragments

Rules:
- prefer the highest-precision input available
- when multiple input types exist, use higher-precision inputs to constrain lower-precision ones
- do not treat screenshot inference as equivalent to node-level structure
- if the available input is low precision, increase explicit assumptions and verification strictness

## Input Modes

Select one input mode before implementation:

- `image-only mode`: only screenshots or cropped design fragments are available
- `metadata-assisted mode`: screenshots are available plus explicit structure notes, layer maps, or section maps
- `figma-assisted mode`: screenshots are constrained by structured Figma-derived context, but the deliverable remains code rather than Figma edits

Rules:
- explicitly name the chosen mode in the `Pre-Implementation Brief`
- do not imply node-level certainty while in `image-only mode`
- in `metadata-assisted mode`, let explicit structure override weak visual inference
- in `figma-assisted mode`, use Figma-derived structure to constrain implementation, but still follow this skill's code-generation and verification rules

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

## Design System Reuse Rules

Before generating page code, inspect the project for reusable implementation primitives.

Resolve, in order:
1. existing page/layout shell conventions
2. reusable section primitives
3. reusable UI components
4. typography scale
5. color tokens
6. spacing/radius/shadow tokens

Rules:
- prefer existing components over one-off recreation
- prefer existing tokens over hardcoded visual constants
- if a section can be represented by existing primitives with only small overrides, reuse them
- only implement bespoke markup when reuse would produce materially worse fidelity or complexity
- document major reuse decisions in the `Pre-Implementation Brief`

### 2a. Design System Mapping Pass

Before generating any page code, produce a concrete reuse map for the page.

Map, when possible:
- inferred sections -> existing layout shells or wrappers
- inferred UI patterns -> existing components
- inferred typography -> existing type ramp or text primitives
- inferred colors/surfaces -> existing color tokens
- inferred spacing/radius/shadows -> existing layout or style tokens

Rules:
- do not start page code before this mapping pass is complete
- if no suitable reusable primitive exists, mark the element as `bespoke`
- if multiple reuse targets are plausible, record the ambiguity instead of picking silently

### 3. Analyze Before Code

For each section:
- identify likely section type; see [references/section-taxonomy.md](references/section-taxonomy.md)
- identify layout system: `flex`, `grid`, or `overlay/absolute`
- build internal layer stack; see [references/layer-stack-model.md](references/layer-stack-model.md)
- classify visual media; see [references/media-role-classification.md](references/media-role-classification.md)
- detect cross-section continuity; see [references/section-boundary-and-cross-section-rules.md](references/section-boundary-and-cross-section-rules.md)
- identify assets that are original, crop-fallback, CSS-reproducible, or unresolved

Scale each section image to canonical page width before making layout judgments. Do not rely on raw image width if it differs from page width.

## Asset Provenance and Media Rules

Every visual asset must be classified by both role and provenance.

Required classifications:
- role: `background` | `content image` | `icon` | `illustration` | `logo` | `texture` | `decorative overlay`
- provenance: `provided original` | `project existing` | `crop fallback` | `css reproducible` | `unresolved`

Rules:
- if a real asset is available, use it; do not silently replace it
- do not invent logos, icons, or illustrations without explicit permission
- do not silently downgrade missing assets into placeholders
- remote Figma or CDN asset URLs are not allowed in final page code
- when a Figma-derived image, svg, icon, or illustration is used, download it into local project files first, then reference that file
- svg assets must be stored as `.svg` files and referenced as files; do not inline raw svg markup into page code
- if crop fallback is used, record it explicitly
- unresolved critical assets are a hard stop
- background visuals should become CSS background layers when appropriate
- semantic content images should remain `<img>` or `<picture>`

## Asset Resolution Escalation

Resolve assets in this order:

1. `provided original`
2. `project existing`
3. `crop fallback`
4. `css reproducible`
5. `unresolved`

Rules:
- always choose the highest-fidelity available asset source
- if moving down the escalation ladder, record the downgrade explicitly
- do not skip directly to placeholder-like output when a higher rung is available
- if a critical asset reaches `unresolved`, stop and ask

### 4. Emit Mandatory Pre-Implementation Brief

Before generating any page code, output a `Pre-Implementation Brief` using [references/pre-implementation-brief.md](references/pre-implementation-brief.md).

Required sections:
- `Page Understanding`
- `Section Breakdown`
- `Input Mode`
- `Reuse Mapping`
- `Media Role Decisions`
- `Layout Implementation Plan`
- `Framework/Output Plan`
- `Known Ambiguities`
- `Verification Plan`

Rules:
- `Reuse Mapping` must list the intended mapping between inferred design elements and existing project components, layout primitives, and tokens
- `Input Mode` must state the chosen mode and its confidence limits
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
- do not reference remote asset URLs in final output
- do not inline svg source in page markup; reference local svg files instead
- preserve minimum accessibility floor
- keep abstractions minimal; only factor repeated structure when same pattern repeats 3 or more times

## Deviation Policy

When the implementation cannot match the design literally, prefer project conventions over one-off exactness.

Rules:
- prefer existing project tokens over raw one-off values when the visual result remains acceptably close
- if project tokens differ from the source design, allow only minimal spacing or sizing compensation
- report every material deviation in `Approximations` or `Known mismatches`
- do not silently introduce a parallel token system inside page code

### 6. Verify

Verify with Playwright section screenshot diff using [references/playwright-section-diff.md](references/playwright-section-diff.md).

Structure checks:
- section order matches the intended reading flow
- no horizontal overflow
- no obvious text overlap
- no broken section hierarchy
- cross-section continuity is preserved where intended

Visual checks:
- section screenshot matches scaled reference
- no image distortion
- no invisible main CTA
- typography and spacing remain within acceptable visual tolerance

Reuse checks:
- token reuse is preferred wherever visual parity is preserved
- asset substitutions, if any, are explicitly reported
- implementation does not introduce unnecessary one-off abstractions

Also run [references/visual-checklist.md](references/visual-checklist.md).

### 7. Report or Repair

If verification fails:
- first report failed sections, likely causes, assumptions, approximations, known mismatches
- optional local repair only; never silently regenerate whole page by default

See:
- [references/failure-handling.md](references/failure-handling.md)
- [references/repair-loop-policy.md](references/repair-loop-policy.md)
- [references/confidence-and-escalation.md](references/confidence-and-escalation.md)

## Scoped Fallback Strategy

When the design is too large, too ambiguous, or too lossy for safe whole-page inference, reduce scope before implementation.

Fallback order:
1. whole page
2. major section
3. local subsection
4. single component block

Rules:
- do not force whole-page generation when one or more sections remain structurally ambiguous
- if a section has unresolved hierarchy, infer only that section and keep the rest stable
- when confidence drops, narrow the active implementation scope instead of increasing abstraction
- if section boundaries, cross-section continuity, or layer ownership remain unclear, stop and report the smallest blocked scope

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
- short `Input Mode`
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
