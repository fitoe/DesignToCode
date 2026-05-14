# DesignToCode Mobile Recomposition Design

Date: 2026-05-14
Status: Approved design draft
Scope: DesignToCode skill behavior for mobile adaptation when source design is desktop/PC-first

## Background

DesignToCode currently tends to treat desktop fidelity as the dominant source of truth. When only a PC design exists, mobile implementation can become a mechanical shrink-and-stack pass:

- desktop coordinates and spacing are preserved too rigidly;
- desktop grids such as 4x1, 4x2, or 3x2 become long one-column lists;
- all desktop content is fully stacked, making mobile pages long and heavy;
- decorative desktop layers consume mobile first-screen space;
- mobile is checked for basic responsiveness but not for scroll rhythm or information density.

The core correction is: PC high fidelity does not mean mobile mechanical replication. Mobile should preserve design intent, hierarchy, brand language, and critical content, while recomposing layout for mobile use.

## Goals

1. Preserve desktop design value:
   - brand mood;
   - visual language;
   - information hierarchy;
   - critical content;
   - primary CTA;
   - trust and conversion signals.

2. Add a formal mobile recomposition pass:
   - assess section type and content density;
   - choose mobile-specific layout strategy;
   - avoid mechanical one-column conversion;
   - reduce unnecessary scroll weight;
   - keep touch targets usable.

3. Support escalation for important or failing pages:
   - default to Mobile Recomposition Pass;
   - escalate to Mobile IR for homepage, core landing pages, complex pages, or repeated mobile failure.

4. Make mobile acceptance explicit:
   - no horizontal overflow;
   - appropriate grid density;
   - mobile scroll rhythm;
   - touch usability;
   - critical content preservation;
   - screenshot evidence for relevant viewports.

## Non-goals

- This does not replace desktop fidelity requirements.
- This does not require every project to have a mobile design source.
- This does not require Mobile IR for every page.
- This does not turn DesignToCode into a new design ideation tool.
- This does not allow hiding critical conversion, legal, safety, pricing, or trust information.
- This does not require carousel everywhere; carousel is one option for high-density or media-heavy content.

## Mobile Modes

### responsive-basic

Use for:
- small changes;
- admin/backoffice pages;
- non-core pages;
- pages where mobile is not a primary target.

Rules:
- ensure basic breakpoint behavior;
- prevent horizontal overflow;
- keep touch targets usable;
- do not claim strong mobile conversion quality.

### mobile-recomposition

Default for PC/desktop design sources that need good mobile output, especially websites, B2B pages, marketing pages, and product pages.

Rules:
- complete Desktop Fidelity Pass first;
- then run Mobile Recomposition Pass;
- choose layouts by section type and content density;
- allow accepted mobile deviations when they preserve design intent and improve mobile usability;
- verify mobile with screenshot or browser evidence.

### mobile-strict

Use for:
- homepage;
- core landing page;
- mobile-heavy traffic pages;
- pages with complex hero/grid/product card/form composition;
- cases where mobile-recomposition fails twice or still feels mechanical.

Rules:
- create or update Mobile IR;
- define per-section mobile strategy;
- record mobile accepted deviations;
- require mobile screenshot evidence.

### mobile-repair

Use when an existing implementation is already mobile-mechanical, too long, too single-column, overflowing, or visually awkward.

Rules:
- diagnose the largest 1-3 mobile issues first;
- fix mobile scroll rhythm, grid density, and touch usability before minor polish;
- preserve desktop unless explicitly in scope;
- record remaining mobile debt.

## Standard Workflow

### 1. Desktop Fidelity Pass

Purpose: make the desktop source credible before recomposition.

Actions:
- extract source content inventory;
- establish section anchors;
- implement desktop section order, visual hierarchy, and major content;
- preserve desktop brand language and component style;
- run desktop screenshot/parity checks when fidelity is claimed.

Rule: desktop layout decisions do not automatically determine mobile layout. Desktop grid, absolute positioning, large gaps, and image proportions must be re-evaluated during Mobile Recomposition Pass.

### 2. Mobile Recomposition Pass

Purpose: translate desktop design intent into mobile information architecture.

For each major section, classify:
- section type;
- item count;
- content density;
- visual priority;
- primary action;
- scroll cost;
- touch interaction needs;
- whether content can be summarized, folded, hidden, or deferred.

Then choose a mobile strategy:

#### Hero / CTA / core selling point

Priority: design intent.

Rules:
- preserve headline, primary CTA, core trust signal, and brand mood;
- use text-first layout unless visual is the main conversion object;
- transform desktop side-by-side hero into stacked, background, cropped, or simplified composition;
- reduce decorative layers that compete with mobile first-screen content;
- keep primary CTA visible early.

#### Product / service / case cards

Priority: content integrity with mobile density.

Rules:
- preserve product/service names and decision-making details;
- allow line-clamp for long descriptions;
- reduce secondary tags;
- use single-column compact cards, horizontal scrollers, featured + carousel, or detail expansion depending on density;
- avoid full desktop card height and spacing on mobile.

#### Features / stats / logos / trust grids

Priority: mobile experience.

Rules:
- do not default to one-column lists;
- icon + title + short text: use 2-column compact grid;
- stats/logos/trust markers: use 2-3 columns or logo cloud/chips;
- 8+ repeated items: use grouping, horizontal scroll, show-more, or featured subset;
- compress padding, shadow, and card height for mobile.

#### Forms / filters / navigation / controls

Priority: usability.

Rules:
- touch targets should be at least 44px where possible;
- forms must keep labels, errors, and submit action clear;
- filters can become drawer or bottom sheet;
- sticky/fixed UI must not block content or CTA;
- button groups should wrap or stack without overflow.

#### Long content / FAQ / specifications

