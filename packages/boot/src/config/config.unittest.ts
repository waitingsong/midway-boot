
export * from './misc/koa.config.unittest.js'
export * from './jwt/jwt.config.unittest.js'


export const security = {
  csrf: false,
}

// 建议跑测试的时候关闭日志(true)，这样手动故意触发的错误，都不会显示处理。如果想看则打开(false)
export const logger = {
  disableConsoleAfterReady: true,
}

