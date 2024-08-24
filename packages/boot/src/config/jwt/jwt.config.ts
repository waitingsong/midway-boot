import assert from 'node:assert'

import { initPathArray } from '@mwcp/jwt'

import { keys } from '##/config/key/key.config.js'
import type { AppConfig } from '##/lib/index.js'
import { ConfigKey } from '##/lib/index.js'


export const jwtConfig = {
  secret: process.env['JWT_SECRET'] ?? keys,
}
assert(jwtConfig.secret, 'JWT secret is empty')
const jwtIgnoreArr = [
  ...initPathArray,
  `/_${ConfigKey.namespace}/hello`,
  '/',
  '/hello',
  '/ip',
  '/ping',
]
export const jwtMiddlewareConfig: AppConfig['jwtMiddlewareConfig'] = {
  enableMiddleware: true,
  ignore: jwtIgnoreArr,
}

