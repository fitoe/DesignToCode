# DesignToCode

[![Release](https://img.shields.io/github/v/release/fitoe/DesignToCode)](https://github.com/fitoe/DesignToCode/releases)
![Topics](https://img.shields.io/badge/topics-agent--skills%20%C2%B7%20design--to--code%20%C2%B7%20unocss-blue)

Install:

```bash
npx skills add fitoe/DesignToCode
```

DesignToCode is a general-purpose Codex skill for turning segmented design images into high-fidelity page code with UnoCSS.

It is designed for image-to-code workflows where structural fidelity matters more than rough inspiration. The focus is on preserving hierarchy, backgrounds, media roles, and maintainable implementation choices.

## What It Helps With

- turning segmented design screenshots into page code
- handling layouts with clear layering and background relationships
- producing a pre-implementation brief before code is written
- verifying section-level output with Playwright screenshot diffs

## Intended Use

DesignToCode is intended for:

- segmented page-design screenshots
- existing frontend projects
- new page implementation with UnoCSS
- high-fidelity landing pages, marketing pages, dashboards, and feature pages

DesignToCode is not intended for:

- Figma-node to code workflows
- backend or API generation
- vague “make something like this” prompts
- framework-agnostic final output

## How It Works

1. Read ordered section images and notes.
2. Inspect the current project to resolve page conventions and reusable constraints.
3. Resolve canonical page width from the repo, or fall back to user-provided `pageWidth`.
4. Scale each section image to the target page width before analysis.
5. Analyze section structure, media roles, assets, and implementation risks.
6. Run a design-system mapping pass against the current project.
7. Output a mandatory `Pre-Implementation Brief`.
8. Wait for user confirmation.
9. Generate page code that matches the project's conventions.
10. Run Playwright section screenshot diff.
11. Report mismatches and optional local repair opportunities.

## Pre-Implementation Brief

Before any code generation, the skill must output:

```md
## Page Understanding
## Section Breakdown
## Input Mode
## Reuse Mapping
## Media Role Decisions
## Asset Compression Plan
## Layout Implementation Plan
## Framework/Output Plan
## Known Ambiguities
## Verification Plan
```

No page code should be generated until the user confirms this brief.

## Project Resolution

DesignToCode is project-first:

- read the existing page, component, and layout conventions from the repo
- generate output that follows those conventions
- if the repo is mixed or unclear, stop and ask

The skill does not silently guess project conventions.

## Media and Assets

Every important visual media element is classified as either:

- `background`
- `content image`

Default mapping:

- `background` -> CSS background
- `content image` -> `<img>` or `<picture>`

Asset resolution follows this order:

- `provided original`
- `project existing`
- `crop fallback`
- `css reproducible`
- `unresolved`

Bitmap assets must follow role-based compression rules. Large assets should be scanned before merge, and fallback or exemption cases must be reported explicitly.

If a critical visual role or critical asset is ambiguous, the skill must stop and ask instead of guessing.

## Input Shape

Canonical input:

```text
Goal: page purpose

Global requirements:
- target project: existing project / new page
- pageWidth: 1440
- style keywords: ...
- acceptable approximations: ...

Section 1:
- name: hero
- image: /path/hero.png
- purpose: hero with left text and right visual
- required text: ...
- interactions: button hover
- must-not-miss points: title wrap, CTA hierarchy
- media notes: gradient background, right-side content image
```

## Verification

Primary verification is section-level screenshot diff with Playwright:

- target sections using `data-section`
- compare rendered section against the scaled reference image
- tolerate only minor font-rendering noise

Validation is split into:

- structure checks
- visual checks
- reuse checks

Structural smoke checks include:

- no horizontal overflow
- no obvious text overlap
- no image distortion
- no missing critical section content
- no invisible main CTA

## Hard Stop Conditions

The skill must stop and ask when:

- target width is unresolved
- required text is unreadable and not supplied
- critical media role is ambiguous
- critical asset is missing and crop fallback is unusable
- key layout relationship cannot be inferred safely
- user has not confirmed the pre-implementation brief

## Current Status

This repository currently contains the skill specification and reference documents.

It does not yet include:

- a runnable implementation harness
- automated validator scripts inside this repo
- end-to-end example execution outputs

## Related Files

- English README: [README.en.md](README.en.md)
- Chinese skill overview: [README.md](README.md)
- Skill spec: [skills/design-to-code/SKILL.md](skills/design-to-code/SKILL.md)
- License: [LICENSE](LICENSE)
- Release notes: [RELEASE_NOTES.md](RELEASE_NOTES.md)
