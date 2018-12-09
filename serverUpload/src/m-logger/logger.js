const log4js = require('log4js');
// 引入日志输出信息的封装文件
const access = require("./access.js");
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

const baseInfo = {
    appLogLevel: 'debug',
    dir: 'logs',
    env: 'dev',
    projectName: 'zzkp-pdfUploadServer',
    serverIp: '0.0.0.0'
}
const {
    env,
    appLogLevel,
    dir,
    serverIp,
    projectName
} = baseInfo
// 增加常量，用来存储公用的日志信息
const commonInfo = {
    projectName,
    serverIp
}
module.exports = (options) => {
    const contextLogger = {}
    const appenders = {}

    // 继承自 baseInfo 默认参数
    const opts = Object.assign({}, baseInfo, options || {})
    // 需要的变量解构 方便使用
    const {
        env,
        appLogLevel,
        dir,
        serverIp,
        projectName
    } = opts
    const commonInfo = {
        projectName,
        serverIp
    }

    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    }

    if (env === "dev" || env === "local" || env === "development") {
        appenders.out = {
            type: "console"
        }
    }
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }

    const logger = log4js.getLogger('cheese');

    return async (ctx, next) => {
        const start = Date.now()
        log4js.configure(config)
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                // 将入参换为函数返回的字符串
                logger[method](access(ctx, message, commonInfo))
            }
        })
        ctx.log = contextLogger;

        await next()
        const responseTime = Date.now() - start;
        logger.info(access(ctx, {
            responseTime: `响应时间为${responseTime/1000}s`
        }, commonInfo))
    }
}