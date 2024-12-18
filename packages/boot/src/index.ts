import type { PrometheusConfig } from '@midwayjs/prometheus'
import type { JwtState } from '@mwcp/jwt'
import type { MiddlewareConfig } from '@waiting/shared-types'


export { ContainerConfiguration as Configuration } from './configuration.js'
export * from './app/index.controller.js'
export * from './lib/index.js'
export * from './middleware/index.middleware.js'
export { RootClass } from './core/root.class.js'
export { RootController } from './core/base.controller.js'


declare module '@midwayjs/core/dist/interface.js' {
  interface MidwayConfig {
    jsonRespMiddlewareConfig: Omit<MiddlewareConfig, 'match'> | undefined
    globalErrorCode: Record<string | number, string | number>
    prometheus?: PrometheusConfig
    welcomeMsg: string
  }
}

declare module '@midwayjs/koa/dist/interface.js' {
  interface Context {
    jwtState: JwtState
    reqId: string
  }
}

export {
  MyError,
  shouldEnableMiddleware,
} from '@mwcp/share'


export { Config as MConfig } from '@midwayjs/core'
