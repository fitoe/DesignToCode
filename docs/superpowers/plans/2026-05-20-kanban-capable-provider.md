# Kanban-capable Design-to-Code Provider Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task after the contract shape is accepted. This branch intentionally keeps D2C decoupled from Javis: D2C implements a generic capability provider contract; Javis/kanban may select it through a registry, but D2C must not import or depend on Javis internals.

**Goal:** Add a kanban-compatible provider layer to DesignToCode so it can be scheduled by Hermes/Javis kanban workflows without creating a hard coupling between the orchestrator and the D2C skill.

**Architecture:** Introduce capability contracts and handoff manifests inside D2C. The orchestrator emits a generic `visual_implementation` task contract, the provider adapter maps it to existing D2C intake/workflow, and D2C returns a generic result manifest with evidence, maturity, debt, and review state. Kanban concepts are represented as optional envelope metadata, not as D2C core dependencies.

**Tech Stack:** Agent skill Markdown, JSON Schema-style contracts, Node validation scripts, existing D2C templates/references/tests, Hermes kanban status vocabulary.

---

## Design Summary

### Core principle

Scale/anti-coupling rule:

```text
Task describes need, not tool.
Worker advertises capability, not identity.
Orchestrator matches contract, not implementation.
```

D2C should not become "the Javis implementation module". It should become one provider for a generic capability:

```json
{
  "capability": "visual_implementation",
  "provider": "design-to-code",
  "contract_version": "1"
}
```

Javis/kanban can route to D2C through a registry, but D2C must only rely on the contract it receives.

### Non-goals

- Do not merge Javis/Kanban source code into DesignToCode.
- Do not make D2C import Hermes internals.
- Do not add Javis-specific field names as required fields.
- Do not replace the existing D2C L5/page-contract workflow.
- Do not make kanban required for normal standalone D2C usage.

### New artifacts

Create these artifacts under `skills/design-to-code/`:

```text
contracts/
  visual-implementation-task.schema.json
  visual-implementation-result.schema.json
  provider-manifest.schema.json

templates/
  visual-implementation-task-template.json
  visual-implementation-result-template.json
  provider-manifest-template.json

references/
  kanban-provider-adapter.md
```

Optional repository-level helper:

```text
scripts/validate-capability-contracts.mjs
tests/capability-contracts/*.test.mjs
```

### Contract boundaries

#### Input task contract

Minimum task shape:

```json
{
  "contract_version": "1",
  "capability": "visual_implementation",
  "task_id": "optional-orchestrator-id",
  "source_refs": ["design/home.png"],
  "target": {
    "project_root": ".",
    "route": "/",
    "framework": "vue|nuxt|astro|react|unknown",
    "viewports": ["desktop", "mobile"]
  },
  "product_boundary": {
    "data_mode": "static|mock|api|unknown",
    "states_required": ["default", "mobile"],
    "cta_or_routes_required": true
  },
  "acceptance": {
    "maturity_target": "L5-first",
    "required_evidence": ["desktop_screenshot", "mobile_screenshot", "design_vs_live"],
    "review_policy": "review-required"
  },
  "orchestration": {
    "origin": "kanban|manual|cron|unknown",
    "board": "optional",
    "parent_task_id": "optional",
    "correlation_id": "optional"
  }
}
```

Rules:

- `orchestration` is optional envelope metadata. D2C may echo it back but must not require it for execution.
- `capability` must describe the work, not the skill identity.
- `provider` may appear in a registry/manifest, not in the task's required core fields.
- Missing source/target/product boundary is a contract blocker, not a reason to guess.

#### Output result manifest

Minimum result shape:

```json
{
  "contract_version": "1",
  "capability": "visual_implementation",
  "task_id": "optional-orchestrator-id",
  "status": "completed|blocked|review_required|failed",
  "maturity": "L0|L1|L2|L3|L4|L4.5|L5",
  "changed_files": [],
  "evidence": [
    {
      "type": "desktop_screenshot|mobile_screenshot|design_vs_live|route_smoke|build_log",
      "path": "project-state/implementation/screenshots/home-desktop.png",
      "summary": "what this proves"
    }
  ],
  "verification": {
    "commands_run": [],
    "skipped": [],
    "known_baseline_failures": []
  },
  "debt": [
    {
      "severity": "critical|major|minor",
      "area": "hero typography",
      "description": "remaining mismatch or accepted deviation"
    }
  ],
  "review": {
    "required": true,
    "reason": "review-required: visual evidence needs human approval",
    "suggested_next_state": "review"
  },
  "orchestration": {
    "correlation_id": "optional echo"
  }
}
```

Rules:

- `review.required=true` maps to kanban `review`, not generic `blocked`.
- Real blockers use `status=blocked` and explain missing inputs/permissions/dependencies.
- Evidence must be path-based and verifiable; prose alone is not enough for parity claims.
- D2C should not claim final readiness if required evidence or product-state checks were skipped.

### Provider manifest

D2C advertises capability, inputs, outputs, and review policy:

