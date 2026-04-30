# Release Notes

## v1.3.4 - 2026-04-30

Rewrote the README files to be more formal, more approachable, and more clearly oriented around general skill usage.

Highlights:
- reorganized the README content around usage, workflow, verification, and limits
- simplified the language to make the skill easier to understand at a glance
- kept the install command visible at the top of each README

Published files:
- `README.md`
- `README.en.md`
- `README.zh-CN.md`

## v1.3.3 - 2026-04-30

Reworked the README files to present DesignToCode as a general-purpose skill instead of a Vue/Astro-specific workflow.

Highlights:
- removed Vue/Astro-specific language from the README introductions and workflow summaries
- broadened the README scope language to describe general frontend projects and project conventions
- kept the install command visible at the top of each README

Published files:
- `README.md`
- `README.en.md`
- `README.zh-CN.md`

## v1.3.2 - 2026-04-30

Stopped tracking the `docs/` directory in git.

Highlights:
- added `docs/` to `.gitignore`
- removed the tracked design spec at `docs/superpowers/specs/2026-04-29-image-asset-compression-design.md`

Published files:
- `.gitignore`
- `docs/superpowers/specs/2026-04-29-image-asset-compression-design.md`

## v1.3.1 - 2026-04-29

Moved version and changelog metadata out of the README and skill spec.

Highlights:
- removed inline version labels from `README.md`, `README.en.md`, and `README.zh-CN.md`
- removed the embedded version and changelog section from `skills/design-to-code/SKILL.md`
- kept release history only in `RELEASE_NOTES.md`

Published files:
- `README.md`
- `README.en.md`
- `README.zh-CN.md`
- `skills/design-to-code/SKILL.md`
- `RELEASE_NOTES.md`

## v1.3.0 - 2026-04-29

Added role-based image compression governance for bitmap assets.

Highlights:
- added scanner and optimizer tooling for repository asset hygiene
- added `Asset Compression Policy` guidance to the skill and reference docs
- expanded the pre-implementation brief and verification flow with compression reporting

Published files:
- `package.json`
- `package-lock.json`
- `asset-policy.config.json`
- `scripts/asset-policy/`
- `tests/asset-policy/`
- `skills/design-to-code/SKILL.md`
- `skills/design-to-code/references/asset-compression-rules.md`
- `skills/design-to-code/references/pre-implementation-brief.md`
- `skills/design-to-code/references/visual-checklist.md`
- `skills/design-to-code/references/vue-astro-unocss-output-rules.md`
- `README.md`
- `README.en.md`
- `README.zh-CN.md`

## v1.2.2 - 2026-04-28

Published license and metadata cleanup for the packaged skill.

Highlights:
- added an MIT `LICENSE` file at the repository root
- added `license: MIT` to the skill frontmatter
- updated repository READMEs to link the license file
- reduced `gh skill publish --dry-run` warnings to tag-protection guidance only

Published files:
- `LICENSE`
- `skills/design-to-code/SKILL.md`
- `README.md`
- `README.en.md`
- `README.zh-CN.md`

## v1.2.1 - 2026-04-28

Published a skills.sh-compatible package layout.

Highlights:
- moved the actual skill package to `skills/design-to-code/`
- aligned the parent directory with `name: design-to-code` as required by the Agent Skills specification
- updated root documentation to point at the packaged skill path
- kept repository-level docs at the root while packaging the installable skill in `skills/`

Published files:
- `skills/design-to-code/SKILL.md`
- `skills/design-to-code/agents/openai.yaml`
- `skills/design-to-code/references/`
- `README.md`
- `README.en.md`
- `README.zh-CN.md`
- `RELEASE_NOTES.md`

## v1.2.0 - 2026-04-28

Released the current root-layout skill package.

Highlights:
- added `Input Modes` to distinguish image-only, metadata-assisted, and figma-assisted workflows
- added a mandatory `Design System Mapping Pass` before page code generation
- added `Asset Resolution Escalation` and `Deviation Policy`
- split verification into `Structure Checks`, `Visual Checks`, and `Reuse Checks`
- synchronized `Pre-Implementation Brief` requirements across `SKILL.md`, `README.md`, `README.zh-CN.md`, and `references/pre-implementation-brief.md`
- flattened the repository so the root directory is the skill package

Published files:
- `skills/design-to-code/SKILL.md`
- `README.md`
- `README.zh-CN.md`
- `skills/design-to-code/agents/openai.yaml`
- `skills/design-to-code/references/`
