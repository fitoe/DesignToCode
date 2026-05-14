# DesignToCode Font Fidelity System Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Update the DesignToCode skill so multi-font design sources get a formal Font Fidelity Pass, self-hosted/free-font substitution rules, font manifests, and homepage-first progressive site-wide typography governance.

**Architecture:** Keep `skills/design-to-code/SKILL.md` as the compact entrypoint. Add concise font modes, hard rules, workflow hooks, evidence requirements, progressive-loading pointers, and pitfalls in `SKILL.md`; put detailed inventory/decision/consolidation/governance/manifest/pipeline rules in a new `references/font-fidelity.md`. Preserve existing unrelated dirty work by staging only the planned font-fidelity hunks using an index-only clean blob when needed.

**Tech Stack:** Markdown skill files in `/mnt/c/Users/imjzq/Projects/DesignToCode/skills/design-to-code`, runtime sync to `/mnt/c/Users/imjzq/.agents/skills/design-to-code`, git for source commits.

---

## Current Context

Design spec:
- `docs/superpowers/specs/2026-05-14-font-fidelity-system-design.md`

Primary source files:
- `skills/design-to-code/SKILL.md`
- `skills/design-to-code/references/font-fidelity.md` (new)

Runtime sync target:
- `/mnt/c/Users/imjzq/.agents/skills/design-to-code`

Existing source state before implementation:
- The repository already has unrelated uncommitted changes in:
  - `skills/design-to-code/SKILL.md`
  - `skills/design-to-code/references/asset-atlas-generation.md`
  - `skills/design-to-code/references/high-fidelity-rules.md`
- Do not overwrite, revert, or commit unrelated changes.
- When committing this implementation, stage only the new font fidelity content.
- If staging `SKILL.md` is tricky, build a staged blob from `git show HEAD:skills/design-to-code/SKILL.md` plus only this plan's insertions; do not stage the dirty worktree file wholesale.

## Task 1: Add the detailed font fidelity reference

**Objective:** Create the reference document with Font Fidelity modes, inventory/decision/consolidation passes, homepage-first governance, manifest schema, and pipeline escalation.

**Files:**
- Create: `skills/design-to-code/references/font-fidelity.md`

**Step 1: Create the reference file**

Use this content:

```markdown
# Font Fidelity

Use when a design source contains multiple fonts, typography is a visual parity concern, source fonts are unavailable/commercial/unknown-license, or homepage-first work needs a provisional site-wide font system.

## Core Principle

Do not blindly load every design-source font as a webfont, and do not collapse all typography to a generic sans-serif. Restore typography by role, licensing, performance budget, and site-wide governance stage.

## Font Modes

- `font-basic`: small/non-core pages. Use project/system font stack, record obvious deviations, and do not claim font fidelity.
- `font-fidelity`: default for multi-font sources or typography-sensitive websites. Inventory fonts, choose exact/substitute/project-stack/asset/css/deviation decisions, consolidate, self-host, and record manifest.
- `font-strict`: homepage, core landing page, brand-heavy page, or explicit typography fidelity. Manifest and screenshot evidence required; over-budget usage needs reason/waiver.
- `font-pipeline`: multilingual/large brand/CJK/subsetting/performance-sensitive work. Use subset, preload, budget, fallback metrics, and LCP/CLS checks where needed.

## Standard Passes

1. Font Inventory Pass
   - record source family, weight, style, role, language, page/section, text sample, priority, asset-vs-text, and repeated use;
   - roles: brand/logo, hero/display, heading, body, UI/nav/button/form, numeric/stat/price, decorative, CJK/multilingual;
   - if the font name is unknown, describe traits such as serif/sans/slab/geometric/grotesk/humanist/condensed/rounded/handwritten/display, x-height, contrast, width, terminals, number style, and case behavior.

2. Font Decision Pass
   Use one decision type per source font or role:
   - `exact-self-hosted`: authorized/project-owned/open-source exact font, stored in project;
   - `substitute-self-hosted`: commercial/unavailable/unknown source replaced by close free/open-source font, stored in project;
   - `project-stack`: existing project/system stack for body/UI/low-priority text;
   - `asset-rendered`: SVG/image/inline SVG for logo, brand wordmark, or special lettering;
   - `css-feature`: numeric/minor typography via CSS features such as `font-variant-numeric`, weight, spacing, transform, or line-height;
   - `deviation`: accepted non-restoration with reason.

3. Font Consolidation Pass
   - do not turn 5-8 design fonts into 5-8 webfonts;
   - keep at most one critical display font unless waived;
   - use one main body/UI stack;
   - map regular headings to display/body weights where acceptable;
   - handle numbers with existing fonts plus numeric CSS first;
   - preserve decorative fonts only when critical;
   - merge similar/low-priority fonts.

4. Font Implementation Pass
   - all production font files must be self-hosted in the project (`src/assets/fonts/`, `public/fonts/`, or project-standard path);
   - prefer woff2;
   - include only required weights/styles;
   - define `@font-face` with `font-display: swap` or `optional`;
   - preload only justified critical display fonts;
   - do not rely on Google Fonts CDN or user-local fonts for production;
   - define fallback stacks;
   - map to semantic tokens/utilities instead of scattered raw `font-family` values.

5. Font Evidence Pass
   Report font mode, system status, role slots, decision table, file paths/sizes, weights/styles, preload, font-display, fallback, exact/substitute/deviation, budget result, screenshots, open questions, and remaining debt.

## Licensing and Substitution Rules

- Commercial source font -> choose a close free/open-source substitute unless the project provides authorization and files.
- Unknown-license source font -> choose a close free/open-source substitute.
- Missing source font file -> choose a close free/open-source substitute.
- Never download from unofficial font mirrors.
- Do not write a commercial font name into CSS as if it is available.
- A local system fallback is not evidence of restoration.

## Font Matching Criteria

Choose substitutes with role-weighted scoring:

| Role | Priority | Default Strategy |
|---|---|---|
| brand/logo | brand mood, glyph silhouette, special letters, existing assets | use SVG/image/brand asset first; avoid loading a full font for one word unless justified |
| hero/display | mood, glyph detail, width, weight, spacing, case behavior | allow one self-hosted open-source display font when important |
| heading | hierarchy, mood, compatibility with display/body | reuse display/body family and weight before adding another font |
| body/UI | readability, multilingual harmony, coverage, performance, project consistency | prefer project stack; do not add fonts for small differences |
| numeric/stat/price | tabular/proportional, lining/oldstyle, digit width | use `font-variant-numeric: tabular-nums;` or existing fonts first |
| CJK/multilingual | CJK coverage, Latin/CJK harmony, punctuation, digits, file size | system/project CJK fallback by default; subset or waiver for specific CJK typeface |

## Homepage-first Font Planning

When only homepage or a few pages are designed:

- do not claim final site-wide typography;
- create Font System v0.1;
- define provisional global role slots: brand/logo, display, heading, body, ui, numeric, cjk/multilingual, decorative;
- map homepage fonts to role slots;
- record unknown future page needs as `open_questions`;
- every role slot needs `status`, `scope`, `confidence`, `source`, and `future_pages_policy`.

Role slot statuses:
- `provisional`: inferred from current page; future pages can challenge it;
- `active`: currently used;
- `locked`: confirmed by user or brand rules;
- `page-specific`: only one page/section;
- `deprecated`: being replaced;
- `rejected`: considered but not used.

## Font Governance Gate

When a later page introduces a new font style, answer before adding assets:

- Can it map to an existing role slot?
- Is it merely a near variant of an existing font?
- Can existing font + weight/spacing/line-height reasonably replace it?
- Does it represent a new role?
- Is it a core visual requirement?
- Is it free/open-source/project-authorized?
- Does it require self-hosted files?
- Does it exceed first-screen budget?
- Should it be global or page-specific?
- Does it need subset, lazy loading, or waiver?

Stage behavior:
- `provisional`: later pages may challenge homepage choices, but must pass the gate. New fonts default to page-specific/substitute and do not automatically become global.
- `active`: new pages should reuse existing tokens by default. Add fonts only for clear new roles or strong visual requirements.
- `locked`: follow the locked system unless the user approves a brand-level typography change. Update manifest version when changed.

## Performance Budget

Default first-screen budget:
- <= 2 font families;
- <= 3 font files;
- woff2 preferred;
- only required weights/styles;
- full CJK package requires subset/waiver.

Over budget choices must record reason, alternatives considered, and waiver/debt.

## Manifest

Recommended paths:
- `project-state/implementation/font-manifest.json` with PlanToDelivery;
- `src/assets/fonts/font-manifest.json` for asset ownership;
- `docs/design-system/font-manifest.json` for design-system documentation.

Minimum fields:
- `schema_version`;
- `font_system_version`;
- `font_system_status`;
- `scope`;
- `font_mode`;
- `budget`;
- `role_slots`;
- `decisions`;
- `open_questions`;
- `evidence`.

Decision rows should include source font, role, usage, weight/style, availability, license, chosen font/license, implementation, files, fallback, CSS token, reason, and deviation.
```