Priority: reading rhythm.

Rules:
- use accordions, grouping, summaries, or progressive disclosure;
- avoid direct desktop tables that overflow;
- keep line length readable;
- preserve critical legal, pricing, limitation, or safety details.

### 3. Mobile Acceptance Pass

Check:
- design intent preserved;
- critical content retained;
- layout is not mechanical desktop shrinkage;
- repeated grids are not blindly one-column;
- scroll rhythm is acceptable;
- touch targets are usable;
- no horizontal overflow;
- images and long text do not break the viewport;
- accepted deviations are recorded.

Recommended viewports:
- 320px for narrow fallback;
- 375px or 390px for mainstream phone;
- 414px for large phone;
- 768px for tablet;
- 1440px for desktop comparison when needed.

## Grid Density Rules

Do not mechanically convert:
- PC 4x1 to mobile 1x4;
- PC 4x2 to mobile 1x8;
- PC 3x2 to mobile 1x6.

Instead classify item density.

### Ultra-light item

Content:
- icon, number, or logo;
- title or short label;
- zero or one short line.

Mobile strategy:
- 2-3 columns;
- chip, mini-card, logo cloud, or stat cluster.

### Light card

Content:
- icon;
- title;
- 1-2 lines of text.

Mobile strategy:
- 2-column compact grid;
- 4 items -> 2x2;
- 6 items -> 2x3;
- 8 items -> 2x4 or selected subset + show more.

### Medium card

Content:
- image or icon;
- title;
- 2-3 lines of text;
- optional tags.

Mobile strategy:
- compact one-column card, horizontal scroller, or 2-column only if cards remain readable;
- compress image height;
- line-clamp descriptions;
- reduce tags.

### Heavy card

Content:
- large image;
- long copy;
- multiple tags;
- multiple CTAs.

Mobile strategy:
- featured card + carousel;
- horizontal scroll;
- detail expansion;
- route to detail page;
- never force cramped two-column layout.

### Large repeated list

Content:
- 8+ repeated entries.

Mobile strategy:
- grouping;
- horizontal scroll;
- show-more;
- selected first 4-6;
- accordion for lower-priority content.

## Content Compression Rules

Mobile may summarize, fold, or hide content based on hierarchy. Record accepted deviations or mobile notes when content is removed from immediate view.

### Must preserve

- page title;
- section title;
- core selling points;
- primary CTA;
- product/service names;
- critical conversion information;
- key certifications, customer proof, trust indicators, or stats;
- legal, compliance, pricing, limitation, safety, or risk details;
- required form fields and error messages.

### May summarize

- long descriptions;
- case descriptions;
- product parameter previews;
- FAQ answer previews;
- card body text.

### May fold

- technical specifications;
- long feature lists;
- large logo groups;
- large category groups;
- long FAQ lists;
- secondary parameters.

### May hide or re-express

- decorative desktop layers;
- repeated badges;
- low-priority secondary CTAs;
- non-essential icons used only for desktop balance;
- excessive borders, shadows, textures, and background ornaments.

## Mobile IR Escalation

Create Mobile IR when:
- page is homepage or core landing page;
- user says mobile is important;
- mobile-recomposition still feels heavy or mechanical after two repair loops;
- source is desktop-only but mobile business value is high;
- page contains complex grids, hero, product cards, forms, or interactions.

Minimum Mobile IR shape:

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
    },
    {
      "name": "features",
      "desktop_source_ref": "section-features",
      "mobile_strategy": "density-grid",
      "item_count": 8,
      "content_density": "light-card",
      "layout": {
        "mobile": "2-column compact grid",
        "fallback": "show first 6 + more"
      },
      "acceptance": [
        "not rendered as 8 single-column full cards",
        "section height remains proportionate"
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

## Reporting Requirements

DesignToCode should include a mobile adaptation block when mobile work is in scope:

```text
Mobile adaptation:
- mode: mobile-recomposition
- viewports checked: 390, 414, 768
- section results:
  - hero: PASS
  - features grid: PASS
  - product cards: WARN
  - CTA: PASS
- grid decisions:
  - features 8 items -> 2-column compact grid
  - cases 6 items -> horizontal carousel
- accepted deviations:
  - decorative background removed on mobile
  - long card descriptions clamped to 2 lines
- remaining mobile debt:
  - carousel dots need final style polish
- evidence:
  - screenshots or browser checks
```

## Skill Update Plan

Update DesignToCode skill with:

1. Fidelity Modes additions:
   - responsive-basic;
   - mobile-recomposition;
   - mobile-strict;
   - mobile-repair.

2. Default Workflow additions:
   - Desktop Fidelity Pass;
   - Mobile Recomposition Pass;
   - Mobile Acceptance Pass.

3. New sections:
   - Mobile Recomposition Pass;
   - Mobile Grid Density Rules;
   - Mobile Content Compression Rules;
   - Mobile IR Escalation;
   - Mobile Acceptance Evidence.

4. Common Pitfalls additions:
   - treating PC fidelity as fixed mobile coordinates;
   - converting every desktop grid to one-column mobile;
   - stacking all desktop content until the page becomes too long;
   - checking only overflow while ignoring scroll rhythm;
   - letting decorative desktop layers dominate mobile first screen.

## Acceptance Criteria

The DesignToCode skill update is accepted when:

- mobile modes are documented;
- mobile-recomposition is the default for desktop-only source designs that need mobile quality;
- grid density rules explicitly reject mechanical one-column conversion;
- content compression rules distinguish must-preserve, summarize, fold, and hide/re-express;
- Mobile IR escalation triggers and minimum schema are documented;
- reporting requirements include mobile mode, viewport checks, section results, grid decisions, accepted deviations, debt, and evidence;
- existing desktop fidelity and asset authenticity rules remain intact.
