import {spawnSync} from 'child_process'
import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, unlinkSync, writeFileSync} from 'fs'
import {basename, dirname, relative, resolve} from 'path'
import {fileURLToPath} from 'url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')
const outputDir = resolve(rootDir, 'build')
const shouldPack = process.argv.includes('--pack')

const rootPackage = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf8'))

const ignoredNames = new Set([
    '.git',
    '.idea',
    'node_modules',
    'dist',
    'build',
    'coverage',
])

const ignoredFiles = new Set([
    'package-lock.json',
])

const proSourcePaths = [
    'src/components/cards/MCardBusiness',
    'src/components/cards/MCardFinance',
    'src/components/data/MCalendarBoard',
    'src/components/data/MChart',
    'src/components/data/MChat',
    'src/components/data/MFileManager',
    'src/components/data/MSparkline',
    'src/components/display/MQrCode',
    'src/components/display/MStepper',
    'src/components/display/MTimeline',
    'src/components/feedback/MCookie',
    'src/components/layout/MTopbar',
    'src/components/media/MAvatarStack',
    'src/components/media/MMasonry',
    'src/components/media/MMasonryItem',
    'src/components/media/MShowcaseCarousel',
    'src/components/media/MShowcaseCarouselItem',
    'src/cookie-consent-bootstrap.ts',
    'src/icons/MIconV2.tsx',
    'src/icons/MIconV2Glyph.tsx',
    'src/icons/MIconV2Scenes.tsx',
]

const basicBlockMatchers = {
    'src/components/cards/index.ts': ['MCardBusiness', 'MCardFinance'],
    'src/components/data/index.ts': ['MChat', 'MFileManager', 'MCalendarBoard', 'MLineChart', 'MBarChart', 'MAreaChart', 'MPieChart', 'MSparkline'],
    'src/components/display/index.ts': ['MStepper', 'MTimeline', 'MQrCode'],
    'src/components/feedback/index.ts': ['./MCookie'],
    'src/components/layout/index.ts': ['MTopbar'],
    'src/components/media/index.ts': ['MAvatarStack', 'MShowcaseCarousel', 'MShowcaseCarouselItem', 'MMasonry', 'MMasonryItem'],
    'src/icons/index.ts': ['V2'],
}

const basicReadme = `# MineralUI

Modern React UI framework with a sharp admin aesthetic, theming system, and production-ready components.

- npm: \`@banzamel/mineralui\`
- version: \`${rootPackage.version}\`
- peer dependencies: \`react >= 19\`, \`react-dom >= 19\`
- repository: \`https://github.com/Banzamel/mineralui\`
- homepage: \`https://mineralui.io\`

## Installation

\`\`\`bash
npm install @banzamel/mineralui
\`\`\`

No separate CSS import is required.

## What MineralUI Basic includes

- production-ready React UI components for dashboards, admin panels, forms, and internal tools
- theming with CSS variables and dark/light mode support
- layout primitives, overlays, inputs, feedback components, media, cards, and utilities
- tree-shakeable grouped subpath exports
- bundled styles with automatic runtime injection

## Quick Start

\`\`\`tsx
import {MThemeProvider, MCard, MCardHeader, MCardBody, MInput, MButton} from '@banzamel/mineralui'

export function Example() {
    return (
        <MThemeProvider mode="dark">
            <MCard>
                <MCardHeader title="Workspace settings" />
                <MCardBody>
                    <MInput label="Workspace name" placeholder="Banzamel Studio" fullWidth />
                    <MButton>Save changes</MButton>
                </MCardBody>
            </MCard>
        </MThemeProvider>
    )
}
\`\`\`

## Popular grouped imports

\`\`\`tsx
import {MButton, MCheckbox} from '@banzamel/mineralui/controls'
import {MCard, MCardBody} from '@banzamel/mineralui/cards'
import {MDataTable} from '@banzamel/mineralui/data'
import {MThemeProvider} from '@banzamel/mineralui/theme'
\`\`\`

## Documentation

- website: \`https://mineralui.io\`
- docs: \`https://mineralui.io/docs\`

## Basic vs Pro

This package is the public Basic edition of MineralUI.
Premium components, templates, package access, and installation tooling are distributed separately in MineralUI Pro.
`

