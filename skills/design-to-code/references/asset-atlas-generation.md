# Asset Atlas Generation

Use atlas generation only as a sub-strategy of Asset Fulfillment.

## When To Use

Use atlas when:

- 2-8 missing bitmap assets are needed
- assets are the same visual family
- assets are small or medium content images, card visuals, thumbnails, avatars, or decorative illustrations
- exact output pixel size matters
- one generation can save cost without reducing quality

Do not use atlas for:

- hero main visuals
- complex product shots
- people or portraits that need individual quality control
- icons, logo-like marks, or simple vector graphics
- CSS-reproducible backgrounds
- images with important generated text

## Atlas Plan

Record:

- atlas source path
- atlas generation prompt
- atlas canvas ratio
- each crop id
- crop coordinates: `x`, `y`, `width`, `height`
- safe padding around each block
- final output path
- intended display size
- final pixel size

Use pixel coordinates only. Do not use percentages.

## Layout Rules

- Keep each crop at 1:1 intended output pixels inside the atlas.
- Add 8-16px safe padding around each crop when possible.
- Do not place unrelated visual styles in one atlas.
- Keep enough spacing to avoid edge pollution between crops.
- After generation, crop independent files and reference only those files in code.

## Commands

```bash
npm run crop-atlas -- --manifest path/to/asset-fulfillment-manifest.json
npm run validate-atlas -- --manifest path/to/asset-fulfillment-manifest.json
```

`crop-atlas` writes independent `.webp` files from declared pixel coordinates.
`validate-atlas` checks source readability, crop bounds, output existence, and output dimensions.
