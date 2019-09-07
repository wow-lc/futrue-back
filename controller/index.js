const Router = require('koa-router');
const router = new Router();

router.use('/api', require('./users')(router).routes());

module.exports = router;