**Step 2: Verify file exists**

Run:

```bash
test -f skills/design-to-code/references/font-fidelity.md
```

Expected: exit 0.

## Task 2: Add font modes and kernel rules to `SKILL.md`

**Objective:** Add concise font modes and hard typography rules to the low-token entrypoint.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`, around `## Fidelity Modes` and `## Fidelity Kernel`

**Step 1: Insert font mode bullets**

After the existing `mobile-repair` bullet, add:

```markdown
- `font-basic`: small/non-core pages where typography is not a main parity target; use project/system stack, record obvious deviations, and do not claim font fidelity.
- `font-fidelity` (default when design sources contain multiple fonts or typography affects visual parity): inventory fonts, choose exact/free substitute/project-stack/asset/css/deviation decisions, consolidate, self-host, and record a manifest.
- `font-strict`: homepage, core landing page, brand-heavy page, or explicit typography fidelity; require font manifest, screenshot evidence, and reason/waiver for over-budget choices.
- `font-pipeline`: multilingual, CJK-specific, many-weight, or performance-sensitive typography; use subsetting, preload, budget, fallback metrics, and LCP/CLS checks where needed.
```

**Step 2: Insert kernel hard rules**

In `## Fidelity Kernel`, after `generated media must match its final display role...`, add:

```markdown
- design-source fonts must be restored by role, licensing, and performance budget; do not blindly load every source font or collapse all typography to generic sans
- do not use commercial or unknown-license fonts without project authorization; choose close free/open-source substitutes when unavailable or not free
- production font files must be self-hosted in the project; do not rely on Google Fonts CDN, unofficial mirrors, or user-local fonts as the implementation
- multi-font designs must be consolidated before adding assets; first-screen font budget defaults to <=2 families and <=3 files unless waived
- homepage-first typography creates provisional role slots and open questions, not a final locked site-wide font system
```

**Step 3: Verify modes/rules**

Run:

```bash
grep -n "font-fidelity\|font-pipeline\|commercial or unknown-license\|provisional role slots" skills/design-to-code/SKILL.md
```

Expected: multiple matches.

## Task 3: Add compact Font Fidelity section to `SKILL.md`

**Objective:** Add a compact section that defines the default font workflow and points to the reference file.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`

**Step 1: Insert section after `## Mobile Recomposition Pass` block and before `## Default Workflow`**

Add:

```markdown
## Font Fidelity Pass

When a source design uses multiple fonts or typography affects parity, restore fonts through role-based decisions instead of copying every font or falling back to generic sans. Default to `font-fidelity`; use `font-basic` only when typography is not a main visual target, and escalate to `font-strict` or `font-pipeline` for brand-heavy, multilingual, CJK, or performance-sensitive work.

Hard rules:
- inventory visible font roles: brand/logo, hero/display, heading, body, UI/nav/button/form, numeric/stat/price, decorative, and CJK/multilingual;
- commercial, unavailable, or unknown-license source fonts must use close free/open-source substitutes unless project authorization and files are provided;
- all production font files must live in the project and be self-hosted; do not depend on Google Fonts CDN or user-local fonts for production;
- consolidate multi-font designs before adding assets; avoid turning 5-8 source fonts into 5-8 webfonts;
- homepage-first work creates Font System v0.1 with provisional role slots, confidence, future page policy, and open questions;
- later pages introducing new fonts must pass Font Governance Gate before adding global or page-specific font assets.

For detailed matching criteria, manifest shape, homepage-first governance, and subsetting/pipeline escalation, load `references/font-fidelity.md`.
```

