import { busboy } from '##/config/busboy/busboy.config.js'
import { ConfigKey } from '##/lib/types.js'


export const apiBase = {
  root: '/',
  prefix: `/_${ConfigKey.namespace}`,
  demo: '/demo',
  test: '/test',
  upload: '/upload',
}

export const apiMethod = {
  root: '/',
  hello: 'hello',
  component: 'component',
  err: 'err',
}
