import assert from 'node:assert'
import { join } from 'node:path'

import { retrieveFirstIp, genCurrentDirname } from '@waiting/shared-core'
import type { MiddlewareConfig, NpmPkg } from '@waiting/shared-types'

import packageJson from '#package.json' with { type: 'json' }


const configDir = genCurrentDirname(import.meta.url)
export const MWCP_BOOT_BASE_DIR = join(configDir, '../../..')
export const MWCP_BOOT_DIST_DIR = join(configDir, '../../')

// const pkgPath = join(APP_BASE_DIR, 'package.json')
// const p2 = pathToFileURL(pkgPath).pathname
// const pkg = await import(p2, { assert: { type: 'json' } })
//   .then(({ default: _ }: { default: NpmPkg }) => _)

const pkg = packageJson as unknown as NpmPkg
assert(pkg, 'package.json not found')
assert(pkg.name, 'package.json name not found')

const ip = retrieveFirstIp()
const nameNorm = pkg.name.replace(/@/ug, '').replace(/\//ug, '-')
export const prometheus = {
  labels: {
    APP_NAME: pkg.name,
    APP_NAME_NORM: nameNorm,
    APP_VER: pkg.version,
    APP_PID: process.pid,
    APP_PPID: process.ppid,
    APP_IPs: ip ? ip.address : 'n/a',
  },
}

export const jsonRespMiddlewareConfig: Omit<MiddlewareConfig, 'match' > = {
  enableMiddleware: false,
  ignore: ['/swagger-ui/index.json'],
}

