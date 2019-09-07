const jwt = require('jsonwebtoken');

module.exports = (router) => {
    router.get("/test",async ctx => {
        ctx.status = 200;
        ctx.body = { msg:'user works.' };
    });
    
    router.post("/login", async ctx => {
        // 返回token
        const payload = {
            username: 'lichao',
            userId: '123',
        };
        const token = jwt.sign(payload,"keySecret",{expiresIn: 60 * 60 * 12 * 7});
        ctx.body = { token: token};
    })

    return router;
}