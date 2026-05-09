# High-Fidelity Mode

Use this when an approved design image must be faithfully turned into code, especially after formal mockups were accepted.

## Trigger

Enter `high-fidelity mode` when any is true:
- user asks for high fidelity, design parity, or close restoration
- implementation is based on approved mockups
- previous implementation drifted from the reference
- an orchestrator provides Level 3 handoff inputs

## Required Inputs

Before code generation, require:
- persisted page/section image, not only a multi-screen board
- target viewport and target page width
- pre-implementation brief
- visual anchors and not-accepted deviations
- asset fulfillment plan for important imagery/icons
- verification and repair plan

## Input Processing

Preferred structure:

```text
design-to-code-inputs/
  manifest.json
  pages/<page-id>.png
  sections/<page-id>-<section-id>.png
pre-implementation-briefs/<page-id>.md
```

Manifest item shape:

```json
{
  "page_id": "workbench",
  "source": "assets/mockup-board.png",
  "page_crop": "design-to-code-inputs/pages/workbench.png",
  "target_viewport": [390, 844],
  "source_size": [512, 1024],
  "sections": [
    {
      "id": "hero",
      "crop": "design-to-code-inputs/sections/workbench-hero.png",
      "bbox": [0, 0, 512, 310],
      "role": "background+header"
    }
  ]
}
```

## Width Normalization

Do not reason from raw screenshot pixels alone. Record:
- source width
- target width
- scale = target / source
- critical normalized measurements

Minimum measurements:
- section top/height for full-bleed shells
- card top/height/width/margins
- grid column count and gap
- first-screen density target
- fixed footer/safe-area relationship

## Two-Pass Build

1. Skeleton pass: section order, DOM anatomy, grid, interaction placeholders.
2. Fidelity pass: proportions, spacing, type, color, radius, shadow, assets, details.

Do not claim visual completion after skeleton only.

## Four-Layer Acceptance

Score each checkpoint:
- structure
- proportion
- style
- detail

Guidance:
- structure < 80: fix structure first
- proportion < 75: not a high-fidelity checkpoint
- style < 75: call it structural/balanced, not high fidelity
- detail < 60: record asset/detail debt or continue repair

## Mandatory Repair Loop

High-fidelity pages require at least one screenshot repair loop:
1. capture screenshot
2. compare to source crop
3. list top 1-3 mismatches
4. repair biggest mismatch first
5. capture again or record why blocked

Max 3 repair rounds per section unless user asks for more.

## Output Requirement

Provide or update a parity report with:
- source image path
- target route/file
- screenshot paths
- scores
- matched points
- fixed mismatches
- remaining differences
- accepted deviations
- design debt
