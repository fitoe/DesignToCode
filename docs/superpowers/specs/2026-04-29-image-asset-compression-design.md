# Image Asset Compression Design

Date: `2026-04-29`
Topic: `image-asset-compression`
Status: `drafted`

## 1. Goal

Add an image asset compression policy to the `DesignToCode` skill project that balances fidelity and size.

This policy must:
- preserve high-fidelity output as the default
- add explicit rules for large bitmap assets
- cover both newly added assets and existing oversized assets already in the repository
- define documentation rules, validation rules, and automation entry points
- keep compression decisions auditable instead of implicit

This policy must not:
- silently degrade critical visual assets
- force a single compression strategy on all asset types
- expand the project into a generic asset pipeline beyond the skill's needs

## 2. Assumptions

- The project's current direction is still fidelity-first for design-to-code workflows.
- Remote Figma or CDN asset URLs remain forbidden in final output.
- Asset compression is a governance addition, not a replacement for the current asset provenance rules.
- The first implementation can rely on practical heuristics and configurable thresholds instead of perfect layout-aware measurement.

## 3. Success Criteria

The design is successful when:
- the repository has an explicit written compression policy
- new oversized or wrong-format assets can be blocked by a local check and CI check
- existing oversized assets can be scanned and prioritized for cleanup
- the skill's pre-implementation brief and verification flow both account for compression decisions
- critical image quality is protected through a controlled exemption path

## 4. Recommended Approach

Recommended approach: `tiered asset governance`

Why this approach:
- it fits the current skill's fidelity-first behavior
- it avoids a blunt "compress everything" rule
- it supports both new assets and existing assets
- it separates read-only validation from write-capable optimization

Rejected alternatives:
- `docs only`: too weak; no enforcement
- `validation only`: blocks new problems but leaves existing repository issues to manual work

## 5. Asset Classification Model

Compression decisions are made by asset role, not by file size alone.

Required asset roles:
- `critical content image`
- `decorative bitmap`
- `ui/icon-like asset`
- `crop fallback / temporary asset`

Role expectations:
- `critical content image`: user-visible semantic content where visible degradation is unacceptable without explicit approval
- `decorative bitmap`: backgrounds, textures, atmospheric visuals, or non-semantic large images where more aggressive compression is acceptable
- `ui/icon-like asset`: icons, line art, logos, and simple UI graphics that should prefer vector formats
- `crop fallback / temporary asset`: temporary crops or fallback resources used to unblock implementation while waiting for better originals

## 6. Compression Policy Matrix

### 6.1 Critical Content Image

- preferred format: `webp`
- format exceptions allowed when transparency, visual integrity, or tooling compatibility would suffer
- compression strategy: conservative lossy compression
- optimization order:
  1. reduce pixel dimensions toward realistic display needs
  2. apply conservative quality compression
  3. keep original only with explicit exemption

Suggested thresholds:
- soft size threshold: `400 KB`
- hard size threshold: `800 KB`
- resolution warning when asset is materially above realistic display need
- default failure when asset is far beyond roughly `3x` intended display dimensions unless exempted

### 6.2 Decorative Bitmap

- preferred format: `webp`
- compression strategy: aggressive lossy compression is acceptable
- optimization order:
  1. reduce dimensions to layout-appropriate size
  2. apply quality compression
  3. replace with CSS or gradients when the visual is reproducible

Suggested thresholds:
- soft size threshold: `250 KB`
- hard size threshold: `500 KB`

### 6.3 UI/Icon-Like Asset

- preferred format: `svg`
- bitmap fallback allowed only when SVG is unavailable or inappropriate
- compression strategy focuses on format correctness and redundancy removal more than photo-style quality tuning

Suggested thresholds:
- bitmap soft threshold: `80 KB`
- bitmap hard threshold: `150 KB`

### 6.4 Crop Fallback / Temporary Asset

- must be explicitly labeled as fallback or temporary
- may be compressed for repository hygiene
- must not be presented as a permanent original-quality asset
- should remain easy to replace later with a better source

## 7. Validation and Exemption Rules

Validation must classify findings as either:
- `error`: blocks merge
- `warn`: allowed but reported with clear remediation

