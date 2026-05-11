# Functional Component Handoff Guard

Use before implementing visual elements that are also functional controls.

## Trigger controls

If the binding source contains any of these, perform a lightweight IdeaToTech/project-pattern check before coding:

- tabs / segmented controls
- search bars or inputs
- filters, dropdowns, pickers, date/calendar filters
- pagination, batch action bars
- form fields, upload controls, toggles, switches
- list navigation rows with actions

## Required technical classification

Record a compact handoff before code:

| visual element | functional role | existing component/pattern | state | interaction | must-not-do |
|---|---|---|---|---|---|
| 待处理/全部申请/已处理 | tabs | wot-design-uni tabs or project tab pattern | active tab | switch list query | do not implement as decorative text row |
| 搜索框 | search input | project search pattern / input | keyword | submit/clear | do not use static placeholder only |
| 状态/优先级/申请类型 | filter triggers | dropdown/picker/action sheet pattern | selected filter | open selector | no wrapping label text |

Rules:
- Prefer existing project patterns and installed UI components before custom views.
- If using a custom view for styling, preserve component semantics: active state, no-wrap labels, disabled/loading states, keyboard/input behavior where applicable, and stable selectors.
- Do not replace a functional component with decorative DOM just because the mockup is visual.
- If the component library is unsuitable or unavailable, record an accepted deviation and implement a semantic fallback.

## Visual anatomy for functional controls

For each control, record both:

1. component semantics: state, events, data binding, accessibility/keyboard where relevant
2. visual anatomy: label position, icon position, separator count, active indicator, no-wrap/overflow behavior

Examples:
- Risk summary tile with icon+number: record whether icon is above, left of number, right of number, or badge-like. Do not only record icon name/color.
- Filter pill: record min width, `white-space: nowrap`, dropdown icon placement, and overflow strategy (horizontal scroll vs shrinking vs wrapping).
- Tabs: record active underline, scroll behavior, active state binding, and list-query relationship.

## Handoff to DesignToCode

Before coding, DesignToCode should consume:
1. visual brief / Visual IR
2. this functional classification
3. nearby project pattern or UI library choice

If missing, pause and create/update the handoff instead of guessing component semantics in CSS.