```json
{
  "provider": "design-to-code",
  "version": "1",
  "capabilities": [
    {
      "name": "visual_implementation",
      "input_contract": "contracts/visual-implementation-task.schema.json",
      "output_contract": "contracts/visual-implementation-result.schema.json",
      "default_review_policy": "review-required",
      "evidence_required": ["desktop_screenshot", "mobile_screenshot"]
    }
  ]
}
```

This lets Javis/Kanban discover D2C as a provider without D2C knowing Javis.

## Implementation Plan

### Task 1: Add contract directory and task schema

**Objective:** Define the generic input contract for visual implementation tasks.

**Files:**
- Create: `skills/design-to-code/contracts/visual-implementation-task.schema.json`
- Create: `skills/design-to-code/templates/visual-implementation-task-template.json`

**Steps:**
- [ ] Create the contract directory.
- [ ] Add required fields: `contract_version`, `capability`, `source_refs`, `target`, `product_boundary`, `acceptance`.
- [ ] Keep `orchestration` optional and generic.
- [ ] Add a template using realistic defaults and comments-free JSON.
- [ ] Verify JSON parses with `node -e` or a small script.

### Task 2: Add result manifest schema and template

**Objective:** Define how D2C reports completion, review requirements, evidence, verification, and debt back to any orchestrator.

**Files:**
- Create: `skills/design-to-code/contracts/visual-implementation-result.schema.json`
- Create: `skills/design-to-code/templates/visual-implementation-result-template.json`

**Steps:**
- [ ] Add status enum: `completed`, `blocked`, `review_required`, `failed`.
- [ ] Add maturity enum compatible with existing D2C maturity language.
- [ ] Require evidence entries for parity claims.
- [ ] Add `review.required`, `review.reason`, and `review.suggested_next_state`.
- [ ] Explicitly document that `review_required` is distinct from `blocked`.

### Task 3: Add provider manifest

**Objective:** Let external orchestrators discover D2C by capability without depending on D2C internals.

**Files:**
- Create: `skills/design-to-code/contracts/provider-manifest.schema.json`
- Create: `skills/design-to-code/templates/provider-manifest-template.json`

**Steps:**
- [ ] Advertise `provider: design-to-code`.
- [ ] Advertise `visual_implementation` capability.
- [ ] Reference input/output contract paths.
- [ ] Include default review policy and evidence requirements.
- [ ] Keep the manifest generic enough for non-Javis orchestrators.

### Task 4: Add kanban provider adapter reference

**Objective:** Document how an agent/worker maps the generic contract into the existing D2C workflow.

**Files:**
- Create: `skills/design-to-code/references/kanban-provider-adapter.md`
- Modify: `skills/design-to-code/SKILL.md`

**Steps:**
- [ ] Explain the anti-coupling rule: D2C consumes contracts, not Javis tasks.
- [ ] Map task contract fields to existing D2C Intake Gate and Page Contract fields.
- [ ] Map D2C output evidence/debt to the result manifest.
- [ ] Add review routing rule: `review-required` output goes to review, not blocked.
- [ ] Update `SKILL.md` with a short optional "Capability Provider Mode" section that links this reference.

### Task 5: Add validation script and tests

**Objective:** Make contract files mechanically verifiable.

**Files:**
- Create: `scripts/validate-capability-contracts.mjs`
- Create: `tests/capability-contracts/contract-files.test.mjs`
- Modify: `package.json`

**Steps:**
- [ ] Script parses all JSON files in `skills/design-to-code/contracts` and `templates`.
- [ ] Test asserts required files exist and parse.
- [ ] Test asserts templates use `capability: visual_implementation`.
- [ ] Add npm script: `validate-contracts`.
- [ ] Run `npm test` and `npm run validate-contracts`.

### Task 6: Update runtime skill copy after source branch stabilizes

**Objective:** Keep the installed Hermes runtime skill synchronized only after the branch contract is verified.

**Files:**
- Source: `/mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code`
- Runtime: `/home/imjzq/.hermes/skills/design-to-code`

**Steps:**
- [ ] After tests pass and the branch diff is reviewed, sync the changed skill files to the runtime copy.
- [ ] Verify `skill_view(name="design-to-code")` shows the new Capability Provider Mode section.
- [ ] Do not sync half-complete contract files into runtime.

## Acceptance Criteria

- D2C has explicit input/output/provider contracts for `visual_implementation`.
- Normal standalone D2C usage still works without kanban metadata.
- Kanban/Javis can route work by capability contract instead of hard-coded skill identity.
- `review_required` is represented distinctly from `blocked`.
- Evidence, verification, debt, and review state are machine-readable in the result manifest.
- JSON contracts/templates parse and are covered by a lightweight test or validation command.

## Open Decisions

- Whether the first implementation should be schema-only JSON or full JSON Schema draft validation.
- Whether the provider manifest should live only inside `skills/design-to-code/` or also at repository root for external discovery.
- Whether D2C should expose a small CLI wrapper later, or remain purely skill/agent-contract based for the first slice.
