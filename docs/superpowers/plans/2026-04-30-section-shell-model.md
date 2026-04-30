# Section Shell Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Teach the `design-to-code` skill to recognize full-bleed section shells with centered inner containers, so layouts no longer collapse those sections into page-width-only heroes.

**Architecture:** Update the skill's reasoning docs, not runtime code. Add shell terminology to the main skill, expand the layer model and cross-section rules, and make the pre-implementation brief plus verification checklist explicitly call out shell coverage and inner-container alignment. Keep taxonomy changes minimal and conditional on visual evidence.

**Tech Stack:** Markdown docs, existing `design-to-code` skill references, Git.

---

### Task 1: Update core section reasoning

**Files:**
- Modify: `skills/design-to-code/SKILL.md`
- Modify: `skills/design-to-code/references/layer-stack-model.md`
- Modify: `skills/design-to-code/references/section-boundary-and-cross-section-rules.md`

- [ ] **Step 1: Add shell terminology to the main skill**

Add a new shell-aware phrasing in the analysis section so each section can be reasoned about as `section shell -> inner container -> content stack` when the visual evidence supports it.

- [ ] **Step 2: Update the layer model**

Extend the layer stack rules so `base-background` and `decorative-overlay` can live at shell scope, while `text-content` and semantic media stay in the inner container.

- [ ] **Step 3: Update cross-section rules**

Add explicit guidance that full-bleed shells, decorative bleed, and section-wide background continuity should be treated jointly when the shell spans multiple sections or contains a full-width background field.

- [ ] **Step 4: Verify the diff**

Run:

```bash
git diff -- skills/design-to-code/SKILL.md skills/design-to-code/references/layer-stack-model.md skills/design-to-code/references/section-boundary-and-cross-section-rules.md
```

Expected:
- section-shell terminology appears exactly once in the main analysis path
- shell scope is clearly distinct from inner container scope
- no unrelated wording changes

### Task 2: Update pre-implementation and verification language

**Files:**
- Modify: `skills/design-to-code/references/pre-implementation-brief.md`
- Modify: `skills/design-to-code/references/playwright-section-diff.md`
- Modify: `skills/design-to-code/references/visual-checklist.md`

- [ ] **Step 1: Make shell layout explicit in the brief**

Add a note in `Section Breakdown` or `Layout Implementation Plan` that shell-based sections must state:

```md
- section shell scope
- inner container scope
- whether the background is shell-owned or content-owned
```

- [ ] **Step 2: Tighten diff verification**

Add shell-specific failure cases for:

```md
- shell collapsed into boxed container
- background field missing at viewport width
- inner container no longer aligned to canonical page width
```

- [ ] **Step 3: Add shell checks to the visual checklist**

Add checklist items that confirm full-bleed backgrounds, stable inner alignment, and no accidental loss of shell-level decoration.

- [ ] **Step 4: Verify the diff**

Run:

```bash
git diff -- skills/design-to-code/references/pre-implementation-brief.md skills/design-to-code/references/playwright-section-diff.md skills/design-to-code/references/visual-checklist.md
```

Expected:
- the brief now asks for shell scope explicitly
- verification catches shell-vs-container mistakes
- the checklist can be applied without extra interpretation

### Task 3: Optional taxonomy clarification

**Files:**
- Modify: `skills/design-to-code/references/section-taxonomy.md`

- [ ] **Step 1: Add a small shell-aware cue**

Clarify that `hero`, `feature-split`, and `cta-band` may use a full-bleed shell with a centered inner container when the visual evidence supports it.

- [ ] **Step 2: Verify no taxonomy drift**

Run:

```bash
git diff -- skills/design-to-code/references/section-taxonomy.md
```

Expected:
- only a small cue update, no new section types, no abstract overhaul

### Task 4: Review and commit

**Files:**
- Modify: `skills/design-to-code/SKILL.md`
- Modify: `skills/design-to-code/references/layer-stack-model.md`
- Modify: `skills/design-to-code/references/section-boundary-and-cross-section-rules.md`
- Modify: `skills/design-to-code/references/pre-implementation-brief.md`
- Modify: `skills/design-to-code/references/playwright-section-diff.md`
- Modify: `skills/design-to-code/references/visual-checklist.md`
- Optional modify: `skills/design-to-code/references/section-taxonomy.md`

- [ ] **Step 1: Run a full diff review**

Run:

```bash
git diff -- skills/design-to-code/SKILL.md skills/design-to-code/references/*.md
```

Expected:
- all shell-related language is consistent
- no unrelated docs changed
- no placeholder text introduced

- [ ] **Step 2: Commit the implementation**

Run:

```bash
git add skills/design-to-code/SKILL.md skills/design-to-code/references/*.md
git commit -m "docs: add section shell model guidance"
```

Expected:
- one commit containing only the section-shell documentation update
