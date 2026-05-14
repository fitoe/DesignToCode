# Implementation Readiness Development Docs Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Add a PlanToDelivery-owned implementation readiness gate that generates and requires user confirmation for `docs/Development-Plan.md` and `docs/Development-Plan-Brief.md` before formal implementation for new, multi-page, or multi-module projects.

**Architecture:** This is a documentation/skill-contract feature, not runtime code in the first version. PlanToDelivery owns the gate and final Markdown generation. idea-to-design and IdeaToTech document their source responsibilities; design-to-code documents that the human-readable docs are context only and structured artifacts remain source of truth.

**Tech Stack:** Hermes skills, Markdown references/templates, existing JSON handoff artifacts (`implementation-blueprint.json`, `page-matrix.json`, `technical-decisions.json`, `feature-recipes.json`, `verification-matrix.json`).

---

## Source Design

Read first:

- `/mnt/c/Users/imjzq/Projects/DesignToCode/docs/superpowers/specs/2026-05-14-implementation-readiness-development-docs-design.md`

Key decisions:

- Final document generator: `PlanToDelivery / 贾维斯`.
- Output paths in downstream projects:
  - `docs/Development-Plan.md`
  - `docs/Development-Plan-Brief.md`
- Timing: last step before implementation / design-to-code.
- User confirmation: required before implementation starts.
- Detailed document depth: near-implementation plan.
- Brief length: 800-1200 words.
- Technical sections must come from IdeaToTech artifacts.
- No new `development-plan.json` in v1.

## Repositories and Runtime Copies

Known source repositories / skill locations:

- DesignToCode source: `/mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code`
- IdeaToDesign source: `/mnt/c/Users/imjzq/Projects/IdeaToDesign/idea-to-design`
- Runtime idea-to-design: `/home/imjzq/.hermes/skills/idea-to-design`
- Runtime design-to-code: `/home/imjzq/.hermes/skills/design-to-code`

PlanToDelivery and IdeaToTech source repositories may not be under obvious project paths. If source is unknown, patch the loaded runtime skill under `/home/imjzq/.hermes/skills/<skill-name>` and record that source sync is unresolved.

After editing any source skill file, sync the matching runtime copy and verify with `sha256sum`.

---

### Task 1: Add Development Docs Gate to PlanToDelivery main skill

**Objective:** Make the implementation readiness development docs gate visible in PlanToDelivery's default behavior.

**Files:**
- Modify preferred source if found: `PlanToDelivery/SKILL.md`
- Fallback modify: `/home/imjzq/.hermes/skills/PlanToDelivery/SKILL.md`

**Step 1: Locate the loaded skill path**

Use `skill_view(name='PlanToDelivery')` and inspect `skill_dir`.

Expected: currently loaded from `/home/imjzq/.hermes/skills/PlanToDelivery`.

**Step 2: Add gate summary near `Gate Checks`**

Insert this block after the existing `## Gate Checks` section or before `## Progress Reporting Standard`:

```md
## Development Docs Gate

Before entering formal implementation / execution for a new project, multi-page project, multi-route project, or single-page project with multiple core functional modules, generate and require user confirmation for:

- `docs/Development-Plan.md` — detailed near-implementation plan.
- `docs/Development-Plan-Brief.md` — 800-1200 word user/team review brief.

This gate is mandatory when the work involves real APIs, state management, permissions, uploads, charts, maps, AI chat, payments, streaming, complex forms, or a full idea-to-design + IdeaToTech planning handoff.

Do not require this gate for isolated bug fixes, one-off component tweaks, small visual repairs, or urgent fixes with an explicit user waiver.

For a final implementation-ready `Development-Plan.md`, technical sections must be traceable to `IdeaToTech` artifacts:

- `technical-decisions.json`
- `feature-recipes.json`
- `verification-matrix.json`

If these are missing, route to `IdeaToTech` before generating the final document, or record an explicit user waiver and mark the document as incomplete/non-final.

After generating the documents, ask the user to review and confirm them. Do not route to `design-to-code` or formal execution until the user approves or explicitly waives the gate.
```

