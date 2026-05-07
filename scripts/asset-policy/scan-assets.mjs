import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadPolicy } from './policy-loader.mjs'
import { collectAssetPaths, evaluateAssetRecord, readAssetRecord } from './scan-utils.mjs'

function parseArgs(argv) {
  const args = { root: process.cwd(), ci: false }

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]
    if (token === '--root') args.root = path.resolve(argv[index + 1])
    if (token === '--ci') args.ci = true
  }

  return args
}

const args = parseArgs(process.argv.slice(2))
const policy = loadPolicy(pathToFileURL(path.join(args.root, 'asset-policy.config.json')))
const assetPaths = await collectAssetPaths(args.root, policy)

const evaluated = []
for (const filePath of assetPaths) {
  const record = await readAssetRecord(filePath, args.root, policy)
  evaluated.push(evaluateAssetRecord(record, policy))
}

let errorCount = 0

for (const record of evaluated) {
  if (record.findings.length === 0) continue

  console.log(`${record.relativePath} [${record.role}]`)
  for (const finding of record.findings) {
    console.log(`- ${finding.level} ${finding.rule}: ${finding.message}`)
    if (finding.level === 'error' && !record.exempted) {
      errorCount += 1
    }
  }
}

if (evaluated.length === 0) {
  console.log('No image assets found.')
}

if (args.ci && errorCount > 0) {
  process.exitCode = 1
}
