import fs from 'node:fs'

export function loadPolicy(configPath = new URL('../../asset-policy.config.json', import.meta.url)) {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'))
}
