# Visual Implementation Result v1

DesignToCode returns `kanban-capability-result/v1` manifests for `visual_implementation`.

## Artifact Types

- `changed_file`
- `screenshot`
- `comparison_board`
- `implementation_report`
- `parity_notes`
- `debt_ledger`
- `verification_log`

## Example

```json
{
  "schema_version": "kanban-capability-result/v1",
  "task_id": "kb_d2c_001",
  "correlation_id": "home-visual-implementation",
  "capability": "visual_implementation",
  "status": "completed",
  "summary": "Implemented homepage visual source and captured mobile screenshot.",
  "artifacts": [
    {"type": "implementation_report", "path": "project-state/implementation/home-report.md"}
  ],
  "changed_files": [
    "src/pages/home/index.vue",
    "src/pages/home/components/Hero.vue"
  ],
  "evidence": [
    {"type": "screenshot", "path": "project-state/implementation/screenshots/home-mobile.png"}
  ],
  "review_required": true,
  "blocked": false,
  "blockers": [],
  "debt": [
    {"severity": "minor", "note": "Animation timing needs final review"}
  ],
  "next_tasks": []
}
```

## Semantics

- Visual parity review is `review_required=true`, not `blocked=true`.
- Missing source/project/assets/tooling is `blocked=true`.
- If implementation cannot reach parity but produced useful code/evidence, return `status=partial` and `review_required=true` with debt notes.
- Next tasks use capability names and artifact paths, not Javis/PlanToDelivery internals.
