import assert from 'node:assert/strict'
import { relative } from 'node:path'

import { apiPrefix, apiRoute } from '@/fixtures/base-app/src/api-route'
import { testConfig, TestRespBody } from '@/root.config'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {

  const path = `${apiPrefix.TraceDecorator}/${apiRoute.error}` // exception will be caught
  const pathTrace = `${apiPrefix.TraceDecorator}/${apiRoute.trace_error}`

  it(`Should ${path} work`, async () => {
    const { httpRequest } = testConfig

    const resp = await httpRequest
      .get(path)
      .expect(200)

    const ret = resp.text as string
    assert(ret.startsWith('debug for'))
  })

  // error from default.servcie will be traced
  it(`Should ${pathTrace} work`, async () => {
    const { httpRequest } = testConfig

    const resp = await httpRequest
      .get(pathTrace)
      .expect(500)

    const ret = resp.text as string
    // assert(! ret, ret)
    assert(ret.includes('debug for DefaultComponentService.error()'), ret)
  })

})
