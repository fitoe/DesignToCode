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
- apply the same scale to horizontal and vertical relationships before analysis

## Do Not
- assume screenshot width equals intended page width
- mix raw and scaled measurements in one section
- infer width from decoration-only crops

## Stop Conditions
Stop and ask when:
- repo width cannot be inferred
- user did not provide `pageWidth`
- section crop is too partial to map safely to page width