**Step 2: Verify section exists**

Run:

```bash
grep -n "## Font Fidelity Pass" skills/design-to-code/SKILL.md
```

Expected: one match.

## Task 4: Update workflow, evidence, progressive loading, and pitfalls

**Objective:** Ensure font fidelity appears in the execution workflow, handoff evidence, progressive-loading list, and pitfall table.

**Files:**
- Modify: `skills/design-to-code/SKILL.md`

**Step 1: Update Default Workflow**

In `## Default Workflow`, replace the current `Desktop Fidelity Pass` line with:

```markdown
4. **Desktop Fidelity Pass**: preserve the approved desktop/source design, section order, visible content inventory, typography roles, and major visual hierarchy.
```

After the `Mobile Acceptance Pass` item, add a new numbered item before Handoff:

```markdown
9. **Font Fidelity Pass**: when typography is in scope, inventory font roles, choose exact/free substitute/project-stack/asset/css/deviation decisions, consolidate, self-host project font files, and record manifest/debt.
10. **Handoff**: report page maturity, mobile mode, font mode, evidence, debt, and deviations.
```

If the existing Handoff is item 9, renumber it to 10.

**Step 2: Add font evidence bullets**

After the existing mobile evidence bullets, add:

```markdown
When font work is in scope, also report:
- font mode: `font-basic`, `font-fidelity`, `font-strict`, or `font-pipeline`;
- font system status: provisional, active, or locked;
- role slots and font decision table or manifest path;
- chosen implementation per role: exact-self-hosted, substitute-self-hosted, project-stack, asset-rendered, css-feature, or deviation;
- font file paths, sizes, weights/styles, `font-display`, preload strategy, and fallback stack;
- budget result, open questions for future pages, accepted font deviations, and remaining font debt.
```

**Step 3: Add progressive loading reference**

In `## Progressive Loading`, after `references/mobile-recomposition.md`, add:

```markdown
- `references/font-fidelity.md` — required when a design source has multiple fonts, typography is a parity concern, source fonts are commercial/unknown, homepage-first typography must govern later pages, CJK fonts are involved, or subsetting/budget decisions are needed
```

**Step 4: Add pitfall rows**

In `## Common Pitfalls`, add:

```markdown
| Turning every design-source font into a production webfont | Run Font Consolidation Pass; preserve critical roles and map low-priority typography to project stack |
| Using commercial or unknown-license fonts without files/authorization | Use close free/open-source substitutes and record the deviation |
| Writing `font-family` names without self-hosted project files | Add authorized/free font files to the project or use project-stack explicitly |
| Loading full CJK font packages by default | Use system/project CJK fallback, subset, or record waiver |
| Treating homepage typography as final site-wide typography before other pages exist | Create Font System v0.1 with provisional role slots and open questions |
| Letting every later page add new fonts freely | Use Font Governance Gate and classify new fonts as existing slot, page-specific, substitute, or rejected |
| Genericizing logo/display typography | Check brand assets first and preserve display mood with role-weighted substitute matching |
| Omitting font substitute/deviation notes | Record exact/substitute/project-stack/asset/css/deviation in the font manifest or handoff |
```

**Step 5: Verify terms**

Run:

```bash
grep -n "Font Fidelity Pass\|font work is in scope\|font-fidelity.md\|Font Governance Gate\|full CJK" skills/design-to-code/SKILL.md
```

Expected: multiple matches.

## Task 5: Validate and sync runtime copy

**Objective:** Validate frontmatter and sync source edits to the runtime skill directory.

