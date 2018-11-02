//参考官网upload例子
// const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
var router = require('koa-router')();

import babel_co from 'babel-core/register';
import babel_po from 'babel-polyfill';

const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');

// serve files from ./public

app.use(serve(path.join(__dirname, '/public')));
app.use(serve(path.join(__dirname, '/views')));

app.use(koaBody({
    multipart: true
}));

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
        //console.log('post params:::::useName,email',useName,email);

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
                newpath = path.join('public/upload', parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + ext);
                // newpath = 'D:\/testUpload' + parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + ext;
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