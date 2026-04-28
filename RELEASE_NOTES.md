# Release Notes

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
