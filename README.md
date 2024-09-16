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

## Packages

| Package  | Version                |
| -------- | ---------------------- |
| [`boot`] | [![boot-svg]][boot-ch] |


## Initialize and install dependencies

## 安装全局依赖
```sh
npm i -g c8 lerna madge rollup tsx zx
```

## Update package

```sh
npm i && npm run build
```

## Test

- Use `npm run lint` to check code style.
- Use `npm run test` to run unit test.

## Clan or Purge

```sh
# clean build dist, cache and build
npm run clean
# clean and remove all node_modules
npm run purge
```

## Note

- Run `npm run clean` before `npm run build`, if any file under typescript outDir folder was deleted manually.
- Default publish registry is `NPM`, configurated in file `lerna.json`
- Any commands above (such as `npm run build`) running in `Git-Bash` under Windows OS

## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)

<br>

[Midway.js]: https://midwayjs.org/


[`boot`]: https://github.com/waitingsong/midway-boot/tree/main/packages/boot
[boot-svg]: https://img.shields.io/npm/v/@mwcp/boot.svg?maxAge=7200
[boot-ch]: https://github.com/waitingsong/midway-boot/tree/main/packages/boot/CHANGELOG.md

