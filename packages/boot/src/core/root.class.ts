/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'node:assert/strict'
import type { IncomingHttpHeaders } from 'node:http'

import {
  type AsyncContextManager,
  App,
  ApplicationContext,
  ASYNC_CONTEXT_KEY,
  ASYNC_CONTEXT_MANAGER_KEY,
  Inject,
  IMidwayContainer,
  MidwayEnvironmentService,
} from '@midwayjs/core'
import { ValidateService } from '@midwayjs/validate'
// import { ILogger as Logger } from '@midwayjs/logger'
import {
  FetchComponent,
  Headers,
  type HeadersInit,
  type JsonResp,
  type ResponseData,
} from '@mwcp/fetch'
import { JwtComponent } from '@mwcp/jwt'
import { KoidComponent } from '@mwcp/koid'
import { AttrNames, TraceService } from '@mwcp/otel'
import { formatDateTime, MConfig, MyError } from '@mwcp/share'

import {
  Application,
  Context,
  type FetchOptions,
  type NpmPkg,
} from '##/lib/index.js'


export class RootClass {

  @App() protected readonly app: Application

  @ApplicationContext() readonly applicationContext: IMidwayContainer

  @Inject() readonly validateService: ValidateService

  @Inject() readonly environmentService: MidwayEnvironmentService

  @Inject() readonly fetchComponent: FetchComponent

  @Inject() readonly koid: KoidComponent

  @Inject() readonly jwt: JwtComponent

  @Inject() readonly traceService: TraceService

  @MConfig() readonly pkg: NpmPkg
  @MConfig() readonly globalErrorCode: Record<string | number, string | number>

  getWebContext(): Context | undefined {
    try {
      const contextManager: AsyncContextManager = this.applicationContext.get(
        ASYNC_CONTEXT_MANAGER_KEY,
      )
      const ctx = contextManager.active().getValue(ASYNC_CONTEXT_KEY) as Context | undefined
      return ctx
    }
    catch (ex) {
      void ex
    }
  }

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

  /**
   * 请求和返回类型都是 JSON 格式，
   * 返回类型为 `JsonResp` 结构
   */
  fetch<T extends ResponseData>(options: FetchOptions): Promise<JsonResp<T>> {
    const opts: FetchOptions = {
      ...this.initFetchOptions,
      ...options,
      headers: this.genFetchHeaders(options.headers),
    }
    return this.fetchComponent.fetch(opts)
  }

  /**
   * 请求和返回类型都是 JSON 格式，
   * 返回类型为 `JsonResp` 结构
   */
  getJson<T extends ResponseData>(
    url: string,
    options?: FetchOptions,
  ): Promise<JsonResp<T>> {

    const opts: FetchOptions = {
      ...this.initFetchOptions,
      ...options,
      url,
      method: 'GET',
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchComponent.fetch(opts)
  }

  /**
   * 请求和返回类型都是 JSON 格式，
   * 返回类型为 `JsonResp` 结构
   */
  postJson<T extends ResponseData>(
    url: string,
    options?: FetchOptions,
  ): Promise<JsonResp<T>> {

    const opts: FetchOptions = {
      ...this.initFetchOptions,
      ...options,
      url,
      method: 'POST',
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchComponent.fetch(opts)
  }

  /**
   * 请求和返回类型都是 JSON 格式，
   * 返回类型为自定义结构
   */
  fetchCustom<T>(options: FetchOptions): Promise<T> {
    const opts: FetchOptions = {
      ...this.initFetchOptions,
      ...options,
      headers: this.genFetchHeaders(options.headers),
    }
    return this.fetchComponent.fetch(opts) as Promise<T>
  }

  /**
   * 请求和返回类型都是 JSON 格式，
   * 返回类型为自定义结构
   */
  getCustomJson<T>(
    url: string,
    options?: FetchOptions,
  ): Promise<T> {

    const opts: FetchOptions = {
      ...this.initFetchOptions,
      ...options,
      url,
      method: 'POST',
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchComponent.fetch(opts) as Promise<T>
  }

  /**
   * 请求和返回类型都是 JSON 格式，
   * 返回类型为自定义结构
   */
  postCustomJson<T>(
    url: string,
    options?: FetchOptions,
  ): Promise<T> {

    const opts: FetchOptions = {
      ...this.initFetchOptions,
      ...options,
      url,
      method: 'POST',
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchComponent.fetch(opts) as Promise<T>
  }

  /**
   * 返回类型为字符串
   */
  async getText<T extends string = string>(
    url: string,
    options?: FetchOptions,
  ): Promise<T> {

    const opts: FetchOptions = {
      ...this.initFetchOptions,
      ...options,
      headers: this.genFetchHeaders(options?.headers),
      dataType: 'text',
      url,
      method: 'GET',
    }
    const ret = await this.fetchComponent.fetch<T>(opts)
    return ret
  }

  /**
   * 根据输入 http headers 生成 Headers,
   * @returns Headers 默认不包括以下字段
   *   - host: 当前服务器地址
   *   - connection
   *   - content-length
   */
  genFetchHeaders(
    headers?: HeadersInit | IncomingHttpHeaders | undefined,
    excludes: string[] = ['host', 'connection', 'content-length'],
  ): Headers {

    const ret = new Headers(this.initFetchOptions.headers)
    if (! headers) {
      return ret
    }

    if (headers instanceof Headers) {
      headers.forEach((val, key) => {
        if (Array.isArray(excludes) && excludes.includes(key)) { return }
        ret.set(key, val)
      })
      return ret
    }
    else if (Array.isArray(headers)) { // [string, string][]
      headers.forEach(([key, val]) => {
        if (! key) { return }
        if (Array.isArray(excludes) && excludes.includes(key)) { return }
        if (typeof val === 'undefined') { return }
        ret.set(key, val)
      })
      return ret
    }
    else if (typeof headers === 'object') { // IncomingHttpHeaders
      Object.keys(headers).forEach((key) => {
        if (Array.isArray(excludes) && excludes.includes(key)) { return }
        const data = headers[key]
        if (typeof data === 'undefined') { return }
        const value = Array.isArray(data) || typeof data === 'object' // last for ReadonlyArray
          ? data.join(',')
          : data
        ret.set(key, value)
      })
    }

    return ret
  }
}

