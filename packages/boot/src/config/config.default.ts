import { ErrorCode } from '##/lib/index.js'


export * from './misc/env.config.js'
export * from './misc/common.config.js'
export * from './misc/koa.config.js'
export * from './key/key.config.js'

export * from './jwt/jwt.config.js'
export * from './otel/otel.config.js'
export * from './swagger/swagger.config.js'


export const welcomeMsg = 'Hello Midwayjs!'
export const globalErrorCode = ErrorCode

