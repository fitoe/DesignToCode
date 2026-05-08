import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import { cropAtlasFromManifest } from '../../scripts/asset-policy/atlas-utils.mjs'
import { validateAtlasManifest } from '../../scripts/asset-policy/atlas-utils.mjs'

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2))
}

test('cropAtlasFromManifest crops declared atlas entries to exact pixel sizes', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'asset-atlas-'))
  const atlasPath = path.join(tempDir, 'atlas.png')
  const manifestPath = path.join(tempDir, 'manifest.json')

  await sharp({
    create: { width: 120, height: 80, channels: 3, background: '#3366ff' }
  }).png().toFile(atlasPath)

  await writeJson(manifestPath, {
    atlases: [
      {
        sourcePath: 'atlas.png',
        entries: [
          {
            id: 'card-visual',
            crop: { x: 10, y: 12, width: 40, height: 30 },
            outputPath: 'assets/card-visual.webp'
          }
        ]
      }
    ]
  })

  const results = await cropAtlasFromManifest({ manifestPath, rootDir: tempDir })
  const outputPath = path.join(tempDir, 'assets', 'card-visual.webp')
  const metadata = await sharp(outputPath).metadata()

  assert.equal(results.length, 1)
  assert.equal(results[0].id, 'card-visual')
  assert.equal(metadata.width, 40)
  assert.equal(metadata.height, 30)
})

test('validateAtlasManifest reports out-of-bounds crops and wrong output dimensions', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'asset-atlas-'))
  const atlasPath = path.join(tempDir, 'atlas.png')
  const wrongOutputPath = path.join(tempDir, 'assets', 'wrong.webp')
  const manifestPath = path.join(tempDir, 'manifest.json')

  await sharp({
    create: { width: 100, height: 60, channels: 3, background: '#ffffff' }
  }).png().toFile(atlasPath)
  await fs.mkdir(path.dirname(wrongOutputPath), { recursive: true })
  await sharp({
    create: { width: 10, height: 10, channels: 3, background: '#000000' }
  }).webp().toFile(wrongOutputPath)

  await writeJson(manifestPath, {
    atlases: [
      {
        sourcePath: 'atlas.png',
        entries: [
          {
            id: 'overflow',
            crop: { x: 80, y: 40, width: 40, height: 30 },
            outputPath: 'assets/overflow.webp'
          },
          {
            id: 'wrong-size',
            crop: { x: 0, y: 0, width: 30, height: 20 },
            outputPath: 'assets/wrong.webp'
          }
        ]
      }
    ]
  })

  const result = await validateAtlasManifest({ manifestPath, rootDir: tempDir })

  assert.equal(result.ok, false)
  assert.equal(result.findings.some((finding) => finding.rule === 'crop-out-of-bounds'), true)
  assert.equal(result.findings.some((finding) => finding.rule === 'output-size-mismatch'), true)
})
