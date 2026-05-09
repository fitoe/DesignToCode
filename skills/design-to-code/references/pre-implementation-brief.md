# Pre-Implementation Brief

Emit this before page code. Keep it short, measurable, and actionable. Wait for user confirmation when the workflow requires confirmation.

## Required Shape

```md
## Page Understanding
## Fidelity Target
## Source Inputs
## Section Breakdown
## Input Mode
## Visual Anchors
## Reuse Mapping
## Media Role Decisions
## Asset Fulfillment Plan
## Asset Compression Plan
## Normalized Measurements
## Layout Implementation Plan
## Framework/Output Plan
## Accepted Deviations
## Not Accepted Deviations
## Known Ambiguities
## Verification and Repair Plan
```

## Guidance

### `Page Understanding`
- page purpose
- main hierarchy
- what must feel closest to the source

### `Fidelity Target`
- mode: `structural`, `balanced`, or `high-fidelity`
- target viewport and page width
- minimum score targets when high fidelity is expected

### `Source Inputs`
- persisted source image path
- page crop path
- section crop paths if available
- manifest path

### `Section Breakdown`
- section order
- what each section does
- primary content vs decoration

### `Input Mode`
- chosen mode and confidence limits
- whether metadata/measurements are available

### `Visual Anchors`
- must-preserve structure/proportion/style/detail anchors
- first-screen density target

### `Reuse Mapping`
- section/pattern -> existing component / shell / token
- mark visual reuse as allowed, conditional, or blocked
- note only important ambiguities

### `Media Role Decisions`
- which visuals are `background`
- which are `content image`
- fallback assumptions

### `Asset Fulfillment Plan`
- required image/icon assets
- strategy: `existing/crop`, `css/svg`, `single-generation`, `atlas-generation`, or `formal-fallback`
- display size and required pixel size
- source path, output path, or generation note
- blocking status: required-before-code / required-before-final / accepted-fallback

### `Asset Compression Plan`
- asset role summary
- preferred output format
- expected size risk
- fallback or exemption status

### `Normalized Measurements`
- source width, target width, scale
- critical bboxes and target measurements
- omit low-value pixel trivia

### `Layout Implementation Plan`
- layout system per section
- shell vs inner container
- shared width/alignment assumptions
- spacing rhythm

### `Framework/Output Plan`
- resolved framework
- output file type/location
- repo conventions to follow

### `Accepted Deviations`
- differences allowed by product/project constraints

### `Not Accepted Deviations`
- differences that must be repaired, not explained away

### `Known Ambiguities`
- unresolved text
- unresolved asset status
- ambiguous media roles
- ambiguous section relationships

### `Verification and Repair Plan`
- screenshots/sections to capture
- layers to score: structure, proportion, style, detail
- top repair priorities
- max repair rounds

## Hard Rule

No code generation until this brief exists. In high-fidelity mode, do not claim completion until at least one screenshot repair loop or an explicit blocker/waiver is recorded.
