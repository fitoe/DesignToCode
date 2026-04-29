import fs from 'node:fs/promises'
import path from 'node:path'
import { ASSET_EXTENSIONS, isIgnoredPath, normalizeAssetPath } from './constants.mjs'
import { readAssetRecord as buildAssetRecord } from './asset-record.mjs'
import { loadPolicy } from './policy-loader.mjs'

export function inferAssetRole(relativePath, policy = loadPolicy()) {
  const normalized = normalizeAssetPath(relativePath).toLowerCase()
  const override = (policy.roleOverrides ?? []).find((item) => item.path === normalized)
  if (override) return override.role

  if (normalized.endsWith('.svg') || normalized.includes('/icons/') || normalized.includes('/logos/')) {
    return 'ui-icon-like-asset'
  }
  if (normalized.includes('/background') || normalized.includes('/backgrounds/') || normalized.includes('/textures/')) {
    return 'decorative-bitmap'
  }
  if (normalized.includes('/fallback') || normalized.includes('/fallbacks/') || normalized.includes('crop')) {
    return 'crop-fallback-temporary-asset'
  }
  return 'critical-content-image'
}

export async function collectAssetPaths(rootDir, policy = loadPolicy()) {
  const results = []

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name)
      const relativePath = normalizeAssetPath(path.relative(rootDir, absolutePath))
      if (isIgnoredPath(relativePath, policy)) continue
      if (entry.isDirectory()) {
        await walk(absolutePath)
        continue
      }
      if (ASSET_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        results.push(absolutePath)
      }
    }
  }

  for (const scanDir of policy.scanDirs) {
    await walk(path.resolve(rootDir, scanDir))
  }

  return results.sort()
}

export function evaluateAssetRecord(record, policy) {
  const thresholds = policy.roles[record.role]
  const findings = []

  if (record.format !== thresholds.preferredFormat && !(record.role === 'ui-icon-like-asset' && record.format === 'svg')) {
    findings.push({
      level: 'warn',
      rule: 'preferred-format',
      message: `expected ${thresholds.preferredFormat}, got ${record.format}`,
    })
  }

  if (record.sizeKb > thresholds.softLimitKb) {
    findings.push({
      level: 'warn',
      rule: 'soft-limit-kb',
      message: `${record.sizeKb}KB exceeds ${thresholds.softLimitKb}KB`,
    })
  }

  if (record.sizeKb > thresholds.hardLimitKb) {
    findings.push({
      level: 'error',
      rule: 'hard-limit-kb',
      message: `${record.sizeKb}KB exceeds ${thresholds.hardLimitKb}KB`,
    })
  }

  const exempted = (policy.exemptions ?? []).some((item) => item.glob === record.relativePath)
  return { ...record, findings, exempted }
}

export async function readAssetRecord(filePath, rootDir = process.cwd(), policy = loadPolicy()) {
  const record = await buildAssetRecord(filePath, rootDir)
  return { ...record, role: inferAssetRole(record.relativePath, policy) }
}
