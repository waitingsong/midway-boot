import assert from 'assert'

import {
  Controller,
  Get,
  Inject,
} from '@midwayjs/core'
import { Context } from '@mwcp/boot'

import { RootClass } from './types/index.js'


@Controller('/test')
export class TestController extends RootClass {
  @Inject() readonly ctx: Context

  @Get('/err')
  testError(): never {
    assert(this.ctx === this.getWebContext(), 'this.ctx === getWebContext()')
    // HTTP Response Code is 200, Result.code is 2404
    this.throwError('管理员不存在，请检查', 2404)
  }

}


