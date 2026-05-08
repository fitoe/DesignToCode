import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

export async function readAtlasManifest(manifestPath) {
  const raw = await fs.readFile(manifestPath, 'utf8')
  const manifest = JSON.parse(raw)
  if (!Array.isArray(manifest.atlases)) {
    throw new Error('Atlas manifest must contain an atlases array')
  }
  return manifest
}

function resolveFromRoot(rootDir, relativePath) {
  return path.resolve(rootDir, relativePath)
}

function normalizeEntry(atlas, entry) {
  const crop = entry.crop ?? {}
  return {
    id: entry.id,
    sourcePath: atlas.sourcePath,
    outputPath: entry.outputPath,
    x: Number(crop.x),
    y: Number(crop.y),
    width: Number(crop.width),
    height: Number(crop.height),
  }
}

function validateEntryShape(entry) {
  const missing = []
  if (!entry.id) missing.push('id')
  if (!entry.sourcePath) missing.push('sourcePath')
  if (!entry.outputPath) missing.push('outputPath')
  for (const key of ['x', 'y', 'width', 'height']) {
    if (!Number.isInteger(entry[key]) || entry[key] < 0) missing.push(`crop.${key}`)
  }
  if (entry.width <= 0) missing.push('crop.width')
  if (entry.height <= 0) missing.push('crop.height')
  return missing
}

export async function cropAtlasFromManifest({ manifestPath, rootDir = process.cwd() }) {
  const manifest = await readAtlasManifest(manifestPath)
  const results = []

  for (const atlas of manifest.atlases) {
    const sourcePath = resolveFromRoot(rootDir, atlas.sourcePath)
    for (const rawEntry of atlas.entries ?? []) {
      const entry = normalizeEntry(atlas, rawEntry)
      const missing = validateEntryShape(entry)
      if (missing.length > 0) {
        throw new Error(`Invalid atlas entry ${entry.id || '<missing id>'}: ${missing.join(', ')}`)
      }

      const outputPath = resolveFromRoot(rootDir, entry.outputPath)
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await sharp(sourcePath)
        .extract({ left: entry.x, top: entry.y, width: entry.width, height: entry.height })
        .webp({ quality: 82 })
        .toFile(outputPath)

      results.push({
        id: entry.id,
        outputPath: path.relative(rootDir, outputPath).replaceAll('\\', '/'),
        width: entry.width,
        height: entry.height,
      })
    }
  }

  return results
}

export async function validateAtlasManifest({ manifestPath, rootDir = process.cwd() }) {
  const manifest = await readAtlasManifest(manifestPath)
  const findings = []

  for (const atlas of manifest.atlases) {
    const sourcePath = resolveFromRoot(rootDir, atlas.sourcePath)
    let sourceMetadata
    try {
      sourceMetadata = await sharp(sourcePath).metadata()
    } catch {
      findings.push({
        level: 'error',
        rule: 'atlas-source-missing',
        id: atlas.id ?? atlas.sourcePath,
        message: `atlas source not readable: ${atlas.sourcePath}`,
      })
      continue
    }

    for (const rawEntry of atlas.entries ?? []) {
      const entry = normalizeEntry(atlas, rawEntry)
      const missing = validateEntryShape(entry)
      if (missing.length > 0) {
        findings.push({
          level: 'error',
          rule: 'invalid-entry-shape',
          id: entry.id,
          message: `invalid fields: ${missing.join(', ')}`,
        })
        continue
      }

      if (entry.x + entry.width > sourceMetadata.width || entry.y + entry.height > sourceMetadata.height) {
        findings.push({
          level: 'error',
          rule: 'crop-out-of-bounds',
          id: entry.id,
          message: `${entry.id} exceeds atlas bounds ${sourceMetadata.width}x${sourceMetadata.height}`,
        })
      }

      const outputPath = resolveFromRoot(rootDir, entry.outputPath)
      try {
        const outputMetadata = await sharp(outputPath).metadata()
        if (outputMetadata.width !== entry.width || outputMetadata.height !== entry.height) {
          findings.push({
            level: 'error',
            rule: 'output-size-mismatch',
            id: entry.id,
            message: `${entry.outputPath} is ${outputMetadata.width}x${outputMetadata.height}, expected ${entry.width}x${entry.height}`,
          })
        }
      } catch {
        findings.push({
          level: 'error',
          rule: 'output-missing',
          id: entry.id,
          message: `output not readable: ${entry.outputPath}`,
        })
      }
    }
  }

  return {
    ok: findings.every((finding) => finding.level !== 'error'),
    findings,
  }
}
