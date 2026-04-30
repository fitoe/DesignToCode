# Section Boundary And Cross-Section Rules

Avoid “each section looks fine alone, full page feels wrong”.

## What To Check

- section shell spans the intended viewport width
- inner container remains aligned to the canonical page/container width
- shared container width across adjacent sections
- vertical rhythm between sections
- continued background fields across section boundaries
- decorative bleed or overlap between neighboring sections

## When To Treat Sections Jointly

- one section shell clearly owns a full-bleed background field
- one gradient/background clearly spans both sections
- one container shell visually wraps multiple sections
- decorative element crosses boundary
- spacing relationship is critical to hero-to-next-section transition

## When To Keep Sections Independent

- shell and inner container are self-contained inside one section
- sections sit on clearly separate background bands
- layout shells reset fully between sections
- no shared decorative or structural continuity

## Output Impact

Cross-section decisions affect:
- wrapper structure
- padding boundaries
- background layering
- diff diagnosis
