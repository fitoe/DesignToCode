# Pre-Implementation Brief

Emit this before any page code. Wait for user confirmation.

## Required Shape

```md
## Page Understanding
## Section Breakdown
## Media Role Decisions
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

### `Media Role Decisions`
- which visuals are `background`
- which visuals are `content image`
- asset fallback assumptions

### `Layout Implementation Plan`
- layout system per section
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
- which must-not-miss points get manual attention

## Hard Rule

No code generation until user confirms this brief.
