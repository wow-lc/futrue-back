const jwt = require('jsonwebtoken');
const config = require('../config/constConfig');
const dbHelper = require('../db/dbHelper');
const Result = require('../commons/result');

const User = dbHelper.getModel('user');

/**
 *  用户api
 */
module.exports = (router) => {    
    /**
     * 注册
     */
    router.post('/user/register', async ctx => {
        const { username, password } = ctx.request.body;
        
        const user = await User.findOne({ username });
        if(user){
            ctx.body = Result.errorResult('用户名已存在!');
            return;
        }

        const newUser = new User({
            username,
            password,
        }) 
        await newUser.save();
        ctx.body = Result.successResult();
    })
    /**
     * 登录
     */
    router.post("/user/login", async ctx => {
        const { username, password } = ctx.request.body;
        const payload = {
            username,
            password,
        };
        // 验证
        const users = await User.findOne({ username });
        
        if(!users) {
            ctx.body = Result.errorResult('该用户名不存在!');
            return;
        }
        if(users.password !== password){
            ctx.body = Result.errorResult('密码错误!');
            return;
        }
        
        const token = jwt.sign(payload, config.security.secretKey, {expiresIn: config.security.expiresIn });
        ctx.body = Result.successResult({ token }, '登录成功!');
    })

    /**
     *  当前用户信息
     */
    router.get(
        '/user/current',
        async ctx => {
            // ctx.body = JSON.stringify(await User.find({}));
            ctx.body = { msg: 'ok'}
        }
    )

    /**
     *  获取用户列表
     */
    router.get('/user/list',async ctx => {
        ctx.body = Result.successResult(JSON.stringify(await User.find({})));
    })
}