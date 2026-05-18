# Executable Visual IR

Use when a visual implementation remains "similar but not restored", the user asks why it is not faithful enough, or the likely cause is under-specified IR.

## Design Extraction Gate Dependency

Executable IR is the output of design extraction and analysis. Before filling this file from a visual source, load `references/design-extraction-analysis-gate.md` and extract first-screen density, component anatomy, asset roles, token targets, must-not-substitute rules, pass criteria, and negative checks. Do not invent these fields from memory when the source image can be analyzed.

## Core Rule

If the source is visual but the IR only names page sections, stop coding. Build executable IR first. A page cannot be strictly restored from section names, prose, or generic component labels.

## Under-Specified IR Red Flags

- IR says only `hero`, `card`, `list`, `tabbar`, or `section` without bbox/height/density.
- Asset roles are vague: `main visual`, `thumbnail`, `illustration` without saying real photo vs CSS/SVG vs generated bitmap.
- Component anatomy is missing: list cards do not enumerate image/title/description/tags/metrics/button/floater.
- Tokens are missing: color, type size, radius, shadow, padding, gap, line-height, and fixed bar height.
- Verification criteria are missing: no per-section pass/fail checklist or overlay targets.
- Implementation has substituted assets (CSS gradient, letter tile, generic icon) where the design shows real images or detailed UI layers.

## Required Executable IR Fields

For each page:

```json
{
  "page_id": "cases-list",
  "route": "/pages/cases/index",
  "viewport": { "width": 390, "height": 844, "dpr": 2 },
  "source_refs": ["project-state/design/references/board-02-mall-news-cases.png"],
  "source_crop": { "x": 0, "y": 0, "w": 390, "h": 844 },
  "first_screen_density": "header + search + chips + featured card + 2.5 list cards + fixed tabbar",
  "must_not_substitute": [
    "real industry photos must not become CSS gradients or single-letter tiles",
    "featured-card metrics floater must not be removed",
    "case-card CTA button must not be omitted"
  ],
  "sections": []
}
```

Each section must include:

```json
{
  "id": "featured-case",
  "bbox": [16, 184, 358, 236],
  "shell": "contained card",
  "layout": "photo background + dark overlay + copy stack + bottom metrics floater",
  "asset_role": {
    "kind": "real-photo",
    "subject": "new-energy vehicle factory / industrial inspection",
    "strategy": "use provided crop or generate independent final-ratio image",
    "forbidden_substitutes": ["CSS gradient only", "abstract chart decoration", "letter tile"]
  },
  "anatomy": [
    "badge: 精选案例",
    "title",
    "description",
    "tags row",
    "three-column metrics floater"
  ],
  "tokens": {
    "height": "source-measured px/rpx",
    "radius": "source-measured",
    "padding": "source-measured",
    "shadow": "source-matched light/medium/heavy",
    "title_font": "source-measured",
    "body_font": "source-measured"
  },
  "pass_criteria": [
    "same asset class as source",
    "same internal layer order",
    "same first-screen vertical density",
    "no missing visible roles"
  ]
}
```

## Three Inventories Before Coding

### 1. Asset Role Inventory

| section | source visual | required kind | final file/DOM strategy | forbidden substitute |
|---|---|---|---|---|
| hero | server-room banner | real/generative bitmap | independent image/crop | pure gradient orb |
| case card thumb | hospital photo | real/generative bitmap | independent thumbnail | one-letter tile |

Rules:
- "Need image" is not enough. Say what kind of image and what substitutes are forbidden.
- If the source uses realistic photos, a CSS gradient is a known debt, not parity.
- If assets are missing, either fulfill them before implementation or label the page blocked for strict parity.

### 2. Component Anatomy Inventory

| component | required visible roles | optional roles | forbidden omissions |
|---|---|---|---|
| case list card | thumbnail, title, desc, tags, metric, CTA | customer name | CTA button, thumbnail |
| purchase bar | favorite icon+label, consult button, buy button | safe-area pad | reducing to two buttons |

Rules:
- A component is not restored if visible roles are missing, even if the section order matches.
- Record role placement: left/right/top/bottom/overlay/floater.

### 3. Token and Measurement Table

| token | source observation | implementation target | acceptable variance |
|---|---|---|---|
| section height | measured from source | px/rpx value | ±4px for key sections |
| card radius | measured/described | value | close visual class |
| list density | cards visible in first screen | count | no lower by >0.5 card |
| fixed bar height | measured | value | ±4px |

Rules:
- Key sections need measured or explicitly estimated values before coding.
- If exact measurement is not possible, record a source-observed class: compact / medium / spacious, flat / raised, photo / vector / CSS.

## Stop/Proceed Decision

Proceed to strict coding only when:

- page-level source crop is known;
- every major section has bbox/height, anatomy, asset role, token targets, and pass criteria;
- all source-visible roles are accounted for;
- all substitutions are either forbidden, fulfilled, or explicitly marked as accepted debt.

