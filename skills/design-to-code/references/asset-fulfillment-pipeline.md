# Asset Fulfillment Pipeline

Use this when required page images are missing or unreliable before implementation.

## Goal

补足页面图片资源，但不默认生成图片。先选最轻、最稳的来源，再写代码。生成图和图集都必须落成本地、可验证、可复用的项目资产；不能把聊天里的临时图片当成交付物或实现依赖。

## Strategy Order

Use this order for every required visual asset:

1. `existing/crop` - use provided originals, project assets, or reliable design/reference crops.
2. `css/svg` - use CSS gradients, effects, textures, simple vector shapes, icons, and logo-like marks when reproducible.
3. `single-generation` - use one generated image for hero visuals, product scenes, people, complex illustrations, covers, or high-impact content images.
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

For any generated image, also record:

- prompt or prompt file path
- raw generated source path or URL
- saved local source path inside the project or artifact directory
- verification command/result: file exists, non-zero bytes, readable dimensions
- preview/delivery path when the user needs approval, preferably sent as `MEDIA:/absolute/path`
- approved final asset path consumed by code or document generation

Keep this plan inside the `Pre-Implementation Brief` or the project asset manifest.

## Strategy Rules

- Use `existing/crop` when the design or source image already contains the visual with enough resolution.
- Use `css/svg` for icons, logo-like marks, line art, simple ornaments, gradients, glows, and repeatable textures.
- Use `single-generation` for important hero, product, people, editorial, cover, or scene images where quality matters.
- Use `atlas-generation` only when multiple bitmap assets share style, scale, and visual family.
- Use `formal-fallback` only when it will not mislead the user or break the layout.
- Generated images must be persisted as local files before approval or implementation; if the generation tool returns a URL, download/copy it to a stable local path and verify it.
- When the generated image itself is the source artifact the user must judge, send or reference the verified local file with `MEDIA:` rather than only describing it.
- After approval, convert/crop/optimize into the final project asset format and verify the rendered page/document consumes that final asset, not the raw chat image.

## Gate

If a critical asset is missing, do not write page code until one of these is true:

- the asset exists locally and passes existence/readability checks
- a crop source and output path are declared
- a CSS/SVG substitute is declared
- a generation plan is confirmed and the generated result is saved locally before use
- a formal fallback is approved

The final implementation must reference independent local asset files or CSS/SVG code, not temporary chat-only images, remote generation URLs, or unverified atlas sheets.

## Verification Checklist

Before claiming asset work is complete:

1. Check every declared `outputPath` exists and is non-empty.
2. Check image dimensions with `identify`, `ffprobe`, `sips`, or a small script.
3. For generated source images, keep the raw source plus final optimized asset unless project policy says otherwise.
4. For user approval, deliver the verified source/preview file as media, then only proceed with the approved image.
5. Render or screenshot the page/document section that consumes the asset and verify no stretching, wrong crop, placeholder text, or stale reference remains.
