# Visual Implementation Result v1

DesignToCode returns `kanban-capability-result/v1` manifests for `visual_implementation`. The manifest is written to `output_root/result-manifest.json` and is advisory until PlanToDelivery ingests it and updates canonical Kanban state.

## Required Result Manifest Fields

```json
{
  "schema": "kanban-capability-result/v1",
  "task_id": "",
  "capability": "visual_implementation",
  "provider": "design-to-code",
  "result": "completed | partial | blocked | failed",
  "summary": "",
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
  "suggested_kanban_updates": [],
  "next_recommended_task": null
}
```

## Artifact Types

- `changed_file`
- `screenshot`
- `section_diff`
- `comparison_board`
- `implementation_report`
- `parity_report`
- `parity_notes`
- `visual_ir`
- `page_contract`
- `debt_ledger`
- `verification_log`

## Evidence Requirements

For `result=completed` or `result=partial`, include at least one screenshot, section diff, comparison board, parity report, or equivalent visual evidence. DOM/text smoke alone is not visual acceptance evidence.

When `review_required=true`, include `suggested_kanban_updates` so the orchestrator can create or move the proper review/gate card. DesignToCode does not directly mark the visual gate accepted.

## Example

```json
{
  "schema": "kanban-capability-result/v1",
  "task_id": "kb_d2c_001",
  "capability": "visual_implementation",
  "provider": "design-to-code",
  "result": "completed",
  "summary": "Implemented homepage visual source and captured mobile screenshot.",
  "changed_files": [
    "src/pages/home/index.vue",
    "src/pages/home/components/Hero.vue"
  ],
  "produced_artifacts": [
    "implementation-report.md",
    "parity-report.md"
  ],
  "evidence": [
    {"type": "screenshot", "path": "screenshots/home-mobile.png"},
    {"type": "parity_report", "path": "parity-report.md"}
  ],
  "blockers": [],
  "debts": [
    {"severity": "minor", "note": "Animation timing needs final review"}
  ],
  "review_required": true,
  "visual_acceptance": {
    "page_visual_ready": true,
    "accepted_by_user_or_orchestrator": false,
    "remaining_visual_debt": ["animation timing"],
    "interaction_api_unblocked": false
  },
  "suggested_kanban_updates": [
    {
      "type": "visual_review",
      "title": "Review homepage visual implementation",
      "reason": "Screenshots need orchestrator/user acceptance before API interaction work starts."
    }
  ],
  "next_recommended_task": null
}
```

## Semantics

- `completed`: active visual implementation slice has code and evidence ready for orchestrator/user review.
- `partial`: meaningful code/evidence exists, but named parity gaps, states, assets, or checks remain.
- `blocked`: approved source, page contract/pass criteria, target route, required asset, build/runtime access, or non-waivable product/technical input is missing.
- `failed`: the implementation attempt produced no usable slice; include cause and recovery suggestion.

Visual parity review is `review_required=true`, not `blocked=true`. Missing source/project/assets/tooling is `result=blocked`. If implementation cannot reach parity but produced useful code/evidence, return `result=partial` and `review_required=true` with debt notes.

Next tasks use capability names and artifact paths, not Javis/PlanToDelivery internals. Gate or card changes are suggestions only; PlanToDelivery records canonical state.
