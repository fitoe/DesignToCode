# Pre-Implementation Brief

Emit this before any page code. Keep it short. Wait for user confirmation.

## Required Shape

```md
## Page Understanding
## Section Breakdown
## Input Mode
## Reuse Mapping
## Media Role Decisions
## Layout Implementation Plan
## Framework/Output Plan
## Known Ambiguities
## Verification Plan
```

## Guidance

### `Page Understanding`
- page purpose
- main hierarchy
- what must feel closest to the source

### `Section Breakdown`
- section order
- what each section does
- primary content vs decoration

### `Input Mode`
- chosen mode
- why it fits
- its confidence limits

### `Reuse Mapping`
- section/pattern -> existing component / shell / token
- mark bespoke parts explicitly
- note only the important ambiguities

### `Media Role Decisions`
- which visuals are `background`
- which are `content image`
- fallback assumptions

### `Layout Implementation Plan`
- layout system per section
- shell vs inner container
- shared width/alignment assumptions
- spacing rhythm

### `Framework/Output Plan`
- resolved framework
- output file type/location
- repo conventions to follow

### `Known Ambiguities`
- unresolved text
- unresolved asset status
- ambiguous media roles
- ambiguous section relationships

### `Verification Plan`
- which sections will be diffed
- what must match closely
- what can tolerate small variance
- what should be checked manually

## Hard Rule

No code generation until user confirms this brief.
