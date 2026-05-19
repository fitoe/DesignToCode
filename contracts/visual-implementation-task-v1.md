# Visual Implementation Task v1

Capability: `visual_implementation`

## Purpose

Implement approved visual sources into the target codebase and return evidence for review.

## Envelope

Use `kanban-capability-task/v1` with `capability=visual_implementation`.

## Required Inputs

- `project_path`: absolute path to target project.
- `approved_visual_source`: design spec, screenshot, board, or implementation blueprint approved for build.
- `target_pages`: pages/screens/states to implement.
- `acceptance_criteria`: parity and behavior expectations.

## Optional Inputs

- `framework_constraints`
- `responsive_targets`
- `asset_policy`
- `existing_routes`
- `verification_commands`
- `screenshot_requirements`

## Expected Outputs

- changed files;
- implementation notes;
- screenshot or DOM evidence;
- parity notes;
- debt ledger;
- next task recommendations.

## Blocker Conditions

Return `blocked=true` only when approved source is missing, target project path is inaccessible, required credentials/assets are unavailable, or required tools cannot run.

## Review Conditions

Return `review_required=true` when implementation exists but visual parity, responsive behavior, or business acceptance needs review.

## Example

```json
{
  "schema_version": "kanban-capability-task/v1",
  "task_id": "kb_d2c_001",
  "correlation_id": "home-visual-implementation",
  "capability": "visual_implementation",
  "objective": "Implement approved homepage visual source",
  "inputs": {
    "project_path": "/abs/project",
    "approved_visual_source": "project-state/design/home-spec.md",
    "target_pages": ["/pages/home/index"],
    "acceptance_criteria": ["mobile screenshot matches approved visual source"]
  },
  "orchestration": {"origin": "kanban", "review_policy": "visual_review_required"}
}
```
