# DesignToCode

[![Release](https://img.shields.io/github/v/release/fitoe/DesignToCode)](https://github.com/fitoe/DesignToCode/releases)
[![Skill](https://img.shields.io/badge/agent--skill-DesignToCode-f97316)](#)
[![Provider](https://img.shields.io/badge/Javis%20%2F%20PlanToDelivery-Kanban%20Provider-0ea5e9)](#)

**DesignToCode turns approved visual sources into high-fidelity frontend implementation.**

It is an agent skill for teams that care about visual parity, maintainable UI code, and evidence-based delivery. Instead of “make something similar,” DesignToCode asks for a confirmed visual handoff, writes an implementation brief, builds inside the target project, and verifies the result with screenshots.

## Install

```bash
npx skills add fitoe/DesignToCode
```

## Why it is useful

- Convert sectioned screenshots or approved visual sources into frontend code.
- Preserve layout hierarchy, spacing, media roles, and visual anchors.
- Map designs onto the target project’s existing components and conventions.
- Handle missing assets through explicit fulfillment strategies instead of placeholders.
- Verify implementation with Playwright screenshots and parity reports.

## Kanban provider mode

DesignToCode is a **Javis / PlanToDelivery V2 visual implementation provider**.

Through `contracts/provider-manifest.json`, it exposes:

- `visual_implementation`

When orchestrated by PlanToDelivery, DesignToCode only works on approved handoffs: visual source, Visual IR, page contract, Level-3 design package, or technical plan references. PlanToDelivery owns canonical Kanban gates, review, provider routing, and progress; DesignToCode owns the active implementation slice, screenshots, parity evidence, and debt report.

```text
approved design handoff -> DesignToCode -> code + screenshot evidence
                 ^
                 |
        PlanToDelivery Kanban gates
```

## What is inside

- `skills/design-to-code/SKILL.md` — the runtime skill kernel
- `contracts/` — provider and visual implementation contracts
- `docs/provider-collaboration-v2.md` — cross-provider boundaries
- asset tools for scanning, optimizing, atlas cropping, and design-input validation

## Best fit

- marketing pages
- landing pages
- dashboards
- product feature pages
- high-fidelity UI rebuilds from approved visual references

## Design philosophy

DesignToCode is not a Figma-node-to-code exporter. It is a disciplined visual implementation workflow for agentic development: understand first, brief before coding, implement inside the real project, then prove parity with evidence.
