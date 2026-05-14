# DesignToCode Mobile Recomposition Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Update the DesignToCode skill so desktop-only source designs get a formal Mobile Recomposition Pass instead of mechanical one-column mobile adaptation.

**Architecture:** Keep the main `SKILL.md` as the low-token entrypoint. Add compact mobile modes, workflow hooks, reporting requirements, and common pitfalls in `SKILL.md`; move detailed mobile recomposition rules and Mobile IR schema into a new reference file. Preserve existing uncommitted user changes in DesignToCode by staging only the mobile recomposition hunks when committing.

**Tech Stack:** Markdown skill files in `/mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code`, runtime sync to `/mnt/c/Users/imjzq/.agents/skills/design-to-code`, git for source commits.

---

## Current Context

Design spec:
- `docs/superpowers/specs/2026-05-14-mobile-recomposition-design.md`

Primary source files:
- `skills/design-to-code/SKILL.md`
- `skills/design-to-code/references/mobile-recomposition.md` (new)

Runtime sync target:
- `/mnt/c/Users/imjzq/.agents/skills/design-to-code`

Existing source state before implementation:
- The repository already has unrelated uncommitted changes in:
  - `skills/design-to-code/SKILL.md`
  - `skills/design-to-code/references/asset-atlas-generation.md`
  - `skills/design-to-code/references/high-fidelity-rules.md`
- Do not overwrite, revert, or commit unrelated changes.
- When committing this plan's implementation, stage only the new mobile recomposition content.

## Task 1: Add the detailed mobile recomposition reference

**Objective:** Create a reference document with the full Mobile Recomposition Pass rules and Mobile IR schema.

**Files:**
- Create: `skills/design-to-code/references/mobile-recomposition.md`

**Step 1: Create the reference file**

Use this content:

