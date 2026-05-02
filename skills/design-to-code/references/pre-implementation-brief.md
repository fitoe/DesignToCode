# Pre-Implementation Brief

Emit this before any page code. Wait for user confirmation.

## Required Shape

```md
## Page Understanding
## Section Breakdown
## Input Mode
## Reuse Mapping
## Media Role Decisions
## Asset Compression Plan
## Layout Implementation Plan
## Framework/Output Plan
## Known Ambiguities
## Verification Plan
```

## Section Guidance

### `Page Understanding`
- page purpose
- user attention flow
- main hierarchy

### `Section Breakdown`
- section order
- purpose of each section
- primary content vs decoration
- shell scope vs inner container scope when a section is full-bleed

### `Input Mode`
- chosen mode: `image-only mode` / `metadata-assisted mode` / `figma-assisted mode`
- why this mode applies
- confidence limits implied by this mode

### `Reuse Mapping`
- section or pattern -> existing component / layout primitive / token
- mark bespoke implementations explicitly
- note ambiguous mappings that need confirmation

### `Media Role Decisions`
- which visuals are `background`
- which visuals are `content image`
- asset fallback assumptions

### `Asset Compression Plan`
- asset role summary for new or changed bitmap assets
- which assets should stay original, be optimized, be regenerated with `gpt image2`, or be replaced with vector/CSS output
- fallback asset status
- generated asset target size and basis, if applicable
- exemption candidates and reasons

### `Layout Implementation Plan`
- layout system per section
- shell ownership of background layers, if any
- inner container width/alignment
- shared container width assumptions
- spacing rhythm
- likely responsive constraints

### `Framework/Output Plan`
- resolved framework
- expected output file type/location
- repo conventions to match

### `Known Ambiguities`
- unresolved text
- unresolved asset status
- ambiguous media roles
- ambiguous section relationships

### `Verification Plan`
- which sections will be diffed
- which sections need shell coverage checks
- which must-not-miss points get manual attention
- which reuse or approximation decisions need special checking

## Hard Rule

No code generation until user confirms this brief.