**Files:**
- Source: `skills/design-to-code/SKILL.md`
- Source: `skills/design-to-code/references/font-fidelity.md`
- Runtime: `/mnt/c/Users/imjzq/.agents/skills/design-to-code/SKILL.md`
- Runtime: `/mnt/c/Users/imjzq/.agents/skills/design-to-code/references/font-fidelity.md`

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
assert len(content) <= 100000
print('frontmatter ok')
PY
```

Expected: `frontmatter ok`.

**Step 2: Sync runtime**

Run:

```bash
mkdir -p /mnt/c/Users/imjzq/.agents/skills/design-to-code/references
cp skills/design-to-code/SKILL.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/SKILL.md
cp skills/design-to-code/references/font-fidelity.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/references/font-fidelity.md
cmp -s skills/design-to-code/SKILL.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/SKILL.md
cmp -s skills/design-to-code/references/font-fidelity.md /mnt/c/Users/imjzq/.agents/skills/design-to-code/references/font-fidelity.md
```

Expected: all commands exit 0.

## Task 6: Commit only font fidelity changes

**Objective:** Commit and push the skill update without including unrelated existing dirty files/hunks.

**Files:**
- Commit:
  - `skills/design-to-code/SKILL.md` font-fidelity hunks only
  - `skills/design-to-code/references/font-fidelity.md`
- Do not commit unrelated changes in:
  - `skills/design-to-code/references/asset-atlas-generation.md`
  - `skills/design-to-code/references/high-fidelity-rules.md`
  - unrelated pre-existing hunks in `skills/design-to-code/SKILL.md`

**Step 1: Inspect status**

Run:

```bash
git status --short --untracked-files=all
```

Expected: includes modified SKILL.md, new font reference, and pre-existing dirty files.

**Step 2: Stage carefully**

Preferred if interactive staging is feasible:

```bash
git add skills/design-to-code/references/font-fidelity.md
git add -p skills/design-to-code/SKILL.md
```

Stage only the font-fidelity hunks from this plan.

If interactive staging is not feasible, create an index-only staged blob from `HEAD:skills/design-to-code/SKILL.md` plus only the planned font-fidelity insertions:

```bash
python3 - <<'PY'
from pathlib import Path
import subprocess
repo = Path('.')
path = 'skills/design-to-code/SKILL.md'
s = subprocess.check_output(['git', 'show', 'HEAD:' + path], text=True)
# Apply only the insertions described in Tasks 2-4 to s.
# Then stage the generated blob:
proc = subprocess.run(['git', 'hash-object', '-w', '--stdin'], input=s, text=True, capture_output=True, check=True)
blob = proc.stdout.strip()
subprocess.run(['git', 'update-index', '--cacheinfo', '100644', blob, path], check=True)
print('staged clean SKILL.md blob', blob)
PY
```

When using the blob approach, inspect `git show HEAD:skills/design-to-code/SKILL.md` for anchors rather than trusting the dirty worktree: committed HEAD may lack local-only additions.

**Step 3: Review staged diff**

Run:

```bash
git diff --cached --stat
git diff --cached -- skills/design-to-code/SKILL.md skills/design-to-code/references/font-fidelity.md | sed -n '1,260p'
```

Expected:
- staged diff includes only font-fidelity additions;
- no asset-atlas/high-fidelity reference changes are staged;
- no unrelated SKILL.md changes are staged.

**Step 4: Commit and push**

Run:

```bash
git commit -m "Add font fidelity workflow to design-to-code"
git push
```

Expected: commit and push succeed.

## Verification Checklist

- [ ] `references/font-fidelity.md` exists and contains font modes, inventory, decision, consolidation, homepage-first planning, governance gate, budget, and manifest rules.
- [ ] `SKILL.md` includes `font-basic`, `font-fidelity`, `font-strict`, and `font-pipeline`.
- [ ] `SKILL.md` forbids unauthorized commercial/unknown fonts and requires free/open-source substitutes or project authorization.
- [ ] `SKILL.md` requires production font files to be self-hosted in the project.
- [ ] `SKILL.md` includes homepage-first provisional role slots and Font Governance Gate.
- [ ] `SKILL.md` output evidence includes font mode, system status, role slots, decision table/manifest, file sizes, loading strategy, budget, open questions, deviations, and debt.
- [ ] Runtime copy matches source for `SKILL.md` and `references/font-fidelity.md`.
- [ ] Commit excludes unrelated existing dirty changes.
