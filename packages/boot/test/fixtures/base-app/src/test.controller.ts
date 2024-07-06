import {
  Controller,
  Get,
} from '@midwayjs/core'

import { RootClass } from './types/index.js'


@Controller('/test')
export class TestController extends RootClass {

  @Get('/err')
  testError(): never {
    // HTTP Response Code is 200, Result.code is 2404
    this.throwError('管理员不存在，请检查', 2404)
  }

}


