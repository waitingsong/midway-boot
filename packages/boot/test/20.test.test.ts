import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { type JsonResp, ErrorCode } from '##/index.js'
import { apiBase, apiMethod } from '#@/api-test.js'
import { testConfig, TestRespBody } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), () => {

  it('Should work', async () => {
    const { httpRequest, app } = testConfig

    const path = `${apiBase.test}/${apiMethod.err}`
    const resp = await httpRequest.get(path)

    assert(resp.ok, resp.text)
    const ret = resp.body as JsonResp
    assert(ret.code === 2404)
    assert(ret.codeKey === ErrorCode[ret.code])

    const globalErrorCode = app.getConfig('globalErrorCode') as Record<string | number, string | number>
    assert.deepStrictEqual(globalErrorCode, ErrorCode)
    assert(ret.codeKey === globalErrorCode[ret.code])
  })

})