```markdown
# Mobile Recomposition

Use when a page is implemented from a desktop/PC-first design source but mobile output must feel intentionally composed rather than mechanically stacked.

## Core Principle

PC high fidelity does not mean mobile mechanical replication. Preserve design intent, brand language, hierarchy, critical content, CTA priority, and trust signals; recompose layout for mobile scroll rhythm and touch usability.

## Mobile Modes

- `responsive-basic`: small changes, admin/backoffice, non-core pages. Ensure no overflow and usable controls, but do not claim strong mobile conversion quality.
- `mobile-recomposition`: default for desktop-only websites, B2B pages, marketing pages, product pages, and landing sections that need good mobile output.
- `mobile-strict`: homepage, core landing page, mobile-heavy page, complex mobile composition, or repeated mobile failure. Requires Mobile IR.
- `mobile-repair`: existing implementation is too long, too single-column, overflowing, or mechanically adapted. Fix the largest 1-3 mobile issues first.

## Standard Passes

1. Desktop Fidelity Pass
   - implement credible desktop layout first;
   - inventory visible content and section anchors;
   - do not let desktop grid, coordinates, gap, or image ratios automatically define mobile.

2. Mobile Recomposition Pass
   For each section classify: section type, item count, content density, visual priority, primary action, scroll cost, touch needs, and compression options.

3. Mobile Acceptance Pass
   Check design intent, critical content, non-mechanical layout, scroll rhythm, touch usability, no horizontal overflow, and accepted deviations.

## Section Strategies

### Hero / CTA / Core Selling Point

- preserve headline, primary CTA, core trust signal, and brand mood;
- use text-first mobile layout unless the visual is the main conversion object;
- convert desktop side-by-side composition into stacked, background, cropped, or simplified composition;
- reduce decorative layers that compete with first-screen content;
- keep primary CTA visible early.

### Product / Service / Case Cards

- preserve product/service names and decision-making details;
- line-clamp long descriptions;
- reduce secondary tags;
- choose compact single-column cards, horizontal scrollers, featured + carousel, or expansion based on density;
- avoid full desktop card height and spacing on mobile.

### Features / Stats / Logos / Trust Grids

- do not default to one-column lists;
- icon + title + short copy: use 2-column compact grid;
- stats/logos/trust markers: use 2-3 columns, logo cloud, chips, or stat clusters;
- 8+ repeated items: group, horizontal scroll, show more, or show selected first 4-6;
- compress padding, shadow, and card height.

### Forms / Filters / Navigation / Controls

- prioritize usability over visual replication;
- touch targets should be at least 44px where possible;
- keep labels, errors, and submit action clear;
- convert filters to drawer/bottom sheet when needed;
- ensure sticky/fixed UI does not block content or CTA.

### Long Content / FAQ / Specs

- use accordions, grouping, summaries, or progressive disclosure;
- avoid direct desktop tables that overflow;
- preserve critical legal, pricing, limitation, safety, and risk details.

## Grid Density Rules

Never mechanically convert desktop repeated grids:

- PC 4x1 -> mobile 1x4
- PC 4x2 -> mobile 1x8
- PC 3x2 -> mobile 1x6

Classify item density instead:

| Density | Content | Mobile Strategy |
|---|---|---|
| Ultra-light | icon/number/logo + label | 2-3 columns, chips, mini-cards, logo cloud |
| Light card | icon + title + 1-2 lines | 2-column compact grid; 4 -> 2x2, 6 -> 2x3 |
| Medium card | image/icon + title + 2-3 lines + optional tags | compact one-column, horizontal scroller, or readable 2-column only if it still works |
| Heavy card | large image + long copy + tags/CTAs | featured + carousel, horizontal scroll, expansion, or detail page |
| 8+ repeated entries | many repeated cards/items | group, horizontal scroll, show more, selected first 4-6, or accordion |

## Content Compression Rules

Record accepted deviations or mobile notes when content is removed from immediate view.

Must preserve:
- page title, section title, core selling points, primary CTA;
- product/service names and critical conversion details;
- key certification, customer proof, trust indicators, stats;
- legal, compliance, pricing, limitation, safety, and risk details;
- required form fields and errors.

May summarize:
- long descriptions, case summaries, parameter previews, FAQ previews, card body text.

May fold:
- technical specs, long feature lists, large logo/category groups, long FAQ lists, secondary parameters.

May hide or re-express:
- decorative desktop layers, repeated badges, low-priority secondary CTAs, non-essential balance icons, excessive borders/shadows/textures.

## Mobile IR Escalation

Create or update Mobile IR when:
- the page is homepage or a core landing page;
- the user says mobile is important;
- mobile-recomposition still feels heavy/mechanical after two repair loops;
- desktop-only source has high mobile business value;
- the page has complex hero, grids, product cards, forms, or interactions.

Minimum Mobile IR:

```json
{
  "page_id": "homepage",
  "source": "desktop-design-only",
  "mobile_mode": "mobile-strict",
  "viewports": [375, 390, 414, 768],
  "sections": [
    {
      "name": "hero",
      "desktop_source_ref": "section-hero",
      "mobile_strategy": "recompose",
      "priority": "critical",
      "must_preserve": ["headline", "primary CTA", "trust badge", "brand mood"],
      "may_summarize": ["subtitle"],
      "may_hide": ["decorative background rings"],
      "layout": {
        "mobile": "text-first, visual-second",
        "tablet": "two-column if width allows"
      },
      "acceptance": [
        "primary CTA visible within first screen on 390px",
        "no horizontal overflow",
        "hero height does not exceed 85vh unless content requires it"
      ]
    }
  ],
  "global_mobile_rules": [
    "touch targets >= 44px",
    "no horizontal overflow at 320px",
    "avoid mechanical 1-column conversion for repeated grids"
  ]
}
```

## Evidence

When mobile work is in scope, report:
- mobile mode;
- viewports checked, usually 390/414/768 and 320 when risk exists;
- section result PASS/WARN/FAIL;
- grid decisions;
- accepted deviations;
- remaining mobile debt;
- screenshots or browser evidence.
```

