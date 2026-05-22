# DesignToCode Provider Collaboration v2

DesignToCode is the bounded visual implementation provider in the Javis/PlanToDelivery V2 provider system. It turns approved visual/design handoff artifacts into code and evidence for the active slice, but it does not own design authority, technical architecture, or canonical delivery state.

## Capability boundary

| Capability | Owned by DesignToCode | Not owned by DesignToCode |
|---|---|---|
| `visual_implementation` | code changes from approved source, page/section contracts, screenshots, parity reports, product-state evidence, implementation debts | visual direction selection, architecture decisions, global gate mutation, deploy/release ownership |

## Required upstream readiness

DesignToCode should start only when PlanToDelivery admits a `kanban-capability-task/v1` envelope and at least one approved source path is present:

- approved design image/Figma/mockup and route/page contract;
- Visual IR / section contracts / crops;
- Level-3 handoff pack from IdeaToDesign;
- technical constraints or implementation recipes from IdeaToTech when architecture/API/state choices are non-trivial.

If the visual source is missing, stale, rejected, or only described in prose, return `result=blocked` or recommend `visual_source_creation`; do not reinterpret the design.

## Upstream / downstream handoff

```text
PlanToDelivery/Javis
  -> Hermes Kanban card(status=running)
  -> kanban-capability-task/v1(visual_implementation)
  -> active-slice-digest/v1
  -> DesignToCode admission guard
  -> DesignToCode
  -> code + screenshots/parity/debt evidence
  -> output_root/result-manifest.json using kanban-capability-result/v1
  -> PlanToDelivery review/gate decision and canonical state update
```

Expected upstream inputs:

- active slice and target route/page/component scope;
- approved visual source, Visual IR, page matrix, implementation blueprint, or Level-3 handoff refs;
- page contract and visual pass criteria;
- technical plan refs when data/API/state or dependency choices are involved;
- explicit allowed file/network/build side effects;
- output root and required evidence names;
- running Kanban card snapshot/proof from the orchestrator.

Expected downstream outputs:

- changed page/component/style/asset files;
- screenshots, section diffs, parity report, and product-state verification logs;
- debt ledger updates for accepted deviations, missing assets, waivers, or follow-up work;
- result manifest with evidence, blockers, debts, review requirement, and recommended next capability.

## Admission guard

Before implementation in P2D mode, run the local checker declared in the provider manifest:

```bash
python3 skills/design-to-code/scripts/check-provider-context.py \
  --task "$OUTPUT_ROOT/task-envelope.json" \
  --digest "$OUTPUT_ROOT/active-slice-digest.json" \
  --card-status "$OUTPUT_ROOT/card-status.json"
```

`--skip-running-check` is only for local contract tests or isolated dry-runs. In real Hermes Kanban orchestration, omitting the running card proof is a blocker.

The guard verifies:

- task and digest schemas;
- task_id and capability consistency;
- capability is `visual_implementation`;
- output root handoff writes `output_root/result-manifest.json`;
- approved visual source and page contract/pass criteria exist;
- expected screenshot/parity evidence is declared;
- allowed side effects are explicit;
- result manifest schema and visual evidence are valid when supplied.

## Gate discipline

- DesignToCode may recommend `suggested_kanban_updates`, but PlanToDelivery alone records canonical gates.
- Visual parity, generated assets, major deviations, and user-facing screenshots are `review_required: true`, not generic `blocked`.
- Use `result=blocked` only for missing approved source, page contract/pass criteria, inaccessible project path, unavailable required tools/dependencies, unsafe side effects, or non-waivable product/technical input.
- Do not claim visual parity from DOM/text smoke alone; screenshot, section diff, comparison board, or parity report evidence is mandatory.
- Skipped/waived checks must remain `skipped` or `waived`; never report them as `passed`.
- Do not update global progress directly unless the task envelope explicitly authorizes it.
- Interaction/API cards remain blocked until PlanToDelivery accepts or waives the visual review gate.

## Registry references

- Provider manifest: `contracts/provider-manifest.json`
- Task contract: `contracts/visual-implementation-task-v1.md`
- Result contract: `contracts/visual-implementation-result-v1.md`
- Admission guard: `skills/design-to-code/scripts/check-provider-context.py`
- Runtime skill: `skills/design-to-code/SKILL.md`