const proReadme = `# MineralUI Pro

Private full edition of MineralUI with premium components and product modules.

- npm: \`@banzamel/mineralui-pro\`
- version: \`${rootPackage.version}\`
- peer dependencies: \`react >= 19\`, \`react-dom >= 19\`
- homepage: \`https://mineralui.io\`

## Installation

Configure your project registry and auth token first, then install:

\`\`\`bash
npm install @banzamel/mineralui-pro
\`\`\`

## Notes

This package is generated from the main MineralUI source tree and is intended for private distribution only.
`

function main() {
    rmSync(outputDir, {recursive: true, force: true})
    mkdirSync(outputDir, {recursive: true})

    const basicDir = resolve(outputDir, 'basic')
    const proDir = resolve(outputDir, 'pro')

    createPackageDirectory(basicDir)
    createPackageDirectory(proDir)

    prepareBasicPackage(basicDir)
    prepareProPackage(proDir)

    buildPackageDirectory(basicDir)
    buildPackageDirectory(proDir)

    if (shouldPack) {
        packPackageDirectory(basicDir)
        packPackageDirectory(proDir)
    }

    console.log(`Generated packages in ${relative(rootDir, outputDir) || 'build'}`)
}

function createPackageDirectory(targetDir) {
    mkdirSync(targetDir, {recursive: true})

    for (const entry of readdirSync(rootDir)) {
        const sourcePath = resolve(rootDir, entry)
        const targetPath = resolve(targetDir, entry)

        if (!shouldCopyPath(sourcePath)) {
            continue
        }

        cpSync(sourcePath, targetPath, {
            recursive: true,
            filter: (nestedSourcePath) => shouldCopyPath(nestedSourcePath),
        })
    }
}

function shouldCopyPath(sourcePath) {
    const relPath = relative(rootDir, sourcePath)

    if (relPath === '') {
        return true
    }

    const name = basename(sourcePath)

    if (ignoredNames.has(name) || ignoredFiles.has(name)) {
        return false
    }

    if (name.endsWith('.tgz') || name.endsWith('.log')) {
        return false
    }

    return true
}

function prepareBasicPackage(targetDir) {
    removePaths(targetDir, proSourcePaths)
    removeV2Glyphs(targetDir)

    for (const [filePath, matchers] of Object.entries(basicBlockMatchers)) {
        filterExportBlocks(resolve(targetDir, filePath), (block) => matchers.some((matcher) => block.includes(matcher)))
    }

    rewriteBasicViteConfig(resolve(targetDir, 'vite.config.ts'))
    rewriteBasicPackageJson(resolve(targetDir, 'package.json'))
    rewritePackageEdition(resolve(targetDir, 'src/utils/packageEdition.ts'), 'basic')
    rewriteBasicLicensing(resolve(targetDir, 'src/utils/licensing.ts'))
    writeFileSync(resolve(targetDir, 'README.md'), basicReadme)
}

function prepareProPackage(targetDir) {
    rewriteProPackageJson(resolve(targetDir, 'package.json'))
    rewritePackageEdition(resolve(targetDir, 'src/utils/packageEdition.ts'), 'pro')
    writeFileSync(resolve(targetDir, 'README.md'), proReadme)
}

function removePaths(targetDir, paths) {
    for (const relPath of paths) {
        const fullPath = resolve(targetDir, relPath)

        if (!existsSync(fullPath)) {
            continue
        }

        rmSync(fullPath, {recursive: true, force: true})
    }
}

function removeV2Glyphs(targetDir) {
    const glyphsDir = resolve(targetDir, 'src/icons/glyphs')

    if (!existsSync(glyphsDir)) {
        return
    }

    for (const entry of readdirSync(glyphsDir)) {
        if (!entry.includes('V2')) {
            continue
        }

        unlinkSync(resolve(glyphsDir, entry))
    }
}

