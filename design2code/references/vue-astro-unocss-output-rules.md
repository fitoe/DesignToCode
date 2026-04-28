# Vue/Astro UnoCSS Output Rules

Generate project-matching page code. Do not cross frameworks unless user corrects framework decision.

## General Rules

- UnoCSS first
- minimal local style block only when utilities are insufficient
- one page file by default
- `data-section` on every major section
- semantic buttons, links, headings, lists where obvious
- content images get `alt`
- backgrounds must not carry essential information alone

## Abstraction Rules

- inline structure by default
- factor repeated rendering only when same structure repeats 3 or more times
- do not invent design-system refactors
- do not add routing, API calls, mock backends, or state layers beyond explicit interactions

## Vue Output

- match repo conventions for `.vue` pages/components
- prefer simple `<script setup>` when script needed
- avoid unnecessary reactivity
- keep interactive state local and minimal

## Astro Output

- match repo conventions for `.astro` pages/components
- keep static sections static
- add client-side islands only if explicit interactions require them
- do not inject framework runtime without need

## Layout System Choice

Per section, choose one primary system:
- `flex`
- `grid`
- `overlay/absolute`

Avoid mixed layout logic unless visual structure truly requires it.

## Real-Text Rule

Use final real text, not placeholder geometry, for final spacing and wrapping decisions.