**Step 3: Update routing notes**

In `Skill Routing` or `Low-Token Routing Protocol`, add:

```md
Before routing a qualifying project to `design-to-code`, run the Development Docs Gate. Use `idea-to-design` artifacts for page/visual scope and `IdeaToTech` artifacts for technical sections; `PlanToDelivery` owns the final Markdown docs and user confirmation.
```

**Step 4: Verify**

Run:

```bash
grep -n "Development Docs Gate\|Development-Plan" /home/imjzq/.hermes/skills/PlanToDelivery/SKILL.md
```

Expected: the new section and routing note appear.

---

### Task 2: Add PlanToDelivery templates for the two documents

**Objective:** Provide exact human-readable document templates that PlanToDelivery can use.

**Files:**
- Create preferred source if found: `PlanToDelivery/templates/development-plan-template.md`
- Create preferred source if found: `PlanToDelivery/templates/development-plan-brief-template.md`
- Fallback create:
  - `/home/imjzq/.hermes/skills/PlanToDelivery/templates/development-plan-template.md`
  - `/home/imjzq/.hermes/skills/PlanToDelivery/templates/development-plan-brief-template.md`

**Step 1: Create detailed template**

Write `development-plan-template.md`:

```md
# Development Plan

Status: <final|draft|incomplete|waived>
Generated at: <timestamp>
Owner: PlanToDelivery / 贾维斯
Gate result: <allowed|blocked|waived>

## 1. Source Artifacts

### Design Artifacts
- <path> — <status>

### Technical Artifacts
- `technical-decisions.json` — <status>
- `feature-recipes.json` — <status>
- `verification-matrix.json` — <status>

## 2. Project Goal

<one-sentence project goal>

## 3. Scope

### In Scope
- <item>

### Out of Scope
- <item>

### Assumptions / Waivers
- <item or none>

## 4. Pages and Routes

| Page | Route | Priority | Target Maturity | Sections | Visual Source | Open Debt |
|---|---|---:|---|---|---|---|
| <page_id> | <route> | <core/supporting> | <L0-L5> | <sections> | <path> | <ids> |

## 5. Core Functional Modules

| Module | User Goal | Pages/Components | Functional Maturity | Mock/Real Status |
|---|---|---|---|---|
| <module> | <goal> | <refs> | <F0-F5> | <mock|real|mixed> |

## 6. Technical Stack and Project Conventions

- Framework/platform:
- Package manager:
- Request layer:
- State layer:
- UI/styling layer:
- Routing:
- Mock layer:
- Test/verification layer:
- Env/config conventions:

## 7. Directory and File Plan

### Pages / Routes
- `<path>` — <purpose>

### Components
- `<path>` — <purpose>

### Services / Adapters
- `<path>` — <purpose>

### Stores / Composables
- `<path>` — <purpose>

### Types / Mocks / Tests / Assets
- `<path>` — <purpose>

## 8. Component and Page Breakdown

### Foundation Components
- <component> — <purpose>

### Page-local Components
- <component> — <purpose>

### Extract After Repetition
- <component> — <trigger>

### Deferred Components
- <component> — <reason>

## 9. API, State, and Mock-to-real Plan

### API Summary
- <endpoint/adapter> — <purpose/status>

### State Ownership
- <store/composable> — <owned state>

### Mock Acceptance
- <criterion>

### Real Completion Criteria
- <criterion>

### Required States
- Loading:
- Empty:
- Error:
- Permission:
- Offline/platform fallback:

## 10. Visual and Asset Strategy

- Approved visual source:
- Tokens/design system:
- Asset strategy:
- Fidelity targets:
- Accepted deviations:
- Open design debt:

## 11. Implementation Phases

### Phase 1: Foundation
Completion standard:
- <item>

### Phase 2: Coverage
Completion standard:
- <item>

### Phase 3: Functional Wiring
Completion standard:
- <item>

### Phase 4: Fidelity / Refinement
Completion standard:
- <item>

### Phase 5: Verification / Handoff
Completion standard:
- <item>

## 12. Checkpoints

| Checkpoint | Goal | Completion Standard | Evidence | Commit/Push |
|---|---|---|---|---|
| <name> | <goal> | <standard> | <screenshot/API/build/test> | <yes/no> |

## 13. Verification Strategy

- Mock acceptance:
- Local interaction acceptance:
- Real API acceptance:
- Visual parity acceptance:
- Build/lint/type/test policy:
- Release readiness checks:

## 14. Risks, Blockers, and Debt

### Blockers
- <item or none>

### High-risk Decisions
- <item or none>

### Deferred Items
- <item or none>

### Design Debt
- <item or none>

### Technical Debt
- <item or none>

## 15. Implementation Gate

| Requirement | Status | Evidence |
|---|---|---|
| Design artifacts current | <pass/fail/n/a> | <path> |
| IdeaToTech artifacts current | <pass/fail/n/a> | <path> |
| Development-Plan.md generated | <pass/fail> | `docs/Development-Plan.md` |
| Development-Plan-Brief.md generated | <pass/fail> | `docs/Development-Plan-Brief.md` |
| User confirmation recorded | <pass/fail/waived> | <note> |

Decision: <allowed|blocked|waived>
Next owner: <design-to-code|IdeaToTech|idea-to-design|PlanToDelivery>
```

