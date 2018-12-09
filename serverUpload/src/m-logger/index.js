const logger = require("./logger");
module.exports = (options) => {
    const loggerMiddleware = logger(options);
    return (ctx, next) => {
        return loggerMiddleware(ctx, next)
            .catch((e) => {
                ctx.log.error(e.stack);
                ctx.state.logged = true;
                //ctx.throw(e);
                console.log("日志中间件错误！");
            })
    }
}