**Step 2: Verify file exists**

Run:

```bash
test -f skills/design-to-code/references/mobile-recomposition.md
```

Expected: exit 0.

## Task 2: Add mobile modes to `SKILL.md`

**Objective:** Extend the Fidelity Modes section with mobile-specific modes.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`, around `## Fidelity Modes`

**Step 1: Insert mobile mode bullets**

After the existing `asset` bullet, add:

```markdown
- `responsive-basic`: small changes, admin/backoffice, or non-core pages; ensure no overflow and usable controls, but do not claim strong mobile conversion quality.
- `mobile-recomposition` (default when only a PC/desktop design exists but mobile quality matters): first preserve desktop design intent, then recompose mobile layout by section type, content density, scroll rhythm, and touch usability.
- `mobile-strict`: homepage, core landing page, mobile-heavy page, complex responsive composition, or repeated mobile failure; create or update Mobile IR before claiming mobile quality.
- `mobile-repair`: existing mobile implementation is too long, too single-column, overflowing, or mechanically adapted; fix the largest 1-3 mobile experience issues first.
```

**Step 2: Add mode guidance sentence**

After the paragraph that starts `In standard-fidelity`, add:

```markdown
When the source is desktop-only, do not treat mobile as a pixel-shrunk desktop. Use `mobile-recomposition` unless the task is clearly `responsive-basic`; escalate to `mobile-strict` when a core page needs a recoverable Mobile IR or repeated mobile repair fails.
```

**Step 3: Verify insertion**

Run:

```bash
grep -n "mobile-recomposition" skills/design-to-code/SKILL.md
```

Expected: at least two matches.

## Task 3: Update the default workflow for mobile recomposition

**Objective:** Make mobile recomposition part of the workflow without replacing existing desktop fidelity work.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`, around `## Default Workflow`

**Step 1: Replace the workflow list**

Replace the existing six-item workflow with:

```markdown
1. **Intake**: identify source of truth, target routes/files, framework constraints, current maturity target, and mobile mode.
2. **Foundation**: map tokens/shell/base components before page-specific polish.
3. **Coverage**: make every in-scope route/page visibly present before deep fidelity work.
4. **Desktop Fidelity Pass**: preserve the approved desktop/source design, section order, visible content inventory, and major visual hierarchy.
5. **Section Anchors**: add stable `data-section` markers for key sections.
6. **Mobile Recomposition Pass**: when mobile is in scope and the source is PC/desktop-first, recompose sections by type and content density instead of mechanically stacking desktop grids.
7. **Fidelity Loop**: compare source vs implementation by section; fix the largest 1-3 gaps per pass.
8. **Mobile Acceptance Pass**: check no horizontal overflow, mobile scroll rhythm, touch usability, non-mechanical repeated grids, and accepted deviations for 390/414/768 or relevant project viewports.
9. **Handoff**: report page maturity, mobile mode, evidence, debt, and deviations.
```

**Step 2: Verify workflow terms**

Run:

```bash
grep -n "Mobile Recomposition Pass\|Mobile Acceptance Pass\|Desktop Fidelity Pass" skills/design-to-code/SKILL.md
```

Expected: all three terms appear.

## Task 4: Add compact mobile recomposition rules to `SKILL.md`

**Objective:** Add a compact entrypoint section that points to the detailed reference and contains the hard rules agents must see immediately.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`

**Step 1: Insert new section after `## Source Content Inventory`**

Add:

```markdown
## Mobile Recomposition Pass

When only a PC/desktop design exists, PC high fidelity does not mean mobile mechanical replication. Preserve design intent, hierarchy, brand language, critical content, CTA priority, and trust signals; recompose layout for mobile scroll rhythm and touch usability.

Default to `mobile-recomposition` for desktop-only websites, B2B pages, marketing pages, product pages, and landing sections that need good mobile output. Use `responsive-basic` only for small changes, admin/backoffice, or non-core pages. Escalate to `mobile-strict` and create Mobile IR for homepage/core landing pages, mobile-heavy pages, complex mobile composition, or repeated mobile failure.

Hard rules:
- do not preserve desktop coordinates, large gaps, side-by-side layout, or image ratios blindly on mobile;
- do not convert desktop 4×1, 4×2, or 3×2 grids into long one-column lists by default;
- classify repeated items by content density before choosing 2-column grid, 2-3 column stats/logo layout, compact one-column card, horizontal scroller, featured carousel, grouping, or show-more;
- preserve critical content, CTA, trust proof, legal/pricing/risk details, and required form information;
- summarize/fold/hide only secondary or decorative content, and record accepted mobile deviations;
- validate mobile with scroll rhythm, touch usability, no horizontal overflow, and section-level evidence, not just CSS breakpoints.

For detailed density rules, content compression rules, and Mobile IR schema, load `references/mobile-recomposition.md`.
```

**Step 2: Verify section exists**

Run:

```bash
grep -n "## Mobile Recomposition Pass" skills/design-to-code/SKILL.md
```

Expected: one match.

## Task 5: Add mobile reporting requirements

**Objective:** Ensure handoff reports include mobile adaptation evidence when mobile work is in scope.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`, around `## Required Output Evidence`

**Step 1: Add bullets after the existing evidence list**

After `verification actually run; do not claim checks that were skipped`, add:

```markdown

When mobile work is in scope, also report:
- mobile mode: `responsive-basic`, `mobile-recomposition`, `mobile-strict`, or `mobile-repair`;
- viewports checked, usually 390/414/768 plus 320 when narrow overflow risk exists;
- section mobile results: PASS/WARN/FAIL for hero, grids, cards, CTA, forms, or other major sections;
- grid decisions such as "8 feature cards -> 2-column compact grid" or "6 case cards -> horizontal scroller";
- accepted mobile deviations such as decorative layer removed, description line-clamped, or secondary tags folded;
- remaining mobile debt and evidence paths/screenshots.
```

**Step 2: Verify reporting bullets**

Run:

```bash
grep -n "When mobile work is in scope" skills/design-to-code/SKILL.md
```

Expected: one match.

## Task 6: Update progressive loading and pitfalls

**Objective:** Make the new reference discoverable and add anti-patterns for mechanical mobile adaptation.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`

**Step 1: Add reference to progressive loading**

In `## Progressive Loading`, add:

```markdown
- `references/mobile-recomposition.md` — required when desktop/PC-only source must produce good mobile output, mobile feels mechanical/too long, repeated grids collapse to one column, or `mobile-strict` Mobile IR is needed
```

**Step 2: Add pitfall rows**

In `## Common Pitfalls`, add:

```markdown
| Treating PC fidelity as fixed mobile coordinates | Preserve intent and hierarchy, but run Mobile Recomposition Pass for desktop-only sources |
| Converting every desktop repeated grid to one-column mobile | Classify item density; use 2-column compact grids, 2-3 column stats/logos, horizontal scrollers, grouping, or show-more where appropriate |
| Stacking all desktop content until mobile becomes too long | Preserve critical content; summarize, fold, or re-express secondary content with accepted deviations |
| Checking only for no horizontal overflow | Also verify scroll rhythm, touch usability, CTA visibility, and non-mechanical grid density |
| Letting decorative desktop layers dominate mobile first screen | Reduce or re-express decorative layers so headline, CTA, and trust signals stay prominent |
```

**Step 3: Verify references and pitfalls**

Run:

```bash
grep -n "mobile-recomposition.md\|fixed mobile coordinates\|one-column mobile" skills/design-to-code/SKILL.md
```

Expected: multiple matches.

## Task 7: Validate and sync runtime copy

**Objective:** Verify markdown/frontmatter, then sync source changes to the runtime skill directory.

