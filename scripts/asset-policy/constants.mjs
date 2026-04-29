import fs from 'node:fs'
import path from 'node:path'

export const ASSET_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'])

export const DEFAULT_POLICY = JSON.parse(
  fs.readFileSync(new URL('../../asset-policy.config.json', import.meta.url), 'utf8')
)

export function normalizeAssetPath(inputPath) {
  return inputPath.replace(/[\\/]+/g, '/')
}

export function isIgnoredPath(relativePath, policy = DEFAULT_POLICY) {
  const normalized = normalizeAssetPath(relativePath)
  return policy.ignoreDirs.some((segment) => normalized === segment || normalized.startsWith(`${segment}/`))
}
