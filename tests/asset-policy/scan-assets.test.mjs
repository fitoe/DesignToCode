import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import sharp from 'sharp'

const execFileAsync = promisify(execFile)

test('scan-assets prints findings and exits non-zero in ci mode for hard failures', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'scan-assets-'))
  const assetPath = path.join(tempDir, 'assets', 'backgrounds', 'hero.png')
  await fs.mkdir(path.dirname(assetPath), { recursive: true })

  await sharp({
    create: { width: 3200, height: 1800, channels: 3, background: '#223344' }
  }).png({ compressionLevel: 0 }).toFile(assetPath)

  await fs.writeFile(path.join(tempDir, 'asset-policy.config.json'), JSON.stringify({
    scanDirs: ['assets'],
    ignoreDirs: [],
    roles: {
      'decorative-bitmap': { preferredFormat: 'webp', softLimitKb: 10, hardLimitKb: 20, maxDisplayScale: 3 },
      'critical-content-image': { preferredFormat: 'webp', softLimitKb: 10, hardLimitKb: 20, maxDisplayScale: 3 },
      'ui-icon-like-asset': { preferredFormat: 'svg', softLimitKb: 10, hardLimitKb: 20, maxDisplayScale: 3 },
      'crop-fallback-temporary-asset': { preferredFormat: 'webp', softLimitKb: 10, hardLimitKb: 20, maxDisplayScale: 3 }
    },
    roleOverrides: [],
    exemptions: []
  }, null, 2))

  await assert.rejects(
    execFileAsync('node', [
      path.resolve('scripts/asset-policy/scan-assets.mjs'),
      '--root',
      tempDir,
      '--ci'
    ], { cwd: process.cwd() }),
    (error) => {
      assert.match(error.stdout, /decorative-bitmap/)
      assert.match(error.stdout, /hard-limit-kb/)
      return true
    }
  )
})
