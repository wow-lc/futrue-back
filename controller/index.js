const Router = require('koa-router');

const router = new Router({
    prefix: '/api'
});

require('./users')(router);

module.exports = router;