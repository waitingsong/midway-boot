/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Middleware } from '@midwayjs/decorator'
import { Context, IMiddleware, NextFunction, shouldEnableMiddleware } from '@mwcp/share'
import { humanMemoryUsage } from '@waiting/shared-core'

import { handleAppExceptionAndNext } from './helper.middleware'

import { TraceService } from '~/lib/trace.service'
import { AttrNames, Config, ConfigKey, MiddlewareConfig } from '~/lib/types'
import { addSpanEventWithIncomingRequestData } from '~/lib/util'


@Middleware()
export class TraceMiddlewareInner implements IMiddleware<Context, NextFunction> {
  static getName(): string {
    const name = ConfigKey.middlewareNameInner
    return name
  }

  match(ctx: Context) {
    const config = ctx.app.getConfig(ConfigKey.config) as Config
    if (! config.enable) {
      return false
    }
    const mwConfig = ctx.app.getConfig(ConfigKey.middlewareConfig) as MiddlewareConfig
    if (! mwConfig.enableMiddleware) {
      return false
    }
    const flag = shouldEnableMiddleware(ctx, mwConfig)
    return flag
  }

  resolve() {
    return middleware
  }
}

/**
 * 链路追踪中间件
 * - 对不在白名单内的路由进行追踪
 * - 对异常链路进行上报
 */
async function middleware(
  ctx: Context,
  next: NextFunction,
): Promise<void> {

  const traceSvc = await ctx.requestContext.getAsync(TraceService)
  addSpanEventWithIncomingRequestData(traceSvc.rootSpan, ctx)

  traceSvc.addEvent(traceSvc.rootSpan, {
    event: AttrNames.PreProcessFinish,
    [AttrNames.ServiceMemoryUsage]: JSON.stringify(humanMemoryUsage(), null, 2),
  })

  // const config = getComponentConfig(ctx.app)
  return handleAppExceptionAndNext(traceSvc, next)
}

