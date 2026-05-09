# Visual Measurements

Use measurements to prevent “same sections, wrong proportions”. Keep this compact: measure only what can materially affect fidelity.

## Required Fields

```json
{
  "page_id": "workbench",
  "source_width": 512,
  "target_width": 390,
  "scale": 0.7617,
  "target_viewport": [390, 844],
  "measurements": {
    "hero.top": 0,
    "hero.height": 228,
    "stats.top": 175,
    "stats.height": 149,
    "stats.marginX": 36
  }
}
```

## What To Measure

Measure only the highest-impact anchors:
- full-bleed shell top/height
- overlapping card top/height/width/margins
- major card top/height and vertical gap
- grid rows/columns/gaps
- fixed footer height and safe area
- first-screen density target, such as “3.5 cards visible”

## How To Use

- Use measurements in the pre-implementation brief.
- Implement approximate values using project units.
- After screenshot, compare actual section positions against the normalized anchors.
- Repair proportion mismatches before decoration.

## Pitfalls

- Do not measure every pixel; it wastes context.
- Do not ignore measurements after writing them.
- Do not mix source pixels and target pixels in one implementation note.