**Step 2: Create brief template**

Write `development-plan-brief-template.md`:

```md
# Development Plan Brief

Status: <final|draft|incomplete|waived>
Generated at: <timestamp>
Owner: PlanToDelivery / 贾维斯

## Goal

<one paragraph: one-sentence goal plus current milestone result.>

## Scope

<short paragraph describing what will be built now, what is explicitly excluded, and any waiver.>

## Pages and Core Modules

- `<page/module>`: <one sentence about purpose, maturity target, and user value>.

## Technical Summary

<800-1200 word total document target. Summarize framework/platform, request layer, state layer, UI/styling, mock/real boundary, and verification approach. Technical claims must come from IdeaToTech artifacts. If any technical artifact is missing, mark this brief incomplete.>

## Implementation Order

1. Foundation: <summary>.
2. Coverage: <summary>.
3. Functional wiring: <summary>.
4. Fidelity/refinement: <summary>.
5. Verification/handoff: <summary>.

## Acceptance

<short paragraph covering visible page coverage, local interactions, mock vs real API acceptance, visual parity evidence, and build/lint/type/test policy.>

## Main Risks

- <risk/blocker/debt item>.

## User Review

Implementation must not start until the user confirms this brief and the detailed `docs/Development-Plan.md`, or explicitly waives the gate.
```

**Step 3: Verify**

Run:

```bash
wc -l /home/imjzq/.hermes/skills/PlanToDelivery/templates/development-plan-template.md /home/imjzq/.hermes/skills/PlanToDelivery/templates/development-plan-brief-template.md
```

Expected: both files exist and have non-zero line counts.

---

### Task 3: Add detailed PlanToDelivery reference for gate behavior

**Objective:** Keep main skill compact while documenting exact trigger and pass/fail rules.

**Files:**
- Create preferred source if found: `PlanToDelivery/references/development-docs-gate.md`
- Fallback create: `/home/imjzq/.hermes/skills/PlanToDelivery/references/development-docs-gate.md`

**Step 1: Write reference file**

