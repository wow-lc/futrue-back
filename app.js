const Koa = require('koa');
const router = require('./controller');

// 实例化koa
const app = new Koa();

// mongo
require('./db/mongo')();

// 设置全局对象
global.dbHelper = require('./db/dbHelper');

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`sever is started ${port}`);
})
