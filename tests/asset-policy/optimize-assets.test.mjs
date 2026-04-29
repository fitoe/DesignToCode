import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

test('optimize-assets converts decorative png input into a smaller webp output', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'optimize-assets-'))
  const sourcePath = path.join(tempDir, 'assets', 'backgrounds', 'mesh.png')
  await fs.mkdir(path.dirname(sourcePath), { recursive: true })

  await sharp({
    create: { width: 2400, height: 1400, channels: 3, background: '#778899' }
  }).png({ compressionLevel: 0 }).toFile(sourcePath)

  await fs.writeFile(path.join(tempDir, 'asset-policy.config.json'), JSON.stringify({
    scanDirs: ['assets'],
    ignoreDirs: [],
    roles: {
      'decorative-bitmap': { preferredFormat: 'webp', softLimitKb: 250, hardLimitKb: 500, maxDisplayScale: 3 },
      'critical-content-image': { preferredFormat: 'webp', softLimitKb: 400, hardLimitKb: 800, maxDisplayScale: 3 },
      'ui-icon-like-asset': { preferredFormat: 'svg', softLimitKb: 80, hardLimitKb: 150, maxDisplayScale: 3 },
      'crop-fallback-temporary-asset': { preferredFormat: 'webp', softLimitKb: 250, hardLimitKb: 500, maxDisplayScale: 3 }
    },
    roleOverrides: [],
    exemptions: []
  }, null, 2))

  await execFileAsync('node', [
    path.resolve('scripts/asset-policy/optimize-assets.mjs'),
    '--root',
    tempDir,
    '--input',
    'assets/backgrounds/mesh.png',
    '--write'
  ], { cwd: process.cwd() })

  const optimizedPath = path.join(tempDir, 'assets', 'backgrounds', 'mesh.optimized.webp')
  const sourceStats = await fs.stat(sourcePath)
  const optimizedStats = await fs.stat(optimizedPath)

  assert.equal(optimizedStats.size < sourceStats.size, true)
})
