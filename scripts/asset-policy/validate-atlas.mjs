import path from 'node:path'
import { validateAtlasManifest } from './atlas-utils.mjs'

function parseArgs(argv) {
  const args = { root: process.cwd(), manifest: '' }
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]
    if (token === '--root') args.root = path.resolve(argv[index + 1])
    if (token === '--manifest') args.manifest = argv[index + 1]
  }
  return args
}

const args = parseArgs(process.argv.slice(2))
if (!args.manifest) throw new Error('Missing required --manifest argument')

const result = await validateAtlasManifest({
  manifestPath: path.resolve(args.root, args.manifest),
  rootDir: args.root,
})

for (const finding of result.findings) {
  console.log(`${finding.level.toUpperCase()} ${finding.rule} ${finding.id ?? ''}: ${finding.message}`)
}

if (!result.ok) process.exitCode = 1
