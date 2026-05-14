# Implementation Readiness Development Docs Design

Date: 2026-05-14
Status: approved design, pending implementation plan
Owner skill: PlanToDelivery / 贾维斯
Related skills: idea-to-design, IdeaToTech, design-to-code

## Purpose

Before a planned project moves into implementation, PlanToDelivery should produce two human-readable development documents:

- `docs/Development-Plan.md` — detailed, near-implementation plan.
- `docs/Development-Plan-Brief.md` — 800-1200 word review brief.

These documents are for users, product owners, project reviewers, and team handoff. They do not replace the machine-readable artifacts used by implementation agents.

## Key Decision

Use the lightweight Markdown aggregation approach.

PlanToDelivery generates both Markdown documents immediately before entering implementation. It reads existing design and technical artifacts, summarizes them into human-readable form, asks the user to confirm the documents, and only then routes to execution / design-to-code.

No new `development-plan.json` artifact is required in the first version.

## Ownership

### PlanToDelivery

PlanToDelivery owns the final document generation and gate:

- detect whether the Development Docs Gate applies;
- verify required design and technical artifacts;
- generate `docs/Development-Plan.md`;
- generate `docs/Development-Plan-Brief.md`;
- ask the user to confirm the documents;
- record pass/fail/waiver in the implementation gate;
- route to the next owner after confirmation.

### idea-to-design

idea-to-design supplies the design and product inputs:

- product/design spec;
- page inventory;
- routes;
- page sections;
- approved visual sources;
- component blueprint;
- visual contracts;
- asset strategy;
- design debt.

It does not own the final development documents.

### IdeaToTech

IdeaToTech supplies the technical inputs:

- `technical-decisions.json`;
- `feature-recipes.json`;
- `verification-matrix.json`;
- optional API, state, mock-to-real, integration, and spike artifacts.

The technical parts of `Development-Plan.md` must come from these formal artifacts. If they are missing, PlanToDelivery cannot produce a final implementation-ready document.

### design-to-code

design-to-code may read the two development documents as context, but its primary implementation inputs remain the machine-readable artifacts:

- `implementation-blueprint.json`;
- `page-matrix.json`;
- `component-blueprint.json`;
- `debt-ledger.json`;
- `technical-decisions.json`;
- `feature-recipes.json`;
- `verification-matrix.json`.

It must not skip these artifacts just because the human-readable development documents exist.

## Trigger Rules

The Development Docs Gate is mandatory for:

- new projects;
- multi-page or multi-route projects;
- single-page work that contains multiple core functional modules;
- work involving real APIs, state management, permissions, uploads, charts, maps, AI chat, payments, streaming, complex forms, or similar technical planning;
- any project moving from complete design and technical planning into formal implementation.

The gate is not mandatory for:

- one-off component tweaks;
- isolated bug fixes;
- small visual repairs;
- single-purpose code changes;
- urgent fixes where the user explicitly waives the gate.

If waived, PlanToDelivery must record why the documents were skipped.

## Timing

The documents are generated at the last step before implementation, not immediately after design or technical planning.

Typical flow:

1. idea-to-design completes design handoff.
2. IdeaToTech completes technical blueprint.
3. PlanToDelivery reaches implementation readiness.
4. PlanToDelivery checks the Development Docs Gate.
5. PlanToDelivery generates both Markdown documents.
6. User reviews and confirms them.
7. PlanToDelivery routes to design-to-code or other execution owner.

## Hard Requirements

For a final `docs/Development-Plan.md`, these technical artifacts are required:

- `technical-decisions.json`;
- `feature-recipes.json`;
- `verification-matrix.json`.

If any are missing:

- PlanToDelivery must route to IdeaToTech, or
- the user must explicitly waive the technical gate.

Without a waiver, PlanToDelivery may only create an incomplete draft. That draft must not be treated as implementation-ready.

## User Confirmation Gate

After generating the documents, PlanToDelivery must ask the user to review and confirm them before implementation begins.

The user may approve, request changes, or explicitly waive parts of the plan. Approval or waiver must be recorded before execution starts.

## `docs/Development-Plan.md` Structure

The detailed document is a near-implementation plan. It should include:

1. Document status
   - final / draft / incomplete / waived;
   - generated time;
   - source artifact list;
   - gate result.

2. Project goal
   - one-sentence goal;
   - milestone goal;
   - success criteria.

3. Scope
   - in scope;
   - out of scope;
   - waivers and assumptions.

4. Pages and routes
   - page id;
   - route;
   - priority;
   - maturity target;
   - first-screen priority;
   - sections;
   - visual source;
   - open design debt.

5. Core functional modules
   - module name;
   - user goal;
   - related pages/components;
   - functional maturity target;
   - mock or real status.

6. Technical stack and conventions
   - framework/platform;
   - package manager;
   - request layer;
   - state layer;
   - UI/styling layer;
   - routing;
   - mock layer;
   - test and verification layer;
   - env/config conventions.

7. Directory and file plan
   - pages/routes;
   - components;
   - services/adapters;
   - stores/composables;
   - types;
   - mocks;
   - tests;
   - assets.

8. Component and page breakdown
   - foundation components;
   - page-local components;
   - repeated components to extract later;
   - deferred components.

9. API, state, and mock-to-real plan
   - API contract summary;
   - state ownership;
   - adapter seams;
   - mock acceptance;
   - real API completion criteria;
   - loading, empty, error, permission, and offline states.

10. Visual and asset strategy
    - approved visual source;
    - tokens/design system;
    - assets;
    - fidelity targets;
    - accepted deviations;
    - open debt.

11. Implementation phases
    - foundation;
    - coverage;
    - functional wiring;
    - fidelity/refinement;
    - verification/handoff.

12. Checkpoints
    - checkpoint goal;
    - completion standard;
    - screenshot/API/build/test evidence when applicable;
    - commit/push expectations when applicable.

13. Verification strategy
    - mock acceptance;
    - local interaction acceptance;
    - real API acceptance;
    - visual parity acceptance;
    - build/lint/type/test policy;
    - release readiness checks.

14. Risks, blockers, and debt
    - blockers;
    - high-risk decisions;
    - deferred items;
    - design debt;
    - technical debt.

15. Implementation Gate
    - required artifacts pass/fail;
    - allowed or blocked;
    - next owner;
    - waiver if any.

## `docs/Development-Plan-Brief.md` Structure

The brief is 800-1200 words. It should let the user or team quickly review the plan without reading the full document.

It should include:

1. one-sentence project goal;
2. implementation scope;
3. pages/modules summary, with at least one sentence per page or core module;
4. technical summary;
5. implementation order;
6. acceptance strategy;
7. main risks and blockers.

The brief should be concise but not minimal. It is a review document, not a machine-readable execution index.

## Gate Behavior

When the gate applies, PlanToDelivery should evaluate:

- Are design artifacts available and current?
- Are technical artifacts available and current?
- Can the technical sections be traced to IdeaToTech outputs?
- Do both Markdown documents exist?
- Are both documents final or explicitly waived?
- Has the user confirmed the generated documents?

If any required item fails, the gate is blocked unless there is an explicit user waiver.

## Non-goals

This feature does not:

- replace `implementation-blueprint.json` or other structured artifacts;
- introduce `development-plan.json` in the first version;
- make idea-to-design or IdeaToTech responsible for final Markdown documents;
- require development docs for every bug fix or micro-change;
- allow design-to-code to implement from human-readable prose only.

## Risks

- The detailed document could duplicate structured artifacts. Mitigation: treat Markdown as human review material and keep structured files as source of truth.
- The gate could slow small tasks. Mitigation: trigger only for new projects, multi-module work, or formal implementation handoff.
- Technical sections could be guessed. Mitigation: require IdeaToTech artifacts for final status.
- Users may approve the brief without reading the full plan. Mitigation: the brief must clearly surface scope, risks, and mock/real boundaries.

## Acceptance Criteria

The feature is successful when:

- PlanToDelivery has a documented Development Docs Gate;
- templates exist for both Markdown documents;
- idea-to-design and IdeaToTech document their source responsibilities;
- design-to-code documents how it consumes these docs without replacing structured artifacts;
- implementation cannot proceed through the mandatory gate until the docs are generated and user-confirmed or explicitly waived.
