
export type {
  AppConfig,
  AppInfomation,
  Application,
  Context,
  IMiddleware,
  IMidwayApplication,
  IMidwayContainer,
  NextFunction,
} from '@mwcp/share'


export {
  type Attributes,
  AttrNames,
  HeadersKey,
  Trace,
  TraceInit,
  TraceLogger,
  TraceService,
} from '@mwcp/otel'

export type { JwtResult } from '@mwcp/jwt'

export {
  type CacheEvictArgs,
  type CacheManagerConfig,
  type CacheManagerOptions,
  type CacheableArgs,
  type DataWithCacheMeta,
  type KeyGenerator,
  type MidwayCache,
  type MidwayMultiCache,
  type MidwayUnionCache,
  CacheConfigKey,
  CacheEvict,
  CachePut,
  Cacheable,
  CachingFactory,
} from '@mwcp/cache'

export {
  type FetchOptions,
  type HeadersInit,
  type RequestInfo,
  type RequestInit,
  type ResponseData,
  FormData,
  Headers,
  Response,
} from '@mwcp/fetch'

export type {
  JsonObject,
  JsonResp,
  JsonType,
  NpmPkg,
} from '@waiting/shared-types'

export {
  type KmorePropagationConfig,
  type KmoreTransaction as DbTransaction,
  type PageRawType,
  type PageWrapType,
  type PagingMeta,
  type PagingOptions,
  PropagationType,
  Transactional,
} from '@mwcp/kmore'

export {
  type ConfigDc as KoidConfigDc,
  type ConfigNode as KoidConfigNode,
  type KoidConfig,
  KoidConfigKey,
} from '@mwcp/koid'

export enum ConfigKey {
  namespace = 'boot',
  config = 'bootConfig',
  middlewareConfig = 'bootMiddlewareConfig',
  componentName = 'bootComponent',
  middlewareName = 'bootMiddleware',
}

export enum Msg {
  hello = 'hello midway.js',
}


export enum ErrorCode {
  success = 0,
  E_Common = 1,
  /** 身份校验失败 */
  E_Unauthorized = 401,
  /** 资源未找到 */
  E_Not_Found = 404,
  /**
   * 服务内部异常
   * @description 在向外屏蔽内部服务异常时可使用。注意：返回结果将自动屏蔽任何异常详情
   */
  E_Internal_Server = 500,
  /**
   * 服务内部异常
   * @description Knex 连接数据库超时
   */
  E_Db_Acq_Connection_Timeout = 999,
  /**
   * 管理员不存在
   */
  E_Admin_Not_Exists = 2404,
}

