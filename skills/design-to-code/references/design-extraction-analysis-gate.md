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
