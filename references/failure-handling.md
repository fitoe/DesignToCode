# Failure Handling

Stop unsafe guessing early. Report clearly.

## Must Stop And Ask

- framework unresolved
- page width unresolved
- required text unreadable and not supplied
- critical media role ambiguous
- critical asset missing and crop fallback unusable
- core layout relationship unclear
- `Pre-Implementation Brief` not confirmed

## Ask Templates

### Missing Width

State:
- repo width could not be inferred
- exact width is needed for scaled analysis and diff
- ask for `pageWidth`

### Unreadable Text

State:
- image text is not reliable
- exact text affects wrapping and layout
- ask user to provide real copy

### Ambiguous Media Role

State:
- visual could be background or content image
- wrong choice changes DOM semantics and diff outcome
- ask user which role is intended

### Unusable Asset Crop

State:
- original asset unavailable
- screenshot crop is not isolated enough
- ask for source asset or permission to approximate

## May Continue With Note

- exact font family unknown
- minor decorative effect approximated
- non-critical ornamental asset simplified
