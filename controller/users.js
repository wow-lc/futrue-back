const dbHelper = require('../db/dbHelper');
const pageHelper = require('../db/pageHelper');
const Result = require('../commons/result');
const Tools = require('../commons/tools');

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
            ...ctx.request.body
        });
        await newUser.save();
        ctx.body = Result.successResult();
    })
    /**
     * 登录
     */
    router.post("/user/login",async ctx => {
        const { username, password } = ctx.request.body;
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

        const payload = {
            id: users._id,
            username,
            password,
        };
        
        const token = Tools.getToken(payload);
        ctx.body = Result.successResult({ token }, '登录成功!');
    })

    /**
     *  当前用户信息
     */
    router.get(
        '/user/current',
        async ctx => {
            const token = ctx.request.header.authorization;
            const user = Tools.getJWTPayload(token);
            // 验证
            const userInfo = await User.findOne({"_id": user.id});
            
            ctx.body = Result.successResult(userInfo);
        }
    )

    /**
     *  获取用户列表
     */
    router.post('/user/list',async ctx => {
        const { page, pageSize } = ctx.request.body;
        
        let userList = {};

        try {
            userList = await pageHelper.pageQuery(page, pageSize, User, '', {}, {
                createDate: 'desc'
            });   
        } catch (error) {
            ctx.body = Result.errorResult(undefined, error)
            return;
        }

        ctx.body = Result.successResult(userList);
    })
}