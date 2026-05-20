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
- `kanban_constraints`:
  - `required: true`
  - `visual_card_id`
  - `depends_on`
  - `blocks_interaction_api_until_visual_accepted: true`
  - `separate_interaction_api_card_required: true`

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
  "visual_acceptance": {
    "page_visual_ready": false,
    "accepted_by_user_or_orchestrator": false,
    "remaining_visual_debt": [],
    "interaction_api_unblocked": false
  },
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

## Collaboration boundary

- Upstream owner: PlanToDelivery/Javis provides the active slice, artifact refs, review policy, blocking policy, allowed side effects, and canonical state.
- Upstream design source: IdeaToDesign provides approved visual sources, Visual IR, page matrices, and Level-3 handoff artifacts.
- Upstream technical source: IdeaToTech provides implementation recipes, API/state/mock plans, dependency decisions, and verification expectations when the slice is not pure visual/static work.
- DesignToCode must not reinterpret missing or stale design direction; recommend `visual_source_creation` or return `blocked` when approved source is absent.
- DesignToCode must not make unresolved architecture/API decisions; recommend `technical_blueprint` or `implementation_planning` when those are required.
- Provider output is advisory until PlanToDelivery ingests the manifest and records canonical state.
- See `docs/provider-collaboration-v2.md` in the source repository for the full provider boundary.

## Gate discipline

- Providers recommend; Javis/PlanToDelivery records canonical gates.
- Do not mark global implementation or visual gates passed.
- Do not claim design parity from DOM/text smoke alone.
- Do not directly edit global execution progress unless the task explicitly authorizes it.
- Skipped/waived checks must be labeled as `skipped` or `waived`, never `passed`.

## Visual-first page acceptance kernel

D2C's implementation order is **visual-first, page-by-page, Kanban-gated** across all targets: H5, web, admin, static sites, desktop-responsive pages, and componentized app pages.

Default sequence:

1. PlanToDelivery/Javis creates Kanban cards that separate visual implementation from interaction/API integration.
2. D2C takes one page/card at a time and implements final-intent visual structure first: layout, section order, component anatomy, typography, spacing, density, assets, responsive behavior, and required visual states.
3. The page uses local mock/fallback data until real data is part of the accepted integration slice.
4. The page cannot move to interaction/API cards until its visual card has screenshot/evidence and is accepted, or the remaining visual debt is explicitly documented and waived by the orchestrator/user.
5. Only after all pages in the visual batch are accepted should downstream cards wire shared interactions, navigation behavior, request helpers, API payloads, persistence, and integration tests.

Required Kanban constraints:

- Visual cards and interaction/API cards must be distinct unless the interaction state is required to judge the visual design.
- A page visual card must end as `review_required` with evidence, not silently mark global completion.
- Interaction/API cards must declare dependency on accepted visual cards.
- If interface data reveals missing states that affect appearance, create or reopen a visual-state card instead of burying redesign inside API wiring.
- The orchestrator records canonical gate transitions; D2C only returns result manifests and suggested gate updates.

A page is visually ready only when the route renders with final visual hierarchy, stable local assets, key responsive states, representative data density, and screenshot/parity evidence. Route scaffolds, placeholder-looking pages, or DOM/text smoke are not visual acceptance.

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