**Files:**
- Source: `skills/design-to-code/SKILL.md`
- Source: `skills/design-to-code/references/mobile-recomposition.md`
- Runtime: `/mnt/c/Users/imjzq/.agents/skills/design-to-code/SKILL.md`
- Runtime: `/mnt/c/Users/imjzq/.agents/skills/design-to-code/references/mobile-recomposition.md`

**Step 1: Validate frontmatter**

Run:

```bash
python3 - <<'PY'
import pathlib, re, yaml
p = pathlib.Path('skills/design-to-code/SKILL.md')
content = p.read_text(encoding='utf-8')
assert content.startswith('---')
m = re.search(r'\n---\s*\n', content[3:])
assert m
fm = yaml.safe_load(content[3:m.start()+3])
assert fm.get('name') == 'design-to-code'
assert fm.get('description')
assert len(fm['description']) <= 1024
print('frontmatter ok')
PY
```

Expected: `frontmatter ok`.

**Step 2: Sync runtime**

Run:

```bash
mkdir -p /mnt/c/Users/imjzq/.agents/skills/design-to-code/references
cp skills/design-to-code/SKILL.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/SKILL.md
cp skills/design-to-code/references/mobile-recomposition.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/references/mobile-recomposition.md
cmp -s skills/design-to-code/SKILL.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/SKILL.md
cmp -s skills/design-to-code/references/mobile-recomposition.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/references/mobile-recomposition.md
```

Expected: all commands exit 0.

## Task 8: Commit only mobile recomposition changes

**Objective:** Commit the skill update without including unrelated existing dirty files/hunks.

**Files:**
- Commit:
  - `skills/design-to-code/SKILL.md` mobile recomposition hunks only
  - `skills/design-to-code/references/mobile-recomposition.md`
- Do not commit unrelated changes in:
  - `skills/design-to-code/references/asset-atlas-generation.md`
  - `skills/design-to-code/references/high-fidelity-rules.md`
  - unrelated pre-existing hunks in `skills/design-to-code/SKILL.md`

**Step 1: Inspect status**

Run:

```bash
git status --short --untracked-files=all
```

Expected: includes the modified SKILL.md, new mobile reference, and pre-existing dirty files.

**Step 2: Stage carefully**

Preferred if interactive staging is feasible:

```bash
git add skills/design-to-code/references/mobile-recomposition.md
git add -p skills/design-to-code/SKILL.md
```

Stage only the mobile recomposition hunks from this plan.

If interactive staging is not feasible, create an index-only staged blob from `HEAD:skills/design-to-code/SKILL.md` plus the planned mobile recomposition insertions, using the same technique previously used for the project-state collaboration commit.

**Step 3: Review staged diff**

Run:

```bash
git diff --cached --stat
git diff --cached -- skills/design-to-code/SKILL.md skills/design-to-code/references/mobile-recomposition.md | sed -n '1,240p'
```

Expected:
- staged diff includes only mobile recomposition additions;
- no asset-atlas/high-fidelity reference changes are staged;
- no unrelated SKILL.md changes are staged.

**Step 4: Commit and push**

Run:

```bash
git commit -m "Add mobile recomposition workflow to design-to-code"
git push
```

Expected: commit and push succeed.

## Verification Checklist

- [ ] `references/mobile-recomposition.md` exists and contains mobile modes, grid density rules, content compression rules, Mobile IR, and evidence requirements.
- [ ] `SKILL.md` includes `responsive-basic`, `mobile-recomposition`, `mobile-strict`, and `mobile-repair`.
- [ ] `SKILL.md` workflow includes Desktop Fidelity Pass, Mobile Recomposition Pass, and Mobile Acceptance Pass.
- [ ] `SKILL.md` rejects mechanical one-column conversion for 4x1/4x2/3x2 grids.
- [ ] `SKILL.md` output evidence includes mobile mode, viewports, section results, grid decisions, accepted deviations, debt, and evidence.
- [ ] Runtime copy matches source for `SKILL.md` and `references/mobile-recomposition.md`.
- [ ] Commit excludes unrelated existing dirty changes.
