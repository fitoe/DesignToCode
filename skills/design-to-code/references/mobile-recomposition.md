# Mobile Recomposition

Use when a page is implemented from a desktop/PC-first design source but mobile output must feel intentionally composed rather than mechanically stacked.

## Core Principle

PC high fidelity does not mean mobile mechanical replication. Preserve design intent, brand language, hierarchy, critical content, CTA priority, and trust signals; recompose layout for mobile scroll rhythm and touch usability.

## Mobile Modes

- `responsive-basic`: small changes, admin/backoffice, non-core pages. Ensure no overflow and usable controls, but do not claim strong mobile conversion quality.
- `mobile-recomposition`: default for desktop-only websites, B2B pages, marketing pages, product pages, and landing sections that need good mobile output.
- `mobile-strict`: homepage, core landing page, mobile-heavy page, complex mobile composition, or repeated mobile failure. Requires Mobile IR.
- `mobile-repair`: existing implementation is too long, too single-column, overflowing, or mechanically adapted. Fix the largest 1-3 mobile issues first.

## Standard Passes

1. Desktop Fidelity Pass
   - implement credible desktop layout first;
   - inventory visible content and section anchors;
   - do not let desktop grid, coordinates, gap, or image ratios automatically define mobile.

2. Mobile Recomposition Pass
   For each section classify: section type, item count, content density, visual priority, primary action, scroll cost, touch needs, and compression options.

3. Mobile Acceptance Pass
   Check design intent, critical content, non-mechanical layout, scroll rhythm, touch usability, no horizontal overflow, and accepted deviations.

## Section Strategies

### Hero / CTA / Core Selling Point

- preserve headline, primary CTA, core trust signal, and brand mood;
- use text-first mobile layout unless the visual is the main conversion object;
- convert desktop side-by-side composition into stacked, background, cropped, or simplified composition;
- reduce decorative layers that compete with first-screen content;
- keep primary CTA visible early.

### Product / Service / Case Cards

- preserve product/service names and decision-making details;
- line-clamp long descriptions;
- reduce secondary tags;
- choose compact single-column cards, horizontal scrollers, featured + carousel, or expansion based on density;
- avoid full desktop card height and spacing on mobile.

### Features / Stats / Logos / Trust Grids

- do not default to one-column lists;
- icon + title + short copy: use 2-column compact grid;
- stats/logos/trust markers: use 2-3 columns, logo cloud, chips, or stat clusters;
- 8+ repeated items: group, horizontal scroll, show more, or show selected first 4-6;
- compress padding, shadow, and card height.

### Forms / Filters / Navigation / Controls

- prioritize usability over visual replication;
- touch targets should be at least 44px where possible;
- keep labels, errors, and submit action clear;
- convert filters to drawer/bottom sheet when needed;
- ensure sticky/fixed UI does not block content or CTA.

### Long Content / FAQ / Specs

- use accordions, grouping, summaries, or progressive disclosure;
- avoid direct desktop tables that overflow;
- preserve critical legal, pricing, limitation, safety, and risk details.

## Grid Density Rules

Never mechanically convert desktop repeated grids:

- PC 4x1 -> mobile 1x4
- PC 4x2 -> mobile 1x8
- PC 3x2 -> mobile 1x6

But do not use recomposition as permission to change an approved mobile/mockup structure. If the source itself is a mobile design or explicitly shows a business-critical row/grid (for example a 1×4 KPI strip), preserve that structure first. Solve narrow screens by reducing padding, gap, icon size, typography, label length, or decoration overlap. Only change 1×4 to 2×2/scroll/stack after recording the overflow evidence and getting user/design approval.

Classify item density instead:

| Density | Content | Mobile Strategy |
|---|---|---|
| Ultra-light | icon/number/logo + label | 2-3 columns, chips, mini-cards, logo cloud |
| Light card | icon + title + 1-2 lines | 2-column compact grid; 4 -> 2x2, 6 -> 2x3 |
| Medium card | image/icon + title + 2-3 lines + optional tags | compact one-column, horizontal scroller, or readable 2-column only if it still works |
| Heavy card | large image + long copy + tags/CTAs | featured + carousel, horizontal scroll, expansion, or detail page |
| 8+ repeated entries | many repeated cards/items | group, horizontal scroll, show more, selected first 4-6, or accordion |

## Content Compression Rules

Record accepted deviations or mobile notes when content is removed from immediate view.

Must preserve:
- page title, section title, core selling points, primary CTA;
- product/service names and critical conversion details;
- key certification, customer proof, trust indicators, stats;
- legal, compliance, pricing, limitation, safety, and risk details;
- required form fields and errors.

May summarize:
- long descriptions, case summaries, parameter previews, FAQ previews, card body text.

May fold:
- technical specs, long feature lists, large logo/category groups, long FAQ lists, secondary parameters.

May hide or re-express:
- decorative desktop layers, repeated badges, low-priority secondary CTAs, non-essential balance icons, excessive borders/shadows/textures.

## Mobile IR Escalation

Create or update Mobile IR when:
- the page is homepage or a core landing page;
- the user says mobile is important;
- mobile-recomposition still feels heavy/mechanical after two repair loops;
- desktop-only source has high mobile business value;
- the page has complex hero, grids, product cards, forms, or interactions.

Minimum Mobile IR:

```json
{
  "page_id": "homepage",
  "source": "desktop-design-only",
  "mobile_mode": "mobile-strict",
  "viewports": [375, 390, 414, 768],
  "sections": [
    {
      "name": "hero",
      "desktop_source_ref": "section-hero",
      "mobile_strategy": "recompose",
      "priority": "critical",
      "must_preserve": ["headline", "primary CTA", "trust badge", "brand mood"],
      "may_summarize": ["subtitle"],
      "may_hide": ["decorative background rings"],
      "layout": {
        "mobile": "text-first, visual-second",
        "tablet": "two-column if width allows"
      },
      "acceptance": [
        "primary CTA visible within first screen on 390px",
        "no horizontal overflow",
        "hero height does not exceed 85vh unless content requires it"
      ]
    }
  ],
  "global_mobile_rules": [
    "touch targets >= 44px",
    "no horizontal overflow at 320px",
    "avoid mechanical 1-column conversion for repeated grids"
  ]
}
```

## Evidence

When mobile work is in scope, report:
- mobile mode;
- viewports checked, usually 390/414/768 and 320 when risk exists;
- section result PASS/WARN/FAIL;
- grid decisions;
- accepted deviations;
- remaining mobile debt;
- screenshots or browser evidence.
