// config for `npm run cov|ci`
import type { AppConfig } from '@mwcp/boot'
import { initPathArray } from '@mwcp/jwt'


export const jwtConfig: AppConfig['jwtConfig'] = {
  secret: '123456abc', // 默认密钥，生产环境一定要更改!
}
const jwtIgnoreArr = [
  ...initPathArray,
  '/hello',
  '/ip',
  '/taskman/hello',
  '/test/err',
  '/test/array',
  '/test/blank',
  '/test/empty',
  '/test/fetch',
  '/test/_fetch_target',
  '/test/no_output',
  '/test/sign',
  /debug\/dump\/.*/u,
  /unittest/u,
  '/_info', // https://www.npmjs.com/package/@midwayjs/info
  '/_boot/hello',
  '/upload/hello',
  // RegExp(`${ClientURL.base}/.*`, 'u'),
]
export const jwtMiddlewareConfig: AppConfig['jwtMiddlewareConfig'] = {
  enableMiddleware: true,
  ignore: jwtIgnoreArr,
}


