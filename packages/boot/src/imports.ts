import * as upload from '@midwayjs/busboy'
import * as info from '@midwayjs/info'
import * as koa from '@midwayjs/koa'
import * as prometheus from '@midwayjs/prometheus'
import * as tenant from '@midwayjs/tenant'
import * as validate from '@midwayjs/validate'
import * as aliOss from '@mwcp/ali-oss'
import * as cache from '@mwcp/cache'
import * as fetch from '@mwcp/fetch'
import * as jwt from '@mwcp/jwt'
import * as db from '@mwcp/kmore'
import * as koid from '@mwcp/koid'
import * as otel from '@mwcp/otel'
import * as pgmq from '@mwcp/pgmq'
// import { customLogger } from './util/custom-logger'


/* c8 ignore next 4 */
// const CI = !! (process.env['MIDWAY_SERVER_ENV'] === 'unittest'
//   || process.env['MIDWAY_SERVER_ENV'] === 'local'
//   || process.env['NODE_ENV'] === 'unittest'
//   || process.env['NODE_ENV'] === 'local'
// )

export const useComponents: IComponentInfo[] = [
  otel,
  koa,
  validate,
  prometheus,
  jwt,
  koid,
  fetch,
  db,
  aliOss,
  cache,
  upload,
  info,
  tenant,
  pgmq,
]

export const useDefaultRoutes: (string | RegExp)[] = [
  new RegExp(`/${aliOss.AliOssConfigKey.namespace}/.+`, 'u'),
  new RegExp(`/${db.ConfigKey.namespace}/.+`, 'u'),
  new RegExp(`/${otel.OtelConfigKey.namespace}/.+`, 'u'),
  new RegExp(`/${koid.KoidConfigKey.namespace}/.+`, 'u'),
]

export interface IComponentInfo {
  Configuration: unknown
  [key: string]: unknown
}