Otherwise update IR first. Do not "just tune CSS" when the gap is caused by missing assets, missing anatomy, or missing token measurements.

## Repair Loop

1. Compare current screenshot against source.
2. Classify mismatch as one of: asset, structure, anatomy, token, verification.
3. If mismatch is asset/anatomy/structure, update executable IR before code.
4. If mismatch is token only, code a focused CSS repair.
5. Re-capture side-by-side evidence and record pass/fail per section.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Treating "IR exists" as sufficient | Check whether it is executable: bbox + anatomy + asset + token + pass criteria |
| Replacing source photos with gradients | Fulfill final-ratio images or mark strict parity blocked |
| Fixing CSS when component roles are missing | Update component anatomy then reimplement structure |
| Only comparing whole-page screenshots | Use section crops and first-screen density counts |
| Saying "close enough" after content matches | Require source-visible roles and asset class match |

## Typography Floor Field

Every mobile/phone-width section IR that carries business information must include `typography_floor`:

```json
{
  "typography_floor": {
    "viewport": "375/390px",
    "unit_convention": "rpx + px",
    "conversion": "font_px = rpx * viewport_width / 750",
    "primary_body": "26-28rpx ≈ 13-14px @375",
    "secondary_label": "24-26rpx ≈ 12-13px @375",
    "hard_gate_roles": ["title", "body", "CTA", "form", "price", "spec", "status", "KPI", "navigation", "search", "filter"],
    "warning_exceptions": ["decorative kicker", "sparse non-critical metadata", "tiny illustration label"],
    "post_implementation_check": "screenshot or DOM sampled font sizes"
  }
}
```

If the source design uses 10-12px-equivalent text for critical business content, do not copy it blindly; recompose spacing/layout first and record the source issue/debt.

## Icon System Field

Every mobile/phone-width Visual IR for pages with icon-like marks must include `icon_system` in addition to `typography_floor`:

```json
{
  "icon_system": {
    "viewport": "375/390px",
    "unit_convention": "rpx + px",
    "conversion": "visual_px = rpx * viewport_width / 750",
    "tokens": {
      "nav_action": "48-56rpx box ≈ 24-28px @375; 26-32rpx glyph ≈ 13-16px",
      "quick_entry": "52-64rpx box ≈ 26-32px; 30-36rpx glyph ≈ 15-18px",
      "function_card": "52-64rpx box; 28-34rpx glyph",
      "list_meta": "28-40rpx box; 20-26rpx glyph",
      "hero_illustration": "section-specific, not reused as UI token"
    },
    "inventory": [
      {
        "role": "service category icon",
        "source_anatomy": "colored rounded tile + centered line icon + centered label",
        "implementation": "Iconify class + tile",
        "box": "58rpx ≈ 29px @375",
        "glyph": "32rpx ≈ 16px @375",
        "color": "source-matched",
        "compensation": "thin icons +2rpx; filled icons -2rpx",
        "must_not_change": ["do not remove tile", "do not left-align if source is centered"]
      }
    ],
    "post_implementation_check": "rendered screenshot or DOM computed style sample for box/glyph sizes"
  }
}
```

A page is not ready for strict fidelity coding if it has many icons but no icon inventory/token mapping. Do not assume semantic Iconify replacement is visually faithful; semantic fit and visual anatomy are separate checks.

## Icon Size Token Field

Every mobile/phone-width Visual IR with icon-like marks should include `icon_size_tokens` and representative `icon_anatomy` entries:

```json
{
  "icon_size_tokens": {
    "unit_convention": "rpx + px",
    "conversion": "icon_px = rpx * viewport_width / 750",
    "navigation_action": { "box": "48-56rpx ≈ 24-28px @375", "glyph": "26-32rpx ≈ 13-16px @375" },
    "quick_entry": { "box": "52-60rpx ≈ 26-30px @375", "glyph": "30-36rpx ≈ 15-18px @375" },
    "feature_card": { "box": "56-64rpx ≈ 28-32px @375", "glyph": "32-38rpx ≈ 16-19px @375" },
    "list_meta": { "box": "32-48rpx ≈ 16-24px @375", "glyph": "20-28rpx ≈ 10-14px @375" },
    "hero_decorative": "asset/layer bbox, not tokenized as UI icon"
  },
  "icon_anatomy": [
    {
      "role": "service category icon",
      "token": "feature_card",
      "source_kind": "colored tile + white line icon",
      "box": "58rpx ≈ 29px @375",
      "glyph": "34rpx ≈ 17px @375",
      "container": "rounded rect, gradient",
      "alignment": "left icon + right title/desc",
      "compensation": "thin stroke +2rpx if using Iconify"
    }
  ]
}
```

If current implementation uses ad hoc icon sizes per page, mark icon fidelity as WARN/debt and run an Icon Fidelity Pass before claiming L4/L5.
```

