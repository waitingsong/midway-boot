import { relative } from 'path'

import { validateTokenString } from '~/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {

  describe('Should validateTokenString() work', () => {
    it('with invalid input', () => {
      const arr = [true, false, null, void 0, '']

      arr.forEach((val) => {
        try {
          // @ts-ignore
          validateTokenString(val)
        }
        catch (ex) {
          return assert(true)
        }
        assert(false, 'Should throw error but NOT.')
      })
    })
  })

})

