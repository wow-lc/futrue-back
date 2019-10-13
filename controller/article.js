const dbHelper = require('../db/dbHelper');
const Result = require('../commons/result');
const pageHelper = require('../db/pageHelper');

const Article = dbHelper.getModel('article');


/**
 *  文章api
 */
module.exports = (router) => {    
    /**
     * 新增文章
     */
    router.post('/article/add', async ctx => {
        const { title, content, classify, author } = ctx.request.body;
        
        const newArtcile = new Article({
            ...ctx.request.body
        })

        await newArtcile.save();
        ctx.body = Result.successResult({}, '保存成功！');
    })
    /**
     * 文章列表
     */
    router.post('/article/list', async ctx => {
        const { page, pageSize } = ctx.request.body;
        
        let articleList = {};
        try {
            articleList = await pageHelper.pageQuery(page, pageSize, Article, '', {}, {
                created_time: 'desc'
            });   
        } catch (error) {
            console.error(error);
        }

        ctx.body = Result.successResult(articleList);
    })
}