#!/usr/bin/env node

import {
    createInactiveActivationState,
    getPackageManifest,
    getProjectPackageJson,
    readProjectActivationState,
    resolveApiBaseUrl,
    resolveEnvironment,
    resolveFingerprint,
    resolveHostname,
    resolveInstanceId,
    resolvePackageRoot,
    resolveProjectName,
    resolveProjectRoot,
    writePackageActivationRuntime,
    writeProjectActivationState,
} from '../scripts/pro-package-utils.mjs'

function printUsage() {
    console.log(`MineralUI Pro CLI

Usage:
    mineralui-pro activate --license-key=YOUR_LICENSE_KEY

Optional flags:
    --api-url=https://api.mineralui.io
    --project-name=my-project
    --hostname=docs.example.com
    --environment=production
    --instance-id=custom-instance-id
`)
}

function parseArgs(argv) {
    const values = {}
    const positional = []

    for (const entry of argv) {
        if (!entry.startsWith('--')) {
            positional.push(entry)
            continue
        }

        const withoutPrefix = entry.slice(2)
        const separatorIndex = withoutPrefix.indexOf('=')

        if (separatorIndex === -1) {
            values[withoutPrefix] = true
            continue
        }

        const key = withoutPrefix.slice(0, separatorIndex)
        const value = withoutPrefix.slice(separatorIndex + 1)
        values[key] = value
    }

    return {values, positional}
}

async function readJsonResponse(response) {
    try {
        return await response.json()
    } catch {
        return null
    }
}

async function main() {
    const {values, positional} = parseArgs(process.argv.slice(2))
    const command = positional[0]

    if (!command || values.help || values.h) {
        printUsage()
        return 0
    }

    if (command !== 'activate') {
        console.error(`[MineralUI Pro] Unknown command: ${command}`)
        printUsage()
        return 1
    }

    const licenseKey = typeof values['license-key'] === 'string' ? values['license-key'].trim() : ''

    if (!licenseKey) {
        console.error('[MineralUI Pro] Missing required flag: --license-key')
        return 1
    }

    const projectRoot = resolveProjectRoot()
    const packageRoot = resolvePackageRoot(import.meta.url)
    const packageManifest = getPackageManifest(packageRoot)
    const projectPackage = getProjectPackageJson(projectRoot)
    const storedActivationState = readProjectActivationState(projectRoot)
    const packageName = typeof packageManifest.name === 'string' ? packageManifest.name : '@banzamel/mineralui-pro'
    const packageVersion = typeof packageManifest.version === 'string' ? packageManifest.version : null
    const projectName =
        (typeof values['project-name'] === 'string' ? values['project-name'].trim() : '') ||
        resolveProjectName(projectRoot, projectPackage)
    const hostname =
        (typeof values.hostname === 'string' ? values.hostname.trim() : '') || resolveHostname(projectPackage)
    const environment =
        (typeof values.environment === 'string' ? values.environment.trim() : '') || resolveEnvironment()
    const storedInstanceId =
        storedActivationState?.activated === true &&
        storedActivationState.packageName === packageName &&
        typeof storedActivationState.instanceId === 'string' &&
        storedActivationState.instanceId.trim() !== ''
            ? storedActivationState.instanceId.trim()
            : ''
    const instanceId =
        (typeof values['instance-id'] === 'string' ? values['instance-id'].trim() : '') ||
        storedInstanceId ||
        resolveInstanceId(projectRoot, packageName, hostname)
    const fingerprint = resolveFingerprint(projectRoot, packageName, packageVersion ?? '0.0.0', hostname)
    const apiBaseUrl =
        (typeof values['api-url'] === 'string' ? values['api-url'].trim() : '') || resolveApiBaseUrl(projectRoot)
    const endpoint = `${apiBaseUrl.replace(/\/+$/, '')}/licensing/activate`

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            license_key: licenseKey,
            instance_id: instanceId,
            package_name: packageName,
            package_version: packageVersion,
            project_name: projectName,
            environment,
            hostname,
            fingerprint,
            metadata: {
                cwd: projectRoot,
                user_agent: process.env.npm_config_user_agent ?? null,
                activated_via: 'mineralui-pro-cli',
            },
        }),
    })

    const payload = await readJsonResponse(response)

    if (!response.ok) {
        const message =
            payload?.errors?.license_key?.[0] ??
            payload?.message ??
            `Activation request failed with status ${response.status}.`

        console.error(`[MineralUI Pro] ${message}`)
        return 1
    }

    const activationState = {
        activated: true,
        packageName,
        packageVersion,
        projectName,
        environment,
        hostname,
        instanceId,
        activationId: payload?.activation?.activation_id ?? null,
        activatedAt: payload?.activation?.activated_at ?? new Date().toISOString(),
        apiBaseUrl: apiBaseUrl.replace(/\/+$/, ''),
    }

    writeProjectActivationState(projectRoot, activationState)
    writePackageActivationRuntime(packageRoot, activationState)

    const operation = payload?.operation === 'updated' ? 'updated' : 'created'

    if (operation === 'updated') {
        console.log('[MineralUI Pro] Installation updated successfully.')
    } else {
        console.log('[MineralUI Pro] Installation activated successfully.')
    }

    if (activationState.activationId) {
        console.log(`[MineralUI Pro] Activation ID: ${activationState.activationId}`)
    }

    console.log(`[MineralUI Pro] Project: ${projectName}`)
    console.log(`[MineralUI Pro] Hostname: ${hostname}`)
    return 0
}

main()
    .then((code) => {
        process.exitCode = code ?? 0
    })
    .catch((error) => {
        const message = error instanceof Error ? error.message : 'Unknown activation error.'
        console.error(`[MineralUI Pro] ${message}`)

        const packageRoot = resolvePackageRoot(import.meta.url)
        const manifest = getPackageManifest(packageRoot)

        writePackageActivationRuntime(
            packageRoot,
            createInactiveActivationState({
                packageName: typeof manifest.name === 'string' ? manifest.name : '@banzamel/mineralui-pro',
                packageVersion: typeof manifest.version === 'string' ? manifest.version : null,
            })
        )

        process.exitCode = 1
    })
