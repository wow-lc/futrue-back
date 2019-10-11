const jwt = require('jsonwebtoken');
const config = require('../config.js');
const dbHelper = require('../db/dbHelper');

const User = dbHelper.getModel('user');

/**
 *  用户api
 */
module.exports = (router) => {    
    /**
     * 注册
     */
    router.post('/register', async ctx => {
        const { username, password } = ctx.request.body;
        const newUser = new User({
            username,
            password,
        }) 
        const user = await newUser.save();
        ctx.status = 200;
        ctx.body = user;
    })
    /**
     * 登录
     */
    router.post("/login", async ctx => {
        const { username, password } = ctx.request.body;
        const payload = {
            username,
            password,
        };
        // 验证
        const users = await User.find({ username });
        console.log(payload);
        
        if(!users) {
            ctx.body = { msg: '该用户名不存在!' };
            return;
        }
        
        if(users[0].password !== password){
            ctx.body = { msg: '密码错误!'};
            return;
        }
        const token = jwt.sign(payload, config.security.secretKey, {expiresIn: config.security.expiresIn });
        ctx.status = 200;
        ctx.body = { token: token};
    })

    /**
     *  获取用户信息
     */
    router.get('/current',async ctx => {
        ctx.body = JSON.stringify(await User.find({}));
    })
}