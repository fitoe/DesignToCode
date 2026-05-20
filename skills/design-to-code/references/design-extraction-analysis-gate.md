# Design Extraction & Analysis Gate

Use before visual repair or strict implementation when a design source image/screenshot/mockup exists. This gate prevents "content-similar but visually different" implementations.

## Core Rule

Do not code from a visual source until you have extracted and analyzed the design. The extraction result must be detailed enough to constrain implementation decisions: asset class, component anatomy, first-screen density, must-not-substitute rules, and token targets.

A failed or partial visual analysis is not permission to skip the gate. Retry with a better prompt, crop, higher-resolution source, or section crops. If full-page analysis is available, prefer one comprehensive pass; use section crops only when the image is too long, too small, or the model times out.

## Why This Improves Fidelity

Strict restoration improves when the agent switches from:

- "recognize sections and tune CSS" to "extract design and implement the extracted contract";
- "module order parity" to "component anatomy parity";
- "visual impression" to "first-screen density + tokens + forbidden substitutions";
- "CSS polish loop" to "asset/structure/anatomy/token diagnosis".

## Extraction Prompt Requirements

Ask for one complete executable IR when possible. The prompt must request:

1. page-level first-screen density: exactly what should be visible at the initial mobile viewport;
2. section bbox/height/vertical gaps and horizontal padding;
3. component anatomy: every visible role inside cards, lists, bars, heroes, tabs, buttons;
4. asset role inventory: real photo / generated bitmap / CSS gradient / SVG / icon / HTML text;
5. token table: colors, type scale, weight, radius, shadow, border, padding, gap, fixed bar height;
6. must-not-substitute rules: what cannot be replaced by generic components or gradients;
7. pass criteria and negative checks.

Template:

```text
This is the approved design source. Perform DesignToCode design extraction and analysis.
Output one executable visual IR for a 390px mobile H5 implementation.
Include: first_screen_density; each section bbox/height/gaps; component anatomy; asset role inventory; token measurement table; must-not-substitute; pass criteria; negative checks.
Be specific enough to guide implementation. Do not describe only high-level sections.
```

## Full-Page vs Section-Crop Decision

Prefer a single full-page extraction when:

- the source is a complete page screenshot or board crop;
- image resolution is sufficient for text and component details;
- the vision tool can process it without timeout.

Use section crops when:

- full-page extraction times out;
- the page is very long;
- small text/icons are unreadable;
- you need to inspect a critical component anatomy.

When section crops are used, merge them into one page IR before coding. Do not implement from only the first successful crop unless the scope is explicitly limited to that crop.

## IR Precision Limits And Segmentation Policy

Visual IR precision is limited by a combination of source resolution, page complexity, visual density, and model attention budget. It is not a fixed "maximum element count", but dense pages effectively exceed the useful attention budget before every element can be captured reliably.

Use three extraction levels:

1. `page-skeleton IR` — one full-page pass for section order, global layout, first-screen density, major tokens, and obvious assets. Use this even for long pages to avoid losing page context.
2. `section-executable IR` — crop one section or viewport-height band when the full-page pass misses small text, icons, component roles, exact spacing, or layer structure.
3. `component-critical IR` — crop a card/control/hero visual when fidelity depends on nested anatomy, generated asset boundaries, icon details, chart layers, or form/control behavior.

Escalate from full-page to section/component crops when any of these red flags appear:

- the IR says generic words like `cards`, `icons`, `metrics`, `list`, or `decorations` but does not enumerate visible roles;
- small text, icon type, chip labels, separators, or nested card layers are omitted;
- bbox/height/token estimates are obviously coarse or inconsistent with the source;
- the page has many repeated components and the IR describes only the first pattern;
- implementation from the IR would require guessing asset class, spacing, or anatomy;
- a first implementation pass is structurally similar but visually unlike the source.

Recommended operating rule:

- simple page: full-page IR may be enough;
- medium page: full-page skeleton + crops for the top 1-3 visually important sections;
- long/dense page: full-page skeleton + per-section IR for every implementation slice;
- high-stakes component: component-critical IR before coding that component.

Do not try to force one giant IR to be perfectly exhaustive. Treat full-page extraction as context and coverage, then use section/component crops to reach implementation precision. After crop extraction, merge the results into a single page IR so cross-section spacing, navigation, and density remain coherent.

## Speed-First Extraction Budget

IR extraction must be calibrated by risk; do not make every page pay the full strict-fidelity cost up front.

Default fast path:

1. Run one page-skeleton extraction for the whole page.
2. Classify sections by risk: `hero/above-fold`, `asset-heavy`, `interactive/control`, `repeated-pattern`, `low-risk/static`.
3. Extract section-executable IR only for the top 1-3 risk sections before first implementation.
4. For repeated sections, extract one representative component plus variant notes instead of every item.
5. Implement a first pass from skeleton + high-risk section IR.
6. Use screenshot diff to decide the next crop; crop only where the first pass has product-breaking visual gaps.

Timebox guidance:

- If extraction is slower than coding, stop after the skeleton + top-risk sections and implement a verifiable first pass.
- Low-risk sections may use pattern-derived tokens from nearby extracted sections, but mark them `estimated` until screenshot review.
- Do not crop every section preemptively unless the task explicitly requires strict L5 parity for the whole page.
- Prefer reusable page/component contracts once a pattern is extracted; do not re-extract identical cards, tabs, or headers across pages.

This keeps D2C fast while preserving escalation: only evidence of ambiguity or mismatch earns another crop.

## Parallel Section IR And Implementation

Yes: section IR extraction can run in parallel, and implementation can also be parallelized when file ownership is isolated. Use this to reduce wall-clock time, but only after the controller creates a page skeleton and a section contract.

Safe parallel pattern:

1. Controller extracts or defines page skeleton: section ids, source crop paths, viewport, shared tokens, route, target files, and integration order.
2. Controller assigns each subagent one bounded section or component and a unique output artifact path, e.g. `project-state/design/visual-ir/<page>/<section>.json`.
3. IR subagents do read-only extraction; they must not edit implementation files.
4. Controller merges section IR files into one page IR, resolving shared tokens, vertical rhythm, and cross-section boundaries.
5. Implementation subagents run in parallel only if they own different files/components/assets. If multiple sections share one page file, prefer one integrator agent or sequential patches to avoid merge conflicts.
6. Controller performs final integration: section order, shared CSS tokens, route behavior, screenshot evidence, and parity/debt report.

Parallelization matrix:

| Work item | Parallel? | Guardrail |
|---|---:|---|
| section IR extraction | yes | one crop + one output JSON per agent |
| asset prompt/fulfillment | yes | unique asset ids/paths; controller approves final assets |
| independent components | yes | one component file per agent |
| same page SFC/TSX/template edits | usually no | use one integrator to compose sections |
| global styles/tokens | no | controller/integrator owns shared tokens |
| final screenshot/parity report | limited | one controller pass for coherent evidence |

Subagent prompt requirements:

- include exact crop path or source bbox;
- include page skeleton and neighboring section boundaries;
- specify output schema/path;
- forbid code edits for IR-only agents;
- require confidence and `needs_component_crop` flags;
- require estimated fields to be marked `estimated`, not asserted as measured.

Do not let independent agents each invent their own spacing scale, typography scale, icon system, or asset strategy. Shared tokens come from the page skeleton or the controller merge.

## Minimum Pass Before Coding

Before coding, the extracted IR must answer:

- What exact asset class is used by each visual region? What substitutes are forbidden?
- What roles are inside the component? Are any visible roles missing from planned code?
- What is the intended first-screen density?
- Which values should be compact vs spacious, flat vs raised, photo vs vector/CSS?
- What negative checks would make the implementation fail?

If these answers are missing, the next action is more extraction/analysis, not CSS editing.

## Implementation Guidance From IR

During implementation:

1. Preserve source section order and first-screen density first.
2. Recreate component anatomy before polishing tokens.
3. Fulfill or explicitly mark asset debt before claiming parity.
4. Apply token targets: height, radius, padding, type, color, shadow.
5. Capture dev screenshots and compare side-by-side.
6. Repair by mismatch class: asset, structure, anatomy, token, verification.

## Common Failure Pattern

| Symptom | Likely missed in extraction | Correct response |
|---|---|---|
| "Looks like a redesign" | asset class + must-not-substitute | re-extract asset roles, replace substitutes |
| "Content is there but unlike source" | component anatomy | enumerate roles and rebuild structure |
| "Too loose / too sparse" | first-screen density + heights | compress to source density before decoration |
| "CSS tweaks do not help" | structure/anatomy mismatch | stop CSS loop, update executable IR |
| "Wrong visual language" | token table + asset class | restore colors, shadows, radius, image kind |

## Evidence Standard

A visual repair checkpoint should include:

- extracted IR path or summary;
- implementation screenshot from dev or target runtime;
- side-by-side comparison with design source;
- remaining gaps classified as asset / structure / anatomy / token / verification.

Do not report only "adjusted styles" as the reason for improvement. Report which extracted constraints were applied.
