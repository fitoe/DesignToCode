# Section-Driven High Fidelity

Use when a page technically exists but the user reports it is rough, only half restored, stretched, under-specified, or not close enough to the approved source.

## Core Rule

Do not keep polishing a rough full page from vague IR. Stop, enrich the IR, fulfill assets by role, then implement and verify section by section.

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

## Section Implementation Loop

For each section:

1. Read section IR and asset manifest.
2. Implement only that section and its shared tokens/components.
3. Capture a section screenshot.
4. Compare against source/IR.
5. Fix the largest 1-3 section gaps.
6. Record remaining debt before moving on.

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
- parity is claimed from text smoke tests only
