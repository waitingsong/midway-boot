import {
  Controller,
  Get,
} from '@midwayjs/core'
import { Context } from '@mwcp/share'

import { RespData } from '../../../root.config.js'


@Controller('/')
export class HomeController {

  @Get('/')
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

