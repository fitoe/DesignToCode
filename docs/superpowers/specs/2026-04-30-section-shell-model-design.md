# Section Shell Model Design

Date: `2026-04-30`
Topic: `section-shell-model`
Status: `drafted`

## 1. Goal

Add a general section-shell model to the `design-to-code` skill so it can correctly infer and reproduce layouts where:

- the section background spans the full viewport width
- the actual content sits inside a centered page container
- the section combines full-bleed decoration with inner boxed content

This must work for `hero` and for any other section type that uses the same pattern.

The design must:

- preserve full-bleed backgrounds instead of shrinking them into the page container
- preserve the inner content container width and alignment
- treat background layering and content flow as separate concerns
- keep the current fidelity-first behavior

This design must not:

- force every section to become full-bleed
- introduce a new token system or layout system unrelated to this pattern
- hide ambiguous cases behind a default shell assumption
- change unrelated section rules

## 2. Assumptions

- The current skill already scales section images to canonical page width before analysis.
- The main failure is not media classification alone, but a missing structural distinction between outer section shell and inner content container.
- The skill should keep using the project's existing width inference and design-system reuse logic.
- The implementation should stay rule-driven inside the skill docs rather than introduce new runtime code paths.

## 3. Success Criteria

The design is successful when:

- the skill can represent a section as `shell + inner container + content`
- full-bleed backgrounds are preserved in analysis and generation
- the inner content width remains tied to the project's canonical page/container width
- verification explicitly checks both shell coverage and inner container alignment
- the brief requires explicit reporting when a section uses shell-based layout
- ambiguous shell cases still stop instead of guessing

## 4. Recommended Approach

Recommended approach: `universal section shell model`

Why this approach:

- it solves the actual failure mode across all section types
- it reuses the existing layer-stack and cross-section rules instead of replacing them
- it keeps the taxonomy simple while making layout reasoning more precise
- it allows hero, split, CTA band, and other sections to share the same structural vocabulary

Rejected alternatives:

- `hero-only fix`: too narrow; the same pattern can appear in other sections
- `new layout engine`: too invasive; unnecessary for the current repo

## 5. Structural Model

Every major section should be analyzed with this hierarchy when evidence supports it:

1. `section shell`
2. `inner container`
3. `content stack`

Optional shell-level elements:

- `full-bleed background`
- `decorative overlay`
- `section-wide texture`
- `cross-boundary bleed`

Optional inner-container elements:

- headline and body copy
- CTA group
- product image or illustration
- local spacing rhythm

Rules:

- the `section shell` may extend edge-to-edge across the viewport
- the `inner container` may use the canonical page width or project container width
- the shell owns background layering
- the inner container owns readable content alignment and spacing
- if the visual evidence does not support a shell, do not invent one

## 6. Taxonomy And Layer Model Changes

The current taxonomy should remain intact, but its interpretation should expand.

Required rule additions:

- `hero` is allowed to be full-bleed with a centered inner container
- `feature-split`, `cta-band`, and similar sections may also use the same shell pattern when visually justified
- background-heavy sections should be reasoned about as shell-first, not content-first

Layer model changes:

- `base-background` may belong to the shell, not the content container
- `decorative-overlay` may sit at shell scope
- `text-content` and semantic media usually belong to the inner container
- the model should explicitly distinguish shell-owned background from content-owned layout

## 7. Documentation Updates

If implemented, update these docs:

- `skills/design-to-code/SKILL.md`
- `skills/design-to-code/references/layer-stack-model.md`
- `skills/design-to-code/references/section-boundary-and-cross-section-rules.md`
- `skills/design-to-code/references/pre-implementation-brief.md`
- `skills/design-to-code/references/playwright-section-diff.md`
- `skills/design-to-code/references/visual-checklist.md`

Optional small update:

- `skills/design-to-code/references/section-taxonomy.md`

## 8. Verification Changes

Verification must check both levels of the section:

- shell coverage: full-bleed background spans the intended viewport width
- inner width: content aligns to the canonical page/container width
- background continuity: shell-level decoration is preserved across the expected range
- content integrity: CTA, headings, and media remain inside the content container

The diff workflow should flag:

- a shell collapsed into a boxed container
- a boxed content block floating without its background field
- content shifted off the intended inner container alignment
- cross-section bleed lost at shell boundaries

## 9. Risks

Main risks:

- overgeneralizing shell behavior to sections that should remain simple boxed layouts
- making the rules too abstract and harder to apply during brief generation
- weakening ambiguity handling by assuming a shell whenever a background exists

Mitigations:

- keep the shell model conditional on visual evidence
- require explicit mention of shell-based layout in the pre-implementation brief
- keep ambiguity stop rules unchanged for low-confidence cases

## 10. Implementation Scope

This design should be implemented as a documentation-only skill update first.

Planned implementation scope:

- add shell terminology to the skill and references
- update the pre-implementation brief so shell-based sections are called out explicitly
- update verification language so shell failures are detected
- keep the change set limited to section-layout reasoning

