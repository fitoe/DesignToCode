# Visual Implementation Task v1

Capability: `visual_implementation`

## Purpose

Implement approved visual sources into the target codebase and return code, screenshots, parity evidence, and review-ready result manifests for PlanToDelivery.

## Envelope

Use `kanban-capability-task/v1` with `capability=visual_implementation`.

DesignToCode must be admitted by PlanToDelivery/Javis before editing target implementation files. A restored chat TODO, informal `继续`, or screenshot in the conversation is not an execution envelope.

## Required Inputs

This contract is carried inside a `kanban-capability-task/v1` envelope admitted by PlanToDelivery. The envelope must include:

- `schema: kanban-capability-task/v1`
- `task_id`
- `capability: visual_implementation`
- `project_root`: absolute path to target project
- `active_slice`: bounded page/screen/state/component scope
- `input_artifact_refs`: approved visual/design/handoff artifact paths
- `output_root`: provider artifact directory; result manifest path is always `output_root/result-manifest.json`
- `expected_outputs`: must include `result-manifest.json` and screenshot/parity evidence artifacts
- `verification_expectations`: expected build, screenshot, visual, route, or product-state checks
- `allowed_side_effects`: explicit file/network/build side effects permitted for the slice
- `review_policy`: visual review and acceptance routing
- `blocking_policy`: when missing source/route/tool/assets become blockers
- `visual_contract`: see below
- `kanban_constraints`: running card/gate/dependency constraints from PlanToDelivery

`visual_contract` must include:

- `approved_visual_source`: design image/Figma/mockup/Visual IR/Level-3 handoff path or reference
- `target_pages`: pages/screens/states/routes to implement
- `pass_criteria`: visual parity and behavior expectations

Recommended `kanban_constraints`:

- `required: true`
- `visual_card_id`
- `depends_on`
- `blocks_interaction_api_until_visual_accepted: true`
- `separate_interaction_api_card_required: true`

## Optional Inputs

- `framework_constraints`
- `responsive_targets`
- `asset_policy`
- `existing_routes`
- `technical_plan_refs`
- `verification_commands`
- `screenshot_requirements`
- `visual_ir_refs`
- `page_contract_refs`

## Expected Outputs

- `result-manifest.json` using `kanban-capability-result/v1`
- changed files
- implementation notes or report
- screenshot or DOM/browser evidence
- parity report or section comparison notes
- debt ledger
- suggested Kanban/review updates
- next task recommendation, if any

## Blocker Conditions

Return `result=blocked` only when the approved source, page contract/pass criteria, target project path/route, required credentials/assets, required tools, or permitted side effects are unavailable.

## Review Conditions

Return `review_required=true` when implementation exists but visual parity, responsive behavior, generated assets, screenshot evidence, or business acceptance needs review. This is normal for visual implementation and should not be downgraded to `blocked`.

## Example

```json
{
  "schema": "kanban-capability-task/v1",
  "task_id": "kb_d2c_001",
  "correlation_id": "home-visual-implementation",
  "capability": "visual_implementation",
  "project_root": "/abs/project",
  "active_slice": {"id": "home", "routes": ["/pages/home/index"]},
  "input_artifact_refs": ["project-state/design/home-approved.png"],
  "output_root": "project-state/implementation/home-visual",
  "expected_outputs": [
    "implementation-report.md",
    "screenshots/home-mobile.png",
    "parity-report.md",
    "result-manifest.json"
  ],
  "verification_expectations": ["capture mobile screenshot", "record parity gaps"],
  "allowed_side_effects": ["edit target page/component/style files", "write output_root evidence"],
  "review_policy": {"visual_review_required": true},
  "blocking_policy": {"missing_approved_visual_source": "blocked"},
  "visual_contract": {
    "approved_visual_source": "project-state/design/home-approved.png",
    "target_pages": ["/pages/home/index"],
    "pass_criteria": ["mobile screenshot matches approved visual source"]
  },
  "kanban_constraints": {
    "required": true,
    "visual_card_id": "kb_d2c_001",
    "blocks_interaction_api_until_visual_accepted": true,
    "separate_interaction_api_card_required": true
  }
}
```
