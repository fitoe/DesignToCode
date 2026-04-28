# DesignToCode

[![Release](https://img.shields.io/github/v/release/fitoe/DesignToCode)](https://github.com/fitoe/DesignToCode/releases)
![Topics](https://img.shields.io/badge/topics-agent--skills%20%C2%B7%20design--to--code%20%C2%B7%20unocss-blue)

DesignToCode is a Codex skill for turning segmented design images into high-fidelity page code with UnoCSS.

Current version: `v1.2.0`

It is built for image-to-code workflows where the goal is not “rough inspiration”, but structurally faithful implementation:
- resolve the current project stack first
- choose `Vue` or `Astro` from the repo when possible
- normalize design sections to the target page width
- classify visuals as CSS background vs semantic content image
- emit a mandatory pre-implementation brief before writing code
- verify output with Playwright section screenshot diffs

## Scope

DesignToCode is intended for:
- segmented page-design screenshots
- existing `Vue` or `Astro` projects
- new page implementation with UnoCSS
- high-fidelity landing pages, marketing pages, dashboards, feature pages

DesignToCode is not intended for:
- Figma-node to code workflows
- backend or API generation
- vague “make something like this” prompts
- framework-agnostic final output

## Core Workflow

1. Read ordered section images and notes.
2. Inspect the current project to resolve framework and layout conventions.
3. Resolve canonical page width from the repo, or fall back to user-provided `pageWidth`.
4. Scale each section image to the target page width before analysis.
5. Analyze section structure, media roles, assets, and implementation risks.
6. Run a design-system mapping pass against the current project.
7. Output a mandatory `Pre-Implementation Brief`.
8. Wait for user confirmation.
9. Generate page code in the project-matching framework.
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
## Layout Implementation Plan
## Framework/Output Plan
## Known Ambiguities
## Verification Plan
```

No page code should be generated until the user confirms this brief.

## Framework Resolution

DesignToCode is project-first:
- `Vue` project -> generate Vue page/component
- `Astro` project -> generate Astro page/component
- mixed or unclear repo -> stop and ask

The skill does not silently default to Vue or Astro.

## Media Role Rules

Every important visual media element is classified as either:
- `background`
- `content image`

Default mapping:
- `background` -> CSS background
- `content image` -> `<img>` or `<picture>`

If a critical visual is ambiguous, the skill must stop and ask instead of guessing.

## Asset Resolution

Asset resolution follows this order:
- `provided original`
- `project existing`
- `crop fallback`
- `css reproducible`
- `unresolved`

If a critical asset reaches `unresolved`, the skill must stop and ask.

## Repository Layout

```text
.
├── SKILL.md
├── RELEASE_NOTES.md
├── README.md
├── README.en.md
├── README.zh-CN.md
├── agents/
│   └── openai.yaml
└── references/
    ├── prompt-shape.md
    ├── framework-resolution.md
    ├── pre-implementation-brief.md
    ├── width-normalization.md
    ├── media-role-classification.md
    ├── vue-astro-unocss-output-rules.md
    ├── playwright-section-diff.md
    ├── failure-handling.md
    ├── visual-checklist.md
    ├── examples.md
    ├── section-taxonomy.md
    ├── layer-stack-model.md
    ├── section-boundary-and-cross-section-rules.md
    ├── repair-loop-policy.md
    └── confidence-and-escalation.md
```

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
- compare rendered section against scaled reference image
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
- target framework is unresolved
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
- Skill spec: [SKILL.md](SKILL.md)
- Release notes: [RELEASE_NOTES.md](RELEASE_NOTES.md)
