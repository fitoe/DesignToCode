# DesignToCode Font Fidelity System Design

Date: 2026-05-14
Status: Approved design draft
Scope: DesignToCode skill behavior for restoring multiple fonts from design sources and governing site-wide typography when only partial pages are designed

## Background

Design sources often use multiple fonts across logo marks, hero titles, section headings, body copy, UI labels, numbers, and multilingual content. DesignToCode must not blindly load every visible font as a webfont, and must not collapse everything to a generic sans-serif either.

The problem is larger when implementation starts with only the homepage: the homepage may be designed and implemented before product pages, content pages, detail pages, or CJK-heavy pages exist. In that case, the first page should establish a provisional site-wide font system, not pretend to be the final typography standard.

## Goals

1. Identify typography structure from source designs:
   - family, weight, style, role, language, section, priority, and text samples;
   - visual characteristics when font names are unavailable.

2. Restore fonts by role:
   - brand/logo: brand asset first;
   - hero/display: visual fidelity first;
   - body/UI: readability, consistency, and performance first;
   - numbers/stats/prices: numeric behavior first;
   - CJK/multilingual: language coverage and fallback harmony first.

3. Keep licensing safe:
   - do not use commercial or unknown-license fonts without project authorization;
   - commercial/unavailable/unknown fonts default to close free/open-source substitutes;
   - do not download fonts from unofficial sources;
   - all production font files must be self-hosted in the project.

4. Keep performance controlled:
   - prefer woff2;
   - include only required weights/styles;
   - default first-screen budget: at most 2 font families and 3 font files;
   - CJK fonts must not be loaded as full packages by default;
   - use subset/lazy loading/waiver when needed.

5. Support progressive site-wide governance:
   - homepage-first work creates Font System v0.1;
   - define provisional global role slots;
   - future pages must first reuse or challenge role slots through a governance gate;
   - lock the system only after enough core pages or brand rules are confirmed.

6. Make decisions auditable:
   - output font manifest or decision table;
   - record exact/substitute/project-stack/asset-rendered/css-feature/deviation decisions;
   - report font files, sizes, fallbacks, loading strategy, screenshots, debt, and open questions.

## Non-goals

- This does not require exact commercial font use.
- This does not require all design-source fonts to become webfonts.
- This does not require final site-wide typography before all key page types exist.
- This does not mandate automated subsetting for every project.
- This does not allow using unauthorized font files or unofficial downloads.
- This does not replace brand guidelines when the project already has them.

## Font Modes

### font-basic

Use for:
- small or non-core pages;
- typography is not a main visual acceptance target;
- project font stack is already adequate.

Rules:
- use project font stack or system fallback;
- do not add font files;
- record obvious deviations;
- do not claim font high fidelity.

### font-fidelity

Default when:
- the design source has multiple visible fonts;
- the user asks to restore fonts;
- the page is a website, marketing page, B2B page, brand page, or product page;
- hero/title/data typography affects the design mood.

Rules:
- run Font Inventory Pass;
- run Font Decision Pass;
- run Font Consolidation Pass;
- self-host project font files;
- create/update font manifest;
- respect the font budget;
- replace commercial/unavailable/unknown fonts with close free/open-source substitutes.

### font-strict

Use for:
- homepage;
- core landing page;
- brand-heavy visual page;
- user explicitly requests typography fidelity;
- font-fidelity output still looks wrong.

Rules:
- font manifest is required;
- screenshot comparison is required;
- exact/substitute/deviation status is required;
- over-budget usage needs a reason or waiver;
- logo/brand text must first be checked against SVG/image/brand assets.

### font-pipeline

Use for:
- multilingual sites;
- large brand sites;
- many fonts/weights;
- CJK-specific typography;
- typography is affecting LCP/CLS;
- automated subset generation is needed.

Rules:
- fonttools/pyftsubset may be used;
- subset fonts;
- enforce budgets;
- preload critical fonts;
- check fallback metrics and LCP/CLS;
- generate or maintain CSS and manifest artifacts.

## Standard Workflow

### 1. Font Inventory Pass

