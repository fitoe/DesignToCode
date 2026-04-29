import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { ASSET_EXTENSIONS } from './constants.mjs'
import { loadPolicy } from './policy-loader.mjs'
import { readAssetRecord } from './scan-utils.mjs'

function parseArgs(argv) {
  const args = { root: process.cwd(), input: '', write: false }

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]
    if (token === '--root') args.root = path.resolve(argv[index + 1])
    if (token === '--input') args.input = argv[index + 1]
    if (token === '--write') args.write = true
  }

  return args
}

function buildOutputPath(sourcePath) {
  const parsed = path.parse(sourcePath)
  return path.join(parsed.dir, `${parsed.name}.optimized.webp`)
}

const args = parseArgs(process.argv.slice(2))
if (!args.input) {
  throw new Error('Missing required --input argument')
}

if (!ASSET_EXTENSIONS.has(path.extname(args.input).toLowerCase())) {
  throw new Error(`Input must be an image asset: ${args.input}`)
}

const policy = loadPolicy(pathToFileURL(path.join(args.root, 'asset-policy.config.json')))
const absoluteInputPath = path.resolve(args.root, args.input)
const record = await readAssetRecord(absoluteInputPath, args.root, policy)
const outputPath = buildOutputPath(absoluteInputPath)

let pipeline = sharp(absoluteInputPath)
if (record.role !== 'ui-icon-like-asset' && record.width > 1600) {
  pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true })
}

const buffer = await pipeline.webp({
  quality: record.role === 'critical-content-image' ? 82 : 72
}).toBuffer()

if (args.write) {
  await fs.writeFile(outputPath, buffer)
  console.log(`Wrote ${path.relative(args.root, outputPath)}`)
} else {
  console.log(`Planned ${path.relative(args.root, outputPath)} (${buffer.length} bytes)`)
}
