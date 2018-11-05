//参考官网upload例子
// const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
var router = require('koa-router')();

//服务器处理跨域
// const cors = require('koa-cors');
//服务器处理跨域

import babel_co from 'babel-core/register';
import babel_po from 'babel-polyfill';

const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');

//服务器处理跨域
// app.use(cors());
//服务器处理跨域

// serve files from ./public
app.use(serve(path.join(__dirname, '/public')));
app.use(serve(path.join(__dirname, '/views')));

app.use(koaBody({
    multipart: true
}));

app.use(async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    // 这样就能只允许 http://localhost:8080 这个域名的请求了
    // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

    // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

    // Content-Type表示具体请求中的媒体类型信息
    ctx.set("Content-Type", "application/json;charset=utf-8");

    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    ctx.set("Access-Control-Allow-Credentials", true);

    // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    ctx.set("Access-Control-Max-Age", 300);

    /*
    CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
        Cache-Control、
        Content-Language、
        Content-Type、
        Expires、
        Last-Modified、
        Pragma。
    */
    // 需要获取其他字段时，使用Access-Control-Expose-Headers，
    // getResponseHeader('myData')可以返回我们所需的值
    // ctx.set("Access-Control-Expose-Headers", "myData");

    await next();
})




import dateUtil from "./public/js/utils/date";


// custom 404

// app.use(async function(ctx, next) {
//     await next();
//     if (ctx.body || !ctx.idempotent) return;
//     ctx.redirect('/404.html');
// });




// post获取上传的文件
router.post('/post', async function (ctx, next) {
    try {
        // ignore non-POSTs
        if ('POST' != ctx.method) return await next();
        console.log('request.body::::', ctx.request.body);
        //取得表单元素
        let params = ctx.request.body.fields;
        console.log("取得表单元素ctx.request.body.fields", ctx.request.body.fields);
        //解析参数的代码
        // let useName = params.userName;
        // let email = params.email;

        //取得上传文件
        let files = ctx.request.body.files.file;
        let newpath = '';
        files = Array.isArray(files) ? files : Array.of(files); //将单个对象转换为数组

        // 只能用先把files转化成数组，因为不传文件和上传1个文件从request上区分不出来，因为只有一个文件时，数据结构取不出来，不是数组。
        if (files.length > 0) {
            console.log("in 处理文件process！！！！")
            for (let item of files) {
                if (!item || (!item.size && !item.name)) {
                    console.log("此次没有上传文件");
                    continue;
                }
                let tmpath = item['path'];
                let tmparr = item['name'].split('.');
                let ext = '.' + tmparr[tmparr.length - 1];
                newpath = path.join('public/upload', new Date().timestamp() + ext);
                const stream = fs.createWriteStream(newpath); //创建一个可写流
                fs.createReadStream(tmpath).pipe(stream); //可读流通过管道写入可写流
            }
        }
        console.log('ctx.request.body:', ctx.request.body);
        // 返回保存的路径
        ctx.body = {
            code: 0,
            data: {
                path: newpath
            }
        };
    } catch (err) {
        console.log("上传失败，原因：", err);
    }
});

app.use(router.routes());

// listen
app.listen(3000);
console.log('upload server listening on port 3000');