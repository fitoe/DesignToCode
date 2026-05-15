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
- runtime viewport metrics: `innerWidth`, `documentElement.clientWidth/scrollWidth`, `body.clientWidth/scrollWidth`, and key container bounding boxes

## Mobile H5 Screenshot Rule
For H5/mobile web visual acceptance, a screenshot is only width evidence when the browser viewport is explicitly emulated as the target device. Prefer Chrome DevTools Protocol or Playwright mobile context:

- `width`: target CSS viewport, commonly 390
- `height`: target viewport, commonly 844
- `deviceScaleFactor`: usually 2
- `mobile`: true / touch enabled

Do not trust plain `chromium --headless --window-size=390,844` alone; Chromium can produce a different CSS `innerWidth` (for example 500px) even when the PNG pixel width looks plausible. Always print viewport and scroll metrics with the screenshot.

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