Identify every visually distinct font or typography role in the source design.

Record:
- source font family;
- source weight;
- source style;
- role;
- language;
- page/section;
- text sample;
- visual priority;
- whether the source is logo/asset/text;
- whether the font appears once or repeatedly.

Roles:
- brand/logo;
- hero/display;
- heading;
- body;
- UI/nav/button/form;
- numeric/stat/price;
- decorative;
- CJK/multilingual.

If the font name is unknown, describe visual traits:
- serif/sans/slab/geometric/grotesk/humanist/condensed/rounded/handwritten/display;
- x-height;
- contrast;
- width;
- terminal shape;
- number style;
- uppercase/lowercase behavior.

### 2. Font Decision Pass

For each source font or role, choose one decision type.

Decision types:

- `exact-self-hosted`: project owns the font or the exact font is open-source; put files in the project and self-host.
- `substitute-self-hosted`: source font is commercial, unavailable, or unknown-license; choose a close free/open-source substitute and self-host it.
- `project-stack`: use existing project font stack or system fallback; suitable for body/UI/low-priority text.
- `asset-rendered`: use SVG/image/inline SVG for logo, brand wordmark, or special lettering without loading a font.
- `css-feature`: restore numeric or minor typography behavior with CSS features such as `font-variant-numeric`, letter spacing, weight, transform, or line-height.
- `deviation`: explicitly accept that exact restoration is not possible or not worth the cost.

Defaults:
- commercial font -> free/open-source substitute;
- unknown license -> free/open-source substitute;
- missing font file -> free/open-source substitute;
- project font is close enough -> project-stack;
- logo/brand wordmark -> check brand asset first;
- large CJK font -> subset/waiver, not full package by default.

### 3. Font Consolidation Pass

Avoid turning 5-8 design-source fonts into 5-8 production webfonts.

Rules:
- keep at most one critical display font for hero/campaign text unless waived;
- use one main body/UI font stack;
- map normal section headings to display or body weights when visually acceptable;
- handle numbers with existing font plus numeric CSS features before adding another font;
- preserve decorative fonts only when they are critical to brand or campaign mood;
- merge similar or low-priority source fonts into one chosen font;
- map low-priority fonts to project-stack.

Default budget:
- first screen: at most 2 font families;
- first screen: at most 3 font files;
- all new font files: woff2 preferred;
- only required weights/styles;
- over-budget usage requires reason/waiver.

### 4. Homepage-first Font Planning

When only the homepage or a few pages are designed, do not claim final site-wide typography. Create a provisional font system.

Rules:
- create Font System v0.1;
- define global role slots;
- map homepage fonts into role slots;
- record unknown future page needs as open questions;
- each role slot must include status, scope, confidence, source, and future_pages_policy.

Role slots:
- brand/logo;
- display;
- heading;
- body;
- ui;
- numeric;
- cjk/multilingual;
- decorative.

Role slot statuses:
- `provisional`: inferred from current page; future pages can challenge it;
- `active`: currently used by implementation;
- `locked`: confirmed by user or brand rules;
- `page-specific`: only for one page/section;
- `deprecated`: being replaced;
- `rejected`: considered but not used.

Example:

```json
{
  "font_system_version": "0.1",
  "font_system_status": "provisional",
  "scope": "homepage-first",
  "role_slots": {
    "display": {
      "chosen_font": "Libre Baskerville",
      "status": "active",
      "scope": "global-provisional",
      "source": "homepage.hero.title",
      "confidence": "medium",
      "future_pages_policy": "reuse unless future page has stronger brand/display requirement"
    },
    "body": {
      "chosen_font": "Inter",
      "status": "active",
      "scope": "global-provisional",
      "source": "homepage.body/nav/button",
      "confidence": "high",
      "future_pages_policy": "default for body/ui unless readability or language issue appears"
    },
    "numeric": {
      "chosen_font": "Inter",
      "status": "active",
      "scope": "global-provisional",
      "css_features": ["tabular-nums"],
      "confidence": "medium",
      "future_pages_policy": "reuse unless product/pricing/data page needs stronger numeric identity"
    }
  },
  "open_questions": [
    "Product detail typography not designed yet",
    "Blog/content typography not designed yet",
    "CJK-heavy pages not designed yet"
  ]
}
```

