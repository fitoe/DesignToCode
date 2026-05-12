# Asset Atlas Generation

Use atlas generation only as a sub-strategy of Asset Fulfillment. Atlas is for generation efficiency, not a final UI implementation primitive.

## When To Use

Use atlas when:

- 2-8 missing bitmap assets are needed
- assets are the same visual family, role, lighting, and intended crop size
- assets are small or medium content images, card visuals, thumbnails, avatars, or decorative illustrations
- exact output pixel size matters
- one generation can save cost without reducing quality

Do not use atlas for:

- hero main visuals
- CTA/banner backgrounds with text safe areas
- complex product shots needing individual quality control
- people or portraits that need individual quality control
- icons, logo-like marks, certificates, or simple vector graphics
- CSS-reproducible backgrounds
- images with important generated text
- unrelated roles mixed together, e.g. hero + category cards + application scenes

## Hard Rule: Crop Before Implementation

An atlas is never the production asset. After generation, crop independent files and reference only those files in code.

Forbidden final implementation patterns:

- using one atlas with CSS `background-position` to fake separate cards
- using percentages as crop definitions
- stretching atlas fragments with arbitrary `background-size`
- hiding wrong aspect ratios behind `object-fit` without recording accepted deviation

Allowed implementation pattern:

- generate atlas → crop to independent `.webp`/`.png` files → use each file with explicit `width/height` or `aspect-ratio` → section screenshot verifies no stretch/crop pollution

## Atlas Plan

Record:

- atlas source path
- atlas generation prompt
- atlas canvas pixel size and ratio
- each crop id
- crop coordinates: `x`, `y`, `width`, `height`
- safe padding around each block
- final output path
- intended display size
- final pixel size
- intended aspect ratio
- object-fit/object-position strategy
- section and component that consumes the crop

Use pixel coordinates only. Do not use percentages.

## Layout Rules

- Keep each crop at 1:1 intended output pixels inside the atlas when possible.
- Add 8-16px safe padding around each crop when possible.
- Do not place unrelated visual styles or roles in one atlas.
- Keep enough spacing to avoid edge pollution between crops.
- Ensure each crop has no text, logo, watermark, UI labels, certificate names, or button copy unless the approved source explicitly uses a photographic sign.
- If a crop needs a text safe area, mark it and verify the crop after generation.

## Role Decision Table

| role | atlas? | notes |
|---|---:|---|
| category cards | yes | same ratio/family; crop independent files |
| application scenes | yes | same ratio/family; crop independent files |
| factory/process thumbnails | yes | same ratio/family; crop independent files |
| hero main visual | no | generate independently with final safe area |
| CTA/banner background | no | generate independently with overlay/safe area |
| product detail hero | usually no | individual quality matters |
| logos/certificates/text marks | no | render with HTML/SVG/CSS/Iconify |

## Commands

```bash
npm run crop-atlas -- --manifest path/to/asset-fulfillment-manifest.json
npm run validate-atlas -- --manifest path/to/asset-fulfillment-manifest.json
```

`crop-atlas` writes independent `.webp` files from declared pixel coordinates.
`validate-atlas` checks source readability, crop bounds, output existence, and output dimensions.

If project scripts do not exist, use a small local script but keep the same manifest fields and verification outputs.
