/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'node:assert/strict'

import { App, Config, Inject, MidwayEnvironmentService } from '@midwayjs/core'
import { ValidateService } from '@midwayjs/validate'
// import { ILogger as Logger } from '@midwayjs/logger'
import { HeadersInit } from '@mwcp/fetch'
import { JwtComponent } from '@mwcp/jwt'
import { KoidComponent } from '@mwcp/koid'
import { AttrNames } from '@mwcp/otel'
import { formatDateTime, MyError } from '@mwcp/share'

import {
  Application,
  Context,
  type FetchOptions,
  type NpmPkg,
} from '##/lib/index.js'


export class RootClass {

  @App() protected readonly app: Application

  @Inject() readonly validateService: ValidateService

  @Inject() readonly environmentService: MidwayEnvironmentService

  @Inject() readonly koid: KoidComponent

  @Inject() readonly jwt: JwtComponent

  @Config() readonly pkg: NpmPkg
  @Config() readonly globalErrorCode: Record<string | number, string | number>

  /**
   * SnowFlake id Generator
   * @usage ```
   *  const id = this.idGenerator
   *  const strId = id.toString()
   *  const hexId = id.toString(16)
   *  const binId = id.toString(2)
   * ```
   */
  get idGenerator(): bigint {
    return this.koid.idGenerator
  }

  /**
   * Generate an RxRequestInit variable,
   * @default
   *   - contentType: 'application/json; charset=utf-8'
   *   - dataType: 'json'
   *   - timeout: 60000 (in production environment, otherwise Infinity)
   *   - headers:
   *     - svc.name
   *     - svc.ver
   */
  get initFetchOptions(): FetchOptions {
    const { pkg } = this
    const headers: HeadersInit = {
      [AttrNames.ServiceName]: pkg.name,
      [AttrNames.ServiceVersion]: pkg.version ?? '',
    }
    const isDevelopmentEnvironment = this.environmentService.isDevelopmentEnvironment()
    const timeout = isDevelopmentEnvironment ? Infinity : 60000
    const args: FetchOptions = {
      url: '',
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      timeout,
      headers,
    }
    return args
  }


  getJwtPayload<T = unknown>(ctx: Context): T {
    assert(ctx, 'ctx is required')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (! ctx['jwtState'].user) {
      this.throwError('获取 jwt payload 信息为空')
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return ctx['jwtState'].user as T
  }

  throwError(message: string, status?: number, cause?: Error): never {
    throw new MyError(message, status, cause)
  }


  assert(value: unknown, message?: string, status = 500): asserts value {
    try {
      assert(value, message)
    }
    catch (ex) {
      const msg = message ?? (ex instanceof Error ? ex.message : 'assert')
      const cause = ex instanceof Error ? ex : undefined
      throw new MyError(msg, status, cause)
    }
  }

  assertStrictEqual<T>(actual: unknown, expected: T, message?: string, status = 500): asserts actual is T {
    try {
      assert.strictEqual(actual, expected, message)
    }
    catch (ex) {
      const msg = message ?? (ex instanceof Error ? ex.message : 'assert.strictEqual')
      const cause = ex instanceof Error ? ex : undefined
      throw new MyError(msg, status, cause)
    }
  }

  convertSecondsToMilliseconds(seconds: number): number {
    return seconds * 1000
  }

  convertSecondsToDateString(seconds: number): string {
    const ret = formatDateTime(seconds * 1000)
    return ret
  }

  convertSecondsToDateObject(seconds: number): Date {
    return new Date(seconds * 1000)
  }

  convertMillisecondsToDate(milliseconds: number): Date {
    return new Date(milliseconds)
  }

}