function filterExportBlocks(filePath, shouldDropBlock) {
    const source = readFileSync(filePath, 'utf8')
    const lines = source.split(/\r?\n/)
    const kept = []
    let index = 0

    while (index < lines.length) {
        const line = lines[index]
        const trimmed = line.trim()

        if (trimmed === '') {
            kept.push('')
            index++
            continue
        }

        if (!trimmed.startsWith('/**') && !trimmed.startsWith('export')) {
            kept.push(line)
            index++
            continue
        }

        const block = []

        if (trimmed.startsWith('/**')) {
            block.push(line)
            index++

            while (index < lines.length) {
                block.push(lines[index])

                if (lines[index].trim().endsWith('*/')) {
                    index++
                    break
                }

                index++
            }
        }

        if (index < lines.length && lines[index].trim().startsWith('export')) {
            while (index < lines.length) {
                block.push(lines[index])

                if (lines[index].includes(' from ')) {
                    index++
                    break
                }

                index++
            }
        }

        const blockText = block.join('\n')

        if (!shouldDropBlock(blockText)) {
            kept.push(blockText)
        }
    }

    const normalized = kept
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()

    writeFileSync(filePath, normalized === '' ? '' : `${normalized}\n`)
}

function rewriteBasicViteConfig(filePath) {
    const source = readFileSync(filePath, 'utf8')
    const updated = source.replace(
        /\s*'cookie-consent-bootstrap': resolve\(__dirname, 'src\/cookie-consent-bootstrap\.ts'\),\r?\n/,
        '\n'
    )

    writeFileSync(filePath, updated)
}

function rewriteBasicPackageJson(filePath) {
    const manifest = JSON.parse(readFileSync(filePath, 'utf8'))

    delete manifest.exports['./cookie-consent-bootstrap']
    delete manifest.typesVersions['*']['cookie-consent-bootstrap']
    delete manifest.scripts
    delete manifest.prepublishOnly
    manifest.files = ['dist', 'LICENSE', 'README.md']
    manifest.publishConfig = {
        access: 'public',
    }

    writeJson(filePath, manifest)
}

function rewriteProPackageJson(filePath) {
    const manifest = JSON.parse(readFileSync(filePath, 'utf8'))

    manifest.name = '@banzamel/mineralui-pro'
    manifest.description = 'Private full edition of MineralUI with premium components and product modules'
    delete manifest.scripts
    delete manifest.prepublishOnly
    manifest.files = ['dist', 'LICENSE', 'README.md']

    writeJson(filePath, manifest)
}

function rewriteBasicLicensing(filePath) {
    const content = `export type MineralPlan = 'free' | 'pro'

export interface MineralComponentLicense {
    group: 'cards' | 'charts' | 'data' | 'display' | 'media' | 'icons' | 'layout' | 'feedback'
    plan: MineralPlan
}

export const mineralComponentLicenses = {} as const satisfies Record<string, MineralComponentLicense>

export type MineralProComponentName = keyof typeof mineralComponentLicenses

export const mineralProComponents = Object.keys(mineralComponentLicenses) as MineralProComponentName[]

export function isMineralProComponent(componentName: string): componentName is MineralProComponentName {
    return Object.prototype.hasOwnProperty.call(mineralComponentLicenses, componentName)
}

export function getMineralComponentLicense(componentName: string): MineralComponentLicense | undefined {
    if (!isMineralProComponent(componentName)) {
        return undefined
    }

    return mineralComponentLicenses[componentName]
}

export function getMineralComponentPlan(componentName: string): MineralPlan {
    return getMineralComponentLicense(componentName)?.plan ?? 'free'
}
`

    writeFileSync(filePath, content)
}

function rewritePackageEdition(filePath, edition) {
    const content = `export type MineralPackageEdition = 'basic' | 'pro' | 'source'

export const mineralPackageEdition: MineralPackageEdition = '${edition}'
`

    writeFileSync(filePath, content)
}

function writeJson(filePath, value) {
    writeFileSync(filePath, `${JSON.stringify(value, null, 4)}\n`)
}

function buildPackageDirectory(targetDir) {
    runCommand(process.execPath, [resolve(rootDir, 'node_modules/typescript/bin/tsc')], targetDir)
    runCommand(process.execPath, [resolve(rootDir, 'node_modules/vite/bin/vite.js'), 'build'], targetDir)
}

function packPackageDirectory(targetDir) {
    const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

    runCommand(npmCommand, ['pack'], targetDir)
}

function runCommand(command, args, cwd) {
    const result = spawnSync(command, args, {
        cwd,
        stdio: 'inherit',
        shell: false,
    })

    if (result.status !== 0) {
        throw new Error(`Command failed in ${cwd}: ${command} ${args.join(' ')}`)
    }
}

main()
