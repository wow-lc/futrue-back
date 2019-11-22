const Router = require('koa-router');

const router = new Router({
    prefix: '/api'
});

require('./common')(router);
require('./users')(router);
require('./article')(router);

module.exports = router;