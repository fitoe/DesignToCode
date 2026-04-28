# Width Normalization

Always analyze against canonical page width, not raw screenshot width.

## Resolution Order

1. infer from existing project container/layout
2. fallback to user `pageWidth`
3. stop and ask if unresolved

## What To Inspect

- max-width containers
- layout wrappers
- page shell components
- responsive breakpoints
- existing landing-page or marketing-page conventions

## Scaling Rule

For each section image:
- read source width
- compute `scale = targetPageWidth / sourceImageWidth`
- apply same scale to all measured horizontal and vertical visual relationships for analysis

Use scaled section as reference for:
- container width
- relative spacing
- image block size
- text column width

## Do Not

- assume screenshot width equals intended page width
- mix raw and scaled measurements in one section
- infer width from decoration-only crops

## Stop Conditions

Stop and ask when:
- repo width cannot be inferred
- user did not provide `pageWidth`
- section crop is too partial to safely map to page width
