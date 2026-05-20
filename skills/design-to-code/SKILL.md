---
name: design-to-code
description: Visual implementation provider kernel. Use when a Javis/Kanban task envelope requests visual_implementation from approved design/handoff artifacts and the output must be code, screenshot evidence, parity artifacts, and a result manifest.
---

# DesignToCode — Visual Implementation Provider Kernel

## Role

`design-to-code` is a bounded **visual implementation provider** for Javis/Kanban. It turns approved visual/design handoff artifacts into code changes, screenshots, parity evidence, and implementation debt records for the active slice.

It is not the project orchestrator, not the design authority, and not the technical architecture owner.

## When to activate

Use this skill when:

- invoked by a `kanban-capability-task/v1` envelope;
- the requested capability is `visual_implementation`;
- approved visual sources, Visual IR, page contracts, or Level-3 handoff artifacts must become implementation code and screenshot-backed parity evidence.

Do not use when the visual source is missing/stale, the user is still deciding design direction, or the task is non-visual project plumbing. Route those to `idea-to-design`, `IdeaToTech`, or normal implementation skills as appropriate.

## Advertised capability

| Capability | Output intent |
|---|---|
| `visual_implementation` | code changes from approved visual/design handoff, page contracts/Visual IR updates, screenshots, parity reports, product-state evidence, and implementation debts |

## Inputs

Read only the active-slice context and referenced artifacts unless the task explicitly requests broader implementation reconciliation.

Expected task envelope fields:

- `schema: kanban-capability-task/v1`
- `task_id`
- `capability`
- `project_root`
- `active_slice`
- `input_artifact_refs`
- `output_root`
- `expected_outputs`
- `verification_expectations`
- `allowed_side_effects`
- `review_policy`
- `blocking_policy`

Input priority:

1. `implementation-blueprint.json`, `page-matrix.json`, `component-blueprint.json`, and `debt-ledger.json`
2. Visual IR / section contracts / visual contracts / section crops
3. Approved design images, Figma context, or persisted mockups
4. Page briefs and prose notes only as supporting context

## Outputs

Return a `kanban-capability-result/v1`-shaped manifest.

Minimum fields:

```json
{
  "schema": "kanban-capability-result/v1",
  "task_id": "",
  "capability": "visual_implementation",
  "provider": "design-to-code",
  "result": "completed | partial | blocked | failed",
  "changed_files": [],
  "produced_artifacts": [],
  "evidence": [],
  "blockers": [],
  "debts": [],
  "review_required": true,
  "suggested_gate_updates": [],
  "next_recommended_task": null
}
```

Screenshots, diffs, parity reports, Visual IR, repair notes, generated media, and test logs must live in files referenced by the manifest.

## Artifact locations

Use the requested `output_root` when provided. Otherwise use project-approved implementation evidence locations, commonly:

```text
project-state/implementation/
project-state/design/visual-ir/
project-state/implementation/screenshots/
project-state/implementation/parity-reports/
```

Typical artifacts:

- code changes in target pages/components/styles/assets
- page contract or Visual IR updates
- desktop/mobile screenshots
- left-design/right-live comparisons or section crops
- parity report and debt ledger updates
- route/link/product-state verification logs

## Result semantics

- `completed`: active visual implementation slice has code/evidence ready for orchestrator review.
- `partial`: meaningful code/evidence exists, but named parity gaps, states, assets, or checks remain.
- `blocked`: approved source, target route, required asset, build/runtime access, or non-waivable product/technical input is missing.
- `failed`: the implementation attempt produced no usable slice; include cause and recovery suggestion.

Set `review_required: true` for visual parity evidence, major deviations, generated assets, implementation debt, or user-facing screenshots. This routes to review, not generic blocked.

## Gate discipline

- Providers recommend; Javis/PlanToDelivery records canonical gates.
- Do not mark global implementation or visual gates passed.
- Do not claim design parity from DOM/text smoke alone.
- Do not directly edit global execution progress unless the task explicitly authorizes it.
- Skipped/waived checks must be labeled as `skipped` or `waived`, never `passed`.

## L5-first fidelity kernel

D2C's default visual path is highest-fidelity-regeneration for approved sources.

Rules:

1. Approved visual source is the source of truth; prose only supports it.
2. Freeze the page contract before coding: source, route, viewports, product boundary, sections, assets, states, and pass criteria.
3. For high-fidelity work, executable section-level IR is mandatory: bbox/height or density, anatomy, text/icon/shape inventory, token targets including mobile typography floors, media role, crop strategy, safe areas, and must-not-substitute rules.
4. Implement toward L5 from the first serious pass; L1-L4 are diagnostic lenses, not sequential stopping points.
5. Capture screenshot evidence before claiming fidelity: desktop/mobile and design-vs-live or section evidence where applicable.
6. Repair only the largest 1-3 product-breaking visual gaps per pass; if repeated CSS tuning stalls, enrich IR rather than patching blindly.
7. Preserve page type, section order, first-screen density, card/list/form anatomy, icon anatomy, asset roles, CTA hierarchy, and responsive readability floors.
8. Generated atlases are creation aids only; crop into independent assets before production use.

Allowed exceptions must be explicit: route-coverage spikes, technical proof-of-concepts, or user-approved mock-only work may stop below L5 but must be labeled as such.

## Product-state checks

Before calling a slice product-ready, verify or explicitly waive relevant states:

- loading, empty, error, fallback data
- hover, active, focus, disabled, selected/current states
- form validation and submission feedback
- CTA/link destinations and navigation behavior
- image fallback and responsive overflow
- build/type/route smoke appropriate to the project

## Progressive references

Load only when needed:

- `references/high-fidelity-rules.md` — strict exactness, complex text/icon/shape/layer inventory.
- `references/design-extraction-analysis-gate.md` — screenshot/mockup extraction into section IR.
- `references/executable-visual-ir.md` — IR is too weak or CSS tuning stalls.
- `references/full-page-regeneration-guard.md` — full-page rewrite or final parity acceptance.
- `references/section-driven-high-fidelity.md` — section-by-section restoration.
- `references/asset-atlas-generation.md` — multiple bitmap assets or atlas generation.
- `references/functional-component-handoff-guard.md` — controls/forms/tabs/pickers affect behavior.
- `references/blueprint-driven-implementation.md` — project blueprint files exist.
- `references/playwright-section-diff.md` — screenshot comparison and visual audit pack.
- `references/main-skill-full-reference.md` — legacy detailed D2C workflow.
- `contracts/visual-implementation-task-v1.md` — capability task contract.
- `contracts/visual-implementation-result-v1.md` — provider result contract.

## Common pitfalls

| Pitfall | Fix |
|---|---|
| Acting as global project owner | Return manifest recommendations; let Javis update canonical state |
| Coding from prose without source | Require approved source, page contract, or Visual IR |
| Treating visual review as blocked | Use `review_required: true`; reserve `blocked` for missing inputs/build/runtime/unsafe facts |
| Claiming parity from DOM/text smoke | Capture screenshot or section evidence |
| Reusing generic dashboard/list structures | Preserve source page type, density, and anatomy |
| Pixel-chasing without contract | Enrich executable IR, then repair top gaps |
| Using atlas as production asset | Crop independent assets and reference them directly |
| Hiding shortcuts | Record placeholders, missing icons/assets, deviations, and remaining debt |
