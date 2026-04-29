import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ASSET_EXTENSIONS,
  DEFAULT_POLICY,
  isIgnoredPath,
  normalizeAssetPath,
} from '../../scripts/asset-policy/constants.mjs'

test('default policy exposes the expected role thresholds', () => {
  assert.equal(DEFAULT_POLICY.roles['critical-content-image'].preferredFormat, 'webp')
  assert.equal(DEFAULT_POLICY.roles['decorative-bitmap'].hardLimitKb, 500)
  assert.equal(DEFAULT_POLICY.roles['ui-icon-like-asset'].preferredFormat, 'svg')
})

test('asset extensions cover the supported bitmap and vector formats', () => {
  assert.deepEqual(
    ASSET_EXTENSIONS,
    new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'])
  )
})

test('path helpers normalize slashes and ignore configured directories', () => {
  assert.equal(normalizeAssetPath('assets\\\\hero\\\\cover.png'), 'assets/hero/cover.png')
  assert.equal(isIgnoredPath('node_modules/sharp/logo.png'), true)
  assert.equal(isIgnoredPath('skills/design-to-code/references/logo.svg'), false)
})
