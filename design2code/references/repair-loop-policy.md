# Repair Loop Policy

Use local repair only after verification failure. Do not make repair mandatory for first pass.

## Scope

- repair failed sections only
- avoid whole-page regeneration by default

## Max Iterations

- maximum 3 repair rounds per failed section

## Repair Priority

1. width/container alignment
2. hierarchy/layout
3. real-text wrapping
4. spacing rhythm
5. media-role correctness
6. decorative detail

## Stop Instead Of Looping

Stop when:
- same failure persists after 3 rounds
- failure root cause is blocked by missing source info
- repair would destabilize neighboring confirmed sections

## Reporting

After stop, report:
- failed section
- likely root cause
- what was tried
- remaining mismatch