### 5. Font Governance Gate

When a later page introduces a new font style, evaluate it before adding production assets.

Questions:
- Can it map to an existing role slot?
- Is it merely a near variant of an existing font?
- Can existing font + weight/spacing/line-height reasonably replace it?
- Does it represent a new role?
- Is it a core visual requirement?
- Is it free/open-source/project-authorized?
- Does it require self-hosted files?
- Does it exceed first-screen budget?
- Should it be global or page-specific?
- Does it need subset, lazy loading, or waiver?

Stage behavior:

- `provisional`: later pages may challenge homepage choices, but must pass the gate. New fonts default to page-specific/substitute and do not automatically become global.
- `active`: new pages should reuse existing tokens by default. Add fonts only for clear new roles or strong visual requirements.
- `locked`: follow the locked system unless the user approves a brand-level typography change. Update manifest version when changed.

### 6. Font Implementation Pass

Default implementation:
- put font files inside the project, for example `src/assets/fonts/`, `public/fonts/`, or the project-standard path;
- use woff2 where available;
- define `@font-face`;
- use `font-display: swap` or `optional`;
- preload only critical display fonts when justified;
- do not rely on Google Fonts CDN or other external CDNs in production;
- do not rely on user-local fonts as the main implementation;
- define fallback stacks;
- map Tailwind/UnoCSS projects to theme tokens/utilities;
- use semantic font tokens instead of raw font-family values scattered across components.

Recommended tokens:
- `--font-brand`;
- `--font-display`;
- `--font-heading`;
- `--font-body`;
- `--font-ui`;
- `--font-numeric`;
- `--font-cjk`.

Recommended utility names:
- `font-display`;
- `font-heading`;
- `font-body`;
- `font-ui`;
- `font-numeric`.

### 7. Font Evidence Pass

Report:
- font mode;
- font system status;
- role slots;
- font decision table;
- font file paths;
- file sizes;
- weights/styles;
- preload strategy;
- font-display strategy;
- fallback stacks;
- exact/substitute/deviation decisions;
- budget pass/fail;
- screenshot comparison;
- open questions;
- remaining font debt.

## Matching Criteria for Free Substitutes

Choose close free/open-source substitutes by role-weighted scoring.

### Logo / Brand

Prioritize:
- brand mood;
- glyph silhouette;
- special letter forms;
- existing SVG/image assets.

Strategy:
- use brand assets first;
- only use font substitute when asset is unavailable;
- do not load a full font just for one logo word unless justified.

### Hero / Display

Prioritize:
- visual mood;
- glyph detail;
- width;
- weight;
- letter spacing;
- case behavior;
- English title rendering.

Strategy:
- allow one display font when visually important;
- use only required weight/style;
- record substitute deviation.

### Body / UI

Prioritize:
- readability;
- multilingual harmony;
- language coverage;
- performance;
- project consistency.

Strategy:
- prefer project font stack;
- do not add a font for small differences;
- use weight, line-height, and letter-spacing to approach the design.

### Numbers / Stats

Prioritize:
- tabular vs proportional;
- lining vs oldstyle;
- digit width;
- data-area visual tone.

Strategy:
- use `font-variant-numeric: tabular-nums;` first;
- use already introduced fonts when possible;
- avoid adding a dedicated numeric font unless the stats area is visually critical.

### CJK / Multilingual

Prioritize:
- CJK coverage;
- Latin/CJK harmony;
- punctuation;
- digits;
- fallback smoothness;
- file size.

Strategy:
- default to system CJK fallback or project-owned CJK fonts;
- subset when a specific CJK typeface is required;
- full CJK packages require waiver.

## Font Manifest

Recommended paths:
- `project-state/implementation/font-manifest.json` when used with PlanToDelivery;
- `src/assets/fonts/font-manifest.json` for project asset ownership;
- `docs/design-system/font-manifest.json` for design-system documentation.

Minimum structure:

