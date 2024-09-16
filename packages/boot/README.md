# Midway.js Boot Component

Various midway.js components integrated


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/midway-boot)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/lang-TypeScript-blue.svg)]()
[![ci](https://github.com/waitingsong/midway-boot/actions/workflows/nodejs.yml/badge.svg
)](https://github.com/waitingsong/midway-boot/actions)
[![codecov](https://codecov.io/gh/waitingsong/midway-boot/graph/badge.svg?token=EA9vubhbiL)](https://codecov.io/gh/waitingsong/midway-boot)


## Note

ESM build only, requires `@midwayjs >= 3.16` and set `"type": "module"` in `packages.json`

## Install

```sh
npm i @mwcp/boot
```


## Config

Update your project `src/configuration.ts`

```ts
import * as boot from '@mwcp/boot'
@Configuration({
  importConfigs: [join(__dirname, 'config')],
  imports: [
    boot,
    // others...
  ],
})
export class ContainerConfiguration implements ILifeCycle { }
```


## License
[MIT](LICENSE)



<br>
