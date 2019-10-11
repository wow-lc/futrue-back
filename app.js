const Koa = require('koa');
const koajwt = require('koa-jwt');
const bodyParser = require('koa-bodyparser');
const router = require('./controller');

const Result = require('./commons/result');
const constConfig = require('./config/constConfig');

// 实例化koa
const app = new Koa();

app.use(bodyParser());

// mongo
require('./db/mongo');

// jwt鉴权
// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 200;
      		ctx.body = Result.errorResult('',err);
        }else{
            throw err;
        }
    })
})

app.use(koajwt({
	secret: constConfig.security.secretKey,
}).unless({
	path: [/\/user\/login/]
}));

// 设置全局对象
global.dbHelper = require('./db/dbHelper');

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`sever is started ${port}`);
})
