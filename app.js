const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
const router = require('./controller');
const passport = require('koa-passport')

// 实例化koa
const app = new Koa();

app.use(bodyParser());

// mongo
require('./db/mongo');

app.use(passport.initialize())
app.use(passport.session())

// 设置全局对象
global.dbHelper = require('./db/dbHelper');

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`sever is started ${port}`);
})
