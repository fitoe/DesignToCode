# DesignToCode Provider Collaboration v2

DesignToCode is the bounded visual implementation provider in the Javis/PlanToDelivery V2 provider system. It turns approved visual/design handoff artifacts into code and evidence for the active slice, but it does not own design authority, technical architecture, or canonical delivery state.

## Capability boundary

| Capability | Owned by DesignToCode | Not owned by DesignToCode |
|---|---|---|
| `visual_implementation` | code changes from approved source, page/section contracts, screenshots, parity reports, product-state evidence, implementation debts | visual direction selection, architecture decisions, global gate mutation, deploy/release ownership |

## Required upstream readiness

DesignToCode should start only when at least one approved source path is present:

- approved design image/Figma/mockup and route/page contract;
- Visual IR / section contracts / crops;
- Level-3 handoff pack from IdeaToDesign;
- technical constraints or implementation recipes from IdeaToTech when architecture/API/state choices are non-trivial.

If the visual source is missing, stale, rejected, or only described in prose, return `blocked` or recommend `visual_source_creation`; do not reinterpret the design.

## Upstream / downstream handoff

```text
PlanToDelivery/Javis
  -> kanban-capability-task/v1(visual_implementation)
  -> DesignToCode
  -> code + screenshots/parity/debt evidence
  -> kanban-capability-result/v1
  -> PlanToDelivery review gate and canonical state update
```

Expected upstream inputs:

- active slice and target route/page/component scope;
- approved visual source, Visual IR, page matrix, implementation blueprint, or Level-3 handoff refs;
- technical plan refs when data/API/state or dependency choices are involved;
- explicit allowed file/network/build side effects.

Expected downstream outputs:

- changed page/component/style/asset files;
- screenshots, section diffs, parity report, and product-state verification logs;
- debt ledger updates for accepted deviations, missing assets, waivers, or follow-up work;
- result manifest with evidence, blockers, debts, and recommended next capability.

## Gate discipline

- DesignToCode may recommend `suggested_gate_updates`, but PlanToDelivery alone records canonical gates.
- Visual parity, generated assets, major deviations, and user-facing screenshots are `review_required: true`, not generic `blocked`.
- Use `blocked` only for missing approved source, inaccessible project path, unavailable required tools/dependencies, unsafe side effects, or non-waivable product/technical input.
- Do not claim visual parity from DOM/text smoke alone; screenshot or section-level evidence is mandatory.
- Skipped/waived checks must remain `skipped` or `waived`; never report them as `passed`.
- Do not update global progress directly unless the task envelope explicitly authorizes it.

## Registry references

- Provider manifest: `contracts/provider-manifest.json`
- Task contract: `contracts/visual-implementation-task-v1.md`
- Result contract: `contracts/visual-implementation-result-v1.md`
- Runtime skill: `skills/design-to-code/SKILL.md`
