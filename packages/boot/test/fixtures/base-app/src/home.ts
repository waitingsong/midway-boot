import {
  Controller,
  Get,
} from '@midwayjs/core'
import type { Context } from '@mwcp/share'

import { apiBase, apiMethod } from './types/api-test.js'
import type { RespData } from './types/root.config.js'


@Controller(apiBase.root)
export class HomeController {

  @Get(apiMethod.root)
  async home(ctx: Context): Promise<RespData> {
    const {
      cookies,
      header,
      url,
    } = ctx

    const res = {
      cookies,
      header,
      url,
    }
    return res
  }

}

