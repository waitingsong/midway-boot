import { Inject } from '@midwayjs/core'
import { AliOssManager } from '@mwcp/ali-oss'
import { TraceLogger } from '@mwcp/otel'

import { Context } from '##/lib/index.js'

import { RootClass } from './root.class.js'


export class RootController extends RootClass {
  @Inject() readonly ctx: Context
  @Inject() readonly aliOssMan: AliOssManager
  /** TraceLogger */
  @Inject() readonly logger: TraceLogger

}

