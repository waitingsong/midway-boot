import {
  Controller,
  Get,
} from '@midwayjs/core'
import { Context } from '@mwcp/share'

import { apiBase, apiMethod } from '../../../api-test.js'
import { RespData } from '../../../root.config.js'


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