```md
# Development Docs Gate

Use immediately before formal implementation / execution when the project qualifies.

## Qualifies When

Mandatory for:
- new projects;
- multi-page or multi-route projects;
- single-page work with multiple core functional modules;
- real API, state management, permission, upload, chart, map, AI chat, payment, streaming, complex form, or similar technical planning;
- full idea-to-design plus IdeaToTech handoff entering implementation.

Not mandatory for:
- isolated bug fixes;
- one-off component tweaks;
- small visual repairs;
- urgent fixes with explicit user waiver.

## Required Inputs

Design source inputs from idea-to-design:
- `Design-Spec.md` or equivalent;
- `implementation-blueprint.json`;
- `page-matrix.json`;
- `component-blueprint.json`;
- `debt-ledger.json`;
- `visual-source-contract.json`;
- `design-to-code-inputs/manifest.json` when UI fidelity matters.

Technical source inputs from IdeaToTech:
- `technical-decisions.json`;
- `feature-recipes.json`;
- `verification-matrix.json`.

Optional technical inputs:
- `api-contracts.json`;
- `state-management-plan.json`;
- `mock-to-real-plan.json`;
- `integration-plan.json`;
- `technical-spikes/*`.

## Required Outputs

- `docs/Development-Plan.md`
- `docs/Development-Plan-Brief.md`

## User Confirmation

After generating the documents, ask the user to review and approve. Do not route to `design-to-code` or start formal execution until approval or waiver is recorded.

## Status Rules

- `final`: all required design/technical artifacts exist, documents generated, user confirmed.
- `draft`: documents generated but user not confirmed yet.
- `incomplete`: missing required artifacts; cannot be implementation-ready.
- `waived`: user explicitly skipped part or all of the gate.

## Routing

- Missing design artifacts -> route to `idea-to-design`.
- Missing technical artifacts -> route to `IdeaToTech`.
- Documents missing -> PlanToDelivery generates them.
- User changes requested -> PlanToDelivery revises docs.
- User approved -> route to `design-to-code` or execution owner.
```

**Step 2: Link from main skill**

In PlanToDelivery progressive loading list, add:

```md
- `references/development-docs-gate.md` — required before implementation for new, multi-page, multi-module, or technically planned projects that need human-readable development docs.
```

**Step 3: Verify**

Run:

```bash
grep -n "development-docs-gate" /home/imjzq/.hermes/skills/PlanToDelivery/SKILL.md
```

Expected: link appears.

---

### Task 4: Update idea-to-design handoff documentation

**Objective:** Make it clear that idea-to-design must provide source fields for the Development Plan, but does not own final Markdown generation.

**Files:**
- Modify source: `/mnt/c/Users/imjzq/Projects/IdeaToDesign/idea-to-design/SKILL.md`
- Modify source: `/mnt/c/Users/imjzq/Projects/IdeaToDesign/idea-to-design/templates/level-3-handoff-pack.md`
- Sync to runtime:
  - `/home/imjzq/.hermes/skills/idea-to-design/SKILL.md`
  - `/home/imjzq/.hermes/skills/idea-to-design/templates/level-3-handoff-pack.md`

**Step 1: Update main skill Level 3 list**

In `SKILL.md`, after Level 3 includes list, add:

```md
For projects that will pass through PlanToDelivery's Development Docs Gate, Level 3 artifacts must expose enough information for `docs/Development-Plan.md` and `docs/Development-Plan-Brief.md`: page list, route intent, sections, visual source paths, component tiers, asset strategy, design debt, and implementation maturity targets. `idea-to-design` supplies these design/product inputs but does not generate the final development documents.
```

**Step 2: Update handoff pack template**

In `templates/level-3-handoff-pack.md`, add a section after Required Files or before State Rule:

```md
## Development Docs Gate Inputs

When PlanToDelivery must generate `docs/Development-Plan.md` and `docs/Development-Plan-Brief.md`, this handoff package is the source of design/product truth.

Required design fields for the development docs:
- page ids and route intents from `page-matrix.json`;
- page sections and maturity targets;
- approved visual source paths and visual source status;
- component tiers from `component-blueprint.json`;
- asset strategy and design-to-code input paths;
- open design debt from `debt-ledger.json`;
- must-preserve / forbidden drift rules from page briefs or visual contracts.

PlanToDelivery owns the final Markdown documents. Do not duplicate the full development plan here.
```

**Step 3: Sync runtime**

Run:

```bash
cp /mnt/c/Users/imjzq/Projects/IdeaToDesign/idea-to-design/SKILL.md /home/imjzq/.hermes/skills/idea-to-design/SKILL.md
cp /mnt/c/Users/imjzq/Projects/IdeaToDesign/idea-to-design/templates/level-3-handoff-pack.md /home/imjzq/.hermes/skills/idea-to-design/templates/level-3-handoff-pack.md
sha256sum /mnt/c/Users/imjzq/Projects/IdeaToDesign/idea-to-design/SKILL.md /home/imjzq/.hermes/skills/idea-to-design/SKILL.md
sha256sum /mnt/c/Users/imjzq/Projects/IdeaToDesign/idea-to-design/templates/level-3-handoff-pack.md /home/imjzq/.hermes/skills/idea-to-design/templates/level-3-handoff-pack.md
```

Expected: matching hashes per file pair.

---

### Task 5: Update IdeaToTech skill documentation

**Objective:** Make IdeaToTech outputs explicitly support the technical sections of the human-readable Development Plan.

**Files:**
- Preferred source if found: `IdeaToTech/SKILL.md`
- Fallback modify runtime: `/home/imjzq/.hermes/skills/IdeaToTech/SKILL.md`

**Step 1: Add Development Plan support section**

Add after `Default outcome` or near `Verification and Handoff`:

```md
## Development Plan Support

When PlanToDelivery's Development Docs Gate applies, IdeaToTech outputs are the required source for the technical sections of:

- `docs/Development-Plan.md`
- `docs/Development-Plan-Brief.md`

For a final implementation-ready Development Plan, at minimum provide:

- `technical-decisions.json`
- `feature-recipes.json`
- `verification-matrix.json`

These artifacts must expose enough information for human-readable planning: framework/platform, package manager, request layer, state layer, UI/styling layer, routing, mock layer, test/verification layer, env/config conventions by variable name only, file map, implementation order, API/state/mock-to-real strategy, acceptance criteria, and risks/blockers.

Do not put secret values, tokens, passwords, or private connection strings in any artifact.
```

**Step 2: Verify**

Run:

```bash
grep -n "Development Plan Support\|Development-Plan" /home/imjzq/.hermes/skills/IdeaToTech/SKILL.md
```

Expected: new section appears.

---

### Task 6: Update design-to-code consumption rules

**Objective:** Make design-to-code aware of the two human-readable docs without letting them replace structured artifacts.

**Files:**
- Modify source: `/mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code/SKILL.md`
- Modify source: `/mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code/references/main-skill-full-reference.md`
- Sync to runtime:
  - `/home/imjzq/.hermes/skills/design-to-code/SKILL.md`
  - `/home/imjzq/.hermes/skills/design-to-code/references/main-skill-full-reference.md`

**Step 1: Update Input Priority**

In `SKILL.md` under `## Input Priority`, change the list to include development docs as context after structured artifacts:

```md
1. `implementation-blueprint.json` + `page-matrix.json` + `component-blueprint.json` + `debt-ledger.json`
2. Technical artifacts when present: `technical-decisions.json`, `feature-recipes.json`, `verification-matrix.json`
3. Human-readable implementation context when present: `docs/Development-Plan.md`, `docs/Development-Plan-Brief.md`
4. Visual IR / section contract (`visual-ir/<page-id>.json`, `visual-contracts/*`, section crops)
5. Approved design images / Figma context / persisted mockups
6. Page briefs and prose notes

Human-readable development docs are review/context documents; they do not replace structured artifacts or approved visual sources.
```

**Step 2: Update full reference**

In `references/main-skill-full-reference.md`, near blueprint intake rules, add:

```md
When `docs/Development-Plan.md` or `docs/Development-Plan-Brief.md` exist, use them as human-readable scope and checkpoint context after reading the structured blueprint and technical artifacts. Do not implement from those Markdown documents alone; `implementation-blueprint.json`, page matrix, component blueprint, technical decisions, feature recipes, verification matrix, and approved visual sources remain the source of truth.
```

**Step 3: Sync runtime and verify**

Run:

```bash
cp /mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code/SKILL.md /home/imjzq/.hermes/skills/design-to-code/SKILL.md
cp /mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code/references/main-skill-full-reference.md /home/imjzq/.hermes/skills/design-to-code/references/main-skill-full-reference.md
sha256sum /mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code/SKILL.md /home/imjzq/.hermes/skills/design-to-code/SKILL.md
sha256sum /mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code/references/main-skill-full-reference.md /home/imjzq/.hermes/skills/design-to-code/references/main-skill-full-reference.md
```

Expected: matching hashes per file pair.

---

### Task 7: Add plan references to README or release notes where appropriate

**Objective:** Record the feature in DesignToCode docs if DesignToCode source was touched.

**Files:**
- Modify: `/mnt/c/Users/imjzq/Projects/DesignToCode/RELEASE_NOTES.md`

**Step 1: Add release note entry**

Add a small entry near the top:

```md
## Unreleased

- Added implementation readiness development-docs context rules: `docs/Development-Plan.md` and `docs/Development-Plan-Brief.md` may be used as human-readable scope/checkpoint context, but structured handoff and technical artifacts remain source of truth.
```

If `Unreleased` already exists, append the bullet under it.

**Step 2: Verify**

Run:

```bash
grep -n "Development-Plan\|development-docs" /mnt/c/Users/imjzq/Projects/DesignToCode/RELEASE_NOTES.md
```

Expected: release note appears.

---

### Task 8: Commit relevant source changes only

**Objective:** Commit the implementation plan and later skill changes without including unrelated dirty files.

**Files:**
- Add this plan file.
- Add only touched skill/docs files from this feature.

**Step 1: Check status**

Run:

```bash
git -C /mnt/c/Users/imjzq/Projects/DesignToCode status --short
```

Expected: there may already be unrelated dirty skill files from earlier work. Do not blindly add all.

**Step 2: Commit this implementation plan now**

Run:

```bash
git -C /mnt/c/Users/imjzq/Projects/DesignToCode add -f docs/superpowers/plans/2026-05-14-implementation-readiness-development-docs.md
git -C /mnt/c/Users/imjzq/Projects/DesignToCode commit -m "docs: plan implementation readiness development docs" -- docs/superpowers/plans/2026-05-14-implementation-readiness-development-docs.md
```

Expected: commit succeeds.

**Step 3: For later implementation commits**

When executing the plan, commit only the relevant files:

```bash
git -C /mnt/c/Users/imjzq/Projects/DesignToCode add skills/design-to-code/SKILL.md skills/design-to-code/references/main-skill-full-reference.md RELEASE_NOTES.md
git -C /mnt/c/Users/imjzq/Projects/DesignToCode commit -m "docs: consume implementation readiness development docs"
```

Commit IdeaToDesign changes in the IdeaToDesign repo separately.

For runtime-only PlanToDelivery / IdeaToTech changes, report paths changed and note that source sync was unresolved unless source repos were found.

---

## Final Verification

After all tasks are implemented:

1. `skill_view(name='PlanToDelivery')` includes Development Docs Gate.
2. `skill_view(name='idea-to-design')` includes Development Docs Gate input responsibility.
3. `skill_view(name='IdeaToTech')` includes Development Plan Support.
4. `skill_view(name='design-to-code')` lists the Markdown docs as context, not source of truth.
5. Runtime copies match source copies for IdeaToDesign and DesignToCode edited files.
6. Git commits exist for changed source repositories.

## Execution Handoff

Plan complete and saved. Ready to execute using subagent-driven-development or direct task-by-task edits. Because this mostly changes skill Markdown and templates, a single careful implementation pass is acceptable, followed by source/runtime hash verification and git commits.
