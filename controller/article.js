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
            ctx.body = Result.errorResult('服务端错误');
            return;
        }

        ctx.body = Result.successResult(articleList);
    })

    /**
     * 文章详情
     */
    router.get('/article/detail/:id', async ctx => {
        const { id } = ctx.params;
        
        const articleInfo = await Article.findOne({ "_id": id });
        ctx.body = Result.successResult(articleInfo);
    })

    /**
     * 修改文章
     */
    router.post('/article/update', async ctx => {
        try {
            const res = await Article.findOneAndUpdate({"_id":ctx.request.body._id },{
                ...ctx.request.body
            })
        } catch (error) {
            ctx.body = Result.errorResult('找不到文章!',error);
            return;
        }

        ctx.body = Result.successResult(res);
    })

    /**
     *  删除某一文章
     */
    router.del('/article/del/:id',async ctx => {
        Article.remove({"_id": ctx.params.id});
        ctx.body = Result.successResult();
    })

    /**
     * 点赞 (待完善 TODO)
     */
    router.post('/article/star/:id', async ctx => {
        const { id } = ctx.params;
        let count = 0;
        try {
            const articleInfo = await Article.findOne({ "_id": id });
            count = articleInfo.total_like + 1;
            await Article.updateOne({_id: id},{total_like: count});
        } catch (error) {
            ctx.body = Result.errorResult(undefined, error);
            return;
        }
        
        ctx.body = Result.successResult({count});
    })

    /**
     * 取消点赞  (待完善 TODO)
     */
    router.post('/article/unstar/:id', async ctx => {
        const { id } = ctx.params;
        let count = 0;
        try {
            const articleInfo = await Article.findOne({ "_id": id });
            count = articleInfo.total_like - 1;
            await Article.updateOne({_id: id},{total_like: count < 0 ? 0 : count });
        } catch (error) {
            ctx.body = Result.errorResult(undefined, error);
            return;
        }
        
        ctx.body = Result.successResult({count: count < 0 ? 0 : count});
    })

}