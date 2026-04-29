import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import {
  evaluateAssetRecord,
  inferAssetRole,
  readAssetRecord,
} from '../../scripts/asset-policy/scan-utils.mjs'

test('inferAssetRole uses extension and path hints before falling back to critical', () => {
  assert.equal(inferAssetRole('assets/icons/close.svg'), 'ui-icon-like-asset')
  assert.equal(inferAssetRole('assets/backgrounds/mesh.png'), 'decorative-bitmap')
  assert.equal(inferAssetRole('assets/fallbacks/card-crop.webp'), 'crop-fallback-temporary-asset')
  assert.equal(inferAssetRole('assets/hero/product-shot.png'), 'critical-content-image')
})

test('inferAssetRole honors exact role overrides before heuristics', () => {
  const policy = {
    roleOverrides: [
      { path: 'assets/misc/logo.png', role: 'ui-icon-like-asset' }
    ]
  }

  assert.equal(inferAssetRole('assets/misc/logo.png', policy), 'ui-icon-like-asset')
})

test('readAssetRecord captures width, height, size, and format', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'asset-policy-'))
  const filePath = path.join(tempDir, 'hero.png')

  await sharp({
    create: { width: 1200, height: 800, channels: 3, background: '#ff8800' }
  }).png().toFile(filePath)

  const record = await readAssetRecord(filePath)

  assert.equal(record.width, 1200)
  assert.equal(record.height, 800)
  assert.equal(record.format, 'png')
  assert.match(record.relativePath, /hero\.png$/)
})

test('evaluateAssetRecord emits warn and error severities from the role thresholds', () => {
  const policy = {
    roles: {
      'decorative-bitmap': { preferredFormat: 'webp', softLimitKb: 250, hardLimitKb: 500, maxDisplayScale: 3 }
    },
    exemptions: [{ glob: 'assets/backgrounds/hero.png', reason: 'Approved exception for visual QA baseline' }]
  }

  const record = {
    relativePath: 'assets/backgrounds/hero.png',
    role: 'decorative-bitmap',
    sizeKb: 520,
    format: 'png',
    width: 2400,
    height: 1600
  }

  const result = evaluateAssetRecord(record, policy)

  assert.equal(result.exempted, true)
  assert.equal(result.findings.some((finding) => finding.level === 'error'), true)
  assert.equal(result.findings.some((finding) => finding.rule === 'preferred-format'), true)
})
