# Section-Driven High Fidelity

Use when a page technically exists but the user reports it is rough, only half restored, stretched, under-specified, not close enough to the approved source, or when a homepage/marketing/brand-heavy first screen needs close visual restoration from an approved image.

## Core Rule

Do not keep polishing a rough full page from vague IR. Stop, enrich the IR, fulfill assets by role, then implement and verify section by section.

This is not a low-fidelity mode. Section scope is smaller so observation can be deeper: preserve proportions, density, required content, media role/aspect, typography role, icon/shape anatomy, and cross-section rhythm for the active section.

For first implementation or regeneration, build the full active section structure and required content before applying the "largest 1-3 gaps" repair limit. The 1-3 gap rule is for post-implementation repair passes only.

## Required Artifacts Before Coding

- approved visual source path
- section-level Visual IR with layout ratios and pass criteria
- text inventory for visible labels/values/buttons
- icon anatomy map for each icon-like mark
- asset role classification and atlas/crop manifest
- section screenshot plan with stable `data-section` anchors

## Section IR Fields

Each major section needs:

```json
{
  "id": "product-categories",
  "order": 3,
  "layout": {
    "shell": "full-bleed or contained",
    "container_width": "1280px",
    "height": "observed or target",
    "columns": 4,
    "gap": 16,
    "card_aspect_ratio": "4:3"
  },
  "media": {
    "role": "card-thumbnail",
    "strategy": "atlas-crop",
    "required_ratio": "4:3",
    "final_files": ["hand-tools.webp"],
    "forbidden": ["production background-position against atlas"]
  },
  "text_safe_area": "bottom overlay, 24px padding",
  "screenshot_target": "[data-section='product-categories']",
  "pass_criteria": ["no image stretch", "all card titles visible", "grid rhythm matches source"]
}
```

## Asset Role Rules

- Hero and CTA/banner visuals are independent images with final safe areas.
- Repeated thumbnails/scenes may be generated as atlas, but must be cropped to independent files before implementation.
- Certificates, logos, partner names, buttons, headings, labels, and UI text are HTML/CSS/SVG/Iconify, not baked into images.
- Do not mix unrelated roles in one atlas.
- Do not use a wrong-ratio image and hope `object-fit` hides it; regenerate or crop correctly.

## Repair Loop Budget

Default budget for a single-section repair:

1. Diagnose once: compare approved source/crop or Visual IR against the current section screenshot, then name the largest 1-3 gaps.
2. Implement once: fix those gaps without expanding scope.
3. Verify once: capture the post-fix section screenshot and classify `PASS`, `PASS/WARN`, or `FAIL`.

Stop on `PASS` or `PASS/WARN`. Record WARN items as debt; do not start another polish loop just because a non-blocking difference remains.

Exceed this budget only when:
- the section is still `FAIL`;
- required content, CTA, layout structure, or media slot is missing;
- mobile/desktop has horizontal overflow or unreadable critical content;
- the user explicitly asks for another precision pass;
- the active slice is asset selection/generation, not ordinary section repair.

Replacement media budget: inspect at most 1-2 candidate assets by default. If neither fits, record asset debt or route to asset fulfillment instead of browsing many candidates inside the section repair.

## Section Loop

For each section:

1. Read section IR and asset manifest.
2. Inspect the approved source/crop if the IR lacks proportions, tokens, media slot/aspect, typography roles, icon/shape anatomy, or content counts.
3. Implement the full section structure, required content, media slots, density, and shared tokens/components.
4. Capture a section screenshot.
5. Compare against source/IR.
6. Fix the largest 1-3 section gaps per repair pass.
7. Record remaining debt before moving on.

After all sections pass locally, capture a full-page screenshot for rhythm/boundary checks.

## Cross-Section Checks

Check full-page rhythm for:

- container alignment across sections
- vertical gaps and density
- background band continuity
- hero-to-next-section transition
- repeated card heights and media ratios
- no section-specific polish that breaks overall page balance

## Maturity Levels

- L0 route-ready
- L1 skeleton
- L2 content-complete
- L3 system-styled
- L4 section-fidelity: major sections match structure and media roles
- L5 page-rhythm fidelity: full page spacing, density, and section boundaries feel right
- L6 asset-correct fidelity: generated/cropped media matches final ratios and no asset debt blocks parity

## Red Flags

Stop and enrich IR/assets when:

- user says the page is only half done or rough
- images look stretched, blurry, or cropped wrong
- a single atlas is used directly in production CSS for many cards
- hero/CTA/category/application assets are mixed together
- section screenshots are skipped
- first implementation stops after only 1-3 obvious fixes while section structure/content/proportions are still incomplete
- standard-fidelity was chosen only because the task is routed through PlanToDelivery, not because the source/page risk is simple
- parity is claimed from text smoke tests only
