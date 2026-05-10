# Blueprint-driven Implementation

Use this reference when `implementation-blueprint.json` is present or when converting a prepared design handoff into broad frontend coverage.

## Principle

Do not interpret images repeatedly during execution. Implement the approved post-visual blueprint like a frontend engineer who already received a prepared handoff.

A blueprint is valid only when it was refreshed after visual freeze. `implementation-blueprint.json` must include `visual_freeze_ref.status = "approved"` and `visual_freeze_ref.post_visual_extraction_status = "complete"`. If this is missing or stale, return to `idea-to-design`; do not let implementation choose between old text and approved images.

Do not implement one page to high fidelity while the rest of the product is missing. Build like a human frontend engineer: establish the system, cover all routes, fill content, then refine and target fidelity.

## Required default read path

1. `implementation-blueprint.json`
2. Current pass files from `implementation-blueprint.json.read_by_pass`
3. `page-matrix.json` for page maturity and sweep order
4. `component-blueprint.json` for extraction timing
5. `debt-ledger.json` for accepted fallback and revisit work

Do not load full `Design-Spec.md`, all page briefs, all visual contracts, or source images unless the current pass needs them.

## Passes

### Foundation Pass
Implement global system first:
- tokens, CSS variables, UnoCSS shortcuts/presets where appropriate
- app shell, page background, layout container, navigation shell
- foundation components: button, card, tab, list item, form control, status tag, empty/loading/error states

Stop only for framework ambiguity, viewport ambiguity, or a blueprint contradiction that affects the whole system.

### Coverage Pass
Sweep horizontally across all pages:
1. create every planned route/page (`L0`)
2. add approved section order (`L1`)
3. fill realistic content/mock data (`L2`)
4. apply global system styling (`L3`)

Do not stop for minor missing icons, decorative images, wording gaps, or non-core assets. Use fallback, record debt, continue.

### Refinement Pass
Normalize after coverage:
- extract repeated components after a pattern appears 2-3 times
- consolidate mock data and content structures
- replace cheap fallbacks that affect perception
- close medium/high debt that blocks `L3`

Do not abstract one-off page-local layouts just because they look reusable.

### Fidelity Pass
Spend fidelity effort only where it matters:
- core pages
- first screens
- key CTA/card/navigation areas
- user-requested high-fidelity regions

Use screenshots and visual contracts here. Repair only the top 1-3 mismatches first.

## Maturity reporting

Report compactly:

```text
Coverage: routes 8/8, skeleton 8/8, content 7/8, system styled 6/8
Core first-screen: 2/3 at L4
Foundation: tokens/app shell/base components ready
Debt: 5 open, 0 blockers
Next: move settings/profile from L2 to L3
```

Never say simply "done" when pages are at different maturity levels.

## Asset fallback levels

- `A`: source asset required; stop if unavailable and no approved substitute exists.
- `B`: crop/reuse approved source asset.
- `C`: CSS/SVG/gradient substitute allowed.
- `D`: placeholder allowed; must record debt.

## Engineering deviation rule

Allowed without stopping if recorded: small copy length changes, icon substitution, minor spacing/line-height differences, component-library constraints, responsive adaptation.

Not allowed silently: changing page structure, module order, navigation count/labels, dominant card anatomy, major color blocks, or core first-screen hierarchy.
