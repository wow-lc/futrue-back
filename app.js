const Koa = require("koa");
const koajwt = require("koa-jwt");
const koaBody = require("koa-body");
const router = require("./controller");
const path = require("path");

const Result = require("./commons/result");
const constConfig = require("./config/constConfig");

// 实例化koa
const app = new Koa();

app.use(
  koaBody({
    multipart: true, // 支持文件上传
    strict: false, // * 
    formidable: {
      uploadDir: path.join(__dirname, "public/upload/"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      }
    }
  })
);



// mongo
require("./db/mongo");

try {
  require("./ws");
  console.log("websocket server success 8080 ...");
} catch (error) {}

// jwt鉴权
// 错误处理
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 200;
      ctx.body = Result.userCheckErrorResult("请登录!", err);
    } else {
      throw err;
    }
  });
});

app.use(
  koajwt({
    secret: constConfig.security.secretKey
  }).unless({
    path: [/\/user\/login/]
  })
);

// 设置全局对象
global.dbHelper = require("./db/dbHelper");

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`sever is started ${port}`);
});
