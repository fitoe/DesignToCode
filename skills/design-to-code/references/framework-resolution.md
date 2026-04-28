# Framework Resolution

Resolve framework from current project before generating code.

## Resolution Order

1. Inspect repo files and dependencies.
2. Prefer explicit framework markers over heuristics.
3. If clear Vue project, generate Vue.
4. If clear Astro project, generate Astro.
5. If mixed or unclear, stop and ask.

## Common Vue Signals

- `package.json` depends on `vue`, `vite`, `nuxt`, `@vitejs/plugin-vue`
- `.vue` pages/components dominate
- existing routes/pages are Vue-based

## Common Astro Signals

- `package.json` depends on `astro`
- `.astro` pages/components dominate
- `src/pages/*.astro` and Astro config present

## Mixed/Unclear Cases

Stop and ask when:
- repo contains both Vue and Astro surfaces with no clear target
- repo is empty and user did not specify framework
- mono-repo contains multiple frontends and task target is unclear

## Do Not

- silently default to Vue
- silently default to Astro
- emit framework-neutral pseudo markup as final deliverable
