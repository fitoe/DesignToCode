# Font Fidelity

Use when a design source contains multiple fonts, typography is a visual parity concern, source fonts are unavailable/commercial/unknown-license, or homepage-first work needs a provisional site-wide font system.

## Core Principle

Do not blindly load every design-source font as a webfont, and do not collapse all typography to a generic sans-serif. Restore typography by role, licensing, performance budget, and site-wide governance stage.

## Font Modes

- `font-basic`: small/non-core pages. Use project/system font stack, record obvious deviations, and do not claim font fidelity.
- `font-fidelity`: default for multi-font sources or typography-sensitive websites. Inventory fonts, choose exact/substitute/project-stack/asset/css/deviation decisions, consolidate, self-host, and record manifest.
- `font-strict`: homepage, core landing page, brand-heavy page, or explicit typography fidelity. Manifest and screenshot evidence required; over-budget usage needs reason/waiver.
- `font-pipeline`: multilingual/large brand/CJK/subsetting/performance-sensitive work. Use subset, preload, budget, fallback metrics, and LCP/CLS checks where needed.

## Standard Passes

1. Font Inventory Pass
   - record source family, weight, style, role, language, page/section, text sample, priority, asset-vs-text, and repeated use;
   - roles: brand/logo, hero/display, heading, body, UI/nav/button/form, numeric/stat/price, decorative, CJK/multilingual;
   - if the font name is unknown, describe traits such as serif/sans/slab/geometric/grotesk/humanist/condensed/rounded/handwritten/display, x-height, contrast, width, terminals, number style, and case behavior.

2. Font Decision Pass
   Use one decision type per source font or role:
   - `exact-self-hosted`: authorized/project-owned/open-source exact font, stored in project;
   - `substitute-self-hosted`: commercial/unavailable/unknown source replaced by close free/open-source font, stored in project;
   - `project-stack`: existing project/system stack for body/UI/low-priority text;
   - `asset-rendered`: SVG/image/inline SVG for logo, brand wordmark, or special lettering;
   - `css-feature`: numeric/minor typography via CSS features such as `font-variant-numeric`, weight, spacing, transform, or line-height;
   - `deviation`: accepted non-restoration with reason.

3. Font Consolidation Pass
   - do not turn 5-8 design fonts into 5-8 webfonts;
   - keep at most one critical display font unless waived;
   - use one main body/UI stack;
   - map regular headings to display/body weights where acceptable;
   - handle numbers with existing fonts plus numeric CSS first;
   - preserve decorative fonts only when critical;
   - merge similar/low-priority fonts.

4. Font Implementation Pass
   - all production font files must be self-hosted in the project (`src/assets/fonts/`, `public/fonts/`, or project-standard path);
   - prefer woff2;
   - include only required weights/styles;
   - define `@font-face` with `font-display: swap` or `optional`;
   - preload only justified critical display fonts;
   - do not rely on Google Fonts CDN or user-local fonts for production;
   - define fallback stacks;
   - map to semantic tokens/utilities instead of scattered raw `font-family` values.

5. Font Evidence Pass
   Report font mode, system status, role slots, decision table, file paths/sizes, weights/styles, preload, font-display, fallback, exact/substitute/deviation, budget result, screenshots, open questions, and remaining debt.

## Licensing and Substitution Rules

- Commercial source font -> choose a close free/open-source substitute unless the project provides authorization and files.
- Unknown-license source font -> choose a close free/open-source substitute.
- Missing source font file -> choose a close free/open-source substitute.
- Never download from unofficial font mirrors.
- Do not write a commercial font name into CSS as if it is available.
- A local system fallback is not evidence of restoration.

## Font Matching Criteria

Choose substitutes with role-weighted scoring:

| Role | Priority | Default Strategy |
|---|---|---|
| brand/logo | brand mood, glyph silhouette, special letters, existing assets | use SVG/image/brand asset first; avoid loading a full font for one word unless justified |
| hero/display | mood, glyph detail, width, weight, spacing, case behavior | allow one self-hosted open-source display font when important |
| heading | hierarchy, mood, compatibility with display/body | reuse display/body family and weight before adding another font |
| body/UI | readability, multilingual harmony, coverage, performance, project consistency | prefer project stack; do not add fonts for small differences |
| numeric/stat/price | tabular/proportional, lining/oldstyle, digit width | use `font-variant-numeric: tabular-nums;` or existing fonts first |
| CJK/multilingual | CJK coverage, Latin/CJK harmony, punctuation, digits, file size | system/project CJK fallback by default; subset or waiver for specific CJK typeface |

## Homepage-first Font Planning

When only homepage or a few pages are designed:

- do not claim final site-wide typography;
- create Font System v0.1;
- define provisional global role slots: brand/logo, display, heading, body, ui, numeric, cjk/multilingual, decorative;
- map homepage fonts to role slots;
- record unknown future page needs as `open_questions`;
- every role slot needs `status`, `scope`, `confidence`, `source`, and `future_pages_policy`.

Role slot statuses:
- `provisional`: inferred from current page; future pages can challenge it;
- `active`: currently used;
- `locked`: confirmed by user or brand rules;
- `page-specific`: only one page/section;
- `deprecated`: being replaced;
- `rejected`: considered but not used.

## Font Governance Gate

When a later page introduces a new font style, answer before adding assets:

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

## Performance Budget

Default first-screen budget:
- <= 2 font families;
- <= 3 font files;
- woff2 preferred;
- only required weights/styles;
- full CJK package requires subset/waiver.

Over budget choices must record reason, alternatives considered, and waiver/debt.

## Manifest

Recommended paths:
- `project-state/implementation/font-manifest.json` with PlanToDelivery;
- `src/assets/fonts/font-manifest.json` for asset ownership;
- `docs/design-system/font-manifest.json` for design-system documentation.

Minimum fields:
- `schema_version`;
- `font_system_version`;
- `font_system_status`;
- `scope`;
- `font_mode`;
- `budget`;
- `role_slots`;
- `decisions`;
- `open_questions`;
- `evidence`.

Decision rows should include source font, role, usage, weight/style, availability, license, chosen font/license, implementation, files, fallback, CSS token, reason, and deviation.