Checks should cover:
- wrong format for the declared asset role
- file size above role threshold
- pixel dimensions materially above likely display need
- unmarked fallback assets
- oversized originals retained without justification
- forbidden inline raw SVG and forbidden remote asset URLs remain blocked by existing rules

Exemptions are allowed only when:
- compression causes visible degradation to critical assets
- transparency or fine details do not survive the preferred format path
- the asset must remain in a higher-fidelity form for a justified workflow reason

Exemption requirements:
- file-scoped, not broad directory-scoped by default
- explicit reason recorded
- visible in validation output

## 8. Workflow Design

### 8.1 Author Flow

For each new asset:
1. declare or infer asset role
2. run optimization tooling
3. review output sizes, formats, and any warnings
4. record exemption or fallback status if needed
5. commit only compliant or explicitly exempted assets

### 8.2 Validation Flow

Use the same rule engine for local checks and CI.

Validation should:
- be read-only
- fail fast on clear policy violations
- print file path, violated rule, and suggested next action

### 8.3 Existing Asset Cleanup Flow

Repository cleanup should be progressive:
1. scan all repository image assets
2. generate a report with size, dimensions, format, inferred role, and recommended action
3. prioritize high-impact low-risk assets first
4. clean up in batches instead of rewriting the whole repository at once

Suggested cleanup order:
1. oversized decorative backgrounds
2. oversized content images
3. wrong-format icons and miscellaneous leftovers

## 9. Tooling Design

Keep tooling minimal and purpose-specific.

Recommended commands:
- `scan-assets`: read-only repository scan and policy report
- `optimize-assets`: write-capable optimization for selected files or directories

Design constraints:
- CI uses only `scan-assets`
- automatic file mutation does not happen inside CI
- first version should focus on common bitmap cases and clear reporting, not perfect automation for every image variant

## 10. Integration Points In This Repository

### 10.1 Main Skill

Update [skills/design-to-code/SKILL.md](c:/Users/imjzq/Projects/DesignToCode/skills/design-to-code/SKILL.md) to add:
- a new `Asset Compression Policy` section
- a requirement to account for compression in the pre-implementation brief
- a verification rule for asset size and format compliance

### 10.2 README

Update [README.md](c:/Users/imjzq/Projects/DesignToCode/README.md) and localized variants to mention:
- asset localization remains required
- bitmap assets now also follow role-based compression rules

### 10.3 Reference Docs

Add a dedicated reference file under `skills/design-to-code/references/`, for example:
- `asset-compression-rules.md`

This file should define:
- roles
- thresholds
- exemption process
- validation expectations

### 10.4 Pre-Implementation Brief

Extend the brief to include:
- asset role summary
- compression plan
- exemption candidates
- fallback asset status

### 10.5 Release Notes and Versioning

Record the change in [RELEASE_NOTES.md](c:/Users/imjzq/Projects/DesignToCode/RELEASE_NOTES.md).

Recommended version bump:
- from `v1.2.2` to `v1.3.0`

Reason:
- this is a behavior and governance expansion, not a minor wording edit

## 11. Non-Goals

- no attempt to build a universal media pipeline outside this skill project
- no CI-time auto-rewriting of assets
- no requirement to solve perfect display-size inference in the first version
- no bulk deletion of existing assets without explicit cleanup passes

## 12. Risks

- thresholds that are too strict may frustrate contributors or cause needless exemptions
- thresholds that are too loose will fail to improve repository hygiene
- role inference may be imperfect without manual override support
- aggressive automation could unintentionally degrade critical assets if exemptions are weak

Mitigation:
- start with conservative thresholds
- keep exemptions explicit and visible
- separate scan from optimization
- prioritize reporting clarity over over-automation

## 13. Open Decisions For Implementation Planning

These items are intentionally deferred to the implementation plan:
- exact CLI surface and script language
- exact exemption file format or metadata location
- exact image library choice for optimization
- exact CI integration shape
- whether localized README files change in the first pass or a follow-up pass

## 14. Final Recommendation

Implement a role-based image compression governance system for `DesignToCode` with:
- written policy
- read-only validation in local and CI flows
- write-capable optimization tooling
- progressive cleanup for existing repository assets
- explicit exemptions for fidelity-sensitive cases

This gives the project a practical compression standard without breaking the current high-fidelity design-to-code intent.
