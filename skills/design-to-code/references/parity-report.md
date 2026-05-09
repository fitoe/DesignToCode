# Parity Report

Create this after a screenshot comparison. Keep it short and actionable.

## Template

```md
# <page-id> Parity Report

- source: <design crop path>
- route: <runtime route>
- target file: <code file>
- screenshot: <screenshot path>
- viewport: 390x844
- mode: structural | balanced | high-fidelity

## Scores

| Layer | Score | Notes |
| --- | ---: | --- |
| Structure | 0-100 | |
| Proportion | 0-100 | |
| Style | 0-100 | |
| Detail | 0-100 | |
| Overall | 0-100 | |

## Matched

- 

## Top Mismatches

1. 
2. 
3. 

## Repair Log

### Round 1
- fixed:
- remaining:

## Accepted Deviations

- 

## Design Debt

- 
```

## Scoring Intent

Scores are not exact science. They force layered judgment so “structure exists” is not confused with “high fidelity”.

## Stop Labels

Use these labels:
- `structural`: structure is present, proportion/style/detail may be poor
- `balanced`: structure and basic style are acceptable
- `high-fidelity`: structure, proportion, style, and key details have passed at least one repair loop
