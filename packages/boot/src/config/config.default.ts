import assert from 'node:assert'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
// import { pathToFileURL } from 'node:url'

import { uploadWhiteList } from '@midwayjs/upload'
import { initPathArray } from '@mwcp/jwt'
import { retrieveFirstIp, genCurrentDirname } from '@waiting/shared-core'
import type { MiddlewareConfig, NpmPkg } from '@waiting/shared-types'

import { ConfigKey, ErrorCode } from '##/lib/index.js'

import packageJson from '#package.json' with { type: 'json' }


const configDir = genCurrentDirname(import.meta.url)
export const MWCP_BOOT_BASE_DIR = join(configDir, '../..')
export const MWCP_BOOT_DIST_DIR = join(configDir, '../')

// const pkgPath = join(APP_BASE_DIR, 'package.json')
// const p2 = pathToFileURL(pkgPath).pathname
// const pkg = await import(p2, { assert: { type: 'json' } })
//   .then(({ default: _ }: { default: NpmPkg }) => _)

const pkg = packageJson as unknown as NpmPkg
assert(pkg, 'package.json not found')
assert(pkg.name, 'package.json name not found')

export const koa = {
  port: 7001,
  serverTimeout: 60_000,
  requestTimeout: 120_000,
}


export const welcomeMsg = 'Hello Midwayjs!'
export const globalErrorCode = ErrorCode

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

const jwtIgnoreArr = [
  ...initPathArray,
  '/hello',
  `/_${ConfigKey.namespace}/hello`,
]
export const jwtMiddlewareConfig = {
  enableMiddleware: true,
  ignore: jwtIgnoreArr,
}

export const jsonRespMiddlewareConfig: Omit<MiddlewareConfig, 'match' > = {
  enableMiddleware: false,
  ignore: ['/swagger-ui/index.json'],
}


export const upload = {
  // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
  mode: 'file',
  // fileSize: string, 最大上传文件大小，默认为 10mb
  fileSize: '10mb',
  // whitelist: string[]，文件扩展名白名单
  whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
  // tmpdir: string，上传的文件临时存储路径
  tmpdir: join(tmpdir(), 'midway-upload-files'),
  // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
  cleanTimeout: 5 * 60 * 1000,
  // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
  base64: false,
  // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
  match: /\/api\/upload/u,
}

