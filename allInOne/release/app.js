import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import koaRouter from 'koa-router';
import koaBody from 'koa-body';
import fs from 'fs';
import {
  config as m_config
} from './server/config/config';
import {
  parseTime
} from "./server/util/date";
// import log4js from 'log4js';

const app = new Koa();
const router = koaRouter();
const logConfig = {
  appenders: {
    cheese: {
      type: 'dateFile', // 日志类型 
      filename: `logs/task`, // 输出的文件名
      pattern: '-yyyy-MM-dd.log', // 文件名增加后缀
      alwaysIncludePattern: true // 是否总是有后缀名
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'info'
    }
  }
}
// log4js.configure(logConfig)
// const logger = log4js.getLogger('cheese');


const port = 8888; //process.env.PORT;

app.use(koaBody({
  multipart: true,
  encoding: 'gzip'
}))


app.use(async function (ctx, next) {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  // log4js.info(`${ctx.method} ${ctx.url} 请求响应时间：${ms}`);
  console.log('%s %s 请求响应时间：%s', ctx.method, ctx.url, ms);
});

//系统级捕捉未捕捉到的错误
app.on('error', (err, ctx) => {
  // log4js.error(`Node.js Server error:${err}`);
  console.log('node.js Server error', err);
})

//-------router begin-----------------------------------------------------------
//post获取上传的pdf文件
router.post('/fileApi/fileUpload/', async function (ctx, next) {
  try {
    // console.log("in");
    // console.log("m_config:", m_config);
    //新版修改了ctx.request.body里面的内容。把上传后的文件放在ctx.request.files里面，其它表单字段放在ctx.request.body里面了。
    let files = ctx.request.files.mFile;
    // console.log('ctx.request.files.mFile:', ctx.request.files.mFile);
    let filePath = '';
    let dayDPach = '';
    let directoryPath = m_config.directoryPath;
    let maxSize = m_config.pdfMaxSize;

    files = Array.isArray(files) ? files : Array.of(files); //将单个对象转换成数组
    //console.log('files.length:', files.length);
    if (files.length > 0) {
      for (let item of files) {
        if (!item || (!item.size && !item.name)) {
          logger.warn("此次没有上传文件！")
          continue;
        }
        let tmpath = item['path'],
          temparr = item['name'].split('.'),
          ext = '.' + temparr[temparr.length - 1];

        //文件合规性检查
        if (ext != '.pdf') throw '后缀验证失败： 只能上传.pdf文件， 不能上传其它类型！'
        if (item.size > maxSize) throw '文件大小验证失败：文件不能超过100k!';

        console.log("通过合规检查！");

        //创建文件夹，创建文件
        dayDPach = path.join(directoryPath, parseTime(new Date(), '{y}-{m}-{d}'));
        console.log("dayDPach:", dayDPach);
        if (!fs.existsSync(dayDPach)) {
          fs.mkdir(dayDPach, {
            recursive: true
          }, err => {
            if (err) {
              logger.error("创建文件夹错误，文件夹路径为：" + dayDPach);
              throw err;
            }
          })
        }
        filePath = path.join(dayDPach, new Date().timestamp() + ext);
        const stream = fs.createWriteStream(filePath);
        fs.createReadStream(tmpath).pipe(stream);
      }

      logger.info(`文件上传成功！路径：${filePath}`);
      //返回客户端
      ctx.body = {
        code: m_config.code.success,
        data: {
          path: filePath
        }
      }
    } else {
      throw '未上传文件！';
    }
  } catch (err) {
    console.log(`pdf上传失败，原因：${err}`);
    logger.error(`pdf上传失败，原因：${err}`);
    ctx.body = {
      code: m_config.code.error,
      data: {
        path: '',
        err: err
      }
    }
  }
})

//for test
router.post('/fileApi/post_test/', async function () {
  ctx.body = {
    code: m_config.code.success,
    data: {
      name: 'fileApi的post方法通畅'
    }
  }
});

app.use(router.routes());
app.use(serve(path.resolve('dist')));

export default app.listen(port, () => {
  console.log(`koa2 server is listening in ${port}`);
})
