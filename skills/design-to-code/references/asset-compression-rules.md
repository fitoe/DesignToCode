# Asset Compression Rules

Use these rules for bitmap asset governance inside `DesignToCode`.

## Roles

- `critical content image`
- `decorative bitmap`
- `ui/icon-like asset`
- `crop fallback / temporary asset`

## Rules

- `critical content image`: prefer `webp`, compress conservatively, exempt explicitly when fidelity loss is visible
- `decorative bitmap`: prefer `webp`, compress aggressively, replace with CSS when reproducible
- `ui/icon-like asset`: prefer `svg`, use bitmap only when vector is unavailable or inappropriate
- `crop fallback / temporary asset`: mark explicitly, keep easy to replace, do not present as a true original

## Validation

- fail on hard size threshold violations without exemption
- warn on soft threshold violations and preferred-format mismatches
- require explicit fallback or exemption reporting in the brief
