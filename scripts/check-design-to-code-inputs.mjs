#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const manifestArg = process.argv[2] || path.join(root, 'design-to-code-inputs', 'manifest.json')
const manifestPath = path.isAbsolute(manifestArg) ? manifestArg : path.join(root, manifestArg)
const baseDir = path.dirname(manifestPath)
const projectRoot = path.basename(baseDir) === 'design-to-code-inputs' ? path.dirname(baseDir) : baseDir
const blockers = []
const warnings = []

function displayPath(file) {
  return path.relative(root, file) || file
}

function exists(relOrAbs) {
  const p = path.isAbsolute(relOrAbs) ? relOrAbs : path.join(projectRoot, relOrAbs)
  return fs.existsSync(p)
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  }
  catch (error) {
    blockers.push(`invalid json: ${path.relative(root, file)}: ${error.message}`)
    return null
  }
}

if (!fs.existsSync(manifestPath)) {
  blockers.push(`missing manifest: ${path.relative(root, manifestPath)}`)
}

const manifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : null
const items = Array.isArray(manifest) ? manifest : manifest?.items

if (manifest && !Array.isArray(items)) {
  blockers.push('manifest must be an array or an object with items[]')
}

for (const item of items || []) {
  const pageId = item.page_id || item.pageId
  if (!pageId)
    blockers.push('manifest item missing page_id')

  const pageCrop = item.page_crop || item.crop
  if (!pageCrop)
    blockers.push(`${pageId || '<unknown>'}: missing page_crop/crop`)
  else if (!exists(pageCrop))
    blockers.push(`${pageId}: missing crop file ${pageCrop}`)

  const targetViewport = item.target_viewport || item.targetViewport
  if (!targetViewport)
    warnings.push(`${pageId}: missing target_viewport`)

  const sourceSize = item.source_size || item.sourceSize || item.size
  if (!sourceSize)
    warnings.push(`${pageId}: missing source_size/size`)

  const brief = item.pre_implementation_brief || item.preImplementationBrief || `pre-implementation-briefs/${pageId}.md`
  if (pageId && !exists(brief))
    blockers.push(`${pageId}: missing pre-implementation brief ${brief}`)

  if (Array.isArray(item.sections)) {
    for (const section of item.sections) {
      if (section.crop && !exists(section.crop))
        blockers.push(`${pageId}/${section.id || '<section>'}: missing section crop ${section.crop}`)
      if (!section.bbox)
        warnings.push(`${pageId}/${section.id || '<section>'}: missing bbox`)
    }
  }
}

const result = { passed: blockers.length === 0, blockers, warnings }
console.log(JSON.stringify(result, null, 2))
process.exit(result.passed ? 0 : 1)