```json
{
  "schema_version": "1.0.0",
  "font_system_version": "0.1",
  "font_system_status": "provisional",
  "scope": "homepage-first",
  "font_mode": "font-fidelity",
  "budget": {
    "first_screen_max_families": 2,
    "first_screen_max_files": 3,
    "passed": true,
    "waiver": null
  },
  "role_slots": {},
  "decisions": [
    {
      "source_font": "Commercial Display X",
      "source_role": "hero/display",
      "source_usage": ["home.hero.title"],
      "source_weight": "700",
      "availability": "unavailable",
      "license": "commercial",
      "chosen_font": "Libre Baskerville",
      "chosen_license": "open-source",
      "implementation": "substitute-self-hosted",
      "files": [
        {
          "path": "src/assets/fonts/libre-baskerville-700.woff2",
          "weight": 700,
          "style": "normal",
          "size_kb": 42
        }
      ],
      "fallback": "Georgia, serif",
      "css_token": "--font-display",
      "reason": "Matches serif contrast and display mood while avoiding commercial font use.",
      "deviation": "Capital R and terminal details differ from source."
    }
  ],
  "open_questions": [],
  "evidence": {
    "screenshots": [],
    "notes": []
  }
}
```

## Acceptance Criteria

DesignToCode font restoration is accepted when:

1. Inventory is complete:
   - all visibly different font roles are identified or described;
   - each font has a role;
   - important text samples are recorded.

2. Licensing is safe:
   - commercial/unknown fonts are not used without authorization;
   - substitutes are free/open-source/project-owned;
   - font source can be explained.

3. Production is self-hosted:
   - no Google Fonts CDN or external CDN production dependency;
   - files live in the project;
   - `@font-face`, tokens/utilities, and fallbacks are clear.

4. Performance is controlled:
   - woff2 preferred;
   - only needed weights/styles;
   - first-screen budget passes or has waiver;
   - CJK is not full-package unless subset/waiver exists.

5. Site-wide governance is progressive:
   - homepage-first work creates Font System v0.1;
   - role slots include status/scope/confidence/future_pages_policy;
   - unknown future pages are captured as open questions;
   - later page fonts must pass Font Governance Gate;
   - page-specific fonts do not automatically become global.

6. Visual outcome is reasonable:
   - logo/brand text is not genericized;
   - hero/display mood is close;
   - body/UI remains readable;
   - numeric areas are considered;
   - CJK/multilingual fallback is not jarring.

7. Evidence is complete:
   - manifest or decision table;
   - font file paths and sizes;
   - fallback stacks;
   - deviations;
   - screenshot evidence when font fidelity is claimed.

## DesignToCode Skill Update Plan

Update DesignToCode with:

1. Fidelity Modes additions:
   - `font-basic`;
   - `font-fidelity`;
   - `font-strict`;
   - `font-pipeline`.

2. Fidelity Kernel hard rules:
   - do not use commercial/unknown fonts without authorization;
   - use free/open-source substitutes when source fonts are unavailable or not free;
   - self-host production font files inside the project;
   - consolidate multi-font designs before adding assets;
   - homepage-first work creates provisional role slots, not final site-wide typography.

3. New compact `SKILL.md` sections:
   - Font Fidelity Pass;
   - Homepage-first Font Planning;
   - Font Governance Gate;
   - Font Evidence.

4. New reference:
   - `references/font-fidelity.md` containing detailed rules, manifest structure, matching criteria, and pipeline escalation.

5. Progressive Loading entry:
   - load `references/font-fidelity.md` when a design source has multiple fonts, typography is a parity concern, source fonts are commercial/unknown, homepage-first typography must govern later pages, CJK fonts are involved, or subsetting/budget decisions are needed.

6. Common Pitfalls additions:
   - turning 8 design fonts into 8 webfonts;
   - using commercial font names in CSS without files/license;
   - writing font-family without project font files;
   - full CJK package load by default;
   - locking homepage typography as final site-wide typography too early;
   - letting every later page add fonts freely;
   - genericizing logo/display typography;
   - omitting substitute/deviation notes.
