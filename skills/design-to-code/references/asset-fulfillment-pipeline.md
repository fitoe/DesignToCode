# Asset Fulfillment Pipeline

Use this when required page images are missing or unreliable before implementation.

## Goal

补足页面图片资源，但不默认生成图片。先选最轻、最稳的来源，再写代码。

## Strategy Order

Use this order for every required visual asset:

1. `existing/crop` - use provided originals, project assets, or reliable design/reference crops.
2. `css/svg` - use CSS gradients, effects, textures, simple vector shapes, icons, and logo-like marks when reproducible.
3. `single-generation` - use one generated image for hero visuals, product scenes, people, complex illustrations, or high-impact content images.
4. `atlas-generation` - use one atlas image for 2-8 same-family small or medium bitmap assets.
5. `formal-fallback` - use a polished production-looking fallback when the asset is low risk or generation is not worth the cost.

Do not use placeholder wording such as "image here", "待替换图片", or "这里是图片" in user-facing output.

## Asset Fulfillment Plan

Before code, list each required asset:

- asset id
- page/section usage
- media role: `background` or `content image`
- display size
- required pixel size
- chosen strategy
- source or generation note
- output path
- temporary/final status
- risk or replacement note

Keep this plan inside the `Pre-Implementation Brief`.

## Strategy Rules

- Use `existing/crop` when the design or source image already contains the visual with enough resolution.
- Use `css/svg` for icons, logo-like marks, line art, simple ornaments, gradients, glows, and repeatable textures.
- Use `single-generation` for important hero, product, people, editorial, or scene images where quality matters.
- Use `atlas-generation` only when multiple bitmap assets share style, scale, and visual family.
- Use `formal-fallback` only when it will not mislead the user or break the layout.

## Gate

If a critical asset is missing, do not write page code until one of these is true:

- the asset exists locally
- a crop source and output path are declared
- a CSS/SVG substitute is declared
- a generation plan is confirmed
- a formal fallback is approved

The final implementation must reference independent local asset files or CSS/SVG code, not temporary chat-only images.
