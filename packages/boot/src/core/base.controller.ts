import { Inject } from '@midwayjs/core'
import type { AliOssManager } from '@mwcp/ali-oss'

import type { Context } from '##/lib/index.js'

import { RootClass } from './root.class.js'


export class RootController extends RootClass {
  @Inject() readonly ctx: Context
  @Inject() readonly aliOssMan: AliOssManager
}

