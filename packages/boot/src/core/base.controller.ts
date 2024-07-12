import type { IncomingHttpHeaders } from 'node:http'

import { Inject } from '@midwayjs/core'
import { AliOssManager } from '@mwcp/ali-oss'
import {
  FetchService,
  Headers,
  type HeadersInit,
  type JsonResp,
  type ResponseData,
} from '@mwcp/fetch'
import { TraceLogger, TraceService } from '@mwcp/otel'

import { Context, type FetchOptions } from '##/lib/index.js'

import { RootClass } from './root.class.js'


export class RootController extends RootClass {
  @Inject() readonly ctx: Context
  @Inject() readonly aliOssMan: AliOssManager
  @Inject() readonly fetchService: FetchService
  @Inject() readonly traceService: TraceService
  /** TraceLogger */
  @Inject() readonly logger: TraceLogger


  /* c8 ignore start */
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
    return this.fetchService.fetch(opts)
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
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchService.get(url, opts)
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
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchService.post(url, opts)
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
    return this.fetchService.fetch(opts) as Promise<T>
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
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchService.get(url, opts) as Promise<T>
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
      headers: this.genFetchHeaders(options?.headers),
    }
    return this.fetchService.post(url, opts) as Promise<T>
  }
  /* c8 ignore stop */

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
    }
    const ret = await this.fetchService.get<T>(url, opts)
